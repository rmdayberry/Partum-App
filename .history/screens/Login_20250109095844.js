import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
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
import Registration from "./Registration";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      Alert.alert("Success", "Login successful!");

      // Store the authToken and userId
      await AsyncStorage.setItem("authToken", data.token); // Save authToken for authenticated requests
      await AsyncStorage.setItem("userId", data.userId);
      await AsyncStorage.setItem(
        "languagePreference",
        data.languagePreference || "English"
      );

      // Set state in context
      setUserId(data.userId);
      setLanguagePreference(data.languagePreference || "English");

      // Navigate to MainTabs
      navigation.navigate("MainTabs");
      console.log("Navigation state:", navigation.getState());
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Inicio de sesión</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Email <Text style={styles.lightText}>Correo electrónico</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Password <Text style={styles.lightText}>Constraseña</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Registration")}
        style={styles.registerLink}
      >
        <Text style={styles.registerText}>Don't have an account?</Text>
        <Text style={styles.registerTextSpanish}>¿No tienes una cuenta?</Text>
        <Text style={styles.registerHereText}>Register here.</Text>
        <Text style={styles.registerHereTextSpanish}>Regístrate aquí</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: Color.nEW,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#888",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.montserrat,
    marginBottom: 5,
    color: "#333",
  },
  lightText: {
    fontSize: FontSize.size_smi,
    color: "#888",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  registerLink: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.montserrat,
    color: "#007Aff",
    textAlign: "center",
  },
  registerTextSpanish: {
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.montserrat,
    color: "#888",
    marginBottom: 8,
  },
  registerHereText: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.montserrat,
    color: "#007Aff",
    textAlign: "center",
  },
  registerHereTextSpanish: {
    fontSize: FontSize.size_smi,
    fontFamily: FontFamily.montserrat,
    color: "#888",
    textAlign: "center",
  },
});
export default Login;
