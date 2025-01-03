import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const symptomData = [
  {
    id: "1",
    symptom: { en: "Headache", es: "Dolor de cabeza" },
    severity: "serious",
    description: {
      en: "A severe headache can indicate preeclampsia. Contact your provider immediately.",
      es: "Un dolor de cabeza severo puede indicar preeclampsia. Comuníquese con su proveedor de inmediato.",
    },
    advice: {
      en: "If you are concerned, please call your clinic.",
      es: "Si está preocupado/a, comuníquese con su clínica.",
    },
  },
  {
    id: "2",
    symptom: { en: "Nausea", es: "Náuseas" },
    severity: "common",
    description: {
      en: "Nausea is a common symptom during pregnancy, especially in the first trimester.",
      es: "Las náuseas son un síntoma común durante el embarazo, especialmente en el primer trimestre.",
    },
    advice: {
      en: "Stay hydrated and eat small, frequent meals.",
      es: "Manténgase hidratado/a y coma comidas pequeñas y frecuentes.",
    },
  },
];

const SymptomChecker = () => {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const language = "en"; // Default language

  const startFadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleSymptomSelect = (symptom) => {
    setSelectedSymptom(symptom);
    fadeAnim.setValue(0); // Reset animation
    startFadeIn();
  };

  const renderSymptomCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSymptomSelect(item)}
    >
      <Text style={styles.cardTitle}>{item.symptom[language]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {language === "en" ? "Symptom Checker" : "Verificador de síntomas"}
      </Text>

      {!selectedSymptom ? (
        <FlatList
          data={symptomData}
          keyExtractor={(item) => item.id}
          renderItem={renderSymptomCard}
          contentContainerStyle={styles.cardList}
        />
      ) : (
        <Animated.View style={[styles.resultContainer, { opacity: fadeAnim }]}>
          <Text style={styles.resultHeader}>
            {selectedSymptom.symptom[language]}
          </Text>
          <Text style={styles.resultDescription}>
            {selectedSymptom.description[language]}
          </Text>
          <Text style={styles.resultAdvice}>
            {selectedSymptom.advice[language]}
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedSymptom(null)}
          >
            <Text style={styles.backButtonText}>
              {language === "en" ? "Back to Symptoms" : "Volver a los síntomas"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.nEW,
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: FontFamily.montserrat,
    color: Color.colorDarkslateblue_200,
  },
  cardList: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: Border.br_md,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.montserrat,
    color: Color.primary,
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  resultHeader: {
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.montserrat,
    fontWeight: "bold",
    marginBottom: 16,
    color: Color.colorDarkslateblue_200,
  },
  resultDescription: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.arial,
    textAlign: "center",
    color: "#555",
    marginBottom: 16,
  },
  resultAdvice: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.arial,
    textAlign: "center",
    color: Color.primary,
    marginBottom: 24,
  },
  backButton: {
    padding: 12,
    borderRadius: Border.br_md,
    backgroundColor: Color.primary,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.montserrat,
  },
});

export default SymptomChecker;
