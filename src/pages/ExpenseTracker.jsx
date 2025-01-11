import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import {
  Plus,
  Calendar,
  Tag,
  Trash2,
  Filter,
  ChevronDown,
  UserPlus,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import axios from "axios";
import { useAppSelector } from "../store/store";

// Sample data
const expenseData = [
  {
    id: "1",
    description: "Groceries",
    amount: 8500,
    date: "2024-03-15",
    category: "Food & Dining",
  },
  {
    id: "2",
    description: "Electricity Bill",
    amount: 3500,
    date: "2024-03-10",
    category: "Utilities",
  },
  {
    id: "3",
    description: "Movie Night",
    amount: 2000,
    date: "2024-03-05",
    category: "Entertainment",
  },
];

const categories = [
  "Food & Dining",
  "Transportation",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Others",
];

const COLORS = [
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#6B7280",
];

export default function ExpenseTracker() {
  const currentUser = useAppSelector((state) => state.users.currentUser);
  const [showAddForm, setShowAddForm] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [topCategory, setTopCategory] = useState("-");
  const [topCatPer, setTopPer] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    amount: 0,
    date: "",
    description: "",
    userRef: currentUser._id,
  });

  useEffect(() => {
    function updateInfo() {
      setTotalExpenses(expenses.reduce((sum, exp) => sum + exp.amount, 0));
      let topCat = "";
      let amt = 0;
      for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].amount > amt) {
          topCat = expenses[i].category;
          amt = expenses[i].amount;
        }
      }
      if(totalExpenses){
        let calc = (amt / totalExpenses) * 100;
        calc = calc.toFixed(0);
        console.log(calc);
        setTopPer(calc);
      }
      setTopCategory(topCat);
    }
    updateInfo();
  }, [expenses]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get("/api/expenses/getallexpenses", {
          params: {
            userId: currentUser._id,
          },
        });
        setExpenses(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchExpenses();
  }, []);

  const chartData = categories
    .map((category) => ({
      name: category,
      value: expenses
        .filter((exp) => exp.category === category)
        .reduce((sum, exp) => sum + exp.amount, 0),
    }))
    .filter((item) => item.value > 0);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const newExpense = {
    //   id: Date.now().toString(),
    //   description: formData.get('description'),
    //   amount: parseFloat(formData.get('amount')),
    //   date: formData.get('date'),
    //   category: formData.get('category'),
    // };
    // setExpenses([newExpense, ...expenses]);
    try {
      const res = await axios.post("/api/expenses/addexpense", formData);
      console.log(res.data);
      setExpenses([...expenses, res.data]);
    } catch (e) {
      console.log(e);
    } finally {
      setShowAddForm(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDeleteExpense = async (id) => {
    // setExpenses(expenses.filter((expense) => expense.id !== id));
    try {
      const res = await axios.delete(`/api/expenses/deleteexpense/${id}`);
      const TempExp = expenses.filter((exp) => exp._id != id);
      setExpenses(TempExp);
    } catch (e) {
      console.log(e);
    }
  };

  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  return (
    <DashboardLayout
      title="Expense Tracker"
      subtitle="Track and manage your expenses"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Total Expenses
          </h3>
          <p className="text-3xl font-bold text-white">
            ₹{totalExpenses && totalExpenses.toLocaleString("en-IN")}
          </p>
          <p className="text-red-400 text-sm">+8% from last month</p>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Average Daily
          </h3>
          <p className="text-3xl font-bold text-white">
            ₹{(totalExpenses / 30).toFixed(0)}
          </p>
          <p className="text-gray-400 text-sm">Last 30 days</p>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Top Category
          </h3>
          <p className="text-3xl font-bold text-white">{topCategory}</p>
          {topCatPer && (
            <p className="text-gray-400 text-sm">
              {topCatPer}% of total expenses
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Expense Distribution
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Category Breakdown
          </h2>
          <div className="space-y-4">
            {categories.map((category, index) => {
              const amount = expenses
                .filter((exp) => exp.category === category)
                .reduce((sum, exp) => sum + exp.amount, 0);
              const percentage = ((amount / totalExpenses) * 100).toFixed(1);

              if (amount === 0) return null;

              return (
                <div
                  key={category}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    ></div>
                    <span className="text-gray-300">{category}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">
                      ₹{amount.toLocaleString("en-IN")}
                    </p>
                    <p className="text-sm text-gray-400">{percentage}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-white">Expense List</h2>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg glass-input py-2 px-4"
          >
            <option value="All">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Expense
        </button>
      </div>

      <div className="space-y-4">
        {filteredExpenses.map((expense) => (
          <div
            key={expense.id}
            className="glass-card rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Tag className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="font-medium text-white">{expense.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {expense.date}
                  </span>
                  <span className="flex items-center">
                    <Filter className="h-4 w-4 mr-1" />
                    {expense.category}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-white">
                ₹{expense.amount.toLocaleString("en-IN")}
              </span>
              <button
                onClick={() => handleDeleteExpense(expense._id)}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-card rounded-xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6">
              Add New Expense
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <input
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type="text"
                  name="description"
                  className="w-full rounded-lg glass-input py-3 px-4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount (₹)
                </label>
                <input
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type="number"
                  name="amount"
                  className="w-full rounded-lg glass-input py-3 px-4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Date
                </label>
                <input
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type="date"
                  name="date"
                  className="w-full rounded-lg glass-input py-3 px-4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="category"
                  className="w-full rounded-lg glass-input py-3 px-4"
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
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
                  onClick={(e) => {
                    handleAddExpense(e);
                  }}
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
