import { useEffect, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Plus, Calendar, Tag, Trash2, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import {useAppSelector} from '../store/store';
// Sample data
// const incomeData = [
//   { id: '1', source: 'Salary', amount: 150000, date: '2024-03-15', category: 'Primary Income' },
//   { id: '2', source: 'Freelance', amount: 45000, date: '2024-03-10', category: 'Secondary Income' },
//   { id: '3', source: 'Investments', amount: 25000, date: '2024-03-05', category: 'Passive Income' },
// ];



export default function IncomeManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [totalIncome,setTotalIncome]=useState(0);
  const [totalIncomeSources,setTotalIncomeSources]=useState(0);
  const [avgIncome,setAvgIncome]=useState(0);
  
  const currentUser=useAppSelector(state=>state.users.currentUser);
  const [formData,setFormData]=useState({
    source:'',
    amount:'',
    date:'',
    category:'',
    userRef:currentUser._id,
  });
  const [incomes, setIncomes] = useState([]);

  const [monthlyIncome,setMonthlyIncome]=useState({
    jan:0,
    feb:0,
    mar:0,
    apr:0,
    may:0,
    jun:0,
    jul:0,
    aug:0,
    sep:0,
    oct:0,
    nov:0,
    dec:0,
  });

  const [chartData,setChartData] = useState([
    { month: "Jan", amount: 0 },
    { month: "Feb", amount: 0 },
    { month: "Mar", amount: 0 },
    { month: "Apr", amount: 0 },
    { month: "May", amount: 0 },
    { month: "Jun", amount: 0 },
    { month: "Jul", amount: 0 },
    { month: "Aug", amount: 0 },
    { month: "Sep", amount: 0 },
    { month: "Oct", amount: 0 },
    { month: "Nov", amount: 0 },
    { month: "Dec", amount: 0 },
  ]);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const {data} = await axios.get(`api/income/fetchincomes`,{
          params:{
            userId:currentUser._id
          }
        });
          setIncomes(data);
       
      } catch (e) {
        console.log(e);
      }
    };
      fetchIncomes();
  },[]);
  

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value});
  }

  const handleAddIncome =async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("/api/income/addincomesource",{
        data:formData,
      });
      console.log(res.data);
      setIncomes([...incomes, res.data]);
      setShowAddForm(false);
    }
    catch(e){
      console.log(e);
    }
  };


  const handleDeleteIncome = async(e,id) => {
     e.preventDefault();
    try{
      const res = await axios.delete(`/api/income/deleteincomesource`,{
        params:{
          id:id
        }
      });
      const Temp=incomes.filter(income=>income._id!=id);
      setIncomes(Temp);
      setShowAddForm(false);
    }
    catch(e){
      console.log(e);
    }
  };

 useEffect(()=>{
   const dataUpdation = () => {
     setTotalIncome(incomes.reduce((acc, cur) => acc + cur.amount, 0));
     for (let i = 0; i < incomes.length; i++) {
       const month = incomes[i].date.split("-")[1];
       setChartData([
         ...chartData,
         (chartData[month - 1].amount = incomes[i].amount),
       ]);
     }
     setTotalIncomeSources(incomes.length);
   };
   dataUpdation();
 },[incomes]);




 useEffect(()=>{
  const updateAvg=()=>{
     const date = new Date();
   let currMonth = date.getMonth();
   let avg = 0;
   for (let i = 0; i <3; i++) {
    if(currMonth>=0){
      avg += chartData[currMonth].amount;
      currMonth--;
    }
   }
   setAvgIncome(avg/3);
  }
  updateAvg();
 },[chartData])

  return (
    <DashboardLayout
      title="Income Management"
      subtitle="Track and manage your income sources"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Total Income
          </h3>
          <p className="text-3xl font-bold text-white">{totalIncome}</p>
          <p className="text-green-400 text-sm">+15% from last month</p>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Average Monthly
          </h3>
          <p className="text-3xl font-bold text-white">{avgIncome.toFixed(2)}</p>
          <p className="text-gray-400 text-sm">Last 3 months</p>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Income Sources
          </h3>
          <p className="text-3xl font-bold text-white">{totalIncomeSources}</p>
          <p className="text-gray-400 text-sm">Active sources</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-6">Income Trend</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
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
                dataKey="amount"
                stroke="#10B981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Income Entries</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Income
        </button>
      </div>

      <div className="space-y-4">
        {incomes&&
          incomes.map((income) => (
            <div
              key={income._id}
              className="glass-card rounded-xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Tag className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{income.source}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {income.date.split('T')[0]}
                    </span>
                    <span className="flex items-center">
                      <Filter className="h-4 w-4 mr-1" />
                      {income.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-white">
                  ₹{income.amount.toLocaleString("en-IN")}
                </span>
                <button
                  onClick={(e) => handleDeleteIncome(e,income._id)}
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
              Add New Income
            </h2>
            <form onSubmit={handleAddIncome} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Source
                </label>
                <input
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  type="text"
                  name="source"
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
                  <option value="Primary Income">Primary Income</option>
                  <option value="Secondary Income">Secondary Income</option>
                  <option value="Passive Income">Passive Income</option>
                  <option value="Other">Other</option>
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
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  Add Income
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}