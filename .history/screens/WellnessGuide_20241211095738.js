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
  { id: "1", title: "Sleep", icon: require("../assets/Sleep.png") },
];

const WellnessGuide = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTopicCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.icon} style={styles.icon} />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Wellness Guide</Text>
    </View>
  );
};
export default WellnessGuide;
