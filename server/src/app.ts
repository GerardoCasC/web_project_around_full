import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import router from './routes/index.js';
import { errorHandler } from './middleware/error-handler.js';
import mongoose from 'mongoose';
import cors from 'cors';

mongoose
  .connect('mongodb://127.0.0.1:27017/egresadosdb')
  .catch((err) => console.error('Error de conexión', err));

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(router);
app.use(errorHandler);

const port = 3001;
app.listen(port, () => {});
