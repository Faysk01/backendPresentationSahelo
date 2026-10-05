import { taskRepository } from './tasks.repository';
import { TaskStatus, Prisma } from '@prisma/client'; // 👈 Importation de Prisma

export class TaskService {
  async getAllTasks() {
    return await taskRepository.findAll();
  }

  async createTask(data: any) {
    // 1. Logique métier : Validation stricte
    if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
      throw new Error("Le titre de la tâche est obligatoire.");
    }

    // 2. Construction ultra-sécurisée de l'objet (on évite le '...data')
    const newTaskData: Prisma.TaskCreateInput = {
      title: data.title.trim(),
      description: data.description || "",
      assignee: data.assignee || "Équipe",
      status: data.status ? (data.status as TaskStatus) : TaskStatus.TODO,
    };

    return await taskRepository.create(newTaskData);
  }

  async updateTask(id: string, data: any) {
    // Nettoyage avant la mise à jour pour éviter de planter Prisma
    const updateData: Prisma.TaskUpdateInput = {};
    
    if (data.title) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.assignee !== undefined) updateData.assignee = data.assignee;
    if (data.status) updateData.status = data.status as TaskStatus;

    return await taskRepository.update(id, updateData);
  }

  async deleteTask(id: string) {
    return await taskRepository.delete(id);
  }
}

export const taskService = new TaskService();