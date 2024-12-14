import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../contexts/UserContext";

const MorePage = ({ navigation }) => {
  const { setUserId } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); // Clear all stored data
      setUserId(null); // Reset user context
      Alert.alert("Logout", "You have been successfully logged out.");
      navigation.navigate("Login"); // Navigate to Login screen
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "An error occurred during logout.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>More Options</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default MorePage;
