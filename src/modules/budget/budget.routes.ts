import { Router } from 'express';
import { budgetController } from './budget.controller';

const router = Router();

router.get('/', budgetController.getAll);
router.post('/', budgetController.create);
router.put('/:id', budgetController.update);
router.delete('/:id', budgetController.delete);

export default router;