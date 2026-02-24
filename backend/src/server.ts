import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import authRoutes from './routes/auth';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
const app = express();
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(helmet());
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:19006'] }));
app.use(express.json());

// Rate limiting on sensitive auth endpoints
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: { error: 'Too many requests' } });
app.use('/auth/signup', authLimiter);
app.use('/auth/resend-signup-otp', authLimiter);
app.use('/auth/request-password-reset', authLimiter);

app.use('/auth', authRoutes);

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(env.PORT, () => console.log(`Server running on port ${env.PORT}`));