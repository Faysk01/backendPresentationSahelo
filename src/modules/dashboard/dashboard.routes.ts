import { Router } from 'express';
import { dashboardController } from './dashboard.controller';

const router = Router();

// ==========================================
// 📊 ROUTES DU TABLEAU DE BORD (DASHBOARD)
// Point d'entrée : /api/dashboard
// ==========================================

// 📥 Récupérer les données (KPIs, Textes des avancées et Popups détaillés)
router.get('/', dashboardController.getDashboard);

// 📤 Mettre à jour les données depuis le formulaire Frontend
router.put('/', dashboardController.updateDashboard);

export default router;