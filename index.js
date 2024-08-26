import express, { json, urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDB from './utils/database.js';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import authRouter from './routes/auth.routes.js';
import attendanceRouter from './routes/attendance.routes.js';
import userRouter from './routes/user.routes.js';


dotenv.config();

const app = express();
connectToDB();

app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.disable('x-powered-by');
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI, collectionName: 'sessions' }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false
    },
}));

app.use('/auth', authRouter);
app.use('/attendance', attendanceRouter);
app.use('/user', userRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 3000');
})