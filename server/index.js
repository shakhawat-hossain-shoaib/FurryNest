import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/routes.js';
import cors from 'cors';

import connectDB from './db/connect.js';
import router from './routes/routes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/', router);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
