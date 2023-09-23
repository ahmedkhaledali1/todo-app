import { Stack, useRouter } from 'expo-router';
import { View, Text, SafeAreaView, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../../styles';
import { useState } from 'react';
const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username.length > 5) {
      fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username }),
      })
        .then((response) => response.json())
        .then((data) => {
          AsyncStorage.setItem('@username', data.username);
          router.push('/');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      setError('Username must be more than 5 charts');
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 10,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 15,
            textAlign: 'center',
          }}
        >
          Register
        </Text>
        <View style={{ width: '100%' }}>
          <TextInput
            placeholder="Username..."
            style={{
              borderWidth: 1,
              width: '100%',
              padding: 12,
              marginBottom: 10,
            }}
            value={username}
            onChangeText={(value) => setUsername(value)}
          />
        </View>
        <Pressable onPress={handleLogin} style={styles.loginButton}>
          <View>
            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
              SIGN UP
            </Text>
          </View>
        </Pressable>
        {error && (
          <Text style={{ color: 'red', marginTop: '5px' }}>{error}</Text>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Login;
