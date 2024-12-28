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
      {/* Header and Search Bar */}
      <View style={styles.contentWrapper}>
        <Text style={styles.header}>
          {translations.header[languagePreference]}
        </Text>
        <Text style={styles.subheader}>
          {translations.subheader[languagePreference]}
        </Text>

        <TextInput
          style={styles.searchBar}
          placeholder={translations.searchPlaceholder[languagePreference]}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {/* Categories List */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.nEW,
    padding: 16,
  },
  contentWrapper: {
    marginTop: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 30,
    fontFamily: "helvetica",
    fontWeight: "bold",
    color: Color.colorDarkslateblue_200,
    marginBottom: 8,
    textAlign: "center",
  },
  subheader: {
    
  }
  searchBar: {
    width: "90%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: Border.br_xs,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
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
    height: 180,
    backgroundColor: "#fff",
    borderRadius: Border.br_sm,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
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
    borderRadius: Border.br_sm,
  },
});

export default WellnessGuide;
