import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

interface AuthRequest extends Request {
  user?: { id: string; role: string }
}

export const changePassword = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
    const { oldPassword, newPassword } = req.body
    await userService.changePassword(req.user.id, oldPassword, newPassword)
    res.json({ message: 'Password changed successfully' })
  } catch (err) {
    next(err)
  }
};