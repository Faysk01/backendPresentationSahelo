import { prisma } from '../../services/prisma.service';
import { Prisma } from '@prisma/client';

export class DashboardRepository {
  async get() {
    // Cherche le dashboard principal en base de données
    let stat = await prisma.dashboardStat.findFirst();
    
    // S'il n'existe pas encore (au tout premier lancement du projet), on le crée
    // Prisma appliquera automatiquement les valeurs par défaut du schema (y compris advances: "[]")
    if (!stat) {
      stat = await prisma.dashboardStat.create({ data: {} });
    }
    
    return stat;
  }

  async update(id: string, data: Prisma.DashboardStatUpdateInput) {
    // Met à jour les champs de la base de données
    // Grâce à Prisma, le champ "advances" est strictement typé pour n'accepter que du JSON valide
    return await prisma.dashboardStat.update({
      where: { id },
      data
    });
  }
}

export const dashboardRepository = new DashboardRepository();