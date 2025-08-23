import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { userService } from './user.service';
import { generateAccessToken } from '../../common/generateToken';
import { generateOtp } from '../../common/otp';
import { sendOTP } from '../../common/mailer';



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

		// Génère OTP et expiration
		const otp = generateOtp();
		const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

		const success = await userService.createUser({
			email,
			password: hashedPassword,
			is_verified: false,
			verifyOtp: otp,
			verifyOtpExpiresAt: expiresAt,
		});

		if (!success) {
			return res.status(500).json({ message: 'Erreur création utilisateur' });
		}
		await sendOTP(email, otp);

		return res.json({ message: 'Utilisateur créé !', success: true });
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
		if (!user.is_verified) {
			return res.status(403).json({ message: 'Email non vérifié. Vérifiez votre boîte mail.' });
		}

		// Génère le JWT
		// const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
		const token = generateAccessToken(user);

		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		return res.json({ success: true });
	},

	async logout(req: Request, res: Response) {
		res.clearCookie('token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		return res.json({ success: true });
	},

	// ROUTE PROTÉGÉE
	async profile(req: Request, res: Response) {
		return res.json({ user: req.user });
	},

	async verifyEmail(req: Request, res: Response) {
		const { email, otp } = req.body;

		const user = await userService.getUser(undefined, email);
		if (!user) {
			return res.status(404).json({ message: 'Utilisateur introuvable' });
		}

		if (user.is_verified) {
			return res.status(400).json({ message: 'Email déjà vérifié' });
		}

		if (user.verifyOtp !== otp) {
			return res.status(400).json({ message: 'OTP invalide' });
		}

		if (!user.verifyOtpExpiresAt || user.verifyOtpExpiresAt < new Date()) {
			return res.status(400).json({ message: 'OTP expiré' });
		}

		// Met à jour l'utilisateur
		const updated = await userService.updateVerification(email);
		if (!updated) {
			return res.status(500).json({ message: 'Erreur lors de la vérification' });
		}

		return res.json({ message: 'Email vérifié avec succès', success: true });
	},
};

