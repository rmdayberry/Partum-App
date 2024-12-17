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
        "The second trimester is often referred to as the 'honeymoon phase' of pregnancy. For many, the fatigue and nausea of the first trimester begin to ease, and energy levels improve. However, new challenges can arise, especially when it comes to sleep.",
      sections: [
        {
          title: "Common Sleep Challenges in the Second Trimester",
          bulletPoints: [
            "Finding a Comfortable Position: Sleeping on your side, particularly your left side, is best for blood flow and reducing swelling. Use a pregnancy pillow for support under your belly, between your knees, and behind your back.",
            "Frequent Bathroom Trips: Your growing uterus places pressure on your bladder. Try limiting fluids an hour or two before bed, but stay hydrated during the day.",
            "Leg Cramps: Gentle stretching before bed and staying hydrated can help ease leg cramps.",
            "Heartburn: Avoid heavy meals before bed, and prop yourself up with pillows to sleep slightly elevated.",
            "Vivid Dreams or Insomnia: Hormones, stress, or excitement about the pregnancy can lead to vivid dreams or difficulty falling asleep.",
          ],
        },
        {
          title: "Tips for Better Sleep in the Second Trimester",
          bulletPoints: [
            "Create a relaxing bedtime routine: Read, meditate, or listen to calming music.",
            "Invest in a comfortable sleep setup: Use pillows for support and ensure your bedroom is dark, quiet, and cool.",
            "Stay active during the day: Exercise improves sleep but avoid intense workouts before bedtime.",
            "Manage stress: Practice deep breathing, yoga, or journaling.",
          ],
        },
        {
          title: "When to Reach Out",
          bulletPoints: [
            "Persistent insomnia that affects your energy or mood during the day.",
            "Worsening leg cramps or restless legs.",
            "Severe heartburn that isn’t relieved by lifestyle changes or over-the-counter remedies.",
          ],
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
          bulletPoints: [
            "Encontrar una Posición Cómoda: Dormir de lado, especialmente del lado izquierdo, es lo mejor para el flujo sanguíneo. Usa una almohada de embarazo para apoyar tu vientre, rodillas y espalda.",
            "Idas Frecuentes al Baño: Tu útero en crecimiento ejerce presión sobre la vejiga. Limita los líquidos una o dos horas antes de dormir, pero mantente hidratada durante el día.",
            "Calambres en las Piernas: Estirar suavemente antes de acostarte y mantenerte hidratada puede ayudar a aliviar los calambres.",
            "Acidez Estomacal: Evita comidas pesadas antes de dormir y usa almohadas para dormir ligeramente inclinada.",
            "Sueños Vivos o Insomnio: Las hormonas, el estrés o la emoción pueden provocar sueños vívidos o dificultad para dormir.",
          ],
        },
        {
          title: "Consejos para Dormir Mejor en el Segundo Trimestre",
          bulletPoints: [
            "Crea una rutina relajante antes de dormir: Lee, medita o escucha música tranquila.",
            "Invierte en un entorno cómodo: Usa almohadas para apoyo y asegúrate de que tu dormitorio esté oscuro, tranquilo y fresco.",
            "Mantente activa durante el día: El ejercicio mejora la calidad del sueño, pero evita entrenamientos intensos cerca de la hora de dormir.",
            "Maneja el estrés: Practica la respiración profunda, yoga o lleva un diario.",
          ],
        },
        {
          title: "Cuándo Comunicarte con Nosotros",
          bulletPoints: [
            "Si experimentas insomnio persistente que afecta tu energía o estado de ánimo durante el día.",
            "Calambres en las piernas o piernas inquietas que empeoran.",
            "Acidez severa que no mejora con cambios en el estilo de vida o medicamentos de venta libre.",
          ],
        },
      ],
    },
  },
  

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
    const {
      heading,
      content,
      title1,
      content1,
      title2,
      content2,
      title3,
      content3,
      content4,
      title4,
      bottomText,
    } =
      translations[activeTab]?.[languagePreference] ||
      translations[activeTab]?.English ||
      {};

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Image */}
        <Image source={topicImages[activeTab]} style={styles.image} />

        <View style={styles.contentContainer}>
          {/* Main Heading */}
          {heading && <Text style={styles.heading}>{heading}</Text>}
          {content && <Text style={styles.content}>{content}</Text>}

          {/* Section 1: Common Sleep Challenges */}
          {title1 && <Text style={styles.subheading}>{title1}</Text>}
          {content1 &&
            content1.map((item, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <Text style={styles.content}>{item.details}</Text>
              </View>
            ))}

          {/* Section 2: Tips for Better Sleep */}
          {title2 && <Text style={styles.subheading}>{title2}</Text>}
          {content2 &&
            content2.map((tip, index) => (
              <Text key={index} style={styles.bulletPoint}>
                • {tip}
              </Text>
            ))}

          {/* Section 3: Final Note */}
          {title3 && <Text style={styles.subheading}>{title3}</Text>}
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
});

export default SecondTrimester;
