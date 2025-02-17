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
          title: "4. Preparing for the Hospital",
          bulletPoints: [
            "Know the Route: Plan your route to the hospital or birthing center ahead of time and have a backup plan.",
            "Pre-Register: Many hospitals allow pre-registration to make the check-in process quicker.",
            "Tour the Facility: Familiarize yourself with the labor and delivery unit if possible.",
          ],
        },
        {
          title: "5. Labor Comfort Measures",
          bulletPoints: [
            "Early Labor: Walk, rest, or take a warm shower.",
            "Active Labor: Use positions like hands and knees, squatting, or birthing ball.",
            "Focus on breathing techniques and use massage or heat packs.",
          ],
        },
        {
          title: "6. Mental and Emotional Preparation",
          bulletPoints: [
            "Communicate with Your Support Team: Discuss your fears, expectations, and preferences with your partner, doula, or provider.",
            "Learn About Labor: Take a childbirth class to understand the stages of labor, pain management, and what to expect.",
            "Practice Relaxation Techniques: Deep breathing, visualization, and mindfulness can help you stay calm during labor.",
          ],
        },
        {
          title: "7. Postpartum Preparation",
          bulletPoints: [
            "Plan for Recovery: Stock up on postpartum essentials like pads, pain relief, and comfortable clothing.",
            "Set Up Newborn Care Essentials: Have diapers, clothing, and a safe sleep space ready.",
            "Arrange for Support: Coordinate help with meals, household tasks, and childcare if needed.",
          ],
        },
      ],
    },
    Español: {
      heading: "Preparándote para el Parto y el Nacimiento",
      content:
        "El tercer trimestre es un momento emocionante mientras te acercas a conocer a tu bebé. Prepararte para el parto y el nacimiento puede ayudarte a sentirte más segura y lista para el gran día.",
      sections: [
        {
          title: "1. Reconocer los Signos de Parto",
          bulletPoints: [
            "Contracciones leves, dolor de espalda o calambres.",
            "Pérdida del tapón mucoso o 'señal de sangre'.",
            "Las contracciones de parto verdadero son regulares y se vuelven más fuertes con el tiempo.",
            "Cuando las contracciones ocurren cada 3-5 minutos, duran un minuto y continúan por más de una hora.",
            "Ruptura de la fuente o sangrado abundante: ve al hospital.",
          ],
        },
        {
          title: "2. Empacando tu Bolsa para el Hospital",
          bulletPoints: [
            "Para Ti: Ropa cómoda, artículos de tocador, snacks y plan de parto.",
            "Para el Bebé: Ropa de recién nacido, mantas, pañales y asiento del coche listo.",
            "Para tu Pareja: Snacks, cargador de teléfono y ropa cómoda.",
          ],
        },
        {
          title: "3. Creando un Plan de Parto",
          bulletPoints: [
            "Preferencias para el manejo del dolor y posiciones para el trabajo de parto.",
            "Incluye flexibilidad: el parto es impredecible.",
            "Discute quién estará presente y preferencias como el contacto piel con piel.",
          ],
        },
        {
          title: "4. Preparándote para el Hospital",
          bulletPoints: [
            "Conoce la Ruta: Planifica tu ruta al hospital o centro de parto con anticipación y ten un plan alternativo.",
            "Pre-Regístrate: Muchos hospitales permiten la preinscripción para hacer el proceso de registro más rápido.",
            "Haz un Recorrido por la Instalación: Familiarízate con la unidad de parto si es posible.",
          ],
        },
        {
          title: "5. Medidas de Comodidad Durante el Parto",
          bulletPoints: [
            "Trabajo de Parto Temprano: Camina, descansa o toma una ducha tibia.",
            "Trabajo de Parto Activo: Usa posiciones como a cuatro patas, en cuclillas o con una pelota de parto.",
            "Concéntrate en técnicas de respiración y usa masajes o compresas calientes.",
          ],
        },
        {
          title: "6. Preparación Mental y Emocional",
          bulletPoints: [
            "Habla con tu Equipo de Apoyo: Discute tus miedos, expectativas y preferencias con tu pareja, doula o proveedor.",
            "Infórmate Sobre el Parto: Toma una clase de preparación para comprender las etapas del parto, manejo del dolor y qué esperar.",
            "Practica Técnicas de Relajación: La respiración profunda, la visualización y la atención plena pueden ayudarte a mantener la calma durante el parto.",
          ],
        },
        {
          title: "7. Preparación para el Postparto",
          bulletPoints: [
            "Planifica tu Recuperación: Abastece tu hogar con artículos esenciales como compresas, alivio del dolor y ropa cómoda.",
            "Prepara los Elementos Esenciales para el Bebé: Ten pañales, ropa y un espacio seguro para dormir listos.",
            "Organiza Apoyo: Coordina ayuda con comidas, tareas del hogar y cuidado del bebé si es necesario.",
          ],
        },
      ],
    },
  },
  support: {
    English: {
      heading: "Partner and Family Support: Building Your Circle of Care",
      content:
        "Pregnancy and the postpartum period are significant life events that require support. Whether you have a partner, close family, or rely on friends and community, having a reliable circle of care can make this journey smoother. This guide includes practical ways to seek support and create a safe, nurturing environment, even if family or partner relationships are complicated or absent.",
      sections: [
        {
          title: "Creating a Circle of Support",
          bulletPoints: [
            "Identify Trusted People: Look for friends, relatives, or community members who are reliable, kind, and willing to help.",
            "Lean on Professional Resources: Engage with your healthcare team, therapists, or social workers for guidance and support.",
            "Define Your Needs: Be specific about the kind of help you need, such as transportation, meal prep, or emotional support.",
          ],
        },
        {
          title: "If You Have a Partner",
          bulletPoints: [
            "How Partners Can Help: Attend appointments, share household responsibilities, and offer emotional support.",
            "During Labor: Be present, encouraging, and assist with comfort measures.",
            "Postpartum Support: Help with baby care and watch for signs of postpartum depression.",
          ],
        },
        {
          title: "For Those Without a Partner or Limited Family Support",
          bulletPoints: [
            "Build a Non-Traditional Support System: Include friends, neighbors, or virtual parenting groups.",
            "Consider a Doula: Doulas offer invaluable emotional and physical support before, during, and after birth.",
            "Use Community Resources: Seek organizations offering free or low-cost parenting classes, meal delivery, and childcare help.",
          ],
        },
        {
          title: "Navigating Complex Family Dynamics",
          bulletPoints: [
            "Set Boundaries: Protect your emotional well-being by clearly communicating your needs.",
            "Focus on Positive Relationships: Spend time with people who uplift and support you.",
            "Seek Professional Help: Therapists can help you manage difficult relationships and emotions.",
          ],
        },
        {
          title: "Ways to Support Yourself",
          bulletPoints: [
            "Practice Self-Care: Take breaks, enjoy hobbies, and nourish your body with healthy food.",
            "Join Support Groups: Connect with others in similar situations for advice and community.",
            "Focus on Emotional Safety: Surround yourself with people who make you feel safe and valued.",
          ],
        },
        {
          title: "Resources for Support",
          bulletPoints: [
            "JustBirth Space: Free virtual classes and doula support (7am–9pm daily) - www.justbirthspace.org.",
            "Postpartum Support International: 1-800-944-4773 or www.postpartum.net.",
            "National Domestic Violence Hotline: 1-800-799-7233 or www.thehotline.org.",
          ],
        },
      ],
      bottomText: {
        content:
          "No matter your circumstances, building a strong support system is key to navigating pregnancy, labor, and postpartum life. Whether that’s through friends, professionals, or chosen family, remember that you are never alone on this journey.",
      },
    },
    Español: {
      heading: "Apoyo de Pareja y Familia: Construyendo tu Círculo de Cuidado",
      content:
        "El embarazo y el período posparto son etapas significativas de la vida que requieren apoyo. Ya sea que tengas pareja, familia cercana, o dependas de amigos y recursos comunitarios, contar con un círculo de cuidado confiable puede hacer este proceso más llevadero. Esta guía ofrece formas prácticas de buscar apoyo y crear un entorno seguro y acogedor, incluso si las relaciones familiares o de pareja son complicadas o están ausentes.",
      sections: [
        {
          title: "Creando un Círculo de Apoyo",
          bulletPoints: [
            "Identifica Personas de Confianza: Busca amigos, familiares o miembros de la comunidad que sean amables y dispuestos a ayudar.",
            "Apóyate en Recursos Profesionales: Trabaja con tu equipo médico, terapeutas o trabajadores sociales para obtener orientación.",
            "Define tus Necesidades: Sé específica sobre el tipo de ayuda que necesitas, como transporte o apoyo emocional.",
          ],
        },
        {
          title: "Si Tienes Pareja",
          bulletPoints: [
            "Cómo Puede Ayudar: Asistir a citas, compartir responsabilidades del hogar y ofrecer apoyo emocional.",
            "Durante el Parto: Estar presente, brindar palabras de aliento y ayudar con masajes o ejercicios de respiración.",
            "Apoyo en el Posparto: Ayudar con el cuidado del bebé y estar atento a signos de depresión posparto.",
          ],
        },
        {
          title: "Para Quienes No Tienen Pareja o Apoyo Familiar Limitado",
          bulletPoints: [
            "Construye un Sistema No Tradicional: Incluye amigos, vecinos o grupos virtuales de crianza.",
            "Considera una Doula: Las doulas ofrecen apoyo emocional y físico antes, durante y después del parto.",
            "Usa Recursos Comunitarios: Busca servicios gratuitos o económicos, como entrega de comidas o clases de crianza.",
          ],
        },
        {
          title: "Navegando Dinámicas Familiares Complicadas",
          bulletPoints: [
            "Establece Límites: Comunica claramente tus necesidades para proteger tu bienestar emocional.",
            "Enfócate en Relaciones Positivas: Prioriza tu tiempo con personas que te apoyen genuinamente.",
            "Busca Ayuda Profesional: Los terapeutas pueden ayudarte a manejar relaciones familiares difíciles.",
          ],
        },
        {
          title: "Formas de Apoyarte a Ti Misma",
          bulletPoints: [
            "Practica el Autocuidado: Tómate descansos, disfruta pasatiempos y come alimentos saludables.",
            "Únete a Grupos de Apoyo: Conectar con otras personas puede reducir la sensación de aislamiento.",
            "Enfócate en tu Seguridad Emocional: Rodéate de personas y entornos donde te sientas respetada y valorada.",
          ],
        },
        {
          title: "Recursos de Apoyo",
          bulletPoints: [
            "JustBirth Space: Clases virtuales gratuitas y apoyo de doulas (7am–9pm diariamente) - www.justbirthspace.org.",
            "Postpartum Support International: 1-800-944-4773 o www.postpartum.net.",
            "Línea Nacional Contra la Violencia Doméstica: 1-800-799-7233 o www.thehotline.org.",
          ],
        },
      ],
      bottomText: {
        content:
          "No importa cuáles sean tus circunstancias, construir un sistema de apoyo sólido es clave para navegar el embarazo, el parto y la vida posparto. Ya sea a través de amigos, profesionales o una familia elegida, recuerda que nunca estás sola en este camino.",
      },
    },
  },
  symptoms: {
    English: {
      heading: "Common Discomforts and Remedies During the Third Trimester",
      content:
        "The third trimester brings excitement as you prepare to meet your baby, but it can also come with some discomforts. Here’s a guide to common issues and practical remedies to help you feel better.",
      sections: [
        {
          title: "1. Back Pain",
          bulletPoints: [
            "Maintain good posture.",
            "Use a maternity support belt.",
            "Sleep with a pillow between your knees.",
            "Practice gentle stretches or prenatal yoga.",
            "Apply a warm (not hot) compress to the area.",
          ],
        },
        {
          title: "2. Swelling (Edema)",
          bulletPoints: [
            "Elevate your feet whenever possible.",
            "Stay hydrated to reduce fluid retention.",
            "Avoid standing for long periods.",
            "Wear comfortable, supportive shoes.",
          ],
        },
        {
          title: "3. Heartburn",
          bulletPoints: [
            "Eat smaller, more frequent meals.",
            "Avoid spicy, acidic, or greasy foods.",
            "Don’t lie down immediately after eating.",
            "Sleep with your head slightly elevated.",
            "Try antacids if approved by your provider.",
          ],
        },
        {
          title: "4. Leg Cramps",
          bulletPoints: [
            "Stretch your calves before bed.",
            "Stay hydrated.",
            "Include magnesium and potassium-rich foods like bananas and nuts.",
            "Massage or apply heat to the affected area.",
          ],
        },
        {
          title: "5. Difficulty Sleeping",
          bulletPoints: [
            "Use a pregnancy pillow for support.",
            "Create a relaxing bedtime routine (e.g., warm bath, reading).",
            "Avoid caffeine in the afternoon and evening.",
            "Try gentle stretches or meditation before bed.",
          ],
        },
        {
          title: "6. Shortness of Breath",
          bulletPoints: [
            "Sit up straight to give your lungs more room.",
            "Sleep propped up with pillows.",
            "Practice deep, slow breathing exercises.",
          ],
        },
        {
          title: "7. Constipation",
          bulletPoints: [
            "Eat high-fiber foods like fruits, vegetables, and whole grains.",
            "Drink plenty of water.",
            "Stay active with gentle exercise like walking.",
          ],
        },
        {
          title: "8. Braxton Hicks Contractions",
          bulletPoints: [
            "Stay hydrated; dehydration can trigger them.",
            "Change positions or rest.",
            "If the contractions are painful or regular, call your provider to rule out preterm labor.",
          ],
        },
      ],
      bottomText: {
        title: "When to Call Your Provider",
        content:
          "Contact your healthcare provider if:\n- Your discomfort is severe or doesn’t improve with remedies.\n- You experience sudden swelling in your hands or face.\n- You have blurred vision, severe headaches, or difficulty breathing.\n- Your baby’s movement decreases.",
      },
    },
    Español: {
      heading: "Descomforts Comunes y Remedios Durante el Tercer Trimestre",
      content:
        "El tercer trimestre trae emoción mientras te preparas para conocer a tu bebé, pero también puede venir con algunas molestias. Aquí tienes una guía de los problemas comunes y remedios prácticos para sentirte mejor.",
      sections: [
        {
          title: "1. Dolor de Espalda",
          bulletPoints: [
            "Mantén una buena postura.",
            "Usa un cinturón de soporte para maternidad.",
            "Duerme con una almohada entre las rodillas.",
            "Practica estiramientos suaves o yoga prenatal.",
            "Aplica una compresa tibia (no caliente) en el área afectada.",
          ],
        },
        {
          title: "2. Hinchazón (Edema)",
          bulletPoints: [
            "Eleva los pies siempre que sea posible.",
            "Mantente hidratada para reducir la retención de líquidos.",
            "Evita estar de pie por largos períodos.",
            "Usa zapatos cómodos y de soporte.",
          ],
        },
        {
          title: "3. Acidez Estomacal",
          bulletPoints: [
            "Come comidas más pequeñas y frecuentes.",
            "Evita alimentos picantes, ácidos o grasosos.",
            "No te acuestes inmediatamente después de comer.",
            "Duerme con la cabeza ligeramente elevada.",
            "Usa antiácidos aprobados por tu proveedor.",
          ],
        },
        {
          title: "4. Calambres en las Piernas",
          bulletPoints: [
            "Estira las pantorrillas antes de dormir.",
            "Mantente hidratada.",
            "Consume alimentos ricos en magnesio y potasio, como plátanos y nueces.",
            "Masajea o aplica calor en el área afectada.",
          ],
        },
        {
          title: "5. Dificultad para Dormir",
          bulletPoints: [
            "Usa una almohada de embarazo para mayor soporte.",
            "Crea una rutina relajante antes de dormir (e.g., baño tibio, lectura).",
            "Evita la cafeína por la tarde y noche.",
            "Practica estiramientos suaves o meditación antes de acostarte.",
          ],
        },
        {
          title: "6. Falta de Aire",
          bulletPoints: [
            "Siéntate erguida para dar más espacio a los pulmones.",
            "Duerme con almohadas para estar más elevada.",
            "Practica ejercicios de respiración lenta y profunda.",
          ],
        },
        {
          title: "7. Estreñimiento",
          bulletPoints: [
            "Consume alimentos ricos en fibra como frutas, verduras y granos integrales.",
            "Bebe mucha agua.",
            "Mantente activa con ejercicios suaves como caminar.",
          ],
        },
        {
          title: "8. Contracciones de Braxton Hicks",
          bulletPoints: [
            "Mantente hidratada; la deshidratación puede desencadenarlas.",
            "Cambia de posición o descansa.",
            "Si las contracciones son dolorosas o regulares, llama a tu proveedor para descartar un parto prematuro.",
          ],
        },
      ],
      bottomText: {
        title: "Cuándo Llamar a Tu Proveedor",
        content:
          "Comunícate con tu proveedor de atención médica si:\n- Las molestias son severas o no mejoran con los remedios.\n- Experimentas hinchazón repentina en manos o rostro.\n- Tienes visión borrosa, dolores de cabeza severos o dificultad para respirar.\n- Los movimientos de tu bebé disminuyen.",
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
          {
            key: "support",
            label: languagePreference === "Español" ? "Apoyo" : "Support",
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
