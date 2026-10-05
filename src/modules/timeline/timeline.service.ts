import { timelineRepository } from './timeline.repository';
import { Prisma } from '@prisma/client';

export const timelineService = {
  getAll: async () => await timelineRepository.findAll(),
  
  create: async (data: any) => {
    if (!data.monthGroup || !data.weekLabel) throw new Error("Mois et Semaine requis.");
    return await timelineRepository.create({
      monthGroup: data.monthGroup.trim(),
      weekLabel: data.weekLabel.trim(),
      adminText: data.adminText || "",
      adminStatus: data.adminStatus || "Planifié",
      techText: data.techText || "",
      techStatus: data.techStatus || "Planifié",
      orderIndex: data.orderIndex ? Number(data.orderIndex) : 0
    });
  },
  
  // 🚀 NOUVELLE FONCTION : Mise à jour sécurisée et partielle
  update: async (id: string, data: any) => {
    if (!id) throw new Error("L'ID est requis pour la mise à jour.");

    // 🛡️ SÉCURITÉ : On construit l'objet de mise à jour dynamiquement.
    // Cela permet au Frontend d'envoyer soit toute la semaine, soit uniquement le "Track Tech".
    const updateData: Prisma.TimelineEventUpdateInput = {};
    
    if (data.monthGroup !== undefined) updateData.monthGroup = data.monthGroup.trim();
    if (data.weekLabel !== undefined) updateData.weekLabel = data.weekLabel.trim();
    
    // Modification ciblée équipe Admin
    if (data.adminText !== undefined) updateData.adminText = data.adminText;
    if (data.adminStatus !== undefined) updateData.adminStatus = data.adminStatus;
    
    // Modification ciblée équipe Tech
    if (data.techText !== undefined) updateData.techText = data.techText;
    if (data.techStatus !== undefined) updateData.techStatus = data.techStatus;
    
    if (data.orderIndex !== undefined) updateData.orderIndex = Number(data.orderIndex);

    // On envoie les données nettoyées au Repository
    return await timelineRepository.update(id, updateData);
  },
  
  delete: async (id: string) => await timelineRepository.delete(id)
};