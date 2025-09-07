import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoutes from './modules/user/user.route';
import cors from 'cors';
import { pool } from './config/database';
dotenv.config();
const ip = process.env.IP || '127.0.0.1';
const port = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const app = express();
// app.use(cors());

app.use(
	cors({
		origin: [
			'http://localhost:5173', // pour dev
			'https://authenticator-dribble-design-bfxn.vercel.app', // ton frontend Vercel
		],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true, // si tu utilises les cookies
	})
);
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
	console.log(`Listening on ${ip}:${port}`);
	console.log(`🚀 Serveur Express lancé sur http://${HOST}:${port} 🚀`);
});
