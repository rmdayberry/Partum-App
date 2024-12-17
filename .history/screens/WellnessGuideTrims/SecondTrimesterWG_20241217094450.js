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
      title: "Common Sleep Challenges in the Second Trimester:",
      content: [
        {
          subtitle: "Finding a Comfortable Position:",
          details:
            "Sleeping on your side, particularly your left side, is best for blood flow and reducing swelling. Use a pregnancy pillow for support under your belly, between your knees, and behind your back.",
        },
        {
          subtitle: "Frequent Bathroom Trips:",
          details:
            "Your growing uterus places pressure on your bladder. Try limiting fluids an hour or two before bed, but stay hydrated during the day.",
        },
        {
          subtitle: "Leg Cramps:",
          details:
            "Gentle stretching before bed and staying hydrated can help ease leg cramps.",
        },
        {
          subtitle: "Heartburn:",
          details:
            "Avoid heavy meals before bed, and prop yourself up with pillows to sleep slightly elevated.",
        },
        {
          subtitle: "Vivid Dreams or Insomnia:",
          details:
            "Hormones, stress, or excitement about the pregnancy can lead to vivid dreams or difficulty falling asleep.",
        },
      ],
      subtitle2: "Tips for Better Sleep in the Second Trimester:",
      details2: [
        "Create a relaxing bedtime routine: Read, meditate, or listen to calming music.",
        "Invest in a comfortable sleep setup: Use pillows for support and ensure your bedroom is dark, quiet, and cool.",
        "Stay active during the day: Exercise improves sleep but avoid intense workouts before bedtime.",
        "Manage stress: Practice deep breathing, yoga, or journaling.",
      ],
      subtitle:
        "Let us know if you experience persistent insomnia, worsening leg cramps, or severe heartburn.",
    },
    Español: {
      heading: "El Sueño Durante el Segundo Trimestre",
      content:
        "El segundo trimestre a menudo se llama la 'fase de luna de miel' del embarazo. Para muchas personas, la fatiga y las náuseas del primer trimestre comienzan a disminuir, y los niveles de energía mejoran. Sin embargo, pueden surgir nuevos desafíos, especialmente en lo que respecta al sueño.",
      title: "Desafíos Comunes del Sueño en el Segundo Trimestre:",
      content: [
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
      subtitle2: "Consejos para Dormir Mejor en el Segundo Trimestre:",
      details2: [
        "Crea una rutina relajante antes de dormir: Lee, medita o escucha música tranquila.",
        "Invierte en un entorno cómodo: Usa almohadas para apoyo y asegúrate de que el dormitorio esté oscuro y fresco.",
        "Mantente activa durante el día: El ejercicio mejora el sueño, pero evita entrenamientos intensos cerca de la hora de dormir.",
        "Maneja el estrés: Practica respiración profunda, yoga o lleva un diario.",
      ],
      subtitle:
        "Comunícate con nosotros si experimentas insomnio persistente, calambres en las piernas o acidez severa.",
    },
  },
};

const { width: screenWidth } = Dimensions.get("window");

const topicImages = {
  sleep: require("../../assets/SleepWG.png"),
};

const SecondTrimester = () => {
  const { userId } = useContext(UserContext);
  const [languagePreference, setLanguagePreference] = useState("English");

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

  const sleepContent = translations.sleep[languagePreference];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Image
        source={topicImages.sleep}
        style={{ width: screenWidth, height: 200 }}
      />
      <TabContent
        heading={sleepContent.heading}
        content={sleepContent.content}
        title={sleepContent.title}
        contentArray={sleepContent.content}
        subtitle2={sleepContent.subtitle2}
        details2={sleepContent.details2}
        subtitle={sleepContent.subtitle}
      />
    </ScrollView>
  );
};

export default SecondTrimester;
