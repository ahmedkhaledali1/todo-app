import {
  Modal,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { styles } from '../styles';
import React, { useState } from 'react';
const ShowModal = ({ setVisible, visible }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      fetch('http://localhost:4000/addTodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo: input }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => {
          console.error('Error:', error);
        });

      setVisible(!visible);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setVisible(!visible);
      }}
    >
      <SafeAreaView style={styles.modalScreen}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={(value) => setInput(value)}
        />

        <Pressable onPress={handleSubmit} style={styles.modalButton}>
          <View>
            <Text style={styles.buttonText}>Add Todo</Text>
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
};

export default ShowModal;
