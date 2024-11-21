import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import Dashboard from '../components/Dashboard';
import TaskCard from '../components/TaskCard';
import { Calendar } from 'lucide-react';
import AddTaskModal from '../components/AddTaskModal';

export default function HomePage() {
  const { tasks } = useTaskContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, John</h1>
          <p className="text-gray-500 mt-1">Here's what's happening with your tasks today.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          + Add New Task
        </button>
      </div>

      <Dashboard />

      <div className="flex gap-8">
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Tasks</h2>
            <div className="space-y-4">
              {tasks.map((task) => (
                <TaskCard key={task.id} {...task} />
              ))}
            </div>
          </div>
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

      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}