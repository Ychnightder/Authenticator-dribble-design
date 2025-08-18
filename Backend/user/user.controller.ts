import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userService } from './user.service';

const SECRET_KEY = process.env.JWT_SECRET || 'supersecret';

export const userController = {
	// REGISTER
	async register(req: Request, res: Response) {
		const { email, password } = req.body;

		const existing = await userService.getUser(undefined, email);
		if (existing) {
			return res.status(400).json({ message: 'Utilisateur déjà existant' });
		}

		// hash du mot de passe
		const hashedPassword = await bcrypt.hash(password, 10);

		const success = await userService.createUser({
			email,
			password: hashedPassword,
			is_verified: false,
		});

		if (!success) {
			return res.status(500).json({ message: 'Erreur création utilisateur' });
		}

		return res.json({ message: 'Utilisateur créé !' });
	},

	// LOGIN
	async login(req: Request, res: Response) {
		const { email, password } = req.body;

		const user = await userService.getUser(undefined, email);
		if (!user) {
			return res.status(404).json({ message: 'Utilisateur introuvable' });
		}

		// Vérifie le mot de passe
		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return res.status(401).json({ message: 'Mot de passe incorrect' });
		}

		// Génère le JWT
		const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

		return res.json({ token });
	},

	// ROUTE PROTÉGÉE
	async profile(req: Request, res: Response) {
		return res.json({ user: req.user });
	},
};
