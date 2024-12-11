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
      {/* Header */}
      <Text style={styles.header}>Wellness Guide</Text>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Wellness Guide..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {/* Content */}
      <FlatList
        data={filteredTopics}
        renderItem={renderTopicCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.nEW,
    padding: 16,
  },
  header: {
    fontSize: FontSize.size_xl,
    fontWeight: "bold",
    fontFamily: FontFamily.montserrat,
    color: Color.colorDarkslateblue_200,
    marginBottom: 16,
    marginTop: 100,
  },
  searchBar: {
    width: "100%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: Border.br_xs,
    paddingHorizontal: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  contentContainer: {
    paddingBottom: 20,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    width: "48%",
    height: 150,
    backgroundColor: "#fff",
    borderRadius: Border.br_xs,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.montserrat,
    textAlign: "center",
    color: Color.colorGray_700,
  },
});
export default WellnessGuide;
