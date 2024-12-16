import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../contexts/UserContext";

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
  const t = translations[languagePreference || "English"];

  const handleLogout = async () => {
    try {
      //Clear AsyncStorage
      await AsyncStorage.removeItem("userId");
      setUserId(null); //reset user id context
      Alert.alert(t.logout, t.logoutMessage);
      navigation.replace("Login"); // Redirect to login
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
export default MorePage;
