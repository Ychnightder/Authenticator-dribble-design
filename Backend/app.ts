import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import userRoutes from './modules/user/user.route';
import { transporter, sendOTP } from './common/mailer';
dotenv.config();

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

sendOTP("datopin134@amcret.com", '942498');


app.listen(3000, () => {
	console.log('🚀 Serveur Express lancé sur http://localhost:3000 🚀');
});
