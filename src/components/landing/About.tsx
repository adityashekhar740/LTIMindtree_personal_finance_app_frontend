import React from 'react';
import { Shield, Target, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-dark-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
            About LTImindtree Finance
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We're revolutionizing personal finance management with cutting-edge technology and user-friendly solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Secure Platform</h3>
            <p className="text-gray-400">
              Bank-grade security protocols and encryption to protect your financial data
            </p>
          </div>

          <div className="glass-card rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Goals</h3>
            <p className="text-gray-400">
              Set and track financial goals with intelligent insights and recommendations
            </p>
          </div>

          <div className="glass-card rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Real-time Analytics</h3>
            <p className="text-gray-400">
              Advanced analytics and reporting to track your financial progress
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}