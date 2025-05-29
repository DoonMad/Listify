import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type TasksByList = {
  [listId: string]: Task[];
};

type TaskContextType = {
  tasks: TasksByList;
  addTask: (listId: string, text: string) => void;
  completeTask: (listId: string, taskId: string) => void;
  deleteTask: (listId: string, taskId: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<TasksByList>({});

  // Load tasks from storage
  useEffect(() => {
    const load = async () => {
      const json = await AsyncStorage.getItem('tasks');
      if (json) {
        setTasks(JSON.parse(json));
      }
    };
    load();
  }, []);

  // Save tasks to storage
  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (listId: string, text: string) => {
    const newTask = { id: Date.now().toString(), text, completed: false };
    setTasks(prev => ({
      ...prev,
      [listId]: [...(prev[listId] || []), newTask],
    }));
  };

  const completeTask = (listId: string, taskId: string) => {
    setTasks(prev => ({
      ...prev,
      [listId]: prev[listId].map(t => t.id === taskId ? { ...t, completed: true } : t),
    }));
  };

  const deleteTask = (listId: string, taskId: string) => {
    setTasks(prev => ({
      ...prev,
      [listId]: prev[listId].filter(t => t.id !== taskId),
    }));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, completeTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTaskContext must be used within TaskProvider");
  return context;
};
