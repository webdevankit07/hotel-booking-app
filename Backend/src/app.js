import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Routes import...
import { hotelRoutes } from './routes/hotels.routes.js';
import { authRoutes } from './routes/auth.routes.js';
import { FRONTEND_URL } from './conf/index.js';

// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, '../../Client/dist')));

const app = express();

const corsOptions = {
    origin: FRONTEND_URL,
    credentials: true,
    optionSuccessStatus: 200,
    Headers: true,
    exposedHeaders: 'Set-Cookie',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes declaration...
app.get('/', (_, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'I am home route. Sever is live',
    });
});

app.use('/api/v1/user', authRoutes);
app.use('/api/v1/my-hotels', hotelRoutes);

export default app;
