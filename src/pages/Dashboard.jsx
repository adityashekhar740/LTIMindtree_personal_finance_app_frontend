import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { DollarSign, TrendingUp, PieChart, ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data - replace with real data in production
const monthlyData = [
  { month: 'Jan', income: 150000, expenses: 85000 },
  { month: 'Feb', income: 160000, expenses: 90000 },
  { month: 'Mar', income: 155000, expenses: 88000 },
];

export default function Dashboard() {
  const [showInvestments, setShowInvestments] = useState(true);
  const [showBudget, setShowBudget] = useState(true);
  const [showTransactions, setShowTransactions] = useState(true);

  const stats = {
    totalIncome: '₹4,50,000',
    totalExpenses: '₹2,63,000',
    totalSavings: '₹1,87,000',
    investmentValue: '₹8,50,000',
    investmentReturn: '+12.5%',
    budgetStatus: '75%'
  };

  return (
    <DashboardLayout 
      title="Dashboard Overview" 
      subtitle="Welcome back! Here's your financial summary"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <ArrowUp className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400">Total Income</p>
              <p className="text-2xl font-bold text-white">{stats.totalIncome}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/10 rounded-lg">
              <ArrowDown className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <p className="text-gray-400">Total Expenses</p>
              <p className="text-2xl font-bold text-white">{stats.totalExpenses}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400">Total Savings</p>
              <p className="text-2xl font-bold text-white">{stats.totalSavings}</p>
            </div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400">Investment Value</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-white">{stats.investmentValue}</p>
                <span className="text-green-400 text-sm">{stats.investmentReturn}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Income vs Expenses</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem'
                }}
              />
              <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {showInvestments && (
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Investment Summary</h3>
            {/* Add investment summary content */}
          </div>
        )}

        {showBudget && (
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Budget Overview</h3>
            {/* Add budget overview content */}
          </div>
        )}

        {showTransactions && (
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
            {/* Add recent transactions content */}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}