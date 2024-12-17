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
      importanceTitle: "The Importance of Sleep",
      importanceContent:
        "Lack of sleep can affect your mood, energy levels, and overall well-being. Sleep deprivation during pregnancy can also impact your body’s ability to function at its best. If you’re having trouble sleeping, don’t hesitate to reach out for support—we’re here to help!",
      quickTipsTitle: "Quick Tips for Better Sleep",
      quickTips: [
        "Create a calming bedtime routine: Try reading, listening to soft music, or meditating before bed.",
        "Make your sleep space comfortable: Keep the room dark, quiet, and cool. Consider adding a pregnancy pillow for extra support as your body changes.",
        "Limit screen time: Avoid phones, tablets, or TVs for at least 30 minutes before bed to help your mind wind down.",
      ],
    },
    Español: {
      heading: "El Sueño Durante el Primer Trimestre",
      content:
        "El comienzo del embarazo puede ser realmente agotador, ¡y eso es completamente normal! Tu cuerpo está trabajando duro para formar a tu bebé, por lo que no es sorprendente que te sientas cansada todo el tiempo. Descansar lo suficiente es esencial tanto para tu salud como para el desarrollo de tu bebé.",
      tipsTitle: "Qué Puedes Hacer:",
      tips: [
        "Intenta dormir al menos 8 horas cada noche.",
        "Si sientes que necesitas más, ¡está bien! Escucha a tu cuerpo y descansa siempre que puedas.",
        "Toma siestas si las necesitas. Una siesta corta durante el día puede ayudarte a recargar energía. Solo intenta no dormir demasiado o muy tarde en el día, ya que podría dificultarte conciliar el sueño por la noche.",
        "Deja de lado el estrés innecesario y enfócate en lo esencial.",
      ],
      importanceTitle: "La Importancia del Sueño",
      importanceContent:
        "La falta de sueño puede afectar tu estado de ánimo, niveles de energía y bienestar general. Si tienes problemas para dormir, no dudes en pedir ayuda; ¡estamos aquí para apoyarte!",
      quickTipsTitle: "Consejos Rápidos para Dormir Mejor",
      quickTips: [
        "Crea una rutina relajante antes de dormir: Intenta leer, escuchar música suave o meditar antes de acostarte.",
        "Haz que tu espacio para dormir sea cómodo: Mantén el cuarto oscuro, tranquilo y fresco.",
        "Limita el tiempo frente a pantallas al menos 30 minutos antes de dormir.",
      ],
    },
  },
  nutrition: {
    English: {
      heading: "Nutrition During Pregnancy",
      content:
        "Good nutrition is the foundation for a healthy pregnancy. While vitamins and supplements can support your diet, the best way to nourish yourself and your baby is by eating real, whole foods. Here’s what you need to know:",
      vitaminsTitle: "Vitamins & Supplements",
      vitamins: [
        "Prenatal Vitamins: These are essential throughout your pregnancy and during the first 6 months of breastfeeding.",
        "Folic Acid: Helps prevent birth defects. It’s included in prenatal vitamins.",
        "Vitamin D: Helps support your bones and baby’s development, especially in low-sunlight areas.",
        "Omega-3 (Fish Oil): Great for heart and brain health. Freeze capsules to reduce the fishy taste.",
        "Iron: Helps prevent anemia. If needed, supplements may be recommended 3 times a week.",
      ],
      avoidTitle: "Foods and Substances to Avoid or Limit",
      avoid: [
        "Alcohol: No amount of alcohol is truly safe during pregnancy.",
        "Cigarettes and Marijuana: Best to avoid these entirely during pregnancy.",
        "Raw or Undercooked Foods: Avoid raw meat, eggs, and fish.",
        "Caffeine: Limit to 8 ounces daily. Avoid energy drinks.",
        "Fish (Mercury Risk): Limit to 2-3 servings per week. Avoid high-mercury fish.",
      ],
      nuggetTitle: "Nutrition Nugget: Real Food Matters",
      nuggetContent:
        "Try to eat foods that come from the earth, not a factory. Focus on vegetables, fruits, proteins, and whole grains.",
    },
    Español: {
      heading: "Nutrición Durante el Embarazo",
      content:
        "Una buena nutrición es la base para un embarazo saludable. Aunque las vitaminas y los suplementos pueden complementar tu dieta, la mejor manera de nutrirte a ti y a tu bebé es comer alimentos reales y naturales.",
      vitaminsTitle: "Vitaminas y Suplementos",
      vitamins: [
        "Vitaminas Prenatales: Esenciales durante el embarazo y los primeros 6 meses de lactancia.",
        "Ácido Fólico: Ayuda a prevenir defectos de nacimiento.",
        "Vitamina D: Ayuda a fortalecer tus huesos y el desarrollo del bebé.",
        "Omega-3 (Aceite de Pescado): Excelente para la salud del corazón y el cerebro.",
        "Hierro: Previene la anemia. Se puede tomar 3 veces por semana si es necesario.",
      ],
      avoidTitle: "Alimentos y Sustancias a Evitar o Limitar",
      avoid: [
        "Alcohol: No hay una cantidad segura durante el embarazo.",
        "Cigarrillos y Marihuana: Mejor evitarlos completamente.",
        "Alimentos Crudos o Poco Cocidos: Evita carne, huevos y pescado crudos.",
        "Cafeína: Limita a 8 onzas al día y evita bebidas energéticas.",
      ],
      nuggetTitle: "Consejo de Nutrición: Los Alimentos Reales Importan",
      nuggetContent:
        "Come alimentos que provengan de la tierra, no de una fábrica. Enfócate en verduras, frutas, proteínas y granos enteros.",
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
    const {
      heading,
      content,
      vitaminsTitle,
      vitamins,
      avoidTitle,
      avoid,
      nuggetTitle,
      nuggetContent,
    } =
      translations[activeTab]?.[languagePreference] ||
      translations[activeTab]?.English ||
      {};

    return (
      <ScrollView contentContainerStyle={styles.scene}>
        <Image source={topicImages[activeTab]} style={styles.image} />
        <Text style={styles.tabHeading}>{heading}</Text>
        <Text style={styles.content}>{content}</Text>
        {vitaminsTitle && (
          <Text style={styles.subheading}>{vitaminsTitle}</Text>
        )}
        {vitamins?.map((item, index) => (
          <Text key={index} style={styles.bulletPoint}>
            • {item}
          </Text>
        ))}
        {avoidTitle && <Text style={styles.subheading}>{avoidTitle}</Text>}
        {avoid?.map((item, index) => (
          <Text key={index} style={styles.bulletPoint}>
            • {item}
          </Text>
        ))}
        {nuggetTitle && <Text style={styles.subheading}>{nuggetTitle}</Text>}
        <Text style={styles.content}>{nuggetContent}</Text>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.tabBar}>
        {["sleep", "nutrition"].map((key) => (
          <TouchableOpacity key={key} onPress={() => setActiveTab(key)}>
            <Text style={styles.tabText}>
              {translations[key]?.[languagePreference]?.heading.split(" ")[0]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBar: { flexDirection: "row" },
  scene: { padding: 16 },
  tabHeading: { fontWeight: "bold", fontSize: 20 },
  subheading: { fontSize: 18, marginTop: 8 },
  bulletPoint: { fontSize: 16 },
  image: { width: screenWidth, height: 200 },
});

export default FirstTrimester;
