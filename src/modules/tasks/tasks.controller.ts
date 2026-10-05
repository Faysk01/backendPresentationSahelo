import { Request, Response } from 'express';
import { taskService } from './tasks.service';

export class TaskController {
  
  // Fonction pour gérer le contexte de 'this' dans Express
  constructor() {
    this.getAllTasks = this.getAllTasks.bind(this);
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Erreur serveur lors de la récupération." });
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const task = await taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error: any) {
      // Le frontend affichera exactement cette erreur si la création échoue
      res.status(400).json({ error: error.message || "Erreur de création." });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const task = await taskService.updateTask(id, req.body);
      res.status(200).json(task);
    } catch (error: any) {
      // 🚀 AMÉLIORATION : On expose la vraie erreur ici
      res.status(400).json({ error: error.message || "Erreur lors de la mise à jour." });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await taskService.deleteTask(id);
      res.status(200).json({ success: true, message: "Tâche supprimée avec succès." });
    } catch (error: any) {
      // 🚀 AMÉLIORATION : On expose la vraie erreur ici
      res.status(400).json({ error: error.message || "Erreur lors de la suppression." });
    }
  }
}

export const taskController = new TaskController();