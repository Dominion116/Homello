import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { PrismaClient} from '@prisma/client';
const OtpPurpose = {
  signup_verification: 'signup_verification',
  login: 'login',
  password_reset: 'password_reset',
} as const;
type OtpPurpose = typeof OtpPurpose[keyof typeof OtpPurpose];
import { env } from '../config/env';
import { sendOtpEmail } from '../services/email';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// --- Helpers ---
function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function hashCode(code: string): string {
  return crypto.createHash('sha256').update(code).digest('hex');
}

function issueJwt(userId: string): string {
  return jwt.sign(
    { sub: userId },
    env.JWT_SECRET as string,
    { expiresIn: env.JWT_EXPIRES_IN as any }
  );
}

// --- POST /auth/signup ---
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email, password]
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created, OTP sent
 *       409:
 *         description: Email already registered
 */
router.post('/signup', async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  // Basic validation
  if (!fullName || !email || !password) return res.status(400).json({ error: 'All fields required' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email' });
  if (password.length < 8) return res.status(400).json({ error: 'Password must be 8+ characters' });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ error: 'Email already registered' });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({ data: { email, fullName, passwordHash } });

  // Generate + store OTP
  const code = generateOtp();
  await prisma.emailOtp.create({
    data: {
      userId: user.id,
      codeHash: hashCode(code),
      purpose: OtpPurpose.signup_verification,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  await sendOtpEmail(email, code, 'signup_verification');
  res.status(201).json({ userId: user.id, email, otpDelivery: 'email' });
});

// --- POST /auth/verify-signup-otp ---
/**
 * @swagger
 * /auth/verify-signup-otp:
 *   post:
 *     summary: Verify signup OTP and get JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, code]
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns JWT token and user object
 *       400:
 *         description: Invalid or expired OTP
 */
router.post('/verify-signup-otp', async (req: Request, res: Response) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: 'email and code required' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const otp = await prisma.emailOtp.findFirst({
    where: {
      userId: user.id,
      purpose: OtpPurpose.signup_verification,
      consumedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!otp || otp.codeHash !== hashCode(code)) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { isEmailVerified: true } }),
    prisma.emailOtp.update({ where: { id: otp.id }, data: { consumedAt: new Date() } }),
  ]);

  const token = issueJwt(user.id);
  res.json({ token, user: { id: user.id, email: user.email, fullName: user.fullName, isEmailVerified: true } });
});

// --- POST /auth/signin ---
/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Sign in with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns JWT token and user object
 *       401:
 *         description: Invalid credentials
 */
router.post('/signin', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  if (!user.isEmailVerified) return res.status(403).json({ error: 'Email not verified' });

  const token = issueJwt(user.id);
  res.json({ token, user: { id: user.id, email: user.email, fullName: user.fullName, isEmailVerified: user.isEmailVerified } });
});

// --- POST /auth/resend-signup-otp ---
/**
 * @swagger
 * /auth/resend-signup-otp:
 *   post:
 *     summary: Resend signup verification OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP resent
 */
router.post('/resend-signup-otp', async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  // Invalidate existing OTPs for this purpose
  await prisma.emailOtp.updateMany({
    where: { userId: user.id, purpose: OtpPurpose.signup_verification, consumedAt: null },
    data: { consumedAt: new Date() },
  });

  const code = generateOtp();
  await prisma.emailOtp.create({
    data: {
      userId: user.id,
      codeHash: hashCode(code),
      purpose: OtpPurpose.signup_verification,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  await sendOtpEmail(email, code, 'signup_verification');
  res.json({ message: 'OTP resent' });
});

// --- POST /auth/request-password-reset ---
/**
 * @swagger
 * /auth/request-password-reset:
 *   post:
 *     summary: Request a password reset OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent if email exists
 */
router.post('/request-password-reset', async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  // Always 200 to avoid email enumeration
  if (!user) return res.json({ message: 'If the email exists, a code has been sent' });

  await prisma.emailOtp.updateMany({
    where: { userId: user.id, purpose: OtpPurpose.password_reset, consumedAt: null },
    data: { consumedAt: new Date() },
  });

  const code = generateOtp();
  await prisma.emailOtp.create({
    data: {
      userId: user.id,
      codeHash: hashCode(code),
      purpose: OtpPurpose.password_reset,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    },
  });

  await sendOtpEmail(email, code, 'password_reset');
  res.json({ message: 'If the email exists, a code has been sent' });
});

// --- POST /auth/reset-password ---
/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password using OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, code, newPassword]
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired OTP
 */
router.post('/reset-password', async (req: Request, res: Response) => {
  const { email, code, newPassword } = req.body;
  if (!email || !code || !newPassword) return res.status(400).json({ error: 'All fields required' });
  if (newPassword.length < 8) return res.status(400).json({ error: 'Password must be 8+ characters' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const otp = await prisma.emailOtp.findFirst({
    where: {
      userId: user.id,
      purpose: OtpPurpose.password_reset,
      consumedAt: null,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!otp || otp.codeHash !== hashCode(code)) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await prisma.$transaction([
    prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
    prisma.emailOtp.update({ where: { id: otp.id }, data: { consumedAt: new Date() } }),
  ]);

  res.json({ message: 'Password reset successful' });
});

// --- GET /auth/me ---
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns current user
 *       401:
 *         description: Missing or invalid token
 */
router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, email: true, fullName: true, isEmailVerified: true },
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user });
});

export default router;