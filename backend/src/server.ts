import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { env } from './config/env';
import authRoutes from './routes/auth';
import { swaggerSpec } from './swagger';

const app = express();

app.set('trust proxy', 1);

// Core middleware
app.use(helmet({
  contentSecurityPolicy: false, // needed for Swagger UI to load properly
}));
app.use(cors({ origin: '*' })); // open for now, restrict later
app.use(express.json());

// Root route
app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Homello Auth API', docs: '/docs' });
});

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rate limiting
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { error: 'Too many requests' } });
app.use('/auth/signup', authLimiter);
app.use('/auth/resend-signup-otp', authLimiter);
app.use('/auth/request-password-reset', authLimiter);

// Routes
app.use('/auth', authRoutes);

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message }); // 👈 changed this
});

// Use Render's PORT env var
const PORT = process.env.PORT || env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));