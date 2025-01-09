import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { DollarSign } from 'lucide-react';

export default function Login() {
  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-dark-900 via-dark-800 to-blue-900 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-xl mx-auto flex flex-col justify-center relative z-10">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            Master your money, master your life
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Track expenses, manage investments, and achieve your financial goals with our comprehensive platform.
          </p>
          
          <div className="grid grid-cols-3 gap-8">
            <div className="glass-card rounded-lg p-6">
              <h3 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">100k+</h3>
              <p className="text-gray-300">Active Users</p>
            </div>
            <div className="glass-card rounded-lg p-6">
              <h3 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">₹2.5M</h3>
              <p className="text-gray-300">Managed Assets</p>
            </div>
            <div className="glass-card rounded-lg p-6">
              <h3 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">98%</h3>
              <p className="text-gray-300">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-dark-900 relative overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 glass-card rounded-xl">
                <DollarSign className="h-8 w-8 text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                LTImindtree
              </h1>
            </div>
            <p className="text-gray-400">Personal Finance Management Platform</p>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400">Please sign in to continue</p>
            </div>

            <LoginForm />
            
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
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}