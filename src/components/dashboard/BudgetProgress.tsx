import React from 'react';
import { Budget } from '../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface BudgetProgressProps {
  budgets: Budget[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function BudgetProgress({ budgets }: BudgetProgressProps) {
  const data = budgets.map((budget) => ({
    name: budget.category,
    value: (budget.spent / budget.limit) * 100,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Budget Overview</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}