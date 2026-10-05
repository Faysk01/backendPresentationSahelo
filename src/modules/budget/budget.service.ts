import { budgetRepository } from './budget.repository';

export class BudgetService {
  async getAllItems() {
    return await budgetRepository.findAll();
  }

  async createItem(data: any) {
    if (!data.label || data.amount === undefined) {
      throw new Error("Le libellé et le montant sont obligatoires.");
    }

    return await budgetRepository.create({
      label: data.label,
      amount: Number(data.amount),
      status: data.status || 'En attente',
      isExpense: data.isExpense !== undefined ? data.isExpense : true,
      notes: data.notes
    });
  }

  async updateItem(id: string, data: any) {
    if (data.amount !== undefined) data.amount = Number(data.amount);
    return await budgetRepository.update(id, data);
  }

  async deleteItem(id: string) {
    return await budgetRepository.delete(id);
  }
}

export const budgetService = new BudgetService();