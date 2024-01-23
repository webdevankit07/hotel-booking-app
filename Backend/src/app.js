import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes import...
import { userRouter } from './routes/user.routes.js';

// Routes declaration...
app.use('/api/v1/users', userRouter);

export default app;
