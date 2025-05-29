import React from 'react';
import { View, TextInput, Button, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import OngoingTask from './OngoingTask';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

type OngoingTasksScreenProps = {
  tasks: Task[];
  newTask: string;
  setNewTask: (text: string) => void;
  addTask: () => void;
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
};

const OngoingTasksScreen: React.FC<OngoingTasksScreenProps> = ({
  tasks,
  newTask,
  setNewTask,
  addTask,
  completeTask,
  deleteTask,
}) => {
  const ongoingTasks = tasks.filter((t) => !t.completed);
  return (
    <KeyboardAvoidingView
      className="bg-slate-600 flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <View className="flex-1">
        <FlatList
          data={ongoingTasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 5 }}
          renderItem={({ item }) => (
            <OngoingTask
              task={item.text}
              onComplete={() => completeTask(item.id)}
              onDelete={() => deleteTask(item.id)}
            />
          )}
          ListFooterComponent={
            <View className="flex flex-row items-center justify-center mt-4">
              <TextInput
                className="bg-gray-300 rounded-lg p-3 mr-4 w-[70%]"
                placeholder="Add new task"
                value={newTask}
                onChangeText={setNewTask}
              />
              <Button title="Add" onPress={() => { if (newTask) addTask(); }} />
            </View>
          }
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default OngoingTasksScreen;
