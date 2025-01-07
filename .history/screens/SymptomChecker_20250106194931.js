import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
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

const pageTitles = {
  title: {
    en: "Symptom Checker",
    es: "Verificador de Síntomas",
  },
  subtitle: {
    en: "Learn more about common pregnancy symptoms.",
    es: "Obtenga más información sobre los síntomas comunes del embarazo.",
  },
};

const SymptomChecker = () => {
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
  const [language, setLanguage] = useState("en"); // Default language

  const renderSymptomDetails = (symptom) => {
    if (!symptom) return null;

    return (
      <ScrollView contentContainerStyle={styles.details}>
        <LinearGradient
          colors={["#F9FAFB", "#E9ECEF"]}
          style={styles.detailsContainer}
        >
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
          {symptom.sections?.map((section, index) => (
            <View key={index} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>
                {section.category?.[language] || "No Category Title"}
              </Text>
              {section.items?.map((item, itemIndex) => (
                <View key={itemIndex} style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>
                    {item.title?.[language] || "No Section Title"}
                  </Text>
                  <Text style={styles.sectionContent}>
                    {item.content?.[language] || "No Content Available"}
                  </Text>
                </View>
              ))}
            </View>
          ))}
          <View style={styles.adviceContainer}>
            <Text style={styles.adviceHeader}>Advice</Text>
            <Text style={styles.adviceText}>
              {symptom.advice?.general?.[language] ||
                "No General Advice Available"}
            </Text>
            <Text style={styles.adviceHeader}>Emergency</Text>
            <Text style={styles.adviceText}>
              {symptom.advice?.emergency?.[language] ||
                "No Emergency Advice Available"}
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
    );
  };

  const renderSymptomItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedSymptom(item)}
    >
      <LinearGradient
        colors={["#F5F7FA", "#FFFFFF"]}
        style={styles.itemGradient}
      >
        <Text style={styles.itemText}>
          {item.symptom?.[language] || "No Title Available"}
        </Text>
      </LinearGradient>
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
              {pageTitles.title[language] || "Symptom Checker"}
            </Text>
            <Text style={styles.subtitle}>
              {pageTitles.subtitle[language] || ""}
            </Text>
          </View>
          <FlatList
            data={symptoms}
            keyExtractor={(item) => item.id} // Unique keys
            renderItem={renderSymptomItem}
            contentContainerStyle={styles.list}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#212529",
  },
  subtitle: {
    fontSize: 16,
    color: "#6C757D",
    marginTop: 8,
  },
  list: { padding: 16 },
  item: {
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  itemGradient: {
    padding: 16,
    borderRadius: 12,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#495057",
  },
  detailsContainer: { flex: 1, padding: 16, borderRadius: 12 },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#212529",
  },
  content: {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 24,
    color: "#495057",
  },
  categoryContainer: { marginBottom: 24 },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#212529",
  },
  sectionContainer: { marginBottom: 16, paddingLeft: 12 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#212529",
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 22,
    color: "#495057",
  },
  adviceContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
  },
  adviceHeader: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#212529",
  },
  adviceText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#495057",
    marginBottom: 12,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#F5F7FA",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CED4DA",
  },
  backButtonText: {
    color: "#495057",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default SymptomChecker;
