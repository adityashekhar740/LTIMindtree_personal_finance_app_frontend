import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import ExpenseTracker from './pages/ExpenseTracker';
import BudgetManagement from './pages/BudgetManagement';
import IncomeManagement from './pages/IncomeManagement';
import InvestmentTracking from './pages/InvestmentTracking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<ExpenseTracker />} />
        <Route path="/budgets" element={<BudgetManagement />} />
        <Route path="/income" element={<IncomeManagement />} />
        <Route path="/investments" element={<InvestmentTracking />} />
      </Routes>
    </Router>
  );
}

export default App;