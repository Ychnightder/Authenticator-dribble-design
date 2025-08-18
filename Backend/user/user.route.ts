import { Router } from "express";
import { userController } from "./user.controller";
import { authenticateToken } from "../common/auth.middleware";

const userRoutes  = Router();

userRoutes.post('/register', userController.register);
userRoutes.post('/login', userController.login);
userRoutes.get('/profile', authenticateToken, userController.profile);


export default userRoutes ;
