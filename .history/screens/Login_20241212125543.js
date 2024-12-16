import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5002/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert("Success", "Login Successful!");
        // Save user ID or token locally - AsyncStorage, Context API
        //Navigate to Dashboard
        navigation.replace("Dashboard", { userId: data.userId });
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      Alert.alert("Error", "Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return(
    <ScrollView contentContainerStyle= {StyleSheet.container}>
      <Text style={styles.title}>Login </Text>
      <TextInput
      style={styles.input}
      placeholder=""
    </ScrollView>
  )
};

const styles= StyleSheet.create({

});
export default Login;