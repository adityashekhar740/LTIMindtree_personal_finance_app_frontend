import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ResetPassword() {
 const {resetToken}=useParams();
  const [pass, setPass] = useState('');
  const [CnfPass, setCnfPass] = useState('');
  const [submitted, setSubmitted] = useState(false);
   const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

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
      setPass(newPassword);
      setPasswordError(validatePassword(newPassword));
    };
  

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
   
    try{

      const res=await axios.post(`https://personal-finance-app-c2wc.onrender.com/auth/reset-password/${resetToken}`,{password:pass,confirmPassword:CnfPass});
      console.log(res.data);
      setSubmitted(true);
    }
    catch(e){
      console.log(e);
    }
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div className="mb-4 text-green-400">
          <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white">Your password has been Reset Successfully</h3>
       
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div  >
        <label className="block text-sm text-gray-300">New Password</label>
        <div className="mt-1 relative">
          <input
            type="password"
            value={pass}
            onChange={handlePasswordChange}
          className={`pl-10 block w-full rounded-lg glass-input py-3 px-4 focus:ring-2 ${
              passwordError ? 'border-red-500 focus:ring-red-500/20' : 'focus:ring-blue-500/20'
            }`}
            // className="pl-10 mt-2 block w-full rounded-lg glass-input py-3 px-4 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Enter your Password"
            required
          />
          {passwordError && (
          <p className="mt-2 text-sm text-red-400">{passwordError}</p>
        )}
        <label className="block  mt-3 text-sm text-gray-300">Confirm New Password</label>

          <input
            type="password"
            value={CnfPass}
            onChange={(e)=>{setCnfPass(e.target.value)}}
            className={`pl-10 block w-full rounded-lg glass-input py-3 px-4 focus:ring-2 ${
              passwordError ? 'border-red-500 focus:ring-red-500/20' : 'focus:ring-blue-500/20'
            }`}
            // className="pl-10 mt-2 block w-full rounded-lg glass-input py-3 px-4 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Re-type your password"
            required
          />
      
        </div>
      </div>

      <button
        type="submit"
        disabled={passwordError?true:false}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
      >
        Reset Password
      </button>
    </form>
  );
}