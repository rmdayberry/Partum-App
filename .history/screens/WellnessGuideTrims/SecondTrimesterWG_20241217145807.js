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
          bulletPoints: [
            "Dizziness, shortness of breath, or faintness.",
            "Vaginal bleeding or unusual discharge.",
            "Severe pain or cramping.",
            "Contractions that persist after resting.",
          ],
        },
        {
          subtitleBold:
            "Staying active during your second trimester is one of the best ways to care for yourself and your baby. Let us know if you need guidance on creating a pregnancy-safe exercise plan tailored to your needs.",
        },
      ],
    },
    Español: {
      heading: "Ejercicio Durante el Segundo Trimestre",
      content:
        "Al entrar en el segundo trimestre, muchas personas notan un aumento en la energía en comparación con el primer trimestre. Mantenerse activa te ayuda a sentirte mejor y prepara tu cuerpo para el parto y la recuperación posparto.",
      sections: [
        {
          title: "Beneficios del Ejercicio en el Segundo Trimestre",
        },
        {
          subtitleBold: "Reduce dolores y molestias:",
          bulletPoints:
            "El movimiento regular alivia el dolor de espalda y la rigidez en las articulaciones.",
        },
        {
          subtitleBold: "Aumenta la energía y mejora el ánimo:",
          bulletPoints:
            "El ejercicio libera endorfinas, mejorando tu bienestar general.",
        },
        {
          subtitleBold: "Prepara tu cuerpo para el parto:",
          bulletPoints:
            "Mantiene la fuerza y resistencia necesarias para el trabajo de parto.",
        },
        {
          subtitleBold: "Apoya un aumento de peso saludable:",
          bulletPoints:
            "Ayuda a controlar el aumento de peso de manera equilibrada.",
        },
        {
          title:
            "Consejos para Hacer Ejercicio de Forma Segura en el Segundo Trimestre",
        },
        {
          subtitleBold: "Escucha a Tu Cuerpo",
          bulletPoints:
            "Evita sobreesforzarte. Si te sientes mareada, sin aliento o incómoda, detente y descansa.",
        },
        {
          subtitleBold: "Mantente Hidratada",
          bulletPoints:
            "Bebe mucha agua antes, durante y después del ejercicio para evitar la deshidratación.",
        },
        {
          subtitleBold: "Evita Ciertos Movimientos",
          bulletPoints:
            "Omite ejercicios que impliquen acostarse boca arriba, torsiones profundas o actividades con alto riesgo de caídas.",
        },
        {
          subtitleBold: "Calienta y Enfría",
          bulletPoints:
            "Siempre comienza con un calentamiento ligero y termina con estiramientos suaves para evitar lesiones.",
        },
        {
          title: "Cuándo Dejar de Ejercitarse y Llamarnos",
        },
        {
          bulletPoints: [
            "Mareos, dificultad para respirar o sensación de desmayo.",
            "Sangrado vaginal o flujo inusual.",
            "Dolor severo o calambres.",
            "Contracciones que persisten después de descansar.",
          ],
        },
        {
          subtitleBold:
            "Mantenerte activa durante el segundo trimestre es una de las mejores maneras de cuidarte a ti misma y a tu bebé. Háznoslo saber si necesitas orientación para crear un plan de ejercicio seguro para el embarazo, adaptado a tus necesidades.",
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
          subtitleBold: "Iron:",
          bulletPoints:
            "Prevents anemia and supports increased blood volume. Sources: Red meat, spinach, lentils.",
        },
        {
          subtitleBold: "Calcium and Vitamin D:",
          bulletPoints:
            "Builds strong bones and teeth. Sources: Dairy, fortified plant milk, leafy greens.",
        },
        {
          subtitleBold: "Omega-3 Fatty Acids:",
          bulletPoints:
            "Supports brain and eye development. Sources: Salmon, chia seeds, flaxseeds.",
        },

        {
          title: "General Nutrition Tips",
          bulletPoints: [
            "Eat small, frequent meals: Helps with digestion and reduces discomfort.",
            "Stay hydrated: Drink at least 8-10 glasses of water daily.",
            "Monitor weight gain: Maintain a healthy rate of weight gain as advised by your provider.",
          ],
        },
        {
          title: "Foods and Substances to Avoid",
        },
        {
          subtitleBold: "High-Mercury Fish",
          bulletPoints:
            "Avoid fish like shark, swordfish, and king mackerel, which can have high mercury levels.",
        },
        {
          subtitleBold: "Unpasteurized Dairy and Juices",
          bulletPoints:
            "These can carry harmful bacteria. Always choose pasteurized options.",
        },
        {
          subtitleBold: "Raw or Undercooked Foods",
          bulletPoints:
            "Avoid raw eggs, sushi, or undercooked meat to reduce the risk of foodborne illness.",
        },
        {
          subtitleBold: "Caffeine and Alcohol",
          bulletPoints:
            "Limit caffeine to no more than 200mg per day (about one 12oz coffee). Avoid alcohol entirely during pregnancy.",
        },
        {
          title: "Nutrition Nugget: Balanced Eating",
        },
        {
          subtitleBold:
            "Eating a variety of whole foods during the second trimester ensures you and your baby get all the essential nutrients. Think of your plate as a mix of colorful vegetables, lean proteins, whole grains, and healthy fats. Remember, every bite you take is helping your baby grow and thrive!",
        },
      ],
    },
    Español: {
      heading: "Nutrición Durante el Segundo Trimestre",
      content:
        "El segundo trimestre es un período de crecimiento rápido para tu bebé. Seguir una dieta bien equilibrada asegura que tú y tu bebé obtengan los nutrientes necesarios.",
      sections: [
        {
          title: "Nutrientes Clave para el Segundo Trimestre",
          subtitleBold: "Hierro:",
          bulletPoints:
            "Previene la anemia y apoya el aumento del volumen sanguíneo. Fuentes: Carne roja, espinaca, lentejas.",
        },
        {
          subtitleBold: "Calcio y Vitamina D:",
          bulletPoints:
            "Fortalece los huesos y los dientes. Fuentes: Lácteos, leche vegetal fortificada, verduras de hoja verde.",
        },
        {
          subtitleBold: "Ácidos Grasos Omega-3:",
          bulletPoints:
            "Apoya el desarrollo del cerebro y los ojos. Fuentes: Salmón, semillas de chía, linaza.",
        },

        {
          title: "Consejos Generales de Nutrición",
          bulletPoints: [
            "Come comidas pequeñas y frecuentes: Ayuda con la digestión y reduce las molestias.",
            "Mantente hidratada: Bebe al menos 8-10 vasos de agua al día.",
            "Monitorea el aumento de peso: Mantén una ganancia de peso saludable según las recomendaciones de tu proveedor.",
          ],
        },
        {
          title: "Alimentos y Sustancias que Debes Evitar",
        },
        {
          subtitleBold: "Pescado con Alto Contenido de Mercurio",
          bulletPoints:
            "Evita pescados como el tiburón, pez espada y caballa real, que pueden tener niveles altos de mercurio.",
        },
        {
          subtitleBold: "Lácteos y Jugos No Pasteurizados",
          bulletPoints:
            "Estos pueden contener bacterias dañinas. Elige siempre opciones pasteurizadas.",
        },
        {
          subtitleBold: "Alimentos Crudos o Insuficientemente Cocidos",
          bulletPoints:
            "Evita huevos crudos, sushi o carnes poco cocidas para reducir el riesgo de enfermedades transmitidas por los alimentos.",
        },
        {
          subtitleBold: "Cafeína y Alcohol",
          bulletPoints:
            "Limita la cafeína a no más de 200 mg por día (aproximadamente un café de 12 oz). Evita por completo el alcohol durante el embarazo.",
        },
        {
          title: "Consejo Nutricional: Alimentación Equilibrada",
        },
        {
          subtitleBold:
            "Comer una variedad de alimentos integrales durante el segundo trimestre asegura que tú y tu bebé reciban todos los nutrientes esenciales. Piensa en tu plato como una mezcla de vegetales coloridos, proteínas magras, granos enteros y grasas saludables. ¡Recuerda que cada bocado que tomas ayuda a tu bebé a crecer y prosperar!",
        },
      ],
    },
  },
  mentalHealth: {
    English: {
      heading: "Mental Health During Your Second Trimester",
      content:
        "The second trimester often brings relief from some of the physical challenges of early pregnancy, but mental health remains an essential part of your well-being. As your baby grows, you may experience a mix of emotions—excitement, worry, or even unexpected stress. Taking care of your mental health during this time helps you feel balanced and better prepared for the journey ahead.",
      sections: [
        {
          title: "JustBirth Space: Free Support for Every Parent",
        },
        {
          subtitleBold:
            "Everyone deserves support during their reproductive journey:",
          bulletPoints:
            "JustBirth Space offers free virtual classes and doula support to help you feel informed, confident, and connected.",
        },
        {
          title: "What They Offer:",
          bulletPoints: [
            "Virtual classes on pregnancy, childbirth, and parenting.",
            "Live doula support from 7am to 9pm every day.",
            "A safe space for questions, guidance, and emotional support.",
          ],
        },
        {
          title: "How to Connect:",
          bulletPoints: [
            "Visit www.justbirthspace.org.",
            "Scan the QR code (insert code in the app or print materials).",
          ],
        },
        {
          title: "Other Mental Health Tips for the Second Trimester",
        },
        {
          subtitleBold: "Acknowledge Your Emotions:",
          bulletPoints:
            "It’s okay to feel a range of emotions, from joy to anxiety. Pregnancy is a big life change, and being honest with yourself about how you’re feeling can help.",
        },
        {
          subtitleBold: "Lean on Your Support System:",
          bulletPoints:
            "Spend time with family and friends who uplift you. Share your feelings with someone you trust.",
        },
        {
          subtitleBold: "Join a Pregnancy Group:",
          bulletPoints:
            "Connecting with others who are also expecting can provide camaraderie and reassurance. Look for local or virtual support groups.",
        },
        {
          subtitleBold: "Practice Mindfulness and Relaxation:",
          bulletPoints:
            "Take time each day to breathe deeply, meditate, or engage in activities that calm your mind. Apps like Calm or Headspace can be helpful.",
        },
        {
          subtitleBold: "Create a Self-Care Routine:",
          bulletPoints:
            "Dedicate time to activities you enjoy, whether it’s reading, taking a warm bath, journaling, or going for a walk.",
        },
        {
          subtitleBold: "Stay Active:",
          bulletPoints:
            "Exercise isn’t just for your physical health—it can also boost your mood. Even a 10-minute walk can make a difference.",
        },
        {
          subtitleBold: "Prepare for Parenthood at Your Own Pace:",
          bulletPoints:
            "It’s natural to feel overwhelmed about the changes ahead. Focus on one task at a time, like reading about childbirth or preparing your baby’s nursery.",
        },
        {
          subtitleBold: "Know When to Ask for Help:",
          bulletPoints:
            "If you’re feeling persistently sad, anxious, or overwhelmed, talk to your healthcare provider. They can recommend counseling or other resources.",
        },
        {
          title: "When to Reach Out for Help",
        },
        {
          bulletPoints: [
            "Persistent sadness or hopelessness.",
            "Intense anxiety or panic attacks.",
            "Difficulty concentrating or completing daily tasks.",
            "Changes in appetite or sleep patterns.",
            "Thoughts of harming yourself or others.",
          ],
        },
        {
          title: "Resources for Mental Health Support",
        },
        {
          bulletPoints: [
            "JustBirth Space: www.justbirthspace.org",
            "Postpartum Support International: 1-800-944-4773 or www.postpartum.net",
            "National Domestic Violence Hotline: 1-800-799-7233",
          ],
        },
        {
          subtitleBold:
            "Remember, caring for your mental health is one of the best ways to care for your baby. You don’t have to do this alone—we’re here to support you every step of the way.",
        },
      ],
    },
    Spanish: {
      heading: "Salud Mental Durante el Segundo Trimestre",
      content:
        "El segundo trimestre a menudo trae alivio de algunos desafíos físicos del inicio del embarazo, pero la salud mental sigue siendo una parte esencial de tu bienestar. A medida que tu bebé crece, puedes experimentar una mezcla de emociones: entusiasmo, preocupación o incluso estrés inesperado. Cuidar tu salud mental durante este período te ayuda a sentirte equilibrada y mejor preparada para el camino por delante.",
      sections: [
        {
          title: "JustBirth Space: Apoyo Gratuito para Cada Persona Gestante",
        },
        {
          subtitleBold: "Todos merecen apoyo durante su viaje reproductivo:",
          bulletPoints:
            "JustBirth Space ofrece clases virtuales gratuitas y apoyo de doulas para ayudarte a sentirte informada, segura y conectada.",
        },
        {
          title: "Lo Que Ofrecen:",
          bulletPoints: [
            "Clases virtuales sobre embarazo, parto y crianza.",
            "Apoyo en vivo con doulas de 7 a.m. a 9 p.m. todos los días.",
            "Un espacio seguro para preguntas, orientación y apoyo emocional.",
          ],
        },
        {
          title: "Cómo Conectarte:",
          bulletPoints: [
            "Visita www.justbirthspace.org.",
            "Escanea el código QR (insertar código en la app o materiales impresos).",
          ],
        },
        {
          title: "Otros Consejos de Salud Mental para el Segundo Trimestre",
        },
        {
          subtitleBold: "Reconoce Tus Emociones:",
          bulletPoints:
            "Está bien sentir una variedad de emociones, desde alegría hasta ansiedad. El embarazo es un gran cambio en la vida, y ser honesta contigo misma sobre cómo te sientes puede ayudar.",
        },
        {
          subtitleBold: "Apóyate en Tu Red de Apoyo:",
          bulletPoints:
            "Pasa tiempo con familiares y amigos que te hagan sentir bien. Comparte tus sentimientos con alguien en quien confíes.",
        },
        {
          subtitleBold: "Únete a un Grupo de Embarazo:",
          bulletPoints:
            "Conectarte con otras personas que también están esperando puede brindarte compañía y tranquilidad. Busca grupos de apoyo locales o virtuales.",
        },
        {
          subtitleBold: "Practica la Atención Plena y la Relajación:",
          bulletPoints:
            "Dedica tiempo cada día a respirar profundamente, meditar o realizar actividades que calmen tu mente. Aplicaciones como Calm o Headspace pueden ser útiles.",
        },
        {
          subtitleBold: "Crea una Rutina de Autocuidado:",
          bulletPoints:
            "Dedica tiempo a actividades que disfrutes, ya sea leer, tomar un baño caliente, escribir en un diario o salir a caminar.",
        },
        {
          subtitleBold: "Mantente Activa:",
          bulletPoints:
            "El ejercicio no es solo para la salud física, también puede mejorar tu estado de ánimo. Incluso una caminata de 10 minutos puede marcar la diferencia.",
        },
        {
          subtitleBold: "Prepárate Para la Maternidad a Tu Ritmo:",
          bulletPoints:
            "Es natural sentirse abrumada por los cambios que se avecinan. Concéntrate en una tarea a la vez, como leer sobre el parto o preparar la habitación del bebé.",
        },
        {
          subtitleBold: "Sabe Cuándo Pedir Ayuda:",
          bulletPoints:
            "Si te sientes constantemente triste, ansiosa o abrumada, habla con tu proveedor de atención médica. Pueden recomendarte consejería u otros recursos.",
        },
        {
          title: "Cuándo Buscar Ayuda",
        },
        {
          bulletPoints: [
            "Tristeza persistente o sensación de desesperanza.",
            "Ansiedad intensa o ataques de pánico.",
            "Dificultad para concentrarte o realizar tareas diarias.",
            "Cambios en el apetito o los patrones de sueño.",
            "Pensamientos de hacerte daño a ti misma o a otros.",
          ],
        },
        {
          title: "Recursos de Apoyo para la Salud Mental",
        },
        {
          bulletPoints: [
            "JustBirth Space: www.justbirthspace.org",
            "Postpartum Support International: 1-800-944-4773 o www.postpartum.net",
            "Línea Directa Nacional de Violencia Doméstica: 1-800-799-7233",
          ],
        },
        {
          subtitleBold:
            "Recuerda, cuidar tu salud mental es una de las mejores maneras de cuidar a tu bebé. No tienes que hacerlo sola: estamos aquí para apoyarte en cada paso del camino.",
        },
      ],
    },
  },
  symptoms: {
    English: {
      heading: "Symptoms During Your Second Trimester",
      content:
        "The second trimester often brings relief from some of the discomforts of early pregnancy, but new experiences and sensations, including feeling your baby move, take center stage. Here's what you need to know about common symptoms and when to seek help.",
      sections: [
        {
          title: "Fetal Movement",
          subtitleBold:
            "Feeling your baby move for the first time can be magical! Here’s what to expect:",
        },
        {
          subtitleBold: "When You’ll Feel Movement:",
          bulletPoints: [
            "Babies start moving very early, but most people don’t feel these movements regularly until 20 to 22 weeks of pregnancy.",
            "Some may feel movement as early as 14 or 15 weeks, especially in a second or subsequent pregnancy.",
          ],
        },
        {
          subtitleBold: "What It Feels Like:",
          bulletPoints: [
            "Early movements may feel like butterfly wings, fluttering, or even a bold kick.",
          ],
        },
        {
          subtitleBold: "Don’t Worry:",
          bulletPoints: [
            "If you don’t feel regular movement until 22 weeks, this is completely normal. Everyone experiences fetal movement differently.",
          ],
        },
        {
          title: "Danger Signs & Symptoms",
          subtitleBold:
            "Call us immediately if you experience any of the following:",
        },
        {
          bulletPoints: [
            "Severe Vomiting: You cannot keep food or water down for 24 hours.",
            "Vaginal Bleeding: Any amount of bleeding needs to be evaluated.",
            "Severe Abdominal Pain: Intense pain in your abdomen is not normal and should be checked.",
            "Fever Over 100.4°F (38°C): A fever may signal an infection that requires treatment.",
          ],
        },
        {
          title: "Other Common Second Trimester Symptoms",
        },
        {
          subtitleBold: "Round Ligament Pain:",
          bulletPoints: [
            "As your uterus grows, the ligaments supporting it stretch, causing sharp or dull pain on one or both sides of your abdomen.",
            "What Helps: Rest, change positions slowly, and try light stretching.",
          ],
        },
        {
          subtitleBold: "Back Pain:",
          bulletPoints: [
            "The added weight and shift in your center of gravity can cause discomfort in your lower back.",
            "What Helps: Maintain good posture, wear supportive shoes, and consider a maternity support belt.",
          ],
        },
        {
          subtitleBold: "Heartburn:",
          bulletPoints: [
            "Hormones relax the muscles in your esophagus, making heartburn more likely.",
            "What Helps: Eat smaller meals, avoid lying down after eating, and prop yourself up with pillows at night.",
          ],
        },
        {
          subtitleBold: "Leg Cramps:",
          bulletPoints: [
            "Many pregnant people experience cramps in their legs, especially at night.",
            "What Helps: Stay hydrated, stretch your legs before bed, and try magnesium or calcium supplements if recommended by your provider.",
          ],
        },
        {
          subtitleBold: "Constipation:",
          bulletPoints: [
            "Slower digestion due to pregnancy hormones can lead to constipation.",
            "What Helps: Drink plenty of water, eat high-fiber foods, and stay active.",
          ],
        },
        {
          subtitleBold: "Swelling (Edema):",
          bulletPoints: [
            "Mild swelling in your feet, ankles, and hands is common as your body retains more fluid.",
            "What Helps: Elevate your feet, avoid standing for long periods, and wear comfortable shoes.",
          ],
        },
        {
          subtitleBold: "Braxton Hicks Contractions:",
          bulletPoints: [
            "These are 'practice contractions' that feel like a tightening in your abdomen. They are usually painless and irregular.",
            "What Helps: Drink water and rest if they become uncomfortable. Call us if they are frequent, painful, or accompanied by other symptoms.",
          ],
        },
        {
          title: "When to Call Us for Other Symptoms:",
          bulletPoints: [
            "Severe Headaches: Persistent headaches that don’t go away with rest or hydration may signal a need for evaluation.",
            "Changes in Vision: Blurred vision, spots, or sudden changes could be signs of high blood pressure or preeclampsia.",
            "Decreased Fetal Movement After 22 Weeks: If you notice reduced movement compared to normal after 22 weeks, contact us immediately.",
          ],
        },
        {
          subtitleBold:
            "Your second trimester is often a time of growth, connection, and new experiences. Let us know if you have any concerns or need additional support.",
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
    const { heading, content, sections, bottomText } =
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
    marginBottom: 4,
  },
});

export default SecondTrimester;
