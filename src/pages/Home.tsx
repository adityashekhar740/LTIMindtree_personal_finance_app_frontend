import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import About from '../components/landing/About';
import Features from '../components/landing/Features';
import Contact from '../components/landing/Contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-600/20 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="p-3 glass-card rounded-xl">
                <DollarSign className="h-12 w-12 text-blue-400" />
              </div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                LTImindtree
              </h1>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Master Your Money,<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                Master Your Life
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Take control of your finances with our comprehensive platform. Track expenses,
              manage investments, and achieve your financial goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-lg font-semibold"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 glass-card text-white rounded-lg hover:bg-white/10 transition-all text-lg font-semibold"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      <About />
      <Features />
      <Contact />
    </div>
  );
}