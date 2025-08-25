import { Router } from 'express';
import * as noteController from '../controllers/note.controller';
import { auth } from '../middleware/auth';

const router = Router();

router.post('/', auth, noteController.create);
router.get('/', auth, noteController.getAll);
router.get('/stats', auth, noteController.getStats);
router.get('/tags', auth, noteController.getTags);
router.get('/:id', auth, noteController.getById);
router.put('/:id', auth, noteController.update);
router.delete('/:id', auth, noteController.remove);

export default router;