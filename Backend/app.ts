import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoutes from './modules/user/user.route';
import cors from 'cors';
import { pool } from './config/database';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

app.get('/', async (req: Request, res: Response) => {
	try {
		const [rows] = await pool.query('SELECT * FROM users'); // ou ton nom de table
		res.json(rows);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Erreur serveur' });
	}
});


app.listen(3000, () => {
	console.log('🚀 Serveur Express lancé sur http://localhost:3000 🚀');
});
