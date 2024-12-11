import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ImageBackground,
} from "react-native";
import axios from "axios";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const topics = [
  {
    id: "1",
    titleEnglish: "Sleep",
    titleSpanish: "Dormir",
    image: require("../assets/Sleep.png"),
  },
  {
    id: "2",
    titleEnglish: "Nutrition",
    titleSpanish: "Nutrición",
    image: require("../assets/NutritionCardFinal.png"),
  },
  {
    id: "3",
    titleEnglish: "Exercise",
    titleSpanish: "Ejercicio",
    image: require("../assets/ExerciseCard.png"),
  },
  {
    id: "4",
    titleEnglish: "Mental Health",
    titleSpanish: "Salud Mental",
    image: require("../assets/MentalHealthCard.png"),
  },
  {
    id: "5",
    titleEnglish: "Symptom Management",
    titleSpanish: "Manejo de síntomas",
    image: require("../assets/SymptomManagement.png"),
  },
];

const WellnessGuide = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [languagePreference, setLanguagePreference] = useState("English");

  // Fetch user language preference
  useEffect(() => {
    const fetchLanguagePreference = async () => {
      try {
        const userId = "6751f6871fb757c8ce3efb3d"; // Replace with dynamic user ID
        const response = await axios.get(
          `http://localhost:5002/users/${userId}`
        );
        setLanguagePreference(response.data.languagePreference || "English");
      } catch (error) {
        console.error("Error fetching language preference:", error);
      }
    };
    fetchLanguagePreference();
  }, []);

  //Filter topic based on search query
  const filteredTopics = topics.filter((topic) =>
    topic[languagePreference === "Español" ? "titleSpanish" : "titleEnglish"]
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const renderTopicCard = ({ item }) => (
    <View style={styles.card}>
      <ImageBackground
        source={item.image}
        style={styles.cardBackground}
        imageStyle={{ borderRadius: Border.br_xs }}
      >
        <Text style={styles.cardTitle}>
          {languagePreference === "Español"
            ? item.titleSpanish
            : item.titleEnglish}
        </Text>
      </ImageBackground>
    </View>
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
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: FontFamily.montserrat,
    color: Color.colorDarkslateblue_200,
    marginBottom: 16,
    marginTop: 70,
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
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  cardTitle: {
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.arial,
    color: "#F36D35",
    textAlign: "center",
  },
});
export default WellnessGuide;
