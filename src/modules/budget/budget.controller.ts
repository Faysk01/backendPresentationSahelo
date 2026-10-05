import { Request, Response } from 'express';
import { budgetService } from './budget.service';

export class BudgetController {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req: Request, res: Response) {
    try {
      const items = await budgetService.getAllItems();
      res.status(200).json(items);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const item = await budgetService.createItem(req.body);
      res.status(201).json(item);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await budgetService.updateItem(id, req.body);
      res.status(200).json(item);
    } catch (error: any) {
      res.status(400).json({ error: "Erreur de mise à jour" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await budgetService.deleteItem(id);
      res.status(200).json({ success: true, message: "Ligne de budget supprimée" });
    } catch (error: any) {
      res.status(400).json({ error: "Erreur de suppression" });
    }
  }
}

export const budgetController = new BudgetController();