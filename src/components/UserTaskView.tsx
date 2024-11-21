import React from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';

export default function UserTaskView() {
  const { tasks, toggleTaskStatus } = useTaskContext();
  const { user } = useAuth();
  
  const assignedTasks = tasks.filter(task => task.status !== 'completed');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Tasks</h2>
        <div className="space-y-4">
          {assignedTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 group"
            >
              <div className="flex items-start space-x-4 flex-1">
                <div 
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`flex-shrink-0 w-5 h-5 mt-1 rounded border-2 cursor-pointer
                    ${task.status === 'completed' 
                      ? 'bg-blue-500 border-blue-500' 
                      : 'border-gray-300 group-hover:border-blue-500'} 
                    flex items-center justify-center`}
                >
                  {task.status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm font-medium ${
                    task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                  }`}>
                    {task.title}
                  </h3>
                  <p className={`text-sm mt-1 ${
                    task.status === 'completed' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {task.description}
                  </p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Due {task.dueDate}</span>
                  </div>
                </div>
              </div>
              <div className="ml-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'}`}>
                  {task.priority}
                </span>
              </div>
            </div>
          ))}

          {assignedTasks.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              No pending tasks. Great job! 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  );
}