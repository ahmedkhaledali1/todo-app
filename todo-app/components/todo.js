import { View, Text } from 'react-native';
import { React } from 'react';
import { styles } from '../styles';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';

const Todo = ({ item }) => {
  const deleteTodo = (id) => {
    fetch(`http://localhost:4000/deleteTodo/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <View style={styles.todoContainer}>
      <View>
        <Text style={styles.todoTitle}>{item.title}</Text>
        <Link href={`/${item._id}`}>
          <Text style={styles.subTitle}>View comments</Text>
        </Link>
      </View>
      <View>
        <AntDesign
          onPress={() => deleteTodo(item._id)}
          name="delete"
          size={24}
          color="red"
        />
      </View>
    </View>
  );
};

export default Todo;
