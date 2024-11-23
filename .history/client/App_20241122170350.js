import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import API_URL from "./config";

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/test`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from backend", data);
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Error connecting to backend:", error);
        setMessage("Error connecting to backend"); // show an error message if connection fails
      });
  }, []);
  return (
    <View style={styles.container}>
      {/*Display the message*/}
      <Text>{message || "Loading..."}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
