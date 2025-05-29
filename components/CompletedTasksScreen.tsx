import React from 'react';
import { View } from 'react-native';
import CompletedTask from './CompletedTask';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type CompletedTasksScreenProps = {
  tasks: Task[];
};

const CompletedTasksScreen: React.FC<CompletedTasksScreenProps> = ({ tasks }) => {
  return (
    <View className="bg-slate-600 flex-1 p-4">
      {tasks.filter(t => t.completed).map(task => (
        <CompletedTask key={task.id} task={task.text} />
      ))}
    </View>
  );
};

export default CompletedTasksScreen;
