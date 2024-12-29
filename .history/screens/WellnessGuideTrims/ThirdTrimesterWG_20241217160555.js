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
      nutrition: {
        English: {
          heading: "Nutrition During Your Third Trimester",
          content:
            "In the final months of pregnancy, good nutrition is more important than ever. Your baby is growing rapidly, gaining fat, and preparing for life outside the womb. Eating nutrient-dense foods can help you stay energized, manage common third-trimester discomforts, and prepare your body for labor and recovery.",
          sections: [
            {
              title: "Key Nutrients for the Third Trimester",
              bulletPoints: [
                "Protein: Helps with your baby’s rapid growth. Sources: Lean meats, fish, beans.",
                "Calcium: Supports strong bones. Sources: Dairy, leafy greens, fortified milk.",
                "Iron: Prevents anemia. Sources: Red meat, spinach, lentils, fortified cereals.",
                "Omega-3 Fatty Acids: Supports brain and eye development. Sources: Salmon, flaxseeds.",
                "Fiber: Prevents constipation. Sources: Whole grains, fruits, vegetables.",
              ],
            },
            {
              title: "Tips for Eating in the Third Trimester",
              bulletPoints: [
                "Eat small, frequent meals to prevent heartburn.",
                "Focus on energy-boosting foods like oats and sweet potatoes.",
                "Manage heartburn by avoiding spicy, greasy, or acidic foods.",
              ],
            },
          ],
          nutritionNugget: {
            title: "Nutrition Nugget: Prepping for Baby",
            content:
              "As labor approaches, try stocking your fridge and freezer with healthy, easy-to-reheat meals for postpartum recovery. Meals rich in protein, fiber, and healthy fats will help you regain energy while caring for your newborn.",
          },
        },
        Español: {
          heading: "Nutrición Durante el Tercer Trimestre",
          content:
            "En los últimos meses del embarazo, una buena nutrición es más importante que nunca. Tu bebé está creciendo rápidamente, ganando grasa y preparándose para la vida fuera del útero. Comer alimentos ricos en nutrientes puede ayudarte a mantenerte con energía, manejar las molestias comunes del tercer trimestre y preparar tu cuerpo para el parto y la recuperación.",
          sections: [
            {
              title: "Nutrientes Clave para el Tercer Trimestre",
              bulletPoints: [
                "Proteína: Ayuda al crecimiento rápido de tu bebé. Fuentes: Carnes magras, pescado, frijoles.",
                "Calcio: Fortalece los huesos. Fuentes: Lácteos, verduras de hoja verde, leche fortificada.",
                "Hierro: Previene la anemia. Fuentes: Carne roja, espinacas, lentejas, cereales fortificados.",
                "Omega-3: Apoya el desarrollo cerebral. Fuentes: Salmón, semillas de chía.",
                "Fibra: Previene el estreñimiento. Fuentes: Granos integrales, frutas y verduras.",
              ],
            },
            {
              title: "Consejos para Comer Durante el Tercer Trimestre",
              bulletPoints: [
                "Come comidas pequeñas y frecuentes para evitar la acidez.",
                "Elige alimentos energéticos como la avena y las batatas.",
                "Maneja la acidez evitando comidas picantes, grasosas o ácidas.",
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
    },
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
    const {
      heading,
      content,
      sections = [],
      nutritionNugget,
    } = translations[activeTab]?.[languagePreference] ||
      translations[activeTab]?.English || {
        sections: [],
      };

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Image */}
        <Image source={topicImages[activeTab]} style={styles.image} />

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {heading && <Text style={styles.heading}>{heading}</Text>}
          {content && <Text style={styles.content}>{content}</Text>}

          {/* Sections */}
          {sections.map((section, index) => (
            <View key={index} style={styles.section}>
              {section.title && (
                <Text style={styles.subheading}>{section.title}</Text>
              )}
              {section.subtitleBold && (
                <Text style={styles.subtitleBold}>{section.subtitleBold}</Text>
              )}
              {Array.isArray(section.bulletPoints) ? (
                section.bulletPoints.map((point, idx) => (
                  <Text key={idx} style={styles.bulletPoint}>
                    • {point}
                  </Text>
                ))
              ) : section.bulletPoints ? (
                <Text style={styles.bulletPoint}>• {section.bulletPoints}</Text>
              ) : null}
            </View>
          ))}

          {/* Nutrition Nugget */}
          {nutritionNugget && (
            <View style={styles.nuggetContainer}>
              <Text style={styles.nuggetTitle}>{nutritionNugget.title}</Text>
              <Text style={styles.nuggetContent}>
                {nutritionNugget.content}
              </Text>
            </View>
          )}
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
