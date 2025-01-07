import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
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
import {Color, }

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

  const renderSymptomDetails = (symptom) => (
    <ScrollView contentContainerStyle={styles.details}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setSelectedSymptom(null)}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>
        {symptom.symptom?.[language] || "No Title Available"}
      </Text>
      <Text style={styles.content}>
        {symptom.overview?.[language] || "Overview not available"}
      </Text>
      {symptom.categories?.map((category, index) => (
        <View key={index} style={styles.categoryCard}>
          <Text style={styles.categoryTitle}>
            {category.categoryTitle?.[language] || "No Category Title"}
          </Text>
          {category.sections?.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>
                {section.sectionTitle?.[language] || "No Section Title"}
              </Text>
              <Text style={styles.sectionContent}>
                {section.content?.[language] || "No Content Available"}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );

  const renderSymptomItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedSymptom(item)}
      activeOpacity={0.8}
    >
      <Text style={styles.itemText}>
        {item.symptom?.[language] || "No Title Available"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {selectedSymptom ? (
        renderSymptomDetails(selectedSymptom)
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
            keyExtractor={(item) => item.symptom.en} // Unique keys
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
    backgroundColor: "#F6F8FA", // Matches Dashboard background
  },
  header: {
    padding: 20,
    backgroundColor: "#FDFDFD", // Clean neutral color
    borderBottomWidth: 1,
    borderBottomColor: "#DADADA",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#374E6C",
    textAlign: "center",
    fontFamily: "Montserrat",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#727272",
    textAlign: "center",
    marginTop: 8,
    fontFamily: "Montserrat",
  },
  list: {
    paddingHorizontal: 16,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  itemText: {
    fontSize: 18,
    color: "#374E6C",
    fontWeight: "600",
  },
  details: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "#727272",
    fontSize: 16,
    fontWeight: "600",
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#2A4B68",
    textAlign: "center",
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#4A4A4A",
    marginBottom: 20,
  },
  categoryCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#374E6C",
  },
  sectionCard: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#727272",
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 22,
    color: "#626567",
  },
});

export default SymptomChecker;
