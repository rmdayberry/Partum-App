import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

// Symptom database
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
  // Add more symptoms here
];

const SymptomChecker = () => {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [language, setLanguage] = useState("en"); // Default language

  const handleSymptomSelect = (symptom) => {
    setSelectedSymptom(symptom);
  };

  const renderSymptom = ({ item }) => (
    <TouchableOpacity
      style={styles.symptomButton}
      onPress={() => handleSymptomSelect(item)}
    >
      <Text style={styles.symptomText}>{item.symptom[language]}</Text>
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
          renderItem={renderSymptom}
          contentContainerStyle={styles.symptomList}
        />
      ) : (
        <View style={styles.resultSection}>
          <Text style={styles.resultHeader}>
            {selectedSymptom.symptom[language]}
          </Text>
          <Text style={styles.description}>
            {selectedSymptom.description[language]}
          </Text>
          <Text style={styles.advice}>{selectedSymptom.advice[language]}</Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedSymptom(null)}
          >
            <Text style={styles.backButtonText}>
              {language === "en" ? "Back to Symptoms" : "Volver a los síntomas"}
            </Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: FontFamily.montserrat,
    color: Color.colorDarkslateblue_200,
  },
  symptomList: {
    paddingHorizontal: 10,
  },
  symptomButton: {
    backgroundColor: Color.primary,
    padding: 16,
    borderRadius: Border.br_md,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  symptomText: {
    color: "#fff",
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.montserrat,
    textAlign: "center",
  },
  resultSection: {
    padding: 16,
  },
  resultHeader: {
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.montserrat,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.arial,
    marginBottom: 10,
    color: "#555",
  },
  advice: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.arial,
    color: "#333",
    marginBottom: 20,
  },
  backButton: {
    alignSelf: "center",
    padding: 10,
    borderRadius: Border.br_md,
    backgroundColor: Color.colorDarkslateblue_200,
  },
  backButtonText: {
    fontSize: FontSize.size_sm,
    color: "#fff",
    textAlign: "center",
  },
});

export default SymptomChecker;
