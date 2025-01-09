import React from 'react';
import { Expense } from '../../types';
import { DollarSign, Calendar, Tag, Trash2 } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="glass-card rounded-xl p-4 flex items-center justify-between group hover:bg-white/5 transition-all duration-200"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-500/10 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="font-medium text-white">{expense.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {expense.date}
                </span>
                <span className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  {expense.category}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-white">₹{expense.amount.toFixed(2)}</span>
            <button
              onClick={() => onDelete(expense.id)}
              className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-300"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}