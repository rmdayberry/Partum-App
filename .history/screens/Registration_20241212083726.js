import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";

const Registration = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [languagePreference, setLanguagePreference] = useState("English");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5002/users/register",
        {
          name,
          email,
          password,
          dueDate,
          languagePreference,
        }
      );

      if (response.status === 201) {
        Alert.alert("Success", "User registered successfully!");
        navigation.navigate("Login"); //Redirect to Login or Dashboard
      }
    } catch (error) {
      console.error(
        "Registration error",
        error.response?.data || error.message
      );
      Alert.alert("Error", error.response?.data?.message || "Server error");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}> Register</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {/* Due Date Input */}
      <TextInput
        style={styles.input}
        placeholder="Due Date (YYYY-MM-DD"
        value={name}
        onChangeText={setName}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
