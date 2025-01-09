import React from 'react';
import { Wallet, PieChart, LineChart, Bell, Shield, Smartphone } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Wallet className="h-6 w-6" />,
      title: 'Expense Tracking',
      description: 'Track all your expenses in one place with automatic categorization',
    },
    {
      icon: <PieChart className="h-6 w-6" />,
      title: 'Budget Management',
      description: 'Create and manage budgets with visual insights and alerts',
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: 'Investment Tracking',
      description: 'Monitor your investments and portfolio performance in real-time',
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: 'Smart Alerts',
      description: 'Get notified about important financial events and bill payments',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Banking',
      description: 'Bank-grade security with encrypted connections and data protection',
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: 'Mobile Access',
      description: 'Access your finances anywhere with our mobile-friendly platform',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Everything you need to take control of your finances in one place
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-card rounded-xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 text-blue-400">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}