import React, { useState } from 'react';
import { View, Text, TextInput, Button, Stylesheet, Alert} from 'react-native';
import API_URL from '../config';

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
      }
    }
  }
}