import  jwt  from 'jsonwebtoken';
import { User } from '../modules/user/user.model';

const SECRET_KEY :string = process.env.JWT_SECRET +"" ;

export function generateAccessToken(user : User) {
	return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
}