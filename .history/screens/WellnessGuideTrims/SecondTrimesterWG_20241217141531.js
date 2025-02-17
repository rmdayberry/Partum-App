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
          ],
        },
        {
          subtitleBold: "Heartburn:",
          bulletPoints: [
            "Hormonal changes can relax the valve between your stomach and esophagus, leading to heartburn, especially when lying down.",
            "Avoid heavy meals before bed, and prop yourself up with pillows to sleep slightly elevated.",
          ],
        },
        {
          subtitleBold: "Vivid Dreams or Insomnia:",
          bulletPoints:
            "Hormones, stress, or excitement about the pregnancy can lead to vivid dreams or difficulty falling asleep.",
        },
        {
          title: "Tips for Better Sleep in the Second Trimester",
          subtitleBold: "Create a Relaxing Bedtime Routine:",
          bulletPoints:
            "Read, meditate, or listen to calming music before bed to help signal to your body that it’s time to wind down.",
        },
        {
          subtitleBold: "Invest in a Comfortable Sleep Setup:",
          bulletPoints:
            "Use supportive pillows, wear loose clothing, and ensure your bedroom is dark, quiet, and cool.",
        },
        {
          subtitleBold: "Stay Active During the Day:",
          bulletPoints:
            "Regular exercise can help you fall asleep faster and improve sleep quality. Just avoid intense workouts close to bedtime.",
        },
        {
          subtitleBold: "Manage Stress:",
          bulletPoints:
            "Practice deep breathing, yoga, or journaling to help reduce anxiety that may interfere with sleep.",
        },
        {
          subtitleBold: "Consult Us for Severe Sleep Issues:",
          bulletPoints:
            "If you're experiencing insomnia or other persistent sleep issues, let us know. Safe medications or additional recommendations may help.",
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
      heading: "Dormir Durante el Segundo Trimestre",
      content:
        "El segundo trimestre a menudo se conoce como la 'fase de luna de miel' del embarazo. Para muchas personas, la fatiga y las náuseas del primer trimestre comienzan a disminuir, y los niveles de energía mejoran. Sin embargo, pueden surgir nuevos desafíos, especialmente en lo que respecta al sueño. Tu vientre en crecimiento, los cambios hormonales y otros factores aún pueden dificultar un sueño reparador.",
      sections: [
        {
          title: "Desafíos Comunes del Sueño en el Segundo Trimestre",
          subtitleBold: "Encontrar una Posición Cómoda:",
          bulletPoints: [
            "A medida que tu vientre crece, dormir boca arriba se vuelve menos cómodo y no se recomienda porque puede reducir el flujo sanguíneo al bebé.",
            "Dormir de lado, especialmente sobre tu lado izquierdo, es lo mejor para el flujo sanguíneo y para reducir la hinchazón.",
            "Considera usar una almohada de embarazo para apoyo bajo tu vientre, entre las rodillas y detrás de la espalda.",
          ],
        },
        {
          subtitleBold: "Viajes Frecuentes al Baño:",
          bulletPoints: [
            "Tu útero en crecimiento ejerce presión sobre tu vejiga, lo que provoca necesidad de orinar con frecuencia, incluso durante la noche.",
            "Intenta limitar los líquidos una o dos horas antes de dormir, pero asegúrate de mantenerte hidratada durante el día.",
          ],
        },
        {
          subtitleBold: "Calambres en las Piernas:",
          bulletPoints: [
            "Estiramientos suaves antes de dormir y mantenerse hidratada pueden ayudar a aliviar los calambres en las piernas.",
          ],
        },
        {
          subtitleBold: "Acidez Estomacal:",
          bulletPoints: [
            "Los cambios hormonales pueden relajar la válvula entre el estómago y el esófago, lo que provoca acidez estomacal, especialmente al acostarse.",
            "Evita comidas pesadas antes de dormir y usa almohadas para elevar ligeramente tu posición al dormir.",
          ],
        },
        {
          subtitleBold: "Sueños Vivos o Insomnio:",
          bulletPoints:
            "Las hormonas, el estrés o la emoción sobre el embarazo pueden provocar sueños intensos o dificultad para conciliar el sueño.",
        },
        {
          title: "Consejos para Dormir Mejor en el Segundo Trimestre",
          subtitleBold: "Crea una Rutina Relajante Antes de Dormir:",
          bulletPoints:
            "Lee, medita o escucha música relajante antes de dormir para ayudar a tu cuerpo a reconocer que es hora de relajarse.",
        },
        {
          subtitleBold: "Invierte en un Entorno de Sueño Cómodo:",
          bulletPoints:
            "Usa almohadas de apoyo, ropa suelta y asegúrate de que tu habitación esté oscura, silenciosa y fresca.",
        },
        {
          subtitleBold: "Mantente Activa Durante el Día:",
          bulletPoints:
            "El ejercicio regular puede ayudarte a conciliar el sueño más rápido y mejorar la calidad del sueño. Solo evita entrenamientos intensos cerca de la hora de dormir.",
        },
        {
          subtitleBold: "Maneja el Estrés:",
          bulletPoints:
            "Practica respiraciones profundas, yoga o lleva un diario para reducir la ansiedad que pueda interferir con el sueño.",
        },
        {
          subtitleBold:
            "Consulta con Nosotros si los Problemas de Sueño son Graves:",
          bulletPoints:
            "Si experimentas insomnio u otros problemas persistentes de sueño, háznoslo saber. Los medicamentos seguros u otras recomendaciones adicionales pueden ayudar.",
        },
        {
          title: "Cuándo Buscar Ayuda",
          bulletPoints: [
            "Insomnio persistente que afecta tu energía o estado de ánimo durante el día.",
            "Empeoramiento de calambres en las piernas o piernas inquietas.",
            "Acidez estomacal severa que no mejora con cambios en el estilo de vida o remedios de venta libre.",
          ],
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
        },
        {
          subtitleBold: "Reduces aches and pains:",
          bulletPoints:
            "Regular movement alleviates back pain and joint stiffness.",
        },
        {
          subtitleBold: "Boosts energy and mood:",
          bulletPoints:
            "Exercise releases endorphins, improving your well-being.",
        },
        {
          subtitleBold: "Prepares your body for delivery:",
          bulletPoints: "Maintains strength and endurance for labor.",
        },
        {
          subtitleBold: "Supports healthy weight gain:",
          bulletPoints: "Helps manage weight gain in a balanced way.",
        },
        {
          title: "Tips for Exercising Safely in the Second Trimester",
        },
        {
          subtitleBold: "Listen to Your Body",
          bulletPoints:
            "Avoid overexerting yourself. If you feel dizzy, out of breath, or uncomfortable, stop and rest.",
        },
        {
          subtitleBold: "Stay Hydrated",
          bulletPoints:
            "Drink plenty of water before, during, and after exercise to prevent dehydration.",
        },
        {
          subtitleBold: "Avoid Certain Movements",
          bulletPoints:
            "Skip exercises that involve lying flat on your back, deep twists, or activities with a high risk of falling",
        },
        {
          subtitleBold: "Warm Up and Cool Down",
          bulletPoints:
            "Always begin with a light warm-up and end with gentle stretches to avoid injury.",
        },
        {
          title: "When to Stop Exercising and Call Us",
        },
        {
          bulletPoints: ["Dizziness, shortness of breath, or faintness.", ""],
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
