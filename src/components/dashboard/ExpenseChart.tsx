import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Expense } from '../../types';

interface ExpenseChartProps {
  expenses: Expense[];
}

export default function ExpenseChart({ expenses }: ExpenseChartProps) {
  const data = expenses.reduce((acc: any[], expense) => {
    const existingCategory = acc.find(item => item.category === expense.category);
    if (existingCategory) {
      existingCategory.amount += expense.amount;
    } else {
      acc.push({ category: expense.category, amount: expense.amount });
    }
    return acc;
  }, []);

  return (
    <div>
      <h3 className="text-xl font-semibold text-blue-900 mb-4">Expense Breakdown</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="category" stroke="#1E40AF" />
            <YAxis stroke="#1E40AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '0.5rem',
              }}
            />
            <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}