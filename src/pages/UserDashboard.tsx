import React from 'react';
import { useAuth } from '../context/AuthContext';
import UserTaskView from '../components/UserTaskView';
import { Calendar } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
          <p className="text-gray-500 mt-1">Here are your assigned tasks</p>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex-1">
          <UserTaskView />
        </div>

        <div className="w-80">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Calendar</h3>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="border rounded-lg p-4">
              <div className="grid grid-cols-7 gap-1">
                {[...Array(31)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-8 flex items-center justify-center text-sm rounded-full
                      ${i === 14 ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}