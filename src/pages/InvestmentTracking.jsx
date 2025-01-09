import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Plus, TrendingUp, TrendingDown, AlertTriangle, DollarSign, Briefcase } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data
const portfolioData = [
  { id: '1', name: 'HDFC Bank', type: 'Stocks', value: 250000, returns: 15.5, change: 'up' },
  { id: '2', name: 'SBI Mutual Fund', type: 'Mutual Funds', value: 180000, returns: -2.3, change: 'down' },
  { id: '3', name: 'Government Bonds', type: 'Bonds', value: 150000, returns: 7.8, change: 'up' },
];

const performanceData = [
  { month: 'Jan', value: 550000 },
  { month: 'Feb', value: 580000 },
  { month: 'Mar', value: 620000 },
];

export default function InvestmentTracking() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [investments, setInvestments] = useState(portfolioData);

  const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0);
  const avgReturn = (investments.reduce((sum, inv) => sum + inv.returns, 0) / investments.length).toFixed(1);

  const handleAddInvestment = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newInvestment = {
      id: Date.now().toString(),
      name: formData.get('name'),
      type: formData.get('type'),
      value: parseFloat(formData.get('value')),
      returns: parseFloat(formData.get('returns')),
      change: parseFloat(formData.get('returns')) >= 0 ? 'up' : 'down',
    };
    setInvestments([newInvestment, ...investments]);
    setShowAddForm(false);
  };

  return (
    <DashboardLayout
      title="Investment Portfolio"
      subtitle="Track and manage your investments"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Portfolio Value</h3>
          <p className="text-3xl font-bold text-white">₹{totalValue.toLocaleString('en-IN')}</p>
          <p className="text-green-400 text-sm">+12.7% overall returns</p>
        </div>
        
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Average Return</h3>
          <p className="text-3xl font-bold text-white">{avgReturn}%</p>
          <p className="text-gray-400 text-sm">Across all investments</p>
        </div>
        
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">Active Investments</h3>
          <p className="text-3xl font-bold text-white">{investments.length}</p>
          <p className="text-gray-400 text-sm">Across {new Set(investments.map(i => i.type)).size} categories</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Portfolio Performance</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
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
              <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Investment Portfolio</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Investment
        </button>
      </div>

      <div className="space-y-4">
        {investments.map((investment) => (
          <div key={investment.id} className="glass-card rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Briefcase className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{investment.name}</h3>
                  <p className="text-gray-400">{investment.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-white">₹{investment.value.toLocaleString('en-IN')}</p>
                <p className={`flex items-center ${
                  investment.returns >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {investment.returns >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(investment.returns)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-card rounded-xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Investment</h2>
            <form onSubmit={handleAddInvestment} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Investment Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full rounded-lg glass-input py-3 px-4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                <select
                  name="type"
                  className="w-full rounded-lg glass-input py-3 px-4"
                  required
                >
                  <option value="Stocks">Stocks</option>
                  <option value="Mutual Funds">Mutual Funds</option>
                  <option value="Bonds">Bonds</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Cryptocurrency">Cryptocurrency</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Value (₹)</label>
                <input
                  type="number"
                  name="value"
                  className="w-full rounded-lg glass-input py-3 px-4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Returns (%)</label>
                <input
                  type="number"
                  name="returns"
                  step="0.1"
                  className="w-full rounded-lg glass-input py-3 px-4"
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-3 glass-card text-white rounded-lg hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  Add Investment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}