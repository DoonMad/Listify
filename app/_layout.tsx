import { Stack } from "expo-router";
import { TaskProvider } from '../context/TaskContext';
import '../global.css'

export default function RootLayout() {
  return(
    <>
    <TaskProvider>
      <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#222' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    />
    </TaskProvider>
    </>
  );
}
