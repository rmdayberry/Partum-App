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
        bulletPoints: [
          "Vaginal bleeding.",
          "Dizziness or feeling faint.",
          "Severe abdominal pain or cramping.",
          "Contractions that don’t stop with rest.",
          "Decreased fetal movement.",
        ],
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
  labor: {
    English: {
      heading: "Preparing for Labor and Delivery",
      content:
        "The third trimester is an exciting time as you get closer to meeting your baby. Preparing for labor and delivery can ease your mind and help you feel more confident and ready for the big day.",
      sections: [
        {
          title: "1. Recognizing Signs of Labor",
          bulletPoints: [
            "Mild contractions, backache, or cramping.",
            "Losing your mucus plug or 'bloody show'.",
            "True labor contractions are regular and grow stronger over time.",
            "When contractions are every 3-5 minutes, lasting a minute for over an hour.",
            "Water breaking or heavy bleeding—go to the hospital.",
          ],
        },
        {
          title: "2. Packing Your Hospital Bag",
          bulletPoints: [
            "For You: Comfortable clothing, toiletries, snacks, and birth plan.",
            "For Baby: Newborn clothes, blankets, diapers, car seat ready.",
            "For Partner: Snacks, phone charger, comfortable clothing.",
          ],
        },
        {
          title: "3. Creating a Birth Plan",
          bulletPoints: [
            "Preferences for pain management and positions for labor.",
            "Include flexibility—labor is unpredictable.",
            "Discuss who will be present and preferences for skin-to-skin contact.",
          ],
        },
        {
          title: "4. Labor Comfort Measures",
          bulletPoints: [
            "Early Labor: Walk, rest, or take a warm shower.",
            "Active Labor: Use positions like hands and knees, squatting, or birthing ball.",
            "Focus on breathing techniques and use massage or heat packs.",
          ],
        },
        {
          title: "6. Mental and Emotional Preparation",
          bulletPoints: [
            "Early Labor: Walk, rest, or take a warm shower.",
            "Active Labor: Use positions like hands and knees, squatting, or birthing ball.",
            "Focus on breathing techniques and use massage or heat packs.",
          ],
        },
        {
          title: "4. Labor Comfort Measures",
          bulletPoints: [
            "Early Labor: Walk, rest, or take a warm shower.",
            "Active Labor: Use positions like hands and knees, squatting, or birthing ball.",
            "Focus on breathing techniques and use massage or heat packs.",
          ],
        },
      ],
      bottomText: {
        title: "When to Stop and Call Your Provider",
        content: "Contact us if you experience any of the following:",
        bulletPoints: [
          "Vaginal bleeding.",
          "Dizziness or feeling faint.",
          "Severe abdominal pain or cramping.",
          "Contractions that don’t stop with rest.",
          "Decreased fetal movement.",
        ],
      },
    },
    Español: {
      heading: "Preparándote para el Parto y el Nacimiento",
      content:
        "El tercer trimestre es un momento emocionante mientras te acercas a conocer a tu bebé. Prepararte para el parto y el nacimiento puede ayudarte a sentirte más segura y lista.",
      sections: [
        {
          title: "1. Reconocer los Signos de Parto",
          bulletPoints: [
            "Contracciones leves, dolor de espalda o calambres.",
            "Pérdida del tapón mucoso o 'señal de sangre'.",
            "Las contracciones verdaderas son regulares y se intensifican.",
            "Contracciones cada 3-5 minutos, duran un minuto por más de una hora.",
            "Ruptura de fuente o sangrado abundante—ve al hospital.",
          ],
        },
        {
          title: "2. Empacando tu Bolsa para el Hospital",
          bulletPoints: [
            "Para Ti: Ropa cómoda, artículos de tocador, snacks y plan de parto.",
            "Para el Bebé: Ropa de recién nacido, mantas, pañales, asiento del coche.",
            "Para tu Pareja: Snacks, cargador de teléfono, ropa cómoda.",
          ],
        },
        {
          title: "3. Creando un Plan de Parto",
          bulletPoints: [
            "Preferencias de manejo del dolor y posiciones para el parto.",
            "Incluye flexibilidad—el parto es impredecible.",
            "Discute quién estará presente y contacto piel con piel.",
          ],
        },
        {
          title: "4. Medidas de Comodidad Durante el Parto",
          bulletPoints: [
            "Trabajo Temprano: Camina, descansa o toma una ducha tibia.",
            "Trabajo Activo: Usa posiciones como a cuatro patas o pelota de parto.",
            "Enfócate en la respiración y usa masajes o compresas calientes.",
          ],
        },
        {
          title: "5. Medidas de Comodidad Durante el Parto",
          bulletPoints: [
            "Trabajo Temprano: Camina, descansa o toma una ducha tibia.",
            "Trabajo Activo: Usa posiciones como a cuatro patas o pelota de parto.",
            "Enfócate en la respiración y usa masajes o compresas calientes.",
          ],
        },
        {
          title: "6. Medidas de Comodidad Durante el Parto",
          bulletPoints: [
            "Trabajo Temprano: Camina, descansa o toma una ducha tibia.",
            "Trabajo Activo: Usa posiciones como a cuatro patas o pelota de parto.",
            "Enfócate en la respiración y usa masajes o compresas calientes.",
          ],
        },
      ],
      bottomText: {
        title: "Cuándo Detenerte y Llamar a tu Proveedor",
        content: "Comunícate con nosotros si experimentas lo siguiente:",
        bulletPoints: [
          "Sangrado vaginal.",
          "Mareos o sensación de desmayo.",
          "Dolor abdominal intenso o calambres.",
          "Contracciones que no desaparecen con descanso.",
          "Disminución del movimiento del bebé.",
        ],
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
    const activeContent =
      translations[activeTab]?.[languagePreference] ||
      translations[activeTab]?.English;

    if (!activeContent) {
      return <Text style={styles.errorText}>Content not found</Text>;
    }

    const { heading, content, sections, bottomText } = activeContent;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Image */}
        <Image source={topicImages[activeTab]} style={styles.image} />
        <View style={styles.contentContainer}>
          {heading && <Text style={styles.heading}>{heading}</Text>}
          {content && <Text style={styles.content}>{content}</Text>}

          {/* Render Sections */}
          {Array.isArray(sections) &&
            sections.map((section, idx) => (
              <View key={idx} style={styles.section}>
                <Text style={styles.subheading}>{section.title}</Text>
                {section.bulletPoints &&
                  section.bulletPoints.map((point, index) => (
                    <Text key={index} style={styles.bulletPoint}>
                      • {point}
                    </Text>
                  ))}
              </View>
            ))}

          {/* Render Bottom Text */}
          {bottomText && (
            <View style={styles.bottomSection}>
              <Text style={styles.bottomTitle}>{bottomText.title}</Text>
              <Text style={styles.bottomContent}>{bottomText.content}</Text>
              {Array.isArray(bottomText.bulletPoints) &&
                bottomText.bulletPoints.map((point, index) => (
                  <Text key={index} style={styles.bulletPoint}>
                    • {point}
                  </Text>
                ))}
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
          {
            key: "labor",
            label: languagePreference === "Español" ? "Parto" : "Labor Prep",
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
  bottomSection: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  bottomTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 8,
  },
  bottomContent: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    marginVertical: 4,
    color: "#555",
    paddingLeft: 10,
  },
});

export default ThirdTrimester;
