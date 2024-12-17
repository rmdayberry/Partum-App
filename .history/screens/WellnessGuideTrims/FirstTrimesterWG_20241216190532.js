import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

const { width: screenWidth } = Dimensions.get("window");

const topicImages = {
  sleep: require("../../assets/SleepWG.png"),
  nutrition: require("../../assets/NutritionWG.png"),
  mentalHealth: require("../../assets/MentalHealthWG.png"),
  exercise: require("../../assets/ExerciseWG.png"),
  symptoms: require("../../assets/SymptomsWG.png"),
};

const translations = {
  sleep: {
    English: {
      heading: "Sleep During Your First Trimester",
      content:
        "The early part of pregnancy can be exhausting, and that’s completely normal! Your body is working hard to grow your baby, and it’s no surprise that you might feel tired all the time. Getting enough rest is essential for both your health and your baby’s development.",
      tipsTitle: "What You Can Do:",
      tips: [
        "Aim for at least 8 hours of sleep each night.",
        "Take short naps during the day if needed.",
        "Let go of unnecessary stress and focus on essentials.",
        "Seek help if you struggle to get restful sleep.",
      ],
    },
    Español: {
      heading: "El Sueño Durante el Primer Trimestre",
      content:
        "El comienzo del embarazo puede ser realmente agotador, ¡y eso es completamente normal! Tu cuerpo está trabajando duro para formar a tu bebé, por lo que no es sorprendente que te sientas cansada todo el tiempo. Descansar lo suficiente es esencial tanto para tu salud como para el desarrollo de tu bebé.",
      tipsTitle: "Qué Puedes Hacer:",
      tips: [
        "Intenta dormir al menos 8 horas cada noche.",
        "Toma siestas cortas durante el día si las necesitas.",
        "Deja de lado el estrés innecesario y enfócate en lo esencial.",
        "Busca ayuda si tienes problemas para descansar.",
      ],
    },
  },
};

const FirstTrimester = () => {
  const { userId } = useContext(UserContext);
  const [languagePreference, setLanguagePreference] = useState("English");
  const [activeTab, setActiveTab] = useState("sleep");

  useEffect(() => {
    const fetchLanguagePreference = async () => {
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

  const renderContent = () => {
    const { heading, content, tipsTitle, tips } =
      translations[activeTab]?.[languagePreference] ||
      translations[activeTab]?.English ||
      {};

    return (
      <ScrollView contentContainerStyle={styles.scene}>
        <Image source={topicImages[activeTab]} style={styles.image} />
        <Text style={styles.tabHeading}>
          {heading || "Content Unavailable"}
        </Text>
        <Text style={styles.content}>
          {content || "No content available for this language."}
        </Text>
        <Text style={styles.subheading}>{tipsTitle || "Tips"}</Text>
        {tips
          ? tips.map((tip, index) => (
              <Text key={index} style={styles.bulletPoint}>
                • {tip}
              </Text>
            ))
          : null}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBarWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBar}
        >
          {[
            {
              key: "sleep",
              label: languagePreference === "Español" ? "Sueño" : "Sleep",
            },
            {
              key: "nutrition",
              label:
                languagePreference === "Español" ? "Nutrición" : "Nutrition",
            },
            {
              key: "mentalHealth",
              label:
                languagePreference === "Español"
                  ? "Salud Mental"
                  : "Mental Health",
            },
            {
              key: "exercise",
              label:
                languagePreference === "Español" ? "Ejercicio" : "Exercise",
            },
            {
              key: "symptoms",
              label: languagePreference === "Español" ? "Síntomas" : "Symptoms",
            },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabButton,
                activeTab === tab.key && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabBarWrapper: {
    height: 50,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 4,
  },
  tabText: {
    fontSize: 14,
    color: "#898989",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFC107",
  },
  activeText: {
    fontWeight: "bold",
    color: "#FFC107",
  },
  scene: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
  },
  tabHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#6200EE",
  },
  content: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: "center",
    color: "#333",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#6200EE",
  },
  bulletPoint: {
    fontSize: 16,
    marginVertical: 4,
    color: "#333",
    textAlign: "left",
    lineHeight: 22,
  },
  image: {
    width: screenWidth,
    height: 200,
    marginBottom: 16,
    resizeMode: "cover",
  },
});

export default FirstTrimester;
