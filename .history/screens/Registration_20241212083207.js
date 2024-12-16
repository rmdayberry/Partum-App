import React, { useState} from "react";
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

const Registration= ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [languagePreference, setLanguagePreference] = useState("English");

  const handleRegister =async ()=> {
    try{
      const response = await axios.post("http://localhost:5002/users/register", {
        name,
        email,
        password,
        dueDate,
        languagePreference,
      });

      if(response.status === 201){
        Alert.alert("Success", "User registered successfully!");
        navigation.navigate("Login"); //Redirect to Login or Dashboard
      }
    } catch (error) {
      console.error("Registration error", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Server error");
    }
  };

  return(
    <ScrollView contentContainerStyle= {}>
    </ScrollView>
  )
};

const styles = StyleSheet.create({

})