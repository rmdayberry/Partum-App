import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // <-- Import SafeAreaView
import axios from "axios";
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
  const [languagePreference, setLanguagePreference] = useState("English");
  const navigation = useNavigation();

  // Animation values
  const scaleValue = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Fetch user language preference
  useEffect(() => {
    const fetchLanguagePreference = async () => {
      if (!userId) {
        console.warn("No userId found, skipping language fetch.");
        return;
      }
      try {
        const response = await axios.get(
          `https://partum-app.onrender.com/users/${userId}`
        );
        setLanguagePreference(response.data.languagePreference || "English");
      } catch (error) {
        console.error("Error fetching language preference:", error);
      }
    };
    fetchLanguagePreference();

    // Trigger fade-in animation on mount
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [userId, fadeAnim]);

  // Card press animations
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const renderTopicCard = ({ item }) => {
    const cardTitle =
      languagePreference === "Español" ? item.titleSpanish : item.titleEnglish;

    return (
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {
          if (item.navigateTo) {
            navigation.navigate(item.navigateTo);
          }
        }}
      >
        <Animated.View
          style={[styles.card, { transform: [{ scale: scaleValue }] }]}
        >
          <ImageBackground
            source={item.image}
            style={styles.cardBackground}
            imageStyle={styles.cardBackgroundImage}
          >
            <View style={styles.overlay} />
            <Text style={styles.cardTitle}>{cardTitle}</Text>
          </ImageBackground>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.headerText}>
            {translations.header[languagePreference]}
          </Text>
          <Text style={styles.subheaderText}>
            {translations.subheader[languagePreference]}
          </Text>
        </View>

        {/* Categories */}
        <FlatList
          data={topics}
          renderItem={renderTopicCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#F4F5FB",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6A5ACD",
    marginBottom: 8,
  },
  subheaderText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  flatListContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
    width: "100%",
  },
  card: {
    width: "48%",
    aspectRatio: 3 / 4,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardBackgroundImage: {
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    overflow: "hidden",
  },
});

export default WellnessGuide;
