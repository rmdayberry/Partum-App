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

// Images for topics
const topicImages = {
  nutrition: require("../../assets/NutritionWG.png"),
  sleep: require("../../assets/SleepWG.png"),
  exercise: require("../../assets/ExerciseWG.png"),
};

// Translations for content
const translations = {
  nutrition: {
    English: {
      heading: "Nutrition During Your Third Trimester",
      content:
        "In the final months of pregnancy, good nutrition is more important than ever. Your baby is growing rapidly, gaining fat, and preparing for life outside the womb. Eating nutrient-dense foods can help you stay energized, manage common third-trimester discomforts, and prepare your body for labor and recovery.",
      sections: [
        {
          title: "Key Nutrients for the Third Trimester",
          bulletPoints: [
            "Protein: Helps with your baby’s rapid growth. Sources: Lean meats, beans, tofu, and nuts.",
            "Calcium: Supports strong bones and teeth. Sources: Dairy, fortified plant milk, and greens.",
            "Iron: Prevents anemia. Sources: Red meat, spinach, and lentils.",
            "Omega-3 Fatty Acids: Supports brain development. Sources: Salmon, walnuts, and chia seeds.",
            "Fiber: Prevents constipation. Sources: Whole grains, fruits, and vegetables.",
            "Hydration: Drink 8-10 glasses of water daily to aid circulation and digestion.",
          ],
        },
        {
          title: "Tips for Eating in the Third Trimester",
          bulletPoints: [
            "Eat small, frequent meals to manage heartburn.",
            "Snack smart with nuts, fruits, and whole-grain crackers.",
            "Focus on energy-boosting foods like oats, quinoa, and sweet potatoes.",
            "Prepare for labor with foods rich in fiber, iron, and healthy fats.",
          ],
        },
        {
          title: "Foods to Avoid",
          bulletPoints: [
            "High-mercury fish (e.g., shark, swordfish).",
            "Unpasteurized dairy and juices.",
            "Raw or undercooked foods like sushi and eggs.",
            "Excess caffeine (limit to 200mg/day).",
          ],
        },
      ],
      nutritionNugget: {
        title: "Consejo de Nutrición: Prepárate para el Bebé",
        content:
          "A medida que se acerca el parto, trata de llenar tu refrigerador y congelador con comidas saludables y fáciles de recalentar para la recuperación posparto. Comidas ricas en proteínas, fibra y grasas saludables te ayudarán a recuperar energía mientras cuidas de tu recién nacido.",
      },
    },
  },
  Español: {
    heading: "Nutrición Durante el Tercer Trimestre",
    content:
      "En los últimos meses del embarazo, una buena nutrición es más importante que nunca. Comer alimentos ricos en nutrientes te ayuda a prepararte para el parto y a cuidar de tu bebé.",
    sections: [
      {
        title: "Nutrientes Clave para el Tercer Trimestre",
        bulletPoints: [
          "Proteína: Ayuda al crecimiento rápido. Fuentes: Carnes magras, frijoles y nueces.",
          "Calcio: Fortalece los huesos. Fuentes: Lácteos y verduras de hoja verde.",
          "Hierro: Previene la anemia. Fuentes: Espinacas y carne roja.",
          "Omega-3: Apoya el desarrollo cerebral. Fuentes: Salmón y semillas de chía.",
          "Fibra: Previene el estreñimiento. Fuentes: Granos integrales y frutas.",
          "Hidratación: Bebe 8-10 vasos de agua al día.",
        ],
      },
      {
        title: "Consejos para Comer en el Tercer Trimestre",
        bulletPoints: [
          "Come comidas pequeñas y frecuentes para evitar la acidez.",
          "Elige snacks saludables como nueces y frutas.",
          "Enfócate en carbohidratos energéticos como avena y batatas.",
          "Prepárate para el parto con alimentos ricos en fibra y hierro.",
        ],
      },
    ],
  },
};

const ThirdTrimester = () => {
  const { userId } = useContext(UserContext);
  const [languagePreference, setLanguagePreference] = useState("English");
  const [activeTab, setActiveTab] = useState("nutrition");

  // Fetch user language preference
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
    const activeContent =
      translations[activeTab]?.[languagePreference] ||
      translations[activeTab]?.English;

    // Add a check if activeContent is undefined
    if (!activeContent) {
      return <Text style={styles.errorText}>Content not found</Text>;
    }

    const { heading, content, sections } = activeContent;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Image */}
        <Image source={topicImages[activeTab]} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>{heading}</Text>
          <Text style={styles.content}>{content}</Text>

          {sections.map((section, idx) => (
            <View key={idx} style={styles.section}>
              <Text style={styles.subheading}>{section.title}</Text>
              {section.bulletPoints.map((point, index) => (
                <Text key={index} style={styles.bulletPoint}>
                  • {point}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <ScrollView horizontal contentContainerStyle={styles.tabBar}>
        {[
          {
            key: "nutrition",
            label: languagePreference === "Español" ? "Nutrición" : "Nutrition",
          },
          {
            key: "sleep",
            label: languagePreference === "Español" ? "Sueño" : "Sleep",
          },
          {
            key: "exercise",
            label: languagePreference === "Español" ? "Ejercicio" : "Exercise",
          },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            style={[
              styles.tabButton,
              activeTab === tab.key && styles.activeTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: screenWidth, height: 200, resizeMode: "cover" },
  contentContainer: { padding: 16 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 10,
  },
  subheading: { fontSize: 18, fontWeight: "600", marginTop: 10 },
  bulletPoint: {
    fontSize: 16,
    marginVertical: 4,
    color: "#555",
    paddingLeft: 10,
  },
  content: { fontSize: 16, marginBottom: 12, color: "#555" },
  tabBar: {
    flexDirection: "row",
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
  },
  tabButton: { marginHorizontal: 10, paddingBottom: 5 },
  activeTabButton: { borderBottomWidth: 2, borderBottomColor: "#6200EE" },
  tabText: { fontSize: 16, color: "#777" },
  activeTabText: { color: "#6200EE", fontWeight: "bold" },
  section: { marginVertical: 8 },
});

export default ThirdTrimester;
