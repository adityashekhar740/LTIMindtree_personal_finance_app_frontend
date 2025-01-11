import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  DollarSign, 
  PieChart, 
  Wallet, 
  TrendingUp, 
  LogOut 
} from 'lucide-react';
import { logOutStart } from '../../store/features/userSlice';
import { useAppDispatch } from "../../store/store";
import axios from 'axios';

export default function DashboardLayout({ children, title, subtitle }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async() => {
    try{
      const res=await axios.get('/api/auth/logout');
      dispatch(logOutStart());
    }
    catch(e){
      console.log(e);
    }
    navigate('/');
  };

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: DollarSign, label: 'Expenses', path: '/expenses' },
    { icon: PieChart, label: 'Budgets', path: '/budgets' },
    { icon: Wallet, label: 'Income', path: '/income' },
    { icon: TrendingUp, label: 'Investments', path: '/investments' },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 glass-card">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-400" />
            </div>
            <span className="text-xl font-bold text-white">LTImindtree</span>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="absolute bottom-8 left-6 right-6 flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-white/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8 relative">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            {title}
          </h1>
          <p className="text-gray-400 mt-1">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
}