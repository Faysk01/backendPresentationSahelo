import { Request, Response } from 'express';
import { timelineService } from './timeline.service';

export const timelineController = {
  getAll: async (req: Request, res: Response): Promise<void> => {
    try { 
      res.json(await timelineService.getAll()); 
    } catch (error) { 
      // 🛡️️ Typage strict sans "any"
      const message = error instanceof Error ? error.message : "Erreur serveur.";
      res.status(500).json({ error: message }); 
    }
  },
  
  create: async (req: Request, res: Response): Promise<void> => {
    try { 
      res.status(201).json(await timelineService.create(req.body)); 
    } catch (error) { 
      const message = error instanceof Error ? error.message : "Erreur lors de la création.";
      res.status(400).json({ error: message }); 
    }
  },

  // 🚀 NOUVELLE FONCTION : Gère la mise à jour (globale ou par équipe)
  update: async (req: Request, res: Response): Promise<void> => {
    try {
      // 🛡️ CORRECTION : On rassure TypeScript en forçant le type "string"
      const id = req.params.id as string;
      const updatedEvent = await timelineService.update(id, req.body);
      res.json(updatedEvent);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur lors de la mise à jour.";
      res.status(400).json({ error: message });
    }
  },

  delete: async (req: Request, res: Response): Promise<void> => {
    try { 
      // 🛡️ CORRECTION : On rassure TypeScript en forçant le type "string"
      const id = req.params.id as string;
      await timelineService.delete(id); 
      res.json({ success: true }); 
    } catch (error) { 
      const message = error instanceof Error ? error.message : "Erreur lors de la suppression.";
      res.status(400).json({ error: message }); 
    }
  }
};