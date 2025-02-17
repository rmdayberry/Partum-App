import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/LoginScreen";
import Dashboard from "./screens/Dashboard";
import SignupScreen from "./screens/SignupScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();
