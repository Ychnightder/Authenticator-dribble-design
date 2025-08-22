import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../types";



const SECRET_KEY = process.env.JWT_SECRET || "supersecret";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // format "Bearer TOKEN"
    if (!token) return res.sendStatus(401);
    jwt.verify(token, SECRET_KEY, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
         req.user = user as UserPayload;
        next();
    });
}