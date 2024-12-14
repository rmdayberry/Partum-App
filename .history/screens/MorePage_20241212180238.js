import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../App";

const translations = {
  English: {
    title: "More Options",
    logout: "Logout",
    logoutMessage: "You have been logged out.",
    error: "Error",
    errorMessage: "An error occurred while logging out.",
  },
  Español: {
    title: "Más opciones",
    logout: "Cerrar sesión",
    logoutMessage: "Has cerrado sesión.",
    error: "Error",
    errorMessage: "Ocurrió un error al cerrar sesión.",
  },
};

const MorePage = ({ navigation }) => {
  const { setUserId, languarePreference } = useContext(UserContext);
  const

  const handleLogout = async () => {
    try {
      //Clear AsyncStorage
      await AsyncStorage.removeItem("userId");
      setUserId(null); //reset user id context
      Alert.alert("Logged out", "You have been logged out.");
      navigation.replace("Login"); // Redirect to login
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "An error occurred while logging out.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>More</Text>
      <Text>This is a placeholder for the More Page screen.</Text>
    </View>
  );
};
export default MorePage;
