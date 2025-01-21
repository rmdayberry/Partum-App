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
import { FontFamily } from "../GlobalStyles";

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

      <View style={styles.headerContainer}>
        <Text style={styles.heading}>
          {symptom.symptom?.[language] || "No Title Available"}
        </Text>
      </View>

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

      <View style={styles.adviceContainer}>
        <Text style={styles.adviceHeader}>General Advice</Text>
        <Text style={styles.adviceText}>
          {symptom.advice?.general?.[language] || "No General Advice Available"}
        </Text>
        <Text style={styles.adviceHeader}>Emergency Advice</Text>
        <Text style={styles.adviceText}>
          {symptom.advice?.emergency?.[language] ||
            "No Emergency Advice Available"}
        </Text>
      </View>
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
    fontFamily: FontFamily.montserrat,
  },
  subtitle: {
    fontSize: 16,
    color: "#D8D8F0",
    textAlign: "center",
    marginTop: 8,
    fontFamily: FontFamily.montserrat,
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
  details: {
    padding: 16,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#6A5ACD",
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 22,
    color: "#2A4B68",
    fontWeight: "700",
    marginBottom: 16,
    fontFamily: FontFamily.montserrat,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 20,
    fontFamily: FontFamily.montserrat,
  },
  adviceContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#F9FAFF",
    borderRadius: 12,
    elevation: 2,
  },
  adviceHeader: {
    fontSize: 18,
    color: "#4A4A4A",
    fontWeight: "bold",
    marginBottom: 8,
  },
  adviceText: {
    fontSize: 16,
    color: "#6C7A89",
  },
});

export default SymptomChecker;
