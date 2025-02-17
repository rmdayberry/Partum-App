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
      title1: "What You Can Do:",
      content1: [
        "Aim for at least 8 hours of sleep each night.",
        "Take short naps during the day if needed.",
        "Let go of unnecessary stress and focus on essentials.",
        "Seek help if you struggle to get restful sleep.",
      ],
      title2: "The Importance of Sleep",
      content2:
        "Lack of sleep can affect your mood, energy levels, and overall well-being. Sleep deprivation during pregnancy can also impact your body’s ability to function at its best. If you’re having trouble sleeping, don’t hesitate to reach out for support—we’re here to help!",
      title3: "Quick Tips for Better Sleep",
      content3: [
        "Create a calming bedtime routine: Try reading, listening to soft music, or meditating before bed.",
        "Make your sleep space comfortable: Keep the room dark, quiet, and cool. Consider adding a pregnancy pillow for extra support as your body changes.",
        "Limit screen time: Avoid phones, tablets, or TVs for at least 30 minutes before bed to help your mind wind down.",
      ],
    },
    Español: {
      heading: "El Sueño Durante el Primer Trimestre",
      content:
        "El comienzo del embarazo puede ser realmente agotador, ¡y eso es completamente normal! Tu cuerpo está trabajando duro para formar a tu bebé, por lo que no es sorprendente que te sientas cansada todo el tiempo. Descansar lo suficiente es esencial tanto para tu salud como para el desarrollo de tu bebé.",
      title1: "Qué Puedes Hacer:",
      content1: [
        "Intenta dormir al menos 8 horas cada noche.",
        "Si sientes que necesitas más, ¡está bien! Escucha a tu cuerpo y descansa siempre que puedas.",
        "Toma siestas si las necesitas. Una siesta corta durante el día puede ayudarte a recargar energía. Solo intenta no dormir demasiado o muy tarde en el día, ya que podría dificultarte conciliar el sueño por la noche.",
        "Consejo para quienes trabajan de noche: Ajusta tu horario para asegurarte de descansar lo suficiente, incluso si es durante el día.",
        "Deja de lado el estrés innecesario. Si ciertas tareas o responsabilidades te abruman, está bien dejarlas en pausa. Enfócate en lo que es verdaderamente esencial en este momento.",
        "Busca ayuda si tienes problemas para dormir. Si estás lidiando con insomnio o no puedes descansar bien, avísanos. Podemos hablar sobre opciones de medicamentos seguros u otras estrategias para ayudarte a dormir mejor.",
      ],
      title2: "La Importancia del Sueño",
      content2:
        "La falta de sueño puede afectar tu estado de ánimo, niveles de energía y bienestar general. La privación del sueño durante el embarazo también puede afectar la capacidad de tu cuerpo para funcionar de la mejor manera. Si tienes problemas para dormir, no dudes en pedir ayuda; ¡estamos aquí para apoyarte!",
      title3: "Consejos Rápidos para Dormir Mejor",
      content3: [
        "Crea una rutina relajante antes de dormir: Intenta leer, escuchar música suave o meditar antes de acostarte.",
        "Haz que tu espacio para dormir sea cómodo: Mantén el cuarto oscuro, tranquilo y fresco. Considera usar una almohada para embarazo para mayor soporte a medida que tu cuerpo cambia.",
        "Limita el tiempo frente a pantallas: Evita teléfonos, tabletas o televisores al menos 30 minutos antes de dormir para ayudar a tu mente a relajarse.",
      ],
    },
  },
  nutrition: {
    English: {
      heading: "Nutrition During Pregnancy",
      content:
        "Good nutrition is the foundation for a healthy pregnancy. While vitamins and supplements can support your diet, the best way to nourish yourself and your baby is by eating real, whole foods. Here’s what you need to know:",
      title: "Vitamins & Supplements",
      vitamins: [
        "Prenatal Vitamins: These are essential throughout your pregnancy and during the first 6 months of breastfeeding. They provide important nutrients like folic acid, iron, and other vitamins you may not get enough of from food.",
        "Folic Acid: Folic acid helps prevent birth defects of the baby’s brain and spine. It’s included in most prenatal vitamins. If prenatal vitamins make you nauseous, we might suggest taking folic acid alone during early pregnancy.",
        "Vitamin D: Especially in places like Minnesota, where sunshine can be scarce, vitamin D helps support your bones and your baby’s development.",
        "Omega-3 (Fish Oil): Omega-3s are great for heart and brain health—for both you and your baby. Pro tip: Freeze the capsules before taking them to reduce the fishy taste!",
        "Iron: Prenatal vitamins contain some iron, but if you need extra, we may recommend taking iron supplements 3 times a week (e.g., Monday, Wednesday, Friday). This can help prevent or treat anemia during pregnancy.",
      ],
      avoidTitle: "Foods and Substances to Avoid or Limit",
      avoid: [
        "Alcohol: Alcohol can harm your baby’s brain and cause serious birth defects. No amount of alcohol is truly safe during pregnancy.",
        "Cigarettes and Marijuana: Smoking and marijuana use can affect your baby’s growth and development. It’s best to avoid these entirely during pregnancy.",
        "Raw or Undercooked Foods: Avoid raw meat, eggs, and fish (like sushi) to reduce the risk of foodborne illness. Skip cold deli meats unless they’re heated to steaming hot to avoid listeria.",
        "Caffeine: Caffeine constricts blood flow to the baby. Limit yourself to 8 ounces of caffeinated beverages per day (coffee, tea, or soda). Avoid energy drinks like Red Bull or Monster.",
        "Fish (Mercury Risk): Fish is healthy, but some fish contain mercury or other pollutants. Limit fish to 2-3 servings per week and avoid high-mercury fish like shark, swordfish, and mackerel.",
        "Fast Food and Processed Foods: These are often high in salt, sugar, and unhealthy fats. Focus on whole, unprocessed foods whenever possible.",
      ],
      nuggetTitle: "Nutrition Nugget: Real Food Matters",
      nuggetContent:
        "Try to eat foods that come from the earth, not a factory. Focus on vegetables, fruits, proteins (like chicken, beans, or tofu), and whole grains. Avoid fast food and highly processed meals when you can. This can be challenging, so don’t stress! Just pay attention to your choices. Is the food you’re eating 'real' and whole? Small changes make a big difference.",
      tipsTitle: "Quick Tips for Better Nutrition",
      tips: [
        "Plan your meals: Prepare simple, balanced meals ahead of time to avoid grabbing fast food.",
        "Snack smart: Keep healthy snacks like nuts, fresh fruit, or yogurt on hand.",
        "Hydrate: Drink plenty of water to stay hydrated and energized.",
        bottomText: "Need More Information? Check out the resources linked below for more guidance on eating well during pregnancy.",
      ],
    },
    Español: {
      heading: "Nutrición Durante el Embarazo",
      content:
        "Una buena nutrición es la base para un embarazo saludable. Aunque las vitaminas y los suplementos pueden complementar tu dieta, la mejor manera de nutrirte a ti y a tu bebé es comer alimentos reales y naturales. Aquí tienes todo lo que necesitas saber:",
      title1: "Vitaminas y Suplementos",
      content1: [
        "Vitaminas Prenatales: Estas son esenciales durante todo el embarazo y durante los primeros 6 meses de lactancia. Contienen nutrientes importantes como ácido fólico, hierro y otras vitaminas que quizás no obtengas en cantidad suficiente de los alimentos.",
        "Ácido Fólico: El ácido fólico ayuda a prevenir defectos en el cerebro y la columna vertebral del bebé. Está incluido en la mayoría de las vitaminas prenatales. Si las vitaminas prenatales te causan náuseas, podríamos sugerir que tomes solo ácido fólico durante las primeras etapas del embarazo.",
        "Vitamina D: Especialmente en lugares como Minnesota, donde a veces falta el sol, la vitamina D ayuda a fortalecer tus huesos y al desarrollo de tu bebé.",
        "Omega-3 (Aceite de Pescado): Los Omega-3 son excelentes para la salud del corazón y el cerebro, tanto para ti como para tu bebé. Consejo: Congela las cápsulas antes de tomarlas para reducir el sabor a pescado.",
        "Hierro: Las vitaminas prenatales contienen algo de hierro, pero si necesitas más, podríamos recomendarte suplementos de hierro 3 veces a la semana (por ejemplo, lunes, miércoles y viernes). Esto puede prevenir o tratar la anemia durante el embarazo.",
      ],
      title2: "Alimentos y Sustancias a Evitar o Limitar",
      content2: [
        "Alcohol: El alcohol puede dañar el cerebro de tu bebé y causar serios defectos de nacimiento. No hay una cantidad segura de alcohol durante el embarazo.",
        "Cigarrillos y Marihuana: Fumar y consumir marihuana puede afectar el crecimiento y desarrollo de tu bebé. Es mejor evitarlos por completo durante el embarazo.",
        "Alimentos Crudos o Poco Cocidos: Evita la carne, los huevos y el pescado crudos (como el sushi) para reducir el riesgo de enfermedades transmitidas por alimentos. Evita los embutidos fríos a menos que estén calentados hasta que hiervan para prevenir la listeria.",
        "Cafeína: La cafeína reduce el flujo sanguíneo al bebé. Limita tu consumo a 8 onzas de bebidas con cafeína al día (café, té o refrescos). Evita las bebidas energéticas como Red Bull o Monster.",
        "Pescado (Riesgo de Mercurio): El pescado es saludable, pero algunos contienen mercurio u otros contaminantes. Limita el consumo de pescado a 2-3 porciones por semana y evita pescados con alto contenido de mercurio como el tiburón, pez espada y caballa.",
        "Comida Rápida y Procesada: Estos alimentos suelen tener mucha sal, azúcar y grasas no saludables. Enfócate en alimentos integrales y sin procesar siempre que sea posible.",
      ],
      title3: "Consejo de Nutrición: Los Alimentos Reales Importan",
      content3:
        "Intenta comer alimentos que provengan de la tierra y no de una fábrica. Enfócate en verduras, frutas, proteínas (como pollo, frijoles o tofu) y granos enteros. Evita la comida rápida y las comidas muy procesadas cuando puedas. Esto puede ser un desafío, ¡pero no te preocupes! Pequeños cambios pueden marcar una gran diferencia.",
      title4: "Consejos Rápidos para una Mejor Nutrición",
      content4: [
        "Planifica tus comidas: Prepara comidas simples y balanceadas con anticipación para evitar recurrir a la comida rápida.",
        "Elige bocadillos saludables: Ten a mano opciones como nueces, frutas frescas o yogur.",
        "Hidrátate: Bebe mucha agua para mantenerte hidratada y con energía.",
      ],
      bottomText: "¿Necesitas Más Información? Consulta los recursos enlazados a continuación para obtener más orientación sobre cómo alimentarte bien durante el embarazo.",
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
      title1,
      content1,
      title2,
      content2,
      title3,
      content3,
      title4,
      content4,
      bottomText
    } =
      translations[activeTab]?.[languagePreference] ||
      translations[activeTab]?.English ||
      {};

    return (
      <ScrollView contentContainerStyle={styles.scene}>
        {/* Main Heading */}
        <Image source={topicImages[activeTab]} style={styles.image} />
        <Text style={styles.tabHeading}>
          {heading || "Content Unavailable"}
        </Text>
        <Text style={styles.content}>{content}</Text>

        {/* Section 1 */}
        {title1 && <Text style={styles.subheading}>{title1}</Text>}
        {Array.isArray(content1) ? (
          content1.map((item, index) => (
            <Text key={index} style={styles.bulletPoint}>
              • {item}
            </Text>
          ))
        ) : (
          <Text style={styles.content}>{content1}</Text>
        )}

        {/* Section 2 */}
        {title2 && <Text style={styles.subheading}>{title2}</Text>}
        {content2 && <Text style={styles.content}>{content2}</Text>}

        {/* Section 3 */}
        {title3 && <Text style={styles.subheading}>{title3}</Text>}
        {Array.isArray(content3)
          ? content3.map((item, index) => (
              <Text key={index} style={styles.bulletPoint}>
                • {item}
              </Text>
            ))
          : content3 && <Text style={styles.content}>{content3}</Text>}

        {/* Section 4 */}
        {title4 && <Text style={styles.subheading}>{title4}</Text>}
        {Array.isArray(content4) ? (
          content4.map((item, index) => (
            <Text key={index} style={styles.bulletPoint}>
              • {item}
            </Text>
          ))
        ) : (
          <Text style={styles.content}>{content4}</Text>
        )}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <ScrollView
        horizontal
        style={styles.tabBar}
        contentContainerStyle={styles.tabBarContent}
      >
        {[
          {
            key: "sleep",
            label: languagePreference === "Español" ? "Sueño" : "Sleep",
          },
          {
            key: "nutrition",
            label: languagePreference === "Español" ? "Nutrición" : "Nutrition",
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

      {/* Content */}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabBar: {
    backgroundColor: "#f8f8f8",
    height: 50,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tabBarContent: {
    alignItems: "center",
  },
  tabButton: {
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
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
  scene: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "flex-start",
  },
  image: {
    width: screenWidth,
    height: 200,
    marginBottom: 16,
    resizeMode: "cover",
  },
  tabHeading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#6200EE",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: "#555",
    marginVertical: 4,
    marginLeft: 8,
  },
});

export default FirstTrimester;
