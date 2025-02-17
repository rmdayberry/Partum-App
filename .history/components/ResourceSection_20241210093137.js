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
    icon: require("../assets/wellness.png"),
    page: "WellnessGuide",
  },
  {
    id: "2",
    title: "Community Resources",
    icon: require("../assets/community.png"),
    page: "CommunityResources",
  },
  {
    id: "3",
    title: "Education",
    icon: require("../assets/education.png"),
    page: "Education",
  },
  {
    id: "4",
    title: "Settings",
    icon: require("../assets/settings.png"),
    page: "Settings",
  },
  {
    id: "5",
    title: "Symptom Checker",
    icon: require("../assets/symptom.png"),
    page: "SymptomChecker",
  },
  {
    id: "6",
    title: "Get Support",
    icon: require("../assets/support.png"),
    page: "GetSupport",
  },
];
