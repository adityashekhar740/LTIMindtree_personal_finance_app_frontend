import { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Plus, TrendingUp, TrendingDown, AlertTriangle, DollarSign, Briefcase } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useAppSelector } from '../store/store';

// Sample data


const performanceData = [
  { month: 'Jan', value: 550000 },
  { month: 'Feb', value: 580000 },
  { month: 'Mar', value: 620000 },
];

export default function InvestmentTracking() {
  const currentUser=useAppSelector(state=>state.users.currentUser);
  const [showAddForm, setShowAddForm] = useState(false);
  const [investments, setInvestments] = useState([]);
  
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    value: 0,
    returns: 0.0,
    UserId: currentUser?._id,
  });

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0);
  const avgReturn = (investments.reduce((sum, inv) => sum + inv.returns.$numberDecimal, 0) / investments.length).toFixed(1);

  useEffect(()=>{
    const fetchInvestments=async()=>{
      try{
        const res=await axios.get(`/api/investment/getallinvestments/${currentUser._id}`);
        console.log(res.data);
        setInvestments(res.data);
      }
      catch(e){
        console.log(e);
      }
    }
    fetchInvestments();
  },[])

  const handleAddInvestment = async(e) => {
    e.preventDefault();
    
    try{
      const res=await axios.post('/api/investment/addinvestment/',formData);
    console.log(res.data);
    }
    catch(e){
      console.log(e);
    }
    setInvestments([res.data, ...investments]);
    setShowAddForm(false);
  };

  return (
    <DashboardLayout
      title="Investment Portfolio"
      subtitle="Track and manage your investments"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Portfolio Value
          </h3>
          <p className="text-3xl font-bold text-white">
            ₹{totalValue.toLocaleString("en-IN")}
          </p>
          <p className="text-green-400 text-sm">+12.7% overall returns</p>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Average Return
          </h3>
          <p className="text-3xl font-bold text-white">{avgReturn}%</p>
          <p className="text-gray-400 text-sm">Across all investments</p>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Active Investments
          </h3>
          <p className="text-3xl font-bold text-white">{investments.length}</p>
          <p className="text-gray-400 text-sm">
            Across {new Set(investments.map((i) => i.type)).size} categories
          </p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">
          Portfolio Performance
        </h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "0.5rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          Investment Portfolio
        </h2>
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
                  <h3 className="text-lg font-semibold text-white">
                    {investment.name}
                  </h3>
                  <p className="text-gray-400">{investment.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-white">
                  ₹{investment.value.toLocaleString("en-IN")}
                </p>
                <p
                  className={`flex items-center ${
                    investment.returns.$numberDecimal >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {investment.returns.$numberDecimal >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(parseFloat(investment.returns.$numberDecimal))}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-card rounded-xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6">
              Add New Investment
            </h2>
            <form onSubmit={handleAddInvestment} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Investment Name
                </label>
                <input
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type="text"
                  name="name"
                  className="w-full rounded-lg glass-input py-3 px-4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Type
                </label>
                <select
                  onChange={(e) => {
                    handleChange(e);
                  }}
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
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Value (₹)
                </label>
                <input
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type="number"
                  name="value"
                  className="w-full rounded-lg glass-input py-3 px-4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Returns (%)
                </label>
                <input
                  onChange={(e) => {
                    handleChange(e);
                  }}
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