import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import { FontSize, FontFamily, Color } from "../GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setUserId, setLanguagePreference } = useContext(UserContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setLoading(true);
    console.log("Attempting to log in...");

    try {
      console.log("Sending login requests to API...");

      const response = await fetch(
        "https://partum-app.onrender.com/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      console.log("Response Received:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Login Response Data:", data);

        // Store tokens securely
        if (data.authToken) {
          console.log("Storing Auth Token:", data.authToken);
          await AsyncStorage.setItem("authToken", data.authToken);
        }
        if (data.refreshToken) {
          console.log("Storing Refresh Token:", data.refreshToken);
          await AsyncStorage.setItem("refreshToken", data.refreshToken);
        }
        if (data.userId) {
          console.log("Storing User ID:", data.userId);
          await AsyncStorage.setItem("userId", data.userId);
        }
        if (data.languagePreference) {
          console.log("Storing Language Preference:", data.languagePreference);
          await AsyncStorage.setItem(
            "languagePreference",
            data.languagePreference
          );
        }

        // Update context
        setUserId(data.userId);
        setLanguagePreference(data.languagePreference || "English");

        Alert.alert("Success", "Login successful!");
        navigation.navigate("BottomTabs");
      } else {
        const errorData = await response.json();
        console.error("Login Error Response:", errorData);
        Alert.alert("Error", errorData.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      Alert.alert("Error", "Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Inicio de sesión</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Email <Text style={styles.lightText}>(Correo electrónico)</Text>
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
          Password <Text style={styles.lightText}>(Contraseña)</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Custom Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, loading && { opacity: 0.6 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

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
    backgroundColor: "#F9FAFF",
    justifyContent: "center",
    padding: 20,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    marginBottom: 5,
  },
  lightText: {
    fontSize: 14,
    color: "#888",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#6A5ACD",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerLink: {
    alignItems: "center",
  },
  registerText: {
    fontSize: 16,
    color: "#007Aff",
    marginBottom: 3,
  },
  registerTextSpanish: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  registerHereText: {
    fontSize: 16,
    color: "#007Aff",
    marginBottom: 3,
  },
  registerHereTextSpanish: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
});

export default Login;
