import { Router } from 'express';
import { pitchController } from './pitch.controller';

const router = Router();

router.get('/', pitchController.get);
router.put('/', pitchController.update);

export default router;