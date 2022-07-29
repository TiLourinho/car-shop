import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/errors';
import carRoute from './routes/carRoute';

const app = express();
app.use(express.json());

app.use('/cars', carRoute);

app.use(errorHandler);

export default app;
