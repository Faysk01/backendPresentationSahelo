import { Router } from 'express';
import { timelineController } from './timeline.controller';

const router = Router();

// ==========================================
// 📅 ROUTES DU CHRONOGRAMME (TIMELINE)
// Point d'entrée : /api/timeline
// ==========================================

// 📥 Récupérer toutes les semaines
router.get('/', timelineController.getAll);

// ➕ Ajouter une nouvelle semaine (Structure globale)
router.post('/', timelineController.create);

// ✏️ NOUVEAU : Modifier une semaine spécifique (Idéal pour l'édition ciblée Admin/Tech)
router.put('/:id', timelineController.update);

// ❌ Supprimer une semaine
router.delete('/:id', timelineController.delete);

export default router;