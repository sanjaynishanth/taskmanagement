import React from 'react';
import { Calendar, BarChart3, Users, Clock, CheckCircle } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Tasks', value: '24', icon: BarChart3, color: 'bg-blue-500' },
    { title: 'In Progress', value: '12', icon: Clock, color: 'bg-yellow-500' },
    { title: 'Completed', value: '8', icon: CheckCircle, color: 'bg-green-500' },
    { title: 'Team Members', value: '6', icon: Users, color: 'bg-purple-500' }
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}