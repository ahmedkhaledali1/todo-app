import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommentUI from '../components/commentUI';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { styles } from '../styles';
const Comments = () => {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const { id } = useLocalSearchParams();
  // console.log(id);
  // const [user, setUser] = useState('');
  // console.log(user[0]);

  const [username, setUsername] = useState('');
  const router = useRouter();
  // Get username
  const getUsername = async () => {
    const storedUsername = await AsyncStorage.getItem('@username');
    if (storedUsername !== null) {
      setUsername(storedUsername);
    } else {
      router.push('/login');
    }
  };

  useEffect(() => {
    getUsername();
  }, []);
  // logs the comment details to the console
  const addComment = () => {
    fetch('http://localhost:4000/addComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo_id: id,
        comment: comment,
        user: username,
      }),
    })
      .then((response) => response.json())
      .then((data) => setCommentsList(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  useEffect(() => {
    fetch(`http://localhost:4000/retrieveComments/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setCommentsList(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={comment}
          onChangeText={(value) => setComment(value)}
          multiline={true}
        />
        <Button title="Post Comment" onPress={addComment} />
      </View>

      <View>
        {commentsList.length > 0 ? (
          <FlatList
            data={commentsList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CommentUI item={item} />}
          />
        ) : (
          <Text
            style={{
              marginTop: '20px',
              fontSize: 24,
              fontWeight: 'bold',
              marginHorizontal: 'auto',
              opacity: 0.6,
            }}
          >
            No commments yet
          </Text>
        )}
      </View>
    </View>
  );
};

export default Comments;
