import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { UserContext } from "../contexts/UserContext";

/** 
TODO:
configure these endpoints to suit backend setup.
 *  1) PATCH /users/:userId (for updating name, dueDate,      languagePreference)
 *  2) DELETE /users/:userId (account deletion)
 *  3) POST /feedback (store user feedback)
**/

const API_BASE_URL = "http://localhost:5002";

const translations = {};
export default Settings;
