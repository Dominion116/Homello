import nodemailer from 'nodemailer';
import { env } from '../config/env';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
  auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  debug: true,  // 👈 log all SMTP communication
  logger: true, // 👈 log to console
});

export async function sendOtpEmail(to: string, code: string, purpose: string) {
  const subject =
    purpose === 'signup_verification' ? 'Verify your email' :
    purpose === 'password_reset'      ? 'Reset your password' :
                                        'Your login code';

  try {
    const info = await transporter.sendMail({
      from: env.FROM_EMAIL,
      to,
      subject,
      text: `Your code is: ${code}. It expires in 15 minutes.`,
      html: `<p>Your code is: <strong>${code}</strong>. It expires in 15 minutes.</p>`,
    });
    console.log('✅ Email sent:', info.messageId, 'Response:', info.response);
  } catch (err) {
    console.error('❌ Email send failed:', err);
    throw err; // 👈 this will now cause a 500 and show in logs
  }
}