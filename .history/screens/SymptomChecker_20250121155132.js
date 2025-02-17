import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import SymptomDetails from "./SymptomDetails"; // Import the new SymptomDetails component
import bleeding from "../features/symptomData/bleeding";
import diarrheaAndVomiting from "../features/symptomData/diarrheaAndVomitting";
import discharge from "../features/symptomData/discharge";
import headaches from "../features/symptomData/headaches";
import fever from "../features/symptomData/fever";
import itching from "../features/symptomData/itching";
import babyMovements from "../features/symptomData/babyMovements";
import painfulUrination from "../features/symptomData/painfulUrination";
import abdominalPain from "../features/symptomData/abdominalPain";
import swelling from "../features/symptomData/swelling";
import visionProblems from "../features/symptomData/visionProblems";

const pageTitle = {
  en: "Symptom Checker",
  es: "Verificador de Síntomas",
};

const SymptomChecker = () => {
  const { languagePreference } = useContext(UserContext);
  const [symptoms] = useState([
    bleeding,
    diarrheaAndVomiting,
    discharge,
    headaches,
    fever,
    itching,
    babyMovements,
    painfulUrination,
    abdominalPain,
    swelling,
    visionProblems,
  ]);
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  const language = languagePreference === "English" ? "en" : "es";

  const renderSymptomItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedSymptom(item)}
    >
      <Text style={styles.itemText}>
        {item.symptom?.[language] || "No Title Available"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {selectedSymptom ? (
        <SymptomDetails
          symptom={selectedSymptom}
          language={language}
          onBack={() => setSelectedSymptom(null)}
        />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.title}>
              {pageTitle[language] || "Symptom Checker"}
            </Text>
            <Text style={styles.subtitle}>
              {language === "en"
                ? "Select a symptom to learn more."
                : "Seleccione un síntoma para obtener más información."}
            </Text>
          </View>
          <FlatList
            data={symptoms}
            keyExtractor={(item) => item.symptom.en} // Unique key
            renderItem={renderSymptomItem}
            contentContainerStyle={styles.list}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFF",
  },
  header: {
    padding: 20,
    backgroundColor: "#6A5ACD",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#D8D8F0",
    textAlign: "center",
    marginTop: 8,
  },
  list: {
    paddingHorizontal: 16,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#FFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    color: "#4A4A4A",
    fontWeight: "600",
  },
});

export default SymptomChecker;
