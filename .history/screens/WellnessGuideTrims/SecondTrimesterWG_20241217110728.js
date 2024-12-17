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
        "El segundo trimestre a menudo se llama la 'fase de luna de miel' del embarazo. Para muchas personas, la fatiga y las náuseas del primer trimestre comienzan a disminuir, y los niveles de energía mejoran. Sin embargo, pueden surgir nuevos desafíos, especialmente en lo que respecta al sueño. Tu vientre en crecimiento, los cambios hormonales y otros factores pueden dificultar un sueño reparador.",
      sections: [
        {
          title: "Desafíos Comunes del Sueño en el Segundo Trimestre",
          subtitleBold: "Encontrar una Posición Cómoda:",
          bulletPoints: [
            "Dormir de lado, especialmente del lado izquierdo, es lo mejor para el flujo sanguíneo. Usa una almohada de embarazo para apoyar tu vientre, rodillas y espalda.",
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
  exercise: {
    English: {
      heading: "Exercise During Your Second Trimester",
      content:
        "As you transition into your second trimester, many people notice an increase in energy compared to the first trimester. This is a great time to incorporate regular exercise into your routine. Staying active during pregnancy not only helps you feel better but also prepares your body for the physical demands of childbirth and postpartum recovery.",
      sections: [
        {
          title: "Benefits of Exercise in the Second Trimester",
          bulletPoints: [
            "Reduces aches and pains: Regular movement can alleviate common discomforts like back pain and joint stiffness.",
            "Boosts energy and mood: Exercise releases endorphins, improving both your mental and physical well-being.",
            "Prepares your body for delivery: Staying active helps maintain strength and endurance for labor and delivery.",
            "Supports healthy weight gain: Exercise can help manage weight gain during pregnancy in a healthy way.",
          ],
        },
        {
          title: "Safe and Beneficial Exercises for the Second Trimester",
          bulletPoints: [
            "Walking: A daily walk improves circulation, strengthens muscles, and connects you with nature.",
            "Swimming: Water relieves pressure on your back and joints while offering a full-body workout.",
            "Prenatal Yoga: Improves flexibility, strengthens muscles, and reduces back pain while promoting deep breathing and mindfulness.",
            "Strength Training: Light weights, resistance bands, or body weight help maintain muscle tone. Avoid heavy lifting.",
            "Stationary Cycling: A low-impact cardio option without the risk of falling.",
            "Stretching: Gentle stretches relieve tension and improve range of motion.",
          ],
        },
        {
          title: "Tips for Exercising Safely in the Second Trimester",
          bulletPoints: [
            "Listen to your body: Avoid overexertion and stop if you feel dizzy or uncomfortable.",
            "Stay hydrated: Drink water before, during, and after exercise.",
            "Wear supportive gear: Choose comfortable shoes and a well-fitted sports bra.",
            "Avoid certain movements: Skip exercises lying flat on your back or high-risk activities.",
            "Warm up and cool down: Start with a light warm-up and end with gentle stretches.",
          ],
        },
        {
          title: "When to Stop Exercising and Call Us",
          bulletPoints: [
            "Dizziness, shortness of breath, or faintness.",
            "Vaginal bleeding or unusual discharge.",
            "Severe pain or cramping.",
            "Contractions that persist after resting.",
          ],
        },
      ],
    },
    Español: {
      heading: "Ejercicio Durante el Segundo Trimestre",
      content:
        "Al entrar en el segundo trimestre, muchas personas notan un aumento de energía en comparación con el primer trimestre. Este es un excelente momento para incorporar el ejercicio regular en tu rutina. Mantenerte activa durante el embarazo no solo te ayudará a sentirte mejor, sino que también preparará tu cuerpo para las demandas físicas del parto y la recuperación posparto.",
      sections: [
        {
          title: "Beneficios del Ejercicio en el Segundo Trimestre",
          bulletPoints: [
            "Reduce los dolores y molestias: El movimiento regular alivia molestias como el dolor de espalda y la rigidez.",
            "Aumenta la energía y mejora el estado de ánimo: El ejercicio libera endorfinas, mejorando tu bienestar físico y mental.",
            "Prepara tu cuerpo para el parto: Mantiene la fuerza y resistencia necesarias para el trabajo de parto.",
            "Apoya un aumento de peso saludable: Ayuda a manejar el aumento de peso de manera equilibrada.",
          ],
        },
        {
          title: "Ejercicios Seguros y Beneficiosos para el Segundo Trimestre",
          bulletPoints: [
            "Caminar: Mejora la circulación, fortalece los músculos y te conecta con la naturaleza.",
            "Natación: Alivia la presión en la espalda y articulaciones mientras ofrece un entrenamiento completo.",
            "Yoga Prenatal: Mejora la flexibilidad, fortalece músculos y reduce molestias como el dolor de espalda.",
            "Entrenamiento de Fuerza: Usa pesas ligeras o bandas para mantener el tono muscular. Evita levantar peso pesado.",
            "Ciclismo Estacionario: Una opción de cardio de bajo impacto sin riesgo de caídas.",
            "Estiramientos: Alivian la tensión y mejoran tu rango de movimiento.",
          ],
        },
        {
          title: "Consejos para Ejercitarte de Forma Segura",
          bulletPoints: [
            "Escucha a tu cuerpo: Evita el esfuerzo excesivo y descansa si te sientes mareada o incómoda.",
            "Mantente hidratada: Bebe agua antes, durante y después del ejercicio.",
            "Usa equipo de apoyo: Usa calzado cómodo y un sostén deportivo adecuado.",
            "Evita ciertos movimientos: Omite ejercicios boca arriba o actividades con alto riesgo de caídas.",
            "Calienta y enfría: Comienza con un calentamiento ligero y finaliza con estiramientos suaves.",
          ],
        },
        {
          title: "Cuándo Detener el Ejercicio y Llamarnos",
          bulletPoints: [
            "Mareos, falta de aire o desmayos.",
            "Sangrado vaginal o secreción inusual.",
            "Dolor severo o calambres.",
            "Contracciones que persisten después de descansar.",
          ],
        },
      ],
    },
  },
  nutrition: {
    English: {
      heading: "Nutrition During Your Second Trimester",
      content:
        "The second trimester is a time of rapid growth for your baby and big changes for your body. It’s important to eat a well-balanced diet that provides all the nutrients you and your baby need. Here’s what to focus on:",
      sections: [
        {
          title: "Key Nutrients for the Second Trimester",
          bulletPoints: [
            "Iron: Supports your increased blood volume and helps prevent anemia. Sources: Red meat, spinach, lentils, pumpkin seeds, iron-fortified cereals. Pair with Vitamin C for better absorption.",
            "Calcium and Vitamin D: Help build strong bones and teeth for your baby, and prevent your body from losing bone density. Sources: Dairy products, fortified plant-based milks, leafy greens, tofu, almonds, and eggs. Tip: Spend 10-15 minutes in the sun daily to boost Vitamin D naturally.",
            "Omega-3 Fatty Acids (DHA): Support your baby’s brain and eye development. Sources: Fatty fish like salmon, chia seeds, flaxseeds, walnuts, and omega-3 supplements. Tip: Look for low-mercury fish and aim for 2-3 servings per week.",
            "Protein: Essential for your baby’s growth and tissue development. Sources: Chicken, turkey, eggs, beans, lentils, tofu, Greek yogurt, and nuts. Tip: Aim for about 70-100 grams of protein daily.",
            "Fiber: Helps prevent constipation, a common issue during pregnancy. Sources: Whole grains, fruits (berries, apples, pears), vegetables (carrots, broccoli), and legumes. Tip: Drink plenty of water to help fiber work effectively.",
            "Folate (Vitamin B9): Prevents neural tube defects and supports healthy cell growth. Sources: Leafy greens, citrus fruits, beans, peas, and fortified cereals.",
            "Magnesium: Supports muscle function, reduces leg cramps, and helps with healthy bone development. Sources: Nuts (almonds, cashews), seeds, whole grains, avocados, and bananas.",
          ],
        },
        {
          title: "General Nutrition Tips for the Second Trimester",
          bulletPoints: [
            "Eat Small, Frequent Meals: Your growing uterus may crowd your stomach, making large meals uncomfortable. Eating smaller meals throughout the day can help.",
            "Stay Hydrated: Drink at least 8-10 glasses of water daily. This helps with digestion, circulation, and preventing dehydration.",
            "Limit Empty Calories: While occasional treats are fine, focus on nutrient-dense foods to meet your increased caloric needs (typically about 300 extra calories per day).",
            "Watch for Heartburn: To reduce heartburn, avoid spicy or greasy foods and eat smaller meals. Sleeping with your head slightly elevated can also help.",
            "Monitor Weight Gain: Weight gain is expected during pregnancy, but it’s important to maintain a healthy rate. Discuss your target weight gain with your provider.",
          ],
        },
        {
          title: "Foods and Substances to Avoid",
          bulletPoints: [
            "High-Mercury Fish: Avoid fish like shark, swordfish, and king mackerel, which can have high mercury levels.",
            "Unpasteurized Dairy and Juices: These can carry harmful bacteria. Always choose pasteurized options.",
            "Raw or Undercooked Foods: Avoid raw eggs, sushi, or undercooked meat to reduce the risk of foodborne illness.",
            "Caffeine and Alcohol: Limit caffeine to no more than 200mg per day (about one 12oz coffee). Avoid alcohol entirely during pregnancy.",
          ],
        },
        {
          title: "Nutrition Nugget: Balanced Eating",
          content: [
            "Eating a variety of whole foods during the second trimester ensures you and your baby get all the essential nutrients. Think of your plate as a mix of colorful vegetables, lean proteins, whole grains, and healthy fats. Remember, every bite you take is helping your baby grow and thrive!",
          ],
        },
      ],
    },
    Español: {
      heading: "Nutrición Durante el Segundo Trimestre",
      content:
        "El segundo trimestre es un período de crecimiento rápido para tu bebé y de grandes cambios para tu cuerpo. Es importante comer una dieta equilibrada que proporcione todos los nutrientes que tú y tu bebé necesitan. Aquí tienes en qué enfocarte:",
      sections: [
        {
          title: "Nutrientes Clave para el Segundo Trimestre",
          bulletPoints: [
            "Hierro: Apoya el aumento de tu volumen sanguíneo y ayuda a prevenir la anemia. Fuentes: Carne roja, espinaca, lentejas, semillas de calabaza, cereales fortificados. Consejo: Combínalo con vitamina C para una mejor absorción.",
            "Calcio y Vitamina D: Ayudan a formar huesos y dientes fuertes en tu bebé y previenen la pérdida de densidad ósea. Fuentes: Productos lácteos, leches vegetales fortificadas, verduras de hoja verde, tofu, almendras y huevos. Consejo: Pasa de 10 a 15 minutos al sol cada día para aumentar la vitamina D naturalmente.",
            "Ácidos Grasos Omega-3 (DHA): Apoyan el desarrollo del cerebro y los ojos de tu bebé. Fuentes: Pescados grasos como el salmón, semillas de chía, linaza, nueces y suplementos de omega-3. Consejo: Elige pescados con bajo contenido de mercurio y consume 2-3 porciones por semana.",
            "Proteína: Es esencial para el crecimiento y desarrollo de los tejidos de tu bebé. Fuentes: Pollo, pavo, huevos, frijoles, lentejas, tofu, yogur griego y nueces. Consejo: Apunta a consumir entre 70 y 100 gramos de proteína al día.",
            "Fibra: Ayuda a prevenir el estreñimiento, un problema común durante el embarazo. Fuentes: Granos integrales, frutas (bayas, manzanas, peras), verduras (zanahorias, brócoli) y legumbres. Consejo: Bebe mucha agua para que la fibra funcione de manera efectiva.",
            "Ácido Fólico (Vitamina B9): Previene defectos del tubo neural y apoya el crecimiento celular saludable. Fuentes: Verduras de hoja verde, frutas cítricas, frijoles, guisantes y cereales fortificados.",
            "Magnesio: Apoya la función muscular, reduce los calambres en las piernas y ayuda al desarrollo óseo saludable. Fuentes: Nueces (almendras, anacardos), semillas, granos integrales, aguacates y plátanos.",
          ],
        },
        {
          title: "Consejos Generales de Nutrición",
          bulletPoints: [
            "Come Comidas Pequeñas y Frecuentes: Tu útero en crecimiento puede comprimir tu estómago. Comer porciones más pequeñas durante el día puede ayudar.",
            "Mantente Hidratada: Bebe al menos 8-10 vasos de agua diariamente. Esto ayuda con la digestión, circulación y evita la deshidratación.",
            "Limita las Calorías Vacías: Aunque los antojos son normales, enfócate en alimentos nutritivos para satisfacer tus necesidades calóricas adicionales (alrededor de 300 calorías extra por día).",
            "Cuidado con la Acidez: Evita alimentos picantes o grasosos y come porciones más pequeñas. Dormir con la cabeza ligeramente elevada también puede ayudar.",
            "Monitorea el Aumento de Peso: Habla con tu médico para asegurar que el aumento de peso sea saludable y adecuado.",
          ],
        },
        {
          title: "Alimentos y Sustancias a Evitar",
          bulletPoints: [
            "Pescados con Alto Contenido de Mercurio: Evita tiburón, pez espada y caballa.",
            "Lácteos y Jugos No Pasteurizados: Pueden contener bacterias dañinas. Elige opciones pasteurizadas.",
            "Alimentos Crudos o Poco Cocidos: Evita huevos crudos, sushi o carnes poco cocidas.",
            "Cafeína y Alcohol: Limita la cafeína a no más de 200 mg al día (aproximadamente una taza de café de 12 oz). Evita el alcohol por completo.",
          ],
        },
        {
          title: "Pequeño Consejo de Nutrición",
          content: [
            "Consumir una variedad de alimentos integrales durante el segundo trimestre garantiza que tú y tu bebé obtengan todos los nutrientes esenciales. Piensa en tu plato como una mezcla de verduras coloridas, proteínas magras, granos integrales y grasas saludables. Cada bocado ayuda a tu bebé a crecer y prosperar.",
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
              <Text style={styles.subtitleBold}>{section.subtitleBold}</Text>

              {/* For bullet points */}
              {section.bulletPoints
                ? section.bulletPoints.map((item, idx) => (
                    <Text key={idx} style={styles.bulletPoint}>
                      • {item}
                    </Text>
                  ))
                : /* For detailed content with subtitles */
                  section.content?.map((item, idx) => (
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
