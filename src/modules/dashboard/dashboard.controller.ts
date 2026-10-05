import { Request, Response } from 'express';
import { dashboardService } from './dashboard.service';

export class DashboardController {
  constructor() {
    // Le bind(this) garantit que les fonctions gardent le contexte de la classe, 
    // c'est une très bonne pratique d'architecture avec Express.
    this.getDashboard = this.getDashboard.bind(this);
    this.updateDashboard = this.updateDashboard.bind(this);
  }

  // 📥 ROUTE GET : Récupération des données du Tableau de Bord
  async getDashboard(req: Request, res: Response): Promise<void> {
    try {
      const data = await dashboardService.getDashboard();
      res.status(200).json(data);
    } catch (error) {
      // 🛡️ SÉCURITÉ TYPESCRIPT : On évite le "any" en vérifiant le type de l'erreur
      const message = error instanceof Error ? error.message : "Erreur serveur lors de la récupération.";
      res.status(500).json({ error: message });
    }
  }

  // 📤 ROUTE PUT : Mise à jour des données (KPIs et le nouveau tableau dynamique JSON des avancées)
  async updateDashboard(req: Request, res: Response): Promise<void> {
    try {
      // On passe 'req.body' (les données du Frontend) au Service.
      // C'est le Service qui se charge du nettoyage et de la validation.
      const data = await dashboardService.updateDashboard(req.body);
      res.status(200).json(data);
    } catch (error) {
      // 🛡️ SÉCURITÉ TYPESCRIPT : On évite le "any"
      const message = error instanceof Error ? error.message : "Erreur lors de la mise à jour.";
      res.status(400).json({ error: message });
    }
  }
}

export const dashboardController = new DashboardController();