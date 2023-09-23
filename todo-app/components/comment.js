import React, { useLayoutEffect, useState } from 'react';
import { View, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommentUI from './commentUI';
import styles from '../styles';
const Comments = ({ navigation, route }) => {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([
    {
      id: '1',
      title: 'Thank you',
      user: 'David',
    },
    {
      id: '2',
      title: 'All right',
      user: 'David',
    },
  ]);
  const [user, setUser] = useState('');

  // fetches the username from AsyncStorage
  const getUsername = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      if (username !== null) {
        setUser(username);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // runs on page load
  useLayoutEffect(() => {
    getUsername();
  }, []);

  // logs the comment details to the console
  const addComment = () => console.log({ comment, user });

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
        <FlatList
          data={commentsList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CommentUI item={item} />}
        />
      </View>
    </View>
  );
};

export default Comments;
