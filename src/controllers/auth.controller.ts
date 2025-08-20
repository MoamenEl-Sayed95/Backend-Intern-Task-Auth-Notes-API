import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.registerUser(req.body)
        res.status(201).json(result)
    } catch (err) {
        next(err)
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const result = await userService.loginUser(email, password)
        res.json(result)
    } catch (err) {
        next(err)
    }
};