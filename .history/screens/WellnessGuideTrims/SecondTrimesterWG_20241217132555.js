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
      heading: "Sleep During Your Second Trimester",
      content:
        "The second trimester is often referred to as the 'honeymoon phase' of pregnancy. For many, the fatigue and nausea of the first trimester begin to ease, and energy levels improve. However, new challenges can arise, especially when it comes to sleep. Your growing belly, hormonal changes, and other factors can still make restful sleep a challenge.",
      sections: [
        {
          title: "Common Sleep Challenges in the Second Trimester",
          subtitleBold: "Finding a Comfortable Position:",
          bulletPoints: [
            "As your belly grows, sleeping on your back becomes less comfortable and is not recommended because it can reduce blood flow to the baby.",
            "Sleeping on your side, particularly your left side, is best for blood flow and reducing swelling.",
            "Consider using a pregnancy pillow for support under your belly, between your knees, and behind your back.",
          ],
        },
        {
          subtitleBold: "Frequent Bathroom Trips:",
          bulletPoints: [
            "Your growing uterus places pressure on your bladder, leading to frequent urination, even at night.",
            "Try limiting fluids an hour or two before bed, but make sure you stay hydrated during the day.",
          ],
        },
        {
          subtitleBold: "Leg Cramps:",
          bulletPoints: [
            "Gentle stretching before bed and staying hydrated can help ease leg cramps.",
            "Heartburn: Avoid heavy meals before bed, and prop yourself up with pillows to sleep slightly elevated.",
          ],
        },
        {
          subtitleBold: "Vivid Dreams or Insomnia:",
          bulletPoints:
            "Hormones, stress, or excitement about the pregnancy can lead to vivid dreams or difficulty falling asleep.",
        },
      ],
    },
    Español: {
      heading: "El Sueño Durante el Segundo Trimestre",
      content:
        "El segundo trimestre a menudo se llama la 'fase de luna de miel' del embarazo. Para muchas personas, la fatiga y las náuseas del primer trimestre comienzan a disminuir, y los niveles de energía mejoran. Sin embargo, pueden surgir nuevos desafíos, especialmente en lo que respecta al sueño.",
      sections: [
        {
          title: "Desafíos Comunes del Sueño en el Segundo Trimestre",
          subtitleBold: "Encontrar una Posición Cómoda:",
          bulletPoints:
            "Dormir de lado, especialmente del lado izquierdo, es lo mejor para el flujo sanguíneo. Usa una almohada de embarazo para apoyar tu vientre, rodillas y espalda.",
        },
        {
          subtitleBold: "Idas Frecuentes al Baño:",
          bulletPoints:
            "Tu útero en crecimiento ejerce presión sobre la vejiga. Limita los líquidos una o dos horas antes de dormir, pero mantente hidratada durante el día.",
        },
        {
          subtitleBold: "Calambres en las Piernas:",
          bulletPoints:
            "Estirar suavemente antes de acostarte y mantenerte hidratada puede ayudar a aliviar los calambres.",
        },
        {
          subtitleBold: "Sueños Vivos o Insomnio:",
          bulletPoints:
            "Las hormonas, el estrés o la emoción pueden provocar sueños vívidos o dificultad para dormir.",
        },
      ],
    },
  },
  exercise: {
    English: {
      heading: "Exercise During Your Second Trimester",
      content:
        "As you transition into your second trimester, many people notice an increase in energy compared to the first trimester. Staying active helps you feel better and prepares your body for childbirth and postpartum recovery.",
      sections: [
        {
          title: "Benefits of Exercise in the Second Trimester",
          bulletPoints: [
            "Reduces aches and pains: Regular movement alleviates back pain and joint stiffness.",
            "Boosts energy and mood: Exercise releases endorphins, improving your well-being.",
            "Prepares your body for delivery: Maintains strength and endurance for labor.",
            "Supports healthy weight gain: Helps manage weight gain in a balanced way.",
          ],
        },
      ],
    },
    Español: {
      heading: "Ejercicio Durante el Segundo Trimestre",
      content:
        "Al entrar en el segundo trimestre, muchas personas notan un aumento de energía. Mantenerte activa ayuda a prepararte para el parto y la recuperación posparto.",
      sections: [
        {
          title: "Beneficios del Ejercicio en el Segundo Trimestre",
          bulletPoints: [
            "Reduce los dolores y molestias: El movimiento regular alivia el dolor de espalda y la rigidez.",
            "Aumenta la energía y mejora el estado de ánimo: El ejercicio libera endorfinas.",
            "Prepara tu cuerpo para el parto: Mantiene la fuerza y resistencia necesarias.",
            "Apoya un aumento de peso saludable: Ayuda a controlar el aumento de peso.",
          ],
        },
      ],
    },
  },
  nutrition: {
    English: {
      heading: "Nutrition During Your Second Trimester",
      content:
        "The second trimester is a time of rapid growth for your baby. Eating a well-balanced diet ensures you and your baby get the nutrients you need.",
      sections: [
        {
          title: "Key Nutrients for the Second Trimester",
          bulletPoints: [
            "Iron: Prevents anemia and supports increased blood volume. Sources: Red meat, spinach, lentils.",
            "Calcium and Vitamin D: Builds strong bones and teeth. Sources: Dairy, fortified plant milk, leafy greens.",
            "Omega-3 Fatty Acids: Supports brain and eye development. Sources: Salmon, chia seeds, flaxseeds.",
          ],
        },
        {
          title: "General Nutrition Tips",
          bulletPoints: [
            "Eat small, frequent meals: Helps with digestion and reduces discomfort.",
            "Stay hydrated: Drink at least 8-10 glasses of water daily.",
            "Monitor weight gain: Maintain a healthy rate of weight gain as advised by your provider.",
          ],
        },
      ],
    },
    Español: {
      heading: "Nutrición Durante el Segundo Trimestre",
      content:
        "El segundo trimestre es un período de crecimiento rápido para tu bebé. Una dieta balanceada asegura que recibas los nutrientes necesarios.",
      sections: [
        {
          title: "Nutrientes Clave para el Segundo Trimestre",
          bulletPoints: [
            "Hierro: Previene la anemia y apoya el aumento de volumen sanguíneo. Fuentes: Carne roja, espinaca, lentejas.",
            "Calcio y Vitamina D: Fortalece los huesos y dientes. Fuentes: Lácteos, leche vegetal fortificada.",
            "Omega-3: Apoya el desarrollo del cerebro y los ojos. Fuentes: Salmón, semillas de chía, linaza.",
          ],
        },
        {
          title: "Consejos Generales de Nutrición",
          bulletPoints: [
            "Come comidas pequeñas y frecuentes: Ayuda con la digestión y reduce molestias.",
            "Mantente hidratada: Bebe al menos 8-10 vasos de agua cada día.",
            "Monitorea el aumento de peso: Asegúrate de seguir un ritmo saludable.",
          ],
        },
      ],
    },
  },
};

const SecondTrimester = () => {
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
    const { heading, content, sections } =
      translations[activeTab]?.[languagePreference] ||
      translations[activeTab]?.English ||
      {};

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Image */}
        <Image source={topicImages[activeTab]} style={styles.image} />

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {heading && <Text style={styles.heading}>{heading}</Text>}
          {content && <Text style={styles.content}>{content}</Text>}

          {/* Sections */}
          {sections?.map((section, index) => (
            <View key={index} style={styles.section}>
              <Text style={styles.subheading}>{section.title}</Text>

              {/* For bold subtitle before bullets */}
              {section.subtitleBold && (
                <Text style={styles.subtitleBold}>{section.subtitleBold}</Text>
              )}

              {/* For bullet points */}
              {Array.isArray(section.bulletPoints) ? (
                section.bulletPoints.map((point, idx) => (
                  <Text key={idx} style={styles.bulletPoint}>
                    • {point}
                  </Text>
                ))
              ) : section.bulletPoints ? (
                <Text style={styles.bulletPoint}>• {section.bulletPoints}</Text>
              ) : null}

              {/* For detailed content with subtitles */}
              {section.content &&
                section.content.map((item, idx) => (
                  <View key={idx} style={styles.detailsSection}>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                    <Text style={styles.content}>{item.details}</Text>
                  </View>
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
      <ScrollView horizontal contentContainerStyle={styles.tabBarContent}>
        {[
          {
            key: "sleep",
            label: languagePreference === "Español" ? "Sueño" : "Sleep",
          },
          {
            key: "nutrition",
            label: languagePreference === "Español" ? "Nutrición" : "Nutrition",
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

      {/* Render Content */}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: screenWidth,
    height: 200,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#6200EE",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
    color: "#555",
  },
  subtitleBold: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
    color: "#555",
  },
  bulletPoint: {
    fontSize: 16,
    marginVertical: 4,
    color: "#333",
  },
  tabBarContent: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tabButton: {
    marginHorizontal: 10,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#6200EE",
  },
  tabText: {
    fontSize: 16,
    color: "#777",
  },
  activeTabText: {
    color: "#6200EE",
    fontWeight: "bold",
  },
  section: {
    marginVertical: 8,
  },
  detailsSection: {
    marginBottom: 12,
  },
});

export default SecondTrimester;
