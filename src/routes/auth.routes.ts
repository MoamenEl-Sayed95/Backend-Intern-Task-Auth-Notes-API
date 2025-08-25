import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import * as userController from '../controllers/user.controller';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/change-password', auth, userController.changePassword);

export default router;