import React from 'react';
import { Clock, Edit2, Trash2, CheckCircle } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
}

export default function TaskCard({ id, title, description, dueDate, priority, status }: TaskCardProps) {
  const { toggleTaskStatus, deleteTask } = useTaskContext();

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityColors[priority]}`}>
          {priority}
        </div>
      </div>
      
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Clock className="h-4 w-4 mr-1" />
        <span>Due {dueDate}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="p-1.5 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50">
            <Edit2 className="h-4 w-4" />
          </button>
          <button 
            onClick={() => deleteTask(id)}
            className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <button 
          onClick={() => toggleTaskStatus(id)}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm
            ${status === 'completed' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          <CheckCircle className="h-4 w-4" />
          <span>{status === 'completed' ? 'Completed' : 'Mark Complete'}</span>
        </button>
      </div>
    </div>
  );
}