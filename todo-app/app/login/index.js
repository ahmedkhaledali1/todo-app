import { Link, Stack, useRouter } from 'expo-router';
import { View, Text, SafeAreaView, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../../styles';
import { useState } from 'react';
const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  // console.log(error);
  const handleLogin = () => {
    try {
      fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            return setError(data.message);
          } else {
            AsyncStorage.setItem('@username', data.username);
            router.push('/');
          }
        });
    } catch (error) {
      console.log(error);
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
          Login
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
        <Link href={`/register`}>
          <Text style={styles.subTitle}>I'm new user ? </Text>
        </Link>
        <Pressable onPress={handleLogin} style={styles.loginButton}>
          <View>
            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
              SIGN IN
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
