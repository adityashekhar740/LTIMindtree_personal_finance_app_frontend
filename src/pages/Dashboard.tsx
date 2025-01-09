import React, { useState } from 'react';
import { DollarSign, TrendingUp, PieChart } from 'lucide-react';
import Header from '../components/dashboard/Header';
import StatCard from '../components/dashboard/StatCard';
import ExpenseList from '../components/dashboard/ExpenseList';
import ExpenseChart from '../components/dashboard/ExpenseChart';
import ExpenseForm from '../components/dashboard/ExpenseForm';
import DateRangeFilter from '../components/dashboard/DateRangeFilter';
import BudgetProgress from '../components/dashboard/BudgetProgress';
import { Expense } from '../types';
import { getDateRange } from '../utils/dateUtils';
import { initialExpenses } from '../data/initialExpenses';

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [dateRange, setDateRange] = useState(getDateRange('month'));
  const [showBudget, setShowBudget] = useState(false);

  const handleAddExpense = (newExpense: Expense) => {
    setExpenses([newExpense, ...expenses]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleDateRangeChange = (range: string) => {
    setDateRange(getDateRange(range));
  };

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    return expenseDate >= startDate && expenseDate <= endDate;
  });

  const totalExpenses = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const monthlyBudget = 500000;
  const remainingBudget = monthlyBudget - totalExpenses;

  // Sample budget data
  const budgets = [
    { id: '1', category: 'Housing', limit: 100000, spent: 85000 },
    { id: '2', category: 'Transportation', limit: 50000, spent: 35000 },
    { id: '3', category: 'Food & Dining', limit: 30000, spent: 25000 },
    { id: '4', category: 'Entertainment', limit: 20000, spent: 15000 },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1600')] bg-cover bg-center opacity-5"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 relative">
        <Header onAddExpense={() => setShowExpenseForm(true)} />

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowBudget(!showBudget)}
            className="px-6 py-3 glass-card text-white rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <PieChart className="h-5 w-5" />
            {showBudget ? 'Hide Budget' : 'Show Budget'}
          </button>
        </div>

        <DateRangeFilter
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onStartDateChange={(date) => setDateRange(prev => ({ ...prev, startDate: date }))}
          onEndDateChange={(date) => setDateRange(prev => ({ ...prev, endDate: date }))}
          onRangeSelect={handleDateRangeChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Monthly Budget"
            value={`₹${monthlyBudget.toLocaleString('en-IN')}`}
            icon={DollarSign}
            gradient
          />
          <StatCard
            title="Remaining Budget"
            value={`₹${remainingBudget.toLocaleString('en-IN')}`}
            icon={TrendingUp}
          />
          <StatCard
            title="Total Expenses"
            value={`₹${totalExpenses.toLocaleString('en-IN')}`}
            icon={PieChart}
          />
        </div>

        {showBudget && (
          <div className="mb-8">
            <BudgetProgress budgets={budgets} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-400" />
              </div>
              Recent Expenses
            </h2>
            <ExpenseList expenses={filteredExpenses} onDelete={handleDeleteExpense} />
          </div>
          <div className="glass-card rounded-xl p-6">
            <ExpenseChart expenses={filteredExpenses} />
          </div>
        </div>
      </div>

      {showExpenseForm && (
        <ExpenseForm
          onClose={() => setShowExpenseForm(false)}
          onSubmit={handleAddExpense}
        />
      )}
    </div>
  );
}