import { View, Text } from 'react-native';
import React from 'react';
import { styles } from '../styles';
const CommentUI = ({ item }) => {
  return (
    <View key={item.id} style={styles.comment}>
      <View style={styles.message}>
        <Text style={{ fontSize: 16 }}>{item.title}</Text>
      </View>

      <View>
        <Text>{item.user}</Text>
      </View>
    </View>
  );
};

export default CommentUI;
