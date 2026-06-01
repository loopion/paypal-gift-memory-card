import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.js';
import activityRouter from './routes/activity.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV !== 'production';
const PORT = parseInt(process.env.PORT ?? '3001', 10);

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/activity', activityRouter);

if (!isDev) {
  // In production, serve the Vite-built frontend from dist/
  const distDir = path.join(__dirname, '../../dist');
  app.use(express.static(distDir));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[server] listening on port ${PORT} (${isDev ? 'dev' : 'production'})`);
});
