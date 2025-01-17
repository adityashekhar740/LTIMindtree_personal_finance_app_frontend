import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { useAppDispatch } from '../../store/store';
import { signInFailure, signInStart, signInSuccess } from '../../store/features/userSlice';

export default function LoginForm() {
  const dispatch=useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const  [error, seterror] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    seterror(null);
    try{
      dispatch(signInStart());
      const res=await axios.post('/api/auth/signin',{email,password});
      dispatch(signInSuccess(res.data));
      if(res.data){
              navigate('/dashboard');

      }
    }
    catch(e){
      console.log(e);
      seterror(e.response.data);
    }
  
    }

  

  return (
    <form  className="space-y-6">
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
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 block w-full rounded-lg glass-input py-3 px-4 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Enter your password"
            required
          />
        </div>
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
     {error && <p className='text-center text-[red]' >{error}</p>}
      <button
        type="submit"
        onClick={(e)=>{handleSubmit(e)}}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center"
      >
        Sign In
      </button>
    </form>
  );
}