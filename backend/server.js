import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

//Additions
import eventRoutes from './routes/eventRoutes.js';

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);

//Additions
app.use('/api/events', eventRoutes);

if (process.env.NODE_ENV == 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
} else {
    app.get('/', (req, res) => res.send('Server is ready'));
};


app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log("Server is running on port 5000"))



