import express from 'express';
import dotenv from 'dotenv';
import dbcon from './utils/db.js';
import cors from 'cors';
import routers from './routes/routers.js';
dotenv.config();
const app = express();


dbcon();
app.use(express.json());
app.use(cors());
app.use('/api',routers);
app.listen(process.env.PORT,() => {
    console.log('Server is running');
    });