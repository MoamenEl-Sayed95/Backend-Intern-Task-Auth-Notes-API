import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface JwtPayload {
  id: string
  role: string
};

interface AuthRequest extends Request {
  user?: { id: string; role: string }
};

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = header.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    req.user = { id: decoded.id, role: decoded.role }
    next()
  } catch {
    return res.status(401).json({ message: 'Unauthorized' })
  }
};