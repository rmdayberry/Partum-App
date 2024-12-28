import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";
import { UserContext } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";

// Translation dictionary
const translations = {
  header: {
    English: "Wellness Guide",
    Español: "Guía de Bienestar",
  },
  subheader: {
    English: "Explore wellness topics organized by trimester",
    Español: "Explora temas de bienestar organizados por trimestre",
  },
  searchPlaceholder: {
    English: "Search Wellness Guide",
    Español: "Buscar en la Guía de Bienestar...",
  },
};

// Topics for wellness guide cards
const topics = [
  {
    id: "1",
    titleEnglish: "1st Trimester",
    titleSpanish: "1er Trimestre",
    image: require("../assets/1stTrimester.png"),
    navigateTo: "FirstTrimesterWG",
  },
  {
    id: "2",
    titleEnglish: "2nd Trimester",
    titleSpanish: "2do Trimestre",
    image: require("../assets/2ndTrimester.png"),
    navigateTo: "SecondTrimesterWG",
  },
  {
    id: "3",
    titleEnglish: "3rd Trimester",
    titleSpanish: "3er Trimestre",
    image: require("../assets/3rdTrimester.png"),
    navigateTo: "ThirdTrimesterWG",
  },
  {
    id: "4",
    titleEnglish: "Postpartum",
    titleSpanish: "Posparto",
    image: require("../assets/Postpartum.png"),
    navigateTo: "PostpartumWG",
  },
];

const WellnessGuide = () => {
  const { userId } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [languagePreference, setLanguagePreference] = useState("English");
  const navigation = useNavigation();

  // Fetch user language preference
  useEffect(() => {
    const fetchLanguagePreference = async () => {
      if (!userId) {
        console.warn("No userId found, skipping language fetch.");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5002/users/${userId}`
        );
        setLanguagePreference(response.data.languagePreference || "English");
      } catch (error) {
        console.error("Error fetching language preference:", error);
      }
    };
    fetchLanguagePreference();
  }, [userId]);

  // Filter topics based on search query
  const filteredTopics = topics.filter((topic) =>
    topic[languagePreference === "Español" ? "titleSpanish" : "titleEnglish"]
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const renderTopicCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (item.navigateTo) {
          navigation.navigate(item.navigateTo);
        }
      }}
    >
      <ImageBackground
        source={item.image}
        style={styles.cardBackground}
        imageStyle={{ borderRadius: Border.br_sm }}
      >
        <Text style={styles.cardTitle}>
          {languagePreference === "Español"
            ? item.titleSpanish
            : item.titleEnglish}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.header}>
          {translations.header[languagePreference]}
        </Text>
        <Text style={styles.subheader}>
          {languagePreference === "Español"
            ? "Explora temas de bienestar organizados por trimestre."
            : "Explore wellness topics organized by trimester."}
        </Text>
      </View>

      {/* Categories */}
      <FlatList
        data={filteredTopics}
        renderItem={renderTopicCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.nEW,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "linear-gradient(to bottom, #e6f7ff, #ffffff)", // Gradient background
    padding: 20,
    borderRadius: Border.br_md,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: FontFamily.montserrat,
    color: Color.colorDarkslateblue_200,
    textAlign: "center",
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    fontFamily: FontFamily.arial,
    color: "#555",
    textAlign: "center",
  },
  searchBar: {
    width: "100%",
    height: 44,
    backgroundColor: "#fff",
    borderRadius: Border.br_md,
    paddingHorizontal: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  flatListContainer: {
    alignItems: "center",
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
    width: "100%",
  },
  card: {
    width: "48%",
    aspectRatio: 3 / 4, // Ensures uniform card size
    backgroundColor: "#fff",
    borderRadius: Border.br_md,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  cardBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  cardTitle: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.montserrat,
    color: "#FFF",
    textAlign: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Border.br_md,
  },
});

export default WellnessGuide;
