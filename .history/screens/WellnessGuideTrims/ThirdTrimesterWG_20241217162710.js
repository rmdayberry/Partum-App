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
      bottomText: {
        title: "Nutrition Nugget: Prepping for Baby",
        content:
          "As labor approaches, try stocking your fridge and freezer with healthy, easy-to-reheat meals for postpartum recovery. Meals rich in protein, fiber, and healthy fats will help you regain energy while caring for your newborn.",
      },
    },
    Español: {
      heading: "Nutrición Durante el Tercer Trimestre",
      content:
        "En los últimos meses del embarazo, una buena nutrición es más importante que nunca. Tu bebé está creciendo rápidamente, ganando grasa y preparándose para la vida fuera del útero. Comer alimentos ricos en nutrientes te ayudará a mantenerte con energía y a preparar tu cuerpo para el parto y la recuperación.",
      sections: [
        {
          title: "Nutrientes Clave para el Tercer Trimestre",
          bulletPoints: [
            "Proteína: Ayuda al crecimiento rápido. Fuentes: Carnes magras, frijoles, tofu y nueces.",
            "Calcio: Fortalece huesos y dientes. Fuentes: Lácteos, leches vegetales fortificadas y verduras.",
            "Hierro: Previene la anemia. Fuentes: Carne roja, espinaca y lentejas.",
            "Omega-3: Apoya el desarrollo cerebral. Fuentes: Salmón, nueces y semillas de chía.",
            "Fibra: Ayuda a prevenir el estreñimiento. Fuentes: Granos integrales, frutas y verduras.",
            "Hidratación: Bebe 8-10 vasos de agua al día para ayudar con la digestión y circulación.",
          ],
        },
        {
          title: "Consejos para Comer en el Tercer Trimestre",
          bulletPoints: [
            "Come comidas pequeñas y frecuentes para evitar la acidez.",
            "Ten snacks saludables como nueces, frutas y galletas integrales a la mano.",
            "Enfócate en alimentos energéticos como la avena, quinoa y batatas.",
            "Prepárate para el parto con alimentos ricos en fibra, hierro y grasas saludables.",
          ],
        },
        {
          title: "Alimentos a Evitar",
          bulletPoints: [
            "Pescados con alto contenido de mercurio (por ejemplo, tiburón y pez espada).",
            "Productos lácteos y jugos no pasteurizados.",
            "Alimentos crudos o poco cocidos como sushi y huevos.",
            "Cafeína en exceso (límite de 200 mg al día).",
          ],
        },
      ],
      bottomText: {
        title: "Consejo de Nutrición: Prepárate para el Bebé",
        content:
          "A medida que se acerca el parto, trata de llenar tu refrigerador y congelador con comidas saludables y fáciles de recalentar para la recuperación posparto. Comidas ricas en proteínas, fibra y grasas saludables te ayudarán a recuperar energía mientras cuidas de tu recién nacido.",
      },
    },
  },
  exercise: {
    English: {
      heading: "Exercise During Your Third Trimester",
      content:
        "As you enter the final stretch of your pregnancy, staying active can help you prepare for labor...",
      sections: [
        {
          title: "Benefits of Exercise in the Third Trimester",
          bulletPoints: [
            "Prepares Your Body for Labor: Strengthens muscles and increases endurance.",
            "Reduces Discomfort: Eases common aches like back pain and swelling.",
            "Boosts Mood and Energy Levels: Regular movement reduces stress and improves sleep.",
          ],
        },
        {
          title: "Safe and Effective Exercises",
          bulletPoints: [
            "Walking: Keeps you moving without stress on joints.",
            "Prenatal Yoga: Helps with flexibility, relaxation, and back pain relief.",
            "Swimming: Supports your belly and relieves joint pressure.",
            "Pelvic Floor Exercises: Strengthen the muscles needed during labor.",
            "Cat-Cow Stretch: Relieves back tension and improves spinal mobility.",
          ],
        },
        {
          title: "Tips for Safe Exercise",
          bulletPoints: [
            "Listen to Your Body: Stop if you feel pain or dizziness.",
            "Stay Hydrated: Drink water before, during, and after exercising.",
            "Avoid Overexertion: Focus on moderate-intensity activities.",
          ],
        },
      ],
      bottomText: {
        title: "When to Stop and Call Your Provider",
        content:
          "Contact us if you experience any of the following while exercising:",
        bulletPoints: 
        "Vaginal bleeding.",
        "Dizziness or feeling faint.",
        "Severe abdominal pain or cramping.",
        "Contractions that don’t stop with rest.",
        "Decreased fetal movement.",
      },
    },
    Español: {
      heading: "Ejercicio Durante el Tercer Trimestre",
      content:
        "A medida que entras en la etapa final de tu embarazo, mantenerse activa puede ayudarte a prepararte para el parto...",
      sections: [
        {
          title: "Beneficios del Ejercicio en el Tercer Trimestre",
          bulletPoints: [
            "Prepara tu Cuerpo para el Parto: Fortalece los músculos y aumenta la resistencia.",
            "Reduce las Molestias: Alivia dolores comunes como el dolor de espalda.",
            "Mejora el Estado de Ánimo y Energía: Reduce el estrés y mejora el sueño.",
          ],
        },
        {
          title: "Ejercicios Seguros y Efectivos",
          bulletPoints: [
            "Caminar: Mantiene tu cuerpo activo sin presionar las articulaciones.",
            "Yoga Prenatal: Ayuda con la flexibilidad y el manejo del dolor.",
            "Natación: Alivia la presión en las articulaciones.",
            "Ejercicios del Suelo Pélvico: Fortalecen los músculos para el parto.",
            "Estiramiento Gato-Vaca: Alivia la tensión en la espalda.",
          ],
        },
        {
          title: "Consejos para Ejercitarte de Forma Segura",
          bulletPoints: [
            "Escucha a tu Cuerpo: Detente si sientes dolor o mareos.",
            "Mantente Hidratada: Bebe agua antes, durante y después del ejercicio.",
            "Evita el Esfuerzo Excesivo: Enfócate en actividades moderadas.",
            "Use Support: Consider using a maternity support belt for extra stability if needed.",
          ],
        },
      ],
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
    const activeContent =
      translations[activeTab]?.[languagePreference] ||
      translations[activeTab]?.English;

    // Add a check if activeContent is undefined
    if (!activeContent) {
      return <Text style={styles.errorText}>Content not found</Text>;
    }

    const { heading, content, sections, bottomText } = activeContent;

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

          {/* Nutrition Nugget */}
          {bottomText && (
            <View style={styles.bottomText}>
              <Text style={styles.nuggetTitle}>{bottomText.title}</Text>
              <Text style={styles.nuggetContent}>{bottomText.content}</Text>
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
  bottomText: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#E0F7FA",
    borderRadius: 8,
  },
  nuggetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00796B",
    marginBottom: 8,
  },
  nuggetContent: { fontSize: 16, color: "#004D40" },
});

export default ThirdTrimester;
