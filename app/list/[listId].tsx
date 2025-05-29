import React, { useState } from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Stack, useLocalSearchParams } from 'expo-router';
import OngoingTasksScreen from '../../components/OngoingTasksScreen';
import CompletedTasksScreen from '../../components/CompletedTasksScreen';
import { useTaskContext } from '../../context/TaskContext';

const Tab = createMaterialTopTabNavigator();

export default function ListDetailsScreen() {
  const { listId, name } = useLocalSearchParams<{ listId: string, name: string }>();
  const { tasks, addTask, completeTask, deleteTask } = useTaskContext();

  const [newTask, setNewTask] = useState('');

  const listTasks = tasks[listId] || [];

  return (
    <>
      <Stack.Screen
        options={{
          title: `${name}`,
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
            tabBarPressColor: '#555',
          }}
        >
          <Tab.Screen name="Ongoing">
            {() => (
              <OngoingTasksScreen
                tasks={listTasks}
                newTask={newTask}
                setNewTask={setNewTask}
                addTask={() => {
                  addTask(listId, newTask);
                  setNewTask('');
                }}
                completeTask={(id) => completeTask(listId, id)}
                deleteTask={(id) => deleteTask(listId, id)}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Completed">
            {() => <CompletedTasksScreen tasks={listTasks} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </>
  );
}
