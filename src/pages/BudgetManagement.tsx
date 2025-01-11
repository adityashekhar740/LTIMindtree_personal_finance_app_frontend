import React, { useEffect, useState } from 'react';
import {
  Plus,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Settings,
} from 'lucide-react';
import { Budget } from '../types';
import { categories } from '../data/categories';
import axios from 'axios';
import { useAppSelector } from '../store/store';

export default function BudgetManagement() {
  const currentUser=useAppSelector(state=>state.users.currentUser);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [formData,setFormData]=useState({
    category:'',
    limit:'',
    userRef:currentUser?._id,
  });

  const handleAddBudget = async(e) => {
    // setBudgets([...budgets, { ...budget, id: Date.now().toString() }]);
    e.preventDefault();
    try{
      const res=await axios.post('api/budget/createbudget',formData);
      setBudgets([...budgets,res.data]);
    }
    catch(e){
      console.log(e);
    }
    finally{
    setShowAddBudget(false);
    }
  };

  useEffect(()=>{
    const fetchBudgets=async()=>{
      try{
        const res=await axios.get(`/api/budget/getallbudgets/${currentUser?._id}`);
        setBudgets(res.data);
      }
      catch(e){
        console.log(e);
      }
    }
    fetchBudgets();
  },[])

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value});
  }
  const handleUpdateBudget = (updatedBudget: Budget) => {
    setBudgets(
      budgets.map((b) => (b.id === updatedBudget.id ? updatedBudget : b))
    );
    setEditingBudget(null);
  };

  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Budget Management
            </h1>
            <p className="text-gray-400 mt-1">
              Set and track your spending limits
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAddBudget(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add Budget
            </button>
          </div>
        </div>

        {
          budgets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {budgets.map((budget) => {
            var percentage = (budget.spent / budget.limit) * 100;
          if(!percentage)percentage=0;
            const isExceeding = percentage >= 100;
            const isWarning = percentage >= 80 && percentage < 100;

            return (
              <div key={budget.id} className="glass-card rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {budget.category}
                    </h3>
                    <p className="text-gray-400 text-sm">Monthly Budget</p>
                  </div>
                  <button
                    onClick={() => setEditingBudget(budget)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Settings className="h-5 w-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    {
                      (budget.spent!=undefined)?<div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Spent</span>
                      <span className="text-white">
                        ₹{budget.spent.toLocaleString('en-IN')}
                      </span>
                    </div>:null
                    }
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Limit</span>
                      <span className="text-white">
                        ₹{budget.limit.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isExceeding
                            ? 'bg-red-500'
                            : isWarning
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {(isExceeding || isWarning) && (
                    <div
                      className={`flex items-center gap-2 text-sm ${
                        isExceeding ? 'text-red-400' : 'text-yellow-400'
                      }`}
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <span>
                        {isExceeding
                          ? 'Budget exceeded!'
                          : 'Approaching budget limit'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
          ):(<h1 className='text-center text-gray-200' >
            There are no budgets created yet...
          </h1>)
        }

        {/* Add/Edit Budget Modal */}
        {(showAddBudget || editingBudget) && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="glass-card rounded-xl p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingBudget ? 'Edit Budget' : 'Add New Budget'}
              </h2>
              <form
                onSubmit={(e) => {
                  handleAddBudget(e);
                  // e.preventDefault();
                  // const formData = new FormData(e.currentTarget);
                  // const budget: Budget = {
                  //   id: editingBudget?.id || '',
                  //   category: formData.get('category') as string,
                  //   limit: Number(formData.get('limit')),
                  //   spent: editingBudget?.spent || 0,
                  // };
                  // editingBudget
                  //   ? handleUpdateBudget(budget)
                  //   : handleAddBudget(budget);
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                  onChange={(e)=>{handleChange(e)}}
                    name="category"
                    defaultValue={editingBudget?.category || ''}
                    className="w-full rounded-lg py-3 px-4 bg-gray-800 text-white border border-gray-700 focus:ring focus:ring-blue-600 focus:outline-none"
                    required
                  >
                    <option value="" className="bg-gray-800 text-gray-400">
                      Select a category
                    </option>
                    {categories.map((cat) => (
                      <option
                        key={cat.id}
                        value={cat.name}
                        className="bg-gray-800 text-gray-300 hover:bg-gray-700"
                      >
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Monthly Limit (₹)
                  </label>
                  <input
                  onChange={(e)=>{handleChange(e)}}

                    type="number"
                    name="limit"
                    defaultValue={editingBudget?.limit || ''}
                    className="w-full rounded-lg glass-input py-3 px-4"
                    required
                    min="0"
                    step="100"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddBudget(false);
                      setEditingBudget(null);
                    }}
                    className="flex-1 px-6 py-3 glass-card text-white rounded-lg hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                  >
                    {editingBudget ? 'Update' : 'Add'} Budget
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
