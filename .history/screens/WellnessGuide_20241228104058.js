import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import CollapsibleCard from "../features/resources/CollapsibleCard";

const wellnessData = [
  {
    title: { en: "Nutrition", es: "Nutrición" },
    content: {
      en: "Detailed information about Nutrition in English.",
      es: "Información detallada sobre Nutrición en Español.",
    },
  },
  {
    title: { en: "Sleep", es: "Sueño" },
    content: {
      en: "Tips and advice about Sleep in English.",
      es: "Consejos y recomendaciones sobre el Sueño en Español.",
    },
  },
  {
    title: { en: "Exercise", es: "Ejercicio" },
    content: {
      en: "Exercise routines for your trimester in English.",
      es: "Rutinas de ejercicio para tu trimestre en Español.",
    },
  },
  {
    title: { en: "Mental Health", es: "Salud Mental" },
    content: {
      en: "Strategies for mental wellness in English.",
      es: "Estrategias para el bienestar mental en Español.",
    },
  },
  {
    title: { en: "Symptoms", es: "Síntomas" },
    content: {
      en: "Common symptoms and management tips in English.",
      es: "Síntomas comunes y consejos para manejarlos en Español.",
    },
  },
];

const WellnessGuide = () => {
  const [language, setLanguage] = useState("en"); // Default to English

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentWrapper}>
        {wellnessData.map((item, index) => (
          <CollapsibleCard
            key={index}
            title={item.title}
            content={item.content}
            language={language}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  contentWrapper: {
    padding: 20,
  },
});

export default WellnessGuide;
