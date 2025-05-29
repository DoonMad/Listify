import React, { useState } from 'react';
import { View, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import OngoingTasksScreen from '../components/OngoingTasksScreen';
import CompletedTasksScreen from '../components/CompletedTasksScreen';
import { Stack } from 'expo-router';

const Tab = createMaterialTopTabNavigator();

const List = () => {
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Buy Milk', completed: false },
    { id: '2', text: 'Read book', completed: true },
  ]);
  const [newTask, setNewTask] = useState('');

  const completeTask = (id: string) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: true } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks(prev => [...prev, { id: Date.now().toString(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'List Name'
        }}
      />
      <View style={{ flex: 1 }}>
        <Tab.Navigator
        screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#aaa',
        tabBarStyle: { backgroundColor: '#333' },
        tabBarIndicatorStyle: { backgroundColor: 'lightgreen' },
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 14 },
        tabBarPressColor: '#555',  // ripple effect on press (Android)
      }}
        >
          <Tab.Screen name="Ongoing">
            {() => (
              <OngoingTasksScreen
                tasks={tasks}
                newTask={newTask}
                setNewTask={setNewTask}
                addTask={addTask}
                completeTask={completeTask}
                deleteTask={deleteTask}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Completed">
            {() => <CompletedTasksScreen tasks={tasks} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </>
  );
};

export default List;
