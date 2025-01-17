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
import { Color, FontFamily, FontSize } from "../GlobalStyles";

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
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setSelectedSymptom(null)}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>
          {symptom.symptom?.[language] || "No Title Available"}
        </Text>
      </View>

      {/* Overview */}
      <Text style={styles.content}>
        {symptom.overview?.[language] || "Overview not available"}
      </Text>

      {/* Categories */}
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

      {/* Advice Section */}
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
    backgroundColor: "#F9FBFD", // Light neutral background
  },
  header: {
    padding: 20,
    backgroundColor: "#8D82FA", // Soft purple for the header
    borderBottomWidth: 1,
    borderBottomColor: "#68478C",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF", // White text for contrast
    textAlign: "center",
    fontFamily: FontFamily.montserrat,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#EDECFD", // Muted white for subtitle
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
    backgroundColor: "#FFFFFF", // Clean white for item background
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 18,
    color: "#4A4A4A",
    fontWeight: "600",
  },
  details: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#8D82FA",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#2A4B68", // Deep purple for main headings
    textAlign: "center",
    fontFamily: FontFamily.montserrat,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#4A4A4A",
    marginBottom: 20,
    fontFamily: FontFamily.montserrat,
  },
  categoryCard: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: Color.nEW, // Soft background for categories
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#68478C", // Deep purple for card borders
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#8D82FA", // Soft purple for category titles
    fontFamily: FontFamily.montserrat,
  },
  sectionCard: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#FFFFFF", // Clean white for sections
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#727272", // Subtle gray for section titles
    fontFamily: FontFamily.montserrat,
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4A4A4A", // Neutral color for section content
    fontFamily: FontFamily.montserrat,
  },
  adviceContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#F9FBFD", // Soft background for advice
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  adviceHeader: {
    fontSize: 18,
    fontWeight: "700", // Heavier font weight
    marginBottom: 8,
    color: "#4A4A4A", // Light black/gray color
    fontFamily: FontFamily.montserrat,
  },
  adviceText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#6C7A89", // Subtle gray for advice text
    fontFamily: FontFamily.montserrat,
  },
});

export default SymptomChecker;
