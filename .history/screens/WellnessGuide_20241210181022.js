import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const topics = [
  { id: "1", title: "Sleep", icon: require("../assets/SleepTopic.png") },
  {
    id: "2",
    title: "Nutrition",
    icon: require("../assets/Nutrition.png"),
  },
  { id: "3", title: "Fitness", icon: require("../assets/FitnessTopic.png") },
  {
    id: "4",
    title: "Mental Health",
    icon: require("../assets/MentalHealthTopic.png"),
  },
  {
    id: "5",
    title: "Symptom Management",
    icon: require("../assets/SymptomManagementTopic.png"),
  },
];

const WellnessGuide = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <Text>Wellness Guide</Text>
      <Text>This is a placeholder for the WellnessGuide screen.</Text>
    </View>
  );
};
export default WellnessGuide;
