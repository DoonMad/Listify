import { View, Text, Pressable, Animated } from 'react-native';
import React, { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface TaskItemProps {
  task: string;
  onComplete: () => void;
  onDelete: () => void;
}

const OngoingTask = ({ task, onComplete, onDelete }: TaskItemProps) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animation = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
  })

  const handleDelete = () => {
    animation.start(() => onDelete());
  };

  const handleComplete = () => {
    animation.start(() => onComplete());
  }

  return (
    <Animated.View
      style={{ opacity: fadeAnim }}
      className="flex-row items-center justify-between bg-black p-3 mx-8 rounded-lg m-1"
    >
      {/* Checkbox */}
      <Pressable onPress={handleComplete}>
        <Ionicons name="checkbox" size={28} color="green" />
      </Pressable>

      <Text className="text-white font-bold text-lg self-start px-1">{task}</Text>

      {/* Delete button */}
      <Pressable onPress={handleDelete}>
        <Ionicons name="trash" size={28} color="red" />
      </Pressable>
    </Animated.View>
  );
};

export default OngoingTask;
