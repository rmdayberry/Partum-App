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
      ],
      bottomText:
        "Need More Information? Check out the resources linked below for more guidance on eating well during pregnancy.",
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
      bottomText:
        "¿Necesitas Más Información? Consulta los recursos enlazados a continuación para obtener más orientación sobre cómo alimentarte bien durante el embarazo.",
    },
  },
  exercise: {
    English: {
      heading: "Exercise During Your First Trimester",
      content:
        "Staying active during pregnancy is one of the best things you can do for yourself and your baby. Regular exercise can help reduce stress, improve your mood, boost your energy levels, and prepare your body for the physical demands of pregnancy and childbirth. During your first trimester, it’s important to focus on gentle, safe movements while listening to your body.",
      title1: "Benefits of Exercise in the First Trimester:",
      content1: [
        "Reduces fatigue: Gentle movement can help combat the tiredness that many feel during early pregnancy.",
        "Eases nausea: Light exercise may reduce morning sickness for some people.",
        "Improves mood: Staying active can reduce stress and help you feel more positive during your pregnancy.",
        "Supports healthy weight gain: Exercise helps your body manage the natural changes of pregnancy.",
        "Builds strength for later trimesters and delivery: Starting early sets a strong foundation for the months ahead.",
      ],
      title2: "Safe and Effective Activities for the First Trimester:",
      content2: [
        "Walking: Keeps your body moving without putting too much strain on your joints.",
        "Stretching and Yoga: Gentle stretching and prenatal yoga can improve flexibility, reduce aches, and promote relaxation. Avoid poses that involve lying flat on your back or deep twists.",
        "Swimming or Water Aerobics: Water activities are low-impact and great for your joints, while also keeping you cool and supported.",
        "Strength Training: Use light weights or bodyweight exercises to maintain muscle tone. Focus on controlled movements and avoid heavy lifting.",
        "Pelvic Floor Exercises (Kegels): Strengthening your pelvic floor early in pregnancy can reduce the risk of incontinence and improve recovery postpartum.",
      ],
      title3: "What to Avoid in the First Trimester:",
      content3: [
        "High-impact or risky activities: Avoid contact sports, skiing, or anything with a high risk of falling or injury.",
        "Overheating: Intense workouts that cause you to overheat can be harmful. Stay cool and hydrated.",
        "Lying on your back for long periods: As your uterus grows, lying flat on your back can reduce blood flow.",
      ],
      title4: "Tips for Success:",
      content4: [
        "Start Slow: Begin with 10-15 minutes of light activity a few times a week and build up gradually.",
        "Stay Hydrated: Drink plenty of water before, during, and after exercising.",
        "Wear Comfortable Clothes: Opt for breathable, stretchy clothes and supportive footwear.",
        "Create a Routine: Add a short walk, gentle stretch, or light yoga to your daily schedule. Small, consistent efforts make a big difference!",
      ],
    },
    Español: {
      heading: "Ejercicio Durante el Primer Trimestre",
      content:
        "Mantenerte activa durante el embarazo es una de las mejores cosas que puedes hacer por ti y por tu bebé. El ejercicio regular puede ayudarte a reducir el estrés, mejorar tu estado de ánimo, aumentar tus niveles de energía y preparar tu cuerpo para las demandas físicas del embarazo y el parto. Durante el primer trimestre, es importante enfocarte en movimientos suaves y seguros, siempre escuchando a tu cuerpo.",
      title1: "Beneficios del Ejercicio en el Primer Trimestre:",
      content1: [
        "Reduce la fatiga: El movimiento suave puede ayudarte a combatir el cansancio común en las primeras etapas del embarazo.",
        "Alivia las náuseas: Para algunas personas, el ejercicio ligero puede reducir las náuseas matutinas.",
        "Mejora el estado de ánimo: Mantenerte activa puede reducir el estrés y ayudarte a sentirte más positiva durante tu embarazo.",
        "Apoya un aumento de peso saludable: El ejercicio ayuda a tu cuerpo a adaptarse a los cambios naturales del embarazo.",
        "Fortalece tu cuerpo para los próximos trimestres y el parto: Comenzar temprano sienta una base sólida para los meses venideros.",
      ],
      title2: "Actividades Seguras y Efectivas para el Primer Trimestre:",
      content2: [
        "Caminar: Mantiene tu cuerpo activo sin poner demasiada tensión en tus articulaciones.",
        "Estiramientos y Yoga: Los estiramientos suaves y el yoga prenatal mejoran la flexibilidad, reducen dolores y fomentan la relajación. Evita las posturas que impliquen acostarte de espaldas o giros profundos.",
        "Natación o Aeróbicos en el Agua: Las actividades acuáticas son de bajo impacto y excelentes para tus articulaciones, además de mantenerte fresca y apoyada.",
        "Entrenamiento de Fuerza: Usa pesas ligeras o ejercicios con tu propio peso para mantener el tono muscular. Enfócate en movimientos controlados y evita levantar objetos muy pesados.",
        "Ejercicios del Suelo Pélvico (Kegels): Fortalecer el suelo pélvico desde temprano puede reducir el riesgo de incontinencia y mejorar la recuperación posparto.",
      ],
      title3: "Qué Evitar en el Primer Trimestre:",
      content3: [
        "Actividades de alto impacto o riesgosas: Evita deportes de contacto, esquiar o cualquier actividad con alto riesgo de caídas o lesiones.",
        "Sobrecalentamiento: Los entrenamientos intensos que causan sobrecalentamiento pueden ser perjudiciales. Mantente fresca e hidratada.",
        "Acostarte de espaldas por largos períodos: A medida que tu útero crece, acostarte de espaldas puede reducir el flujo sanguíneo.",
      ],
      title4: "Consejos para el Éxito:",
      content4: [
        "Empieza Despacio: Comienza con 10-15 minutos de actividad ligera unas cuantas veces a la semana y aumenta gradualmente.",
        "Mantente Hidratada: Bebe mucha agua antes, durante y después del ejercicio.",
        "Usa Ropa Cómoda: Opta por ropa transpirable y elástica, y calzado de apoyo.",
        "Crea una Rutina: Agrega una caminata corta, un estiramiento suave o yoga ligero a tu horario diario. ¡Pequeños esfuerzos constantes hacen una gran diferencia!",
      ],
    },
  },
  mentalHealth: {
    English: {
      heading: "Mental Health During Pregnancy",
      content:
        "Caring for your mental health is just as important as caring for your physical health. Pregnancy is a time of incredible change, and it’s natural to experience a range of emotions. As you grow this new life inside you, remember to be kind to yourself and prioritize your mental well-being.",
      title1: "Depression or Anxiety",
      content1: [
        "Pregnancy and the postpartum period can bring mood changes, anxiety, or depression. These are common and treatable.",
        "If you’re struggling with feelings of sadness, worry, or overwhelming stress, please let us know.",
        "Together, we can create a plan to support your mental wellness, whether through counseling, support groups, or safe medications if needed.",
      ],
      title2: "Tips for Caring for Your Mental Health:",
      content2: [
        "Surround Yourself with Supportive People: Spend time with friends, family, or community members who uplift you. Avoid those who bring unnecessary stress or negativity into your life.",
        "Practice Deep Breathing: When life feels overwhelming, stop and take 5 deep breaths. Imagine the air filling your belly, calming your mind and body.",
        "Create a Safe Space: You and your baby deserve to be in a safe, loving environment. Avoid toxic people and places whenever possible.",
      ],
      title3: "When to Seek Help",
      content3: [
        "If you are experiencing any of the following, reach out to us or a mental health professional:",
        "Persistent sadness or hopelessness",
        "Intense anxiety or panic attacks",
        "Trouble bonding with your baby",
        "Thoughts of harming yourself or others",
        "You don’t have to go through this alone. We’re here to support you.",
      ],
      title4: "Resources for a Safe Environment:",
      content4:
        "If you need help with a difficult relationship or living situation, don’t hesitate to reach out to us or contact the hotline below:\nDomestic Violence Crisis Hotline: 866-223-1111\nYour safety and well-being are top priorities.",
      bottomText:
        "Be Good to Yourself: Taking care of your mental health is not selfish—it’s an essential part of caring for your baby. Be gentle with yourself, embrace self-care, and seek support when you need it.",
    },
    Español: {
      heading: "Salud Mental Durante el Embarazo",
      content:
        "Cuidar tu salud mental es tan importante como cuidar tu salud física. El embarazo es una etapa de muchos cambios, y es natural experimentar una variedad de emociones. Mientras formas esta nueva vida dentro de ti, recuerda ser amable contigo misma y priorizar tu bienestar mental.",
      title1: "Depresión o Ansiedad",
      content1: [
        "El embarazo y el período posparto pueden traer cambios de humor, ansiedad o depresión. Estas son situaciones comunes y tratables.",
        "Si estás lidiando con sentimientos de tristeza, preocupación o estrés abrumador, avísanos.",
        "Juntos podemos crear un plan para apoyar tu bienestar mental, ya sea a través de terapia, grupos de apoyo o medicamentos seguros si es necesario.",
      ],
      title2: "Consejos para Cuidar tu Salud Mental:",
      content2: [
        "Rodéate de Personas que te Apoyen: Pasa tiempo con amigos, familiares o miembros de la comunidad que te hagan sentir bien. Evita a las personas que generen estrés o negatividad innecesaria.",
        "Practica Respiración Profunda: Cuando la vida se sienta abrumadora, detente y toma 5 respiraciones profundas. Imagina que el aire llena tu abdomen, calmando tu mente y cuerpo.",
        "Crea un Espacio Seguro: Tú y tu bebé merecen estar en un ambiente seguro y amoroso. Siempre que sea posible, evita lugares y personas tóxicas.",
      ],
      title3: "Cuándo Buscar Ayuda",
      content3: [
        "Si experimentas alguno de los siguientes síntomas, busca apoyo con nosotros o un profesional de salud mental:",
        "Tristeza o desesperanza persistente",
        "Ansiedad intensa o ataques de pánico",
        "Dificultad para conectar con tu bebé",
        "Pensamientos de hacerte daño a ti misma o a otros",
        "No tienes que pasar por esto sola. Estamos aquí para apoyarte.",
      ],
      title4: "Recursos para un Entorno Seguro:",
      content4:
        "Si necesitas ayuda con una relación difícil o una situación de vida complicada, no dudes en contactarnos o llamar a la línea de ayuda:\nLínea de Crisis por Violencia Doméstica: 866-223-1111\nTu seguridad y bienestar son nuestra prioridad.",
      bottomText:
        "Sé Buena Contigo Misma: Cuidar tu salud mental no es egoísta, es una parte esencial del cuidado de tu bebé. Sé amable contigo misma, adopta el autocuidado y busca apoyo cuando lo necesites.",
    },
  },
  symptoms: {
    English: {
      heading: "Danger Signs & Symptoms",
      content:
        "The first trimester of pregnancy can be an anxious time as you wait to hear your baby’s heartbeat or feel their first movements. Remember, you can always reach out to us if you have questions. Here are some signs and symptoms that require immediate attention:",
      title1: "When to Call Us",
      content1: [
        "You cannot keep food or water down for 24 hours.",
        "You are bleeding from your vagina.",
        "You have severe abdominal pain.",
        "You have a fever higher than 100.4°F (38°C).",
      ],
      title2: "Common Symptoms in the First Trimester",
      content2: [
        "Nausea and Vomiting: Feeling nauseated or throwing up is very common in early pregnancy, though it can feel miserable. Here are some tips to help you manage:",
        "• Eat small, frequent meals.",
        "• Try to eat something every 2 hours.",
        "• Listen to your cravings. Eat what sounds good, even if it’s not your usual diet.",
        "• Eat before getting out of bed. A small snack, like crackers or dry cereal, can help.",
        "• Adjust prenatal vitamins if they worsen nausea; switch to folic acid.",
        "• Try ginger (tea, candies, or ginger ale) or lemon drops.",
        "• Use Sea Bands for acupressure or supplement with Vitamin B-6 (50mg twice a day).",
        "• Consider Unisom for sleep and nausea relief (ask for a prescription).",
        "Note: If you can’t keep food or fluids down for 24 hours, call us—you may need IV hydration or stronger medication.",
      ],
      title3: "Sore Breasts",
      content3: [
        "Sore breasts are often one of the first signs of pregnancy. This tenderness happens because your body is already preparing to produce milk for your baby.",
        "• Your breasts may grow larger and feel tender or sensitive.",
        "• Some people notice a small amount of leaking, but most do not.",
        "• Milk production won’t start until after your baby and the placenta are delivered.",
        "Throughout pregnancy, your body is getting ready to provide the perfect nourishment for your baby. After birth, your milk will adapt by the hour and day to meet their exact needs. It’s a truly miraculous process.",
      ],
    },
    Español: {
      heading: "Signos y Síntomas de Alerta",
      content:
        "El primer trimestre del embarazo puede ser un tiempo de ansiedad mientras esperas escuchar los latidos de tu bebé o sentir sus primeros movimientos. Recuerda que siempre puedes contactarnos si tienes preguntas. Estos son algunos signos y síntomas que requieren atención inmediata:",
      title1: "Cuándo Llamarnos",
      content1: [
        "No puedes retener comida o agua durante 24 horas.",
        "Tienes sangrado vaginal.",
        "Tienes dolor abdominal severo.",
        "Tienes fiebre mayor a 100.4°F (38°C).",
      ],
      title2: "Síntomas Comunes en el Primer Trimestre",
      content2: [
        "Náuseas y Vómitos: Sentir náuseas o vomitar es muy común al principio del embarazo. Aquí tienes algunos consejos para manejarlas:",
        "• Come comidas pequeñas y frecuentes.",
        "• Intenta comer algo cada 2 horas.",
        "• Escucha tus antojos y come lo que se te antoje.",
        "• Come algo antes de levantarte de la cama, como galletas saladas o cereal seco.",
        "• Ajusta las vitaminas prenatales si empeoran tus náuseas; cambia a ácido fólico.",
        "• Prueba el jengibre (té, caramelos o ginger ale) o los caramelos de limón.",
        "• Usa pulseras Sea Bands para acupresión o toma Vitamina B-6 (50mg dos veces al día).",
        "• Considera tomar Unisom para dormir y reducir las náuseas (consulta si necesitas receta).",
        "Nota: Si no puedes retener comida ni líquidos durante 24 horas, llámanos; podrías necesitar hidratación intravenosa o medicamentos más fuertes.",
      ],
      title3: "Senos Sensibles",
      content3: [
        "Los senos sensibles son a menudo uno de los primeros signos de embarazo. Esta sensibilidad ocurre porque tu cuerpo ya se está preparando para producir leche para tu bebé.",
        "• Es posible que tus senos crezcan y se sientan tiernos o sensibles.",
        "• Algunas personas notan una pequeña cantidad de secreción, pero la mayoría no.",
        "• La producción de leche no comenzará hasta después del nacimiento de tu bebé y la placenta.",
        "Durante todo el embarazo, tu cuerpo se está preparando para ofrecer el alimento perfecto a tu bebé. Después del parto, la leche se adaptará cada hora y cada día para satisfacer exactamente sus necesidades. Es un proceso realmente milagroso.",
      ],
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
      bottomText,
    } =
      translations[activeTab]?.[languagePreference] ||
      translations[activeTab]?.English ||
      {};

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Main Heading */}
        <Image source={topicImages[activeTab]} style={styles.image} />
        <View style={styles.Contentcontainer}>
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
          {/* Bottom Text */}
          {bottomText && (
            <Text style={[styles.content, styles.bottomText]}>
              {bottomText}
            </Text>
          )}
        </View>
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
          {
            key: "exercise",
            label: languagePreference === "Español" ? "Ejercicio" : "Exercise",
          },
          {
            key: "mentalHealth",
            label:
              languagePreference === "Español"
                ? "Salud Mental"
                : "Mental Health",
          },
          {
            key: "symptoms",
            label: languagePreference === "Español" ? "Síntomas" : "Symptoms",
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
  Contentcontainer: {
    padding: 16,
    marginBottom: 20,
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
    flexGrow: 1,
    justifyContent: "flex-start",
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
    color: "#333",
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 16,
    color: "#333",
    marginVertical: 4,
    marginLeft: 8,
  },
  bottomText: {
    marginTop: 10,
    padding: 15,
    fontSize: 12,
    color: "#6200EE",
    fontWeight: "400",
    textAlign: "center",
  },
});

export default FirstTrimester;
