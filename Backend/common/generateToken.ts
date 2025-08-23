import jwt from 'jsonwebtoken';
import { User } from '../modules/user/user.model';

const SECRET_KEY: string = process.env.JWT_SECRET || 'supersecrety';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refreshsecret';

export function generateAccessToken(user: User) {
	return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '15m' });
}

export function generateRefreshToken(user: User) {
	return jwt.sign({ id: user.id, email: user.email }, REFRESH_SECRET, { expiresIn: '7d' });
}