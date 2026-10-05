import { dashboardRepository } from './dashboard.repository';

export class DashboardService {
  async getDashboard() {
    return await dashboardRepository.get();
  }

  async updateDashboard(data: any) {
    const stat = await dashboardRepository.get();
    
    // 🛡️ SÉCURITÉ : On filtre les données pour qu'elles correspondent au nouveau schéma Prisma
    const updateData = {
      // Les KPIs de base
      progress: data.progress !== undefined ? Number(data.progress) : undefined,
      activePhase: data.activePhase,
      daysLeft: data.daysLeft !== undefined ? Number(data.daysLeft) : undefined,
      goal: data.goal,
      
      // 🚀 NOUVEAU : On enregistre le tableau infini d'avancées (JSON)
      // Les anciens champs advance1, advance2, advance3 ont été supprimés.
      advances: data.advances !== undefined ? data.advances : undefined,
    };

    return await dashboardRepository.update(stat.id, updateData);
  }
}

export const dashboardService = new DashboardService();