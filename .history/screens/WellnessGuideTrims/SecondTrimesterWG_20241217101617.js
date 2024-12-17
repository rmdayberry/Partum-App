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
          content: [
            {
              subtitle: "Finding a Comfortable Position",
              details:
                "Sleeping on your side, particularly your left side, is best for blood flow and reducing swelling. Use a pregnancy pillow for support under your belly, between your knees, and behind your back.",
            },
            {
              subtitle: "Frequent Bathroom Trips",
              details:
                "Your growing uterus places pressure on your bladder. Try limiting fluids an hour or two before bed, but stay hydrated during the day.",
            },
            {
              subtitle: "Leg Cramps",
              details:
                "Gentle stretching before bed and staying hydrated can help ease leg cramps.",
            },
            {
              subtitle: "Heartburn",
              details:
                "Avoid heavy meals before bed, and prop yourself up with pillows to sleep slightly elevated.",
            },
            {
              subtitle: "Vivid Dreams or Insomnia",
              details:
                "Hormones, stress, or excitement about the pregnancy can lead to vivid dreams or difficulty falling asleep.",
            },
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
          content:
            "Let us know if you experience persistent insomnia, worsening leg cramps, or severe heartburn.",
        },
      ],
    },
    Español: {
      heading: "El Sueño Durante el Segundo Trimestre",
      content:
        "El segundo trimestre a menudo se llama la 'fase de luna de miel' del embarazo. Para muchas personas, la fatiga y las náuseas del primer trimestre comienzan a disminuir, y los niveles de energía mejoran. Sin embargo, pueden surgir nuevos desafíos, especialmente en lo que respecta al sueño.",
      title1: "Desafíos Comunes del Sueño en el Segundo Trimestre:",
      content1: [
        {
          subtitle: "Encontrar una Posición Cómoda:",
          details:
            "Dormir de lado, especialmente del lado izquierdo, es lo mejor para el flujo sanguíneo. Usa una almohada de embarazo para apoyar tu vientre, rodillas y espalda.",
        },
        {
          subtitle: "Idas Frecuentes al Baño:",
          details:
            "Tu útero en crecimiento ejerce presión sobre la vejiga. Limita los líquidos una o dos horas antes de dormir, pero mantente hidratada durante el día.",
        },
        {
          subtitle: "Calambres en las Piernas:",
          details:
            "Estirar suavemente antes de acostarte y mantenerte hidratada puede ayudar a aliviar los calambres.",
        },
        {
          subtitle: "Acidez Estomacal:",
          details:
            "Evita comidas pesadas antes de dormir y usa almohadas para dormir ligeramente inclinada.",
        },
        {
          subtitle: "Sueños Vivos o Insomnio:",
          details:
            "Las hormonas, el estrés o la emoción pueden provocar sueños vívidos o dificultad para dormir.",
        },
      ],
      title2: "Consejos para Dormir Mejor en el Segundo Trimestre:",
      content2: [
        "Crea una rutina relajante antes de dormir: Lee, medita o escucha música tranquila.",
        "Invierte en un entorno cómodo: Usa almohadas para apoyo y asegúrate de que el dormitorio esté oscuro y fresco.",
        "Mantente activa durante el día: El ejercicio mejora el sueño, pero evita entrenamientos intensos cerca de la hora de dormir.",
        "Maneja el estrés: Practica respiración profunda, yoga o lleva un diario.",
      ],
      title3:
        "Comunícate con nosotros si experimentas insomnio persistente, calambres en las piernas o acidez severa.",
    },
  },
  exercise: {
    English: {
      heading: "Exercise During Your Second Trimester",
      content:
        "As you transition into your second trimester, many people notice an increase in energy compared to the first trimester. This is a great time to incorporate regular exercise into your routine. Staying active during pregnancy not only helps you feel better but also prepares your body for the physical demands of childbirth and postpartum recovery.",
      title: "Benefits of Exercise in the Second Trimester:",
      content1: [
        "Reduces aches and pains: Regular movement can alleviate common discomforts like back pain and joint stiffness.",
        "Boosts energy and mood: Exercise releases endorphins, improving both your mental and physical well-being.",
        "Prepares your body for delivery: Staying active helps maintain strength and endurance for labor and delivery.",
        "Supports healthy weight gain: Exercise can help manage weight gain during pregnancy in a healthy way.",
      ],
      title2: "Safe and Beneficial Exercises for the Second Trimester:",
      content2: [
        "Walking: A daily walk improves circulation, strengthens muscles, and connects you with nature.",
        "Swimming: Water relieves pressure on your back and joints while offering a full-body workout.",
        "Prenatal Yoga: Improves flexibility, strengthens muscles, and reduces pregnancy-related discomforts like back pain.",
        "Strength Training: Use light weights, resistance bands, or body weight to maintain muscle tone.",
        "Stationary Cycling: Provides low-impact cardio without the risk of falling.",
        "Stretching: Relieves tension and improves range of motion as your belly grows.",
      ],
      title3: "Tips for Exercising Safely in the Second Trimester:",
      content3: [
        "Listen to Your Body: Stop and rest if you feel dizzy, short of breath, or uncomfortable.",
        "Stay Hydrated: Drink plenty of water before, during, and after exercise.",
        "Wear Supportive Gear: Use supportive athletic shoes and a well-fitted sports bra.",
        "Avoid Certain Movements: Skip exercises that involve lying flat on your back, deep twists, or high-risk activities.",
        "Warm Up and Cool Down: Begin with a light warm-up and finish with gentle stretches to avoid injury.",
      ],
      title4: "When to Stop Exercising and Call Us:",
      content4: [
        "Dizziness, shortness of breath, or faintness.",
        "Vaginal bleeding or unusual discharge.",
        "Severe pain or cramping.",
        "Contractions that persist after resting.",
      ],
      bottomText:
        "Staying active during your second trimester is one of the best ways to care for yourself and your baby. Let us know if you need guidance on creating a pregnancy-safe exercise plan tailored to your needs.",
    },
    Español: {
      heading: "Ejercicio Durante el Segundo Trimestre",
      content:
        "Al entrar en el segundo trimestre, muchas personas notan un aumento de energía en comparación con el primer trimestre. Este es un excelente momento para incorporar el ejercicio regular en tu rutina. Mantenerte activa durante el embarazo no solo te ayudará a sentirte mejor, sino que también preparará tu cuerpo para las demandas físicas del parto y la recuperación posparto.",
      title1: "Beneficios del Ejercicio en el Segundo Trimestre:",
      content1: [
        "Reduce los dolores y molestias: El movimiento regular puede aliviar molestias comunes como el dolor de espalda y la rigidez en las articulaciones.",
        "Aumenta la energía y mejora el estado de ánimo: El ejercicio libera endorfinas, mejorando tu bienestar físico y mental.",
        "Prepara tu cuerpo para el parto: Mantenerte activa ayuda a conservar la fuerza y la resistencia necesarias.",
        "Apoya un aumento de peso saludable: El ejercicio ayuda a manejar el aumento de peso durante el embarazo.",
      ],
      title2: "Ejercicios Seguros y Beneficiosos para el Segundo Trimestre:",
      content2: [
        "Caminar: Mejora la circulación, fortalece los músculos y te permite disfrutar del aire libre.",
        "Natación: Alivia la presión en la espalda y las articulaciones, mientras proporciona un ejercicio completo.",
        "Yoga Prenatal: Mejora la flexibilidad, fortalece los músculos y reduce molestias como el dolor de espalda.",
        "Entrenamiento de Fuerza: Usa pesas ligeras, bandas de resistencia o tu propio peso corporal.",
        "Ciclismo Estacionario: Proporciona un cardio de bajo impacto sin riesgo de caídas.",
        "Estiramientos: Alivian la tensión y mejoran tu rango de movimiento.",
      ],
      title3:
        "Consejos para Ejercitarte de Forma Segura en el Segundo Trimestre:",
      content3: [
        "Escucha a tu Cuerpo: Si sientes mareo, falta de aire o incomodidad, detente y descansa.",
        "Mantente Hidratada: Bebe suficiente agua antes, durante y después del ejercicio.",
        "Usa Ropa y Equipo de Apoyo: Invierte en zapatillas deportivas y un sostén deportivo adecuado.",
        "Evita Ciertos Movimientos: Omite ejercicios que impliquen acostarte boca arriba o giros profundos.",
        "Calienta y Enfría: Comienza con un calentamiento ligero y termina con estiramientos suaves.",
      ],
      title4: "Cuándo Detener el Ejercicio y Llamarnos:",
      content4: [
        "Mareos, falta de aire o sensación de desmayo.",
        "Sangrado vaginal o secreción inusual.",
        "Dolor severo o calambres.",
        "Contracciones que persisten después de descansar.",
      ],
      bottomText:
        "Mantenerte activa durante el segundo trimestre es una de las mejores maneras de cuidar de ti misma y de tu bebé. Si necesitas orientación para crear un plan de ejercicios seguro, háznoslo saber.",
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
