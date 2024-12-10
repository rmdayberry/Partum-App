import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const resources = [
  {
    id: "1",
    title: "Wellness Guide",
    icon: require("../assets/Wellness.png"),
    page: "WellnessGuide",
  },
  {
    id: "2",
    title: "Community Resources",
    icon: require("../assets/CommunityResources.png"),
    page: "CommunityResources",
  },
  {
    id: "3",
    title: "Education",
    icon: require("../assets/EducationIcon.png"),
    page: "Education",
  },
  {
    id: "4",
    title: "Settings",
    icon: require("../assets/Settings.png"),
    page: "Settings",
  },
  {
    id: "5",
    title: "Symptom Checker",
    icon: require("../assets/SymptomChecker.png"),
    page: "SymptomChecker",
  },
  {
    id: "6",
    title: "Get Support",
    icon: require("../assets/GetSupport.png"),
    page: "GetSupport",
  },
];
