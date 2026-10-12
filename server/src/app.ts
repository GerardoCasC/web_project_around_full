import dotenv from 'dotenv';
dotenv.config();
import dns from 'dns';
import express from 'express';
import router from './routes/index.js';
import { errorHandler } from './middleware/error-handler.js';
import mongoose from 'mongoose';
import cors from 'cors';

const PORT = process.env.PORT || 3001;
dns.setServers(['8.8.8.8', '8.8.4.4']);
mongoose
  .connect(process.env.MONGO_URI!, { maxPoolSize: 10 })
  .then(() => {
    app.listen(PORT, () => {});
  })
  .catch((err) => {
    console.error('Error de conexión', err);
    process.exit(1);
  });

const app = express();
app.set('trust proxy', 1);
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    data: { status: 'ok' },
    error: null,
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(router);
app.use(errorHandler);
