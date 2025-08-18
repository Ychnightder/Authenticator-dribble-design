import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoutes from './user/user.route';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());



app.use('/users', userRoutes);

app.listen(3000, () => {
	console.log('🚀 Serveur Express lancé sur http://localhost:3000 🚀');
});
