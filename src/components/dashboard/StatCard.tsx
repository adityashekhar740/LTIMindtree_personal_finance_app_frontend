import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  gradient?: boolean;
}

export default function StatCard({ title, value, icon: Icon, gradient = false }: StatCardProps) {
  if (gradient) {
    return (
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white/20 rounded-full">
            <Icon className="h-8 w-8" />
          </div>
          <div>
            <p className="text-blue-100">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-blue-500/10 rounded-full">
          <Icon className="h-8 w-8 text-blue-400" />
        </div>
        <div>
          <p className="text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}