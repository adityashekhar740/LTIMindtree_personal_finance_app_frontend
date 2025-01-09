import React from 'react';
import { Link } from 'react-router-dom';
import ForgotPasswordForm from '../components/auth/ForgotPasswordForm';
import { DollarSign } from 'lucide-react';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center relative overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10 px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 glass-card rounded-xl">
              <DollarSign className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              LTImindtree
            </h1>
          </div>
          <p className="text-gray-400">Reset your password</p>
        </div>
        
        <div className="glass-card rounded-2xl p-8">
          <ForgotPasswordForm />
          
          <div className="mt-6 text-center">
            <Link to="/login" className="text-blue-400 hover:text-blue-300 text-sm">
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}