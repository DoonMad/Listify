import { View, Text, Pressable, Animated } from 'react-native';
import React, { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface TaskItemProps {
  task: string;
}

const CompletedTask = ({task}: TaskItemProps) => {

  return (
    <View
      className="flex-row items-center justify-between bg-black p-3 mx-8 rounded-lg m-1"
    >
      <Text className="text-green-600 font-bold text-lg self-start px-1 m-auto">{task}</Text>
    </View>
  );
};

export default CompletedTask;
