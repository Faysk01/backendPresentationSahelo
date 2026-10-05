import { prisma } from '../../services/prisma.service';

export class BudgetRepository {
  async findAll() {
    return await prisma.budgetItem.findMany({
      orderBy: { createdAt: 'asc' }
    });
  }

  async create(data: { label: string; amount: number; status: string; isExpense: boolean; notes?: string }) {
    return await prisma.budgetItem.create({ data });
  }

  async update(id: string, data: Partial<{ label: string; amount: number; status: string; isExpense: boolean; notes: string }>) {
    return await prisma.budgetItem.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return await prisma.budgetItem.delete({
      where: { id }
    });
  }
}

export const budgetRepository = new BudgetRepository();