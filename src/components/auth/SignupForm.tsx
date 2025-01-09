import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import axios from 'axios';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const res=await axios.post('/api/auth/signup',{name,email,password});
      console.log(res);
    }
    catch(e){
      console.log(e);
    }
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm text-gray-300">Full Name</label>
        <div className="mt-1 relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-10 block w-full rounded-lg glass-input py-3 px-4 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Enter your full name"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-300">Email</label>
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
            placeholder="Create a password"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
      >
        Create Account
      </button>
    </form>
  );
}