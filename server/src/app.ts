import express from 'express';
import router from './routes/index.js';
import { errorHandler } from './middleware/error-handler.js';
import mongoose from 'mongoose';

mongoose
  .connect('mongodb://127.0.0.1:27017/egresadosdb')
  .catch((err) => console.error('Error de conexión', err));

const app = express();
app.use((req, res, next) => {
  req.user = {
    _id: '6aa32af2fc106389dd5060fe',
  };

  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(router);
app.use(errorHandler);

const port = 3000;
app.listen(port, () => {});
