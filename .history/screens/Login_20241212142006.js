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
import Registration from "./Registration";

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
        Alert.alert("Success", "Login successful!");
        // Pass userId to the Dashboard
        navigation.replace("HomeTabs", {
          screen: "Dashboard",
          params: { userId: data.userId },
        });
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Login <Text style={styles.subtitle}>Inicio de sesión</Text>
        </Text>
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
        <Text style={styles.registerText}>
          Don't have an account?{" "}
          <Text style={styles.lightText}>¿No tienes una cuenta?</Text> Register
          here. <Text style={styles.lightText}>Regístrate aquí</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Color.nEW,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
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
    alignSelf: "center",
  },
  registerText: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.montserrat,
    color: "#007Aff",
    textAlign: "center",
  },
});
export default Login;
