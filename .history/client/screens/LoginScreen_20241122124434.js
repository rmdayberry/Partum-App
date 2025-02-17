import React, { useState } from 'react';
import { View, Text, TextInput, Button, Stylesheet, Alert} from 'react-native';
import API_URL from '../config';
import e from 'express';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try{ 
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({email, password}),
      });
      const data = await response.json();

      if (response.ok){
        Alert.alert('Login Successful', 'Welcome back!');
        navigation.replace('Dashboard');
      } else{
        Alert.alert('Error', 'Something went wrong. Please try again.');
        console.error(error);
      }
    };

    return(
      <View style= {styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
        style= {styles.input}
        placeholder="Email"
        keyboardType= "email-address"
        value={email}
        onChangeText={setEmail}
        />
        <TextInput
        style= {styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
        <Button
        title="Sign Up"
        onPress={()=> navigation.navigate('Signup')} // Navigate to signup screen
        />
        </View>
    );
  };

const styles = StyleSheet.create({
  container:{flex:1, justify-content: 'center', padding: 20},
  title: {fontSize: 24, marginBottom: 20, textAlign: 'center'},
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10, 
    borderRadius: 5,
  },
});

export default LoginScreen;