import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoutes from './modules/user/user.route';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);




app.listen(3000, () => {
	console.log('🚀 Serveur Express lancé sur http://localhost:3000 🚀');
});
