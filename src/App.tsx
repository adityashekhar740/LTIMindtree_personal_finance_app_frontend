import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import BudgetManagement from './pages/BudgetManagement';
import ExpenseTracker from './pages/ExpenseTracker';
import IncomeManagement from './pages/IncomeManagement';
import InvestmentTracking from './pages/InvestmentTracking';
import { useAppSelector } from './store/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function App() {
  
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/budgets" element={<BudgetManagement />} />
        <Route path="/expenses" element={<ExpenseTracker />} />
        <Route path="/income" element={<IncomeManagement />} />
        <Route path="/investments" element={<InvestmentTracking />} />
      </Routes>
    </Router>
  );
}

export default App;
