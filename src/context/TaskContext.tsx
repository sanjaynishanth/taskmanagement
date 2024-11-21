import React, { createContext, useContext, useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly sync with the development team',
      dueDate: 'Today, 2:00 PM',
      priority: 'high',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Submit Budget Report',
      description: 'Prepare and submit Q1 budget analysis',
      dueDate: 'Tomorrow, 5:00 PM',
      priority: 'medium',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Design Review',
      description: 'Review new feature mockups with the design team',
      dueDate: 'Mar 15, 11:00 AM',
      priority: 'low',
      status: 'completed'
    }
  ]);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = {
      ...task,
      id: Math.random().toString(36).substr(2, 9)
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTaskStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}