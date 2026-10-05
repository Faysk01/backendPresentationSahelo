import { prisma } from '../../services/prisma.service';
import { Prisma } from '@prisma/client';

export const timelineRepository = {
  // Récupère tout en triant proprement par groupe de mois, puis par ordre
  findAll: async () => prisma.timelineEvent.findMany({ 
    orderBy: [
      { monthGroup: 'asc' },
      { orderIndex: 'asc' }
    ] 
  }),
  
  create: async (data: Prisma.TimelineEventCreateInput) => prisma.timelineEvent.create({ data }),
  
  // 🚀 NOUVELLE FONCTION : Mise à jour ciblée
  update: async (id: string, data: Prisma.TimelineEventUpdateInput) => prisma.timelineEvent.update({
    where: { id },
    data
  }),
  
  delete: async (id: string) => prisma.timelineEvent.delete({ where: { id } })
};