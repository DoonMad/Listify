import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

type ListCardProps = {
  id?: string;
  name?: string;
  items?: number;
  isSelected?: boolean;
  onLongPress?: () => void;
};

const ListCard = ({id, name, items=0, isSelected, onLongPress}: ListCardProps) => {
  return (
    <Pressable 
    className={`w-[48%] p-4 rounded-lg m-1 ${isSelected ? 'bg-blue-400' : 'bg-slate-600'}`}
    onLongPress={onLongPress}
    onPress={() => router.push({
                pathname: `/list/[listId]`,
                params: { listId: id, name: name },
              })}
    >
      <Text className='color-white text-lg font-bold'>{name || 'List ' + id}</Text>
      <Text className='color-slate-300 text-base font-bold'>{items} items</Text>
    </Pressable>
  )
}

export default ListCard