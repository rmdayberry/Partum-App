import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../App";

const MorePage = ({ navigation }) => {
  const { setUserId } = useContext(UserContext);

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
