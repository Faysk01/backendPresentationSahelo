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
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur serveur lors de la récupération.";
      res.status(500).json({ error: message });
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const task = await taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur de création.";
      res.status(400).json({ error: message });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      // 🛡️ CORRECTION : On force le type string pour l'ID
      const id = req.params.id as string;
      const task = await taskService.updateTask(id, req.body);
      res.status(200).json(task);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur lors de la mise à jour.";
      res.status(400).json({ error: message });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      // 🛡️ CORRECTION : On force le type string pour l'ID
      const id = req.params.id as string;
      await taskService.deleteTask(id);
      res.status(200).json({ success: true, message: "Tâche supprimée avec succès." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erreur lors de la suppression.";
      res.status(400).json({ error: message });
    }
  }
}

export const taskController = new TaskController();