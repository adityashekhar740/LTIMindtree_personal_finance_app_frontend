import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import { DollarSign } from 'lucide-react';

export default function Signup() {
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
          <p className="text-gray-400">Create your account</p>
        </div>
        
        <div className="glass-card rounded-2xl p-8">
          <SignupForm />
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-900 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-2 glass-card rounded-lg hover:bg-white/10 transition-colors">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                <span className="text-gray-300">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 glass-card rounded-lg hover:bg-white/10 transition-colors">
                <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
                <span className="text-gray-300">Facebook</span>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}