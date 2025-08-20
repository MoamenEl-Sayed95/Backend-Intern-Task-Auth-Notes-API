import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Call the user service to register a new user with the provided data
        const result = await userService.registerUser(req.body)

        // Respond with status 201 (Created) and the registered user data
        res.status(201).json(result)
    } catch (err) {

        // Pass any errors to the error handling middleware
        next(err)
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body
        const result = await userService.loginUser(email, password)

        // Respond with user info and JWT token
        res.json(result)
    } catch (err) {
        
        // Pass any errors to the error handling middleware
        next(err)
    }
};