import { prisma } from '../services/prisma.service';
import { Prisma } from '@prisma/client'; // 👈 Importation de l'objet Prisma entier

export class TaskRepository {
  async findAll() {
    return await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  // 👈 On utilise Prisma.TaskCreateInput : Prisma gère les types parfaitement !
  async create(data: Prisma.TaskCreateInput) {
    return await prisma.task.create({ data });
  }

  // 👈 On utilise Prisma.TaskUpdateInput
  async update(id: string, data: Prisma.TaskUpdateInput) {
    return await prisma.task.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return await prisma.task.delete({
      where: { id }
    });
  }
}

export const taskRepository = new TaskRepository();