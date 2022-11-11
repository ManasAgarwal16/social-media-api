import express from 'express';
import dotenv from 'dotenv';
import connectDB from './mongoose/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
dotenv.config();
connectDB();

import userRoutes from './routes/userRoute.js';
import postRoute from './routes/postRoute.js';
const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('manas');
});

//Mount routers
app.use('/api/user', userRoutes);
app.use('/api', postRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running on ${PORT}`));
