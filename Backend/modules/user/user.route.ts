import { Router } from "express";
import { userController } from "./user.controller";
import { authenticateToken } from "../../middlewares/user.middleware";

const userRoutes  = Router();

userRoutes.post('/register', userController.register);
userRoutes.post('/login', userController.login);
userRoutes.post('/logout', userController.logout);
userRoutes.get('/profile', authenticateToken, userController.profile);
userRoutes.post('/verify-email', userController.verifyEmail);
userRoutes.post('/sendEmail', userController.sendEmail);



export default userRoutes ;
