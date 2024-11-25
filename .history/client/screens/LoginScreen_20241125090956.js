import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import API_URL from "../config";
import LoginStyles from "../styles/LoginStyles";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        Alert.alert("Login Successful", "Welcome back!");
        navigation.replace("Dashboard");
      } else {
        Alert.alert("Login Failed", data.msg || "Invalalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={LoginStyles.container}>
      <Text style={LoginStyles.title}>Login</Text>
      <TextInput
        style={LoginStyles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={LoginStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate("Signup")} // Navigate to signup screen
      />
    </View>
  );
};

export default LoginScreen;
