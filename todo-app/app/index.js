import { SafeAreaView, Text, StyleSheet, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Todo from '../components/todo';
import ShowModal from '../components/showModel';
import { styles } from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const Home = () => {
  const [visible, setVisible] = useState(false);

  //👇🏻 demo to-do lists
  const [data, setData] = useState([]);

  const [username, setUsername] = useState('');
  const router = useRouter();
  const getUsername = async () => {
    const storedUsername = await AsyncStorage.getItem('@username');
    if (storedUsername !== null) {
      setUsername(storedUsername);
    } else {
      router.push('/login');
    }
  };
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('@username');
      router.push('/login');
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };
  useEffect(() => {
    getUsername();
  }, [username]);
  useEffect(() => {
    function fetchTodos() {
      fetch('http://localhost:4000/todos')
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.error(err));
    }
    fetchTodos();
  }, [data]);
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.heading}>Todos</Text>
        {username !== '' && <Text style={styles.heading}>{username}</Text>}
        <View style={styles.leftHeader}>
          <Ionicons
            name="create-outline"
            size={30}
            color="black"
            onPress={() => setVisible(!visible)}
          />
          <FontAwesome
            onPress={() => signOut()}
            name="sign-out"
            size={30}
            color="black"
          />
        </View>
      </View>
      {data.length != 0 && (
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Todo item={item} />}
          />
        </View>
      )}
      <ShowModal setVisible={setVisible} visible={visible} />
    </SafeAreaView>
  );
};

export default Home;
