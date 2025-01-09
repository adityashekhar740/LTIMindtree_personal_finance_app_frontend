import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, LogOut, PieChart } from 'lucide-react';

interface HeaderProps {
  onAddExpense: () => void;
}

export default function Header({ onAddExpense }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          Financial Dashboard
        </h1>
        <p className="text-gray-400 mt-1">Track your expenses and manage your budget</p>
      </div>
      <div className="flex gap-4">
        <Link
          to="/budgets"
          className="px-6 py-3 glass-card text-white rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
        >
          <PieChart className="h-5 w-5" />
          Budgets
        </Link>
        <button
          onClick={onAddExpense}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Expense
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-3 glass-card text-white rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}