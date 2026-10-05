import { Request, Response } from 'express';
import { budgetService } from './budget.service';

export class BudgetController {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await budgetService.getAllItems();
      res.status(200).json(items);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur.";
      res.status(500).json({ error: message });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const item = await budgetService.createItem(req.body);
      res.status(201).json(item);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur de création.";
      res.status(400).json({ error: message });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      // 🛡️ CORRECTION : On extrait l'ID et on force le type string pour rassurer TypeScript
      const id = req.params.id as string;
      const item = await budgetService.updateItem(id, req.body);
      res.status(200).json(item);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur de mise à jour.";
      res.status(400).json({ error: message });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      // 🛡️ CORRECTION : Même chose ici pour la suppression
      const id = req.params.id as string;
      await budgetService.deleteItem(id);
      res.status(200).json({ success: true, message: "Ligne de budget supprimée" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur de suppression.";
      res.status(400).json({ error: message });
    }
  }
}

export const budgetController = new BudgetController();