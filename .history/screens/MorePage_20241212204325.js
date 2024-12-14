import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const { setUserId, languagePreference } = useContext(UserContext);

  const t = translations[languagePreference || "English"];

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("languagePreference");
      setUserId(null); // Reset user context
      Alert.alert(t.logout, t.logoutMessage);
      navigation.replace("Login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert(t.error, t.errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t.title}</Text>
      <Button title={t.logout} onPress={handleLogout} />
    </View>
  );
};
export default MorePage;
