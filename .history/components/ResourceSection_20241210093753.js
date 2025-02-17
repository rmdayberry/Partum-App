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

const ResourceSection = () => {
  const navigation = useNavigation();

  const renderResource = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.page)}
    >
      <Image source={item.icon} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Resources</Text>
      <FlatList
        data={resources}
        renderItem={renderResource}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    