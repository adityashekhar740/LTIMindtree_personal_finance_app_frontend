import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { signInStart, signInSuccess } from '../../store/features/userSlice';
import { useAppDispatch } from '../../store/store';
import axios from 'axios';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
   const  [error, seterror] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const dispatch=useAppDispatch();

  const validatePassword = (value: string) => {
    if (value.length < 8 || value.length > 16) {
      return 'Password must be between 8 and 16 characters';
    }
    if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(value)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(value)) {
      return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*]/.test(value)) {
      return 'Password must contain at least one special character (!@#$%^&*)';
    }
    return '';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
     seterror(null);
    try{
      dispatch(signInStart());
      const res=await axios.post('/api/auth/signin',{email,password});
      dispatch(signInSuccess(res.data));
      if(res.data && !passwordError ){
              navigate('/dashboard');
      }
    }
    catch(e){
      console.log(e);
      seterror(e.response.data);
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm text-gray-300">Email Address</label>
        <div className="mt-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 block w-full rounded-lg glass-input py-3 px-4 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-300">Password</label>
        <div className="mt-1 relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={`pl-10 block w-full rounded-lg glass-input py-3 px-4 focus:ring-2 ${
              passwordError ? 'border-red-500 focus:ring-red-500/20' : 'focus:ring-blue-500/20'
            }`}
            placeholder="Enter your password"
            required
          />
        </div>
        {passwordError && (
          <p className="mt-2 text-sm text-red-400">{passwordError}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-700 rounded bg-dark-800"
          />
          <label className="ml-2 block text-sm text-gray-300">Remember me</label>
        </div>
        <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={!!passwordError}
        className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg transition-all flex items-center justify-center ${
          passwordError
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:from-blue-700 hover:to-indigo-700'
        }`}
      >
        Sign In
      </button>
    </form>
  );
}