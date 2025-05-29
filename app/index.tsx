  import { FlatList, Modal, Pressable, Text, TextInput, View } from "react-native";
  import ListCard from '../components/ListCard';
  import { useState, useEffect } from "react";
  import { Ionicons } from '@expo/vector-icons';
  import { Stack } from "expo-router";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  

  const LISTS_STORAGE_KEY = '@my_task_lists';


  const saveListsToStorage = async (listsToSave: any[]) => {
  try {
    const jsonValue = JSON.stringify(listsToSave);
    await AsyncStorage.setItem(LISTS_STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving lists', e);
  }
};

  export default function Index() {

    const [lists, setLists] = useState([{ id: '1', name: 'Groceries', items: 3 }, { id: '2', name: 'Work', items: 5 }]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newListName, setNewListName] = useState('');
    const [selectedListIds, setSelectedListIds] = useState<string[]>([]);

    const loadListsFromStorage = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(LISTS_STORAGE_KEY);
        if (jsonValue != null) {
          setLists(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Error loading lists', e);
      }
    };

    useEffect(() => {
      loadListsFromStorage();
    }, []);


    useEffect(() => {
      saveListsToStorage(lists);
    }, [lists]);


    // Toggle selection on long press
    function toggleSelectList(id: string) {
      setSelectedListIds(prev =>
        prev.includes(id) ? prev.filter(lid => lid !== id) : [...prev, id]
      );
    }

    function deleteSelectedLists() {
      setLists(prev => prev.filter(list => !selectedListIds.includes(list.id)));
      setSelectedListIds([]);
    }

    function addLists(name=`List ${lists.length + 1}`, items=0) {
      const newList = {
        id: Date.now().toString(),
        name: name,
        items: items
      };
      setLists([...lists, newList]);
    }  
    return (
      <>
        <Stack.Screen
          options={{
            title: 'My Lists'
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          className="bg-black"
        >
          <Modal
            transparent={true}
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View className="flex-1 justify-center items-center bg-black/50">
              <View className="bg-white p-4 rounded-lg w-80">
                <Text className="text-xl font-bold mb-2">Enter List Name</Text>
                <TextInput
                  value={newListName}
                  onChangeText={setNewListName}
                  placeholder="List name"
                  className="border border-gray-300 px-3 py-2 rounded mb-4"
                />
                <View className="flex-row justify-end gap-4">
                  <Pressable onPress={() => setModalVisible(false)}>
                    <Text className="text-red-600 text-lg font-bold">Cancel</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      addLists(newListName || `List ${lists.length + 1}`);
                      setNewListName('');
                      setModalVisible(false);
                    }}
                  >
                    <Text className="text-green-600 text-lg font-bold">Add</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <View className="p-4">
            <FlatList
            data={lists}
            keyExtractor={(list) => list.id}
            renderItem={({item}) => (
              <ListCard
              key={item.id}
              id={item.id}
              name={item.name}
              items={item.items}
              isSelected={selectedListIds.includes(item.id)}
              onLongPress={() => toggleSelectList(item.id)}/>
            )
            } 
            numColumns={2}/>
          </View>
          <Pressable
          onPress={() => setModalVisible(true)}
          className="bg-green-600 absolute bottom-12 right-12 w-fit max-h-20 rounded-full">
            <Ionicons name="add-circle" size={60} color="#334155" />
          </Pressable>

          {selectedListIds.length > 0 && (
          <Pressable
            onPress={deleteSelectedLists}
            className="bg-red-600 absolute bottom-12 left-12 w-fit max-h-20 rounded-full"
          >
            <Ionicons name="trash" size={60} color="#334155" />
          </Pressable>
        )}
        </View>
      </>
    );
  }
