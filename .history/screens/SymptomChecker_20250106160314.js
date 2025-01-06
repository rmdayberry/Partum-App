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

  const renderSymptomDetails = (symptom) => (
    <ScrollView contentContainerStyle={styles.details}>
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
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setSelectedSymptom(null)}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );

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
        renderSymptomDetails(selectedSymptom)
      ) : (
        <FlatList
          data={symptoms}
          keyExtractor={(item) => item.symptom.en} // Assuming `en` is always present for unique keys
          renderItem={renderSymptomItem}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F7FA", // Light gradient or solid color
  },
  list: {
    padding: 16,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#26C6DA", // Teal accent
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    color: "#006064", // Teal shade
    fontWeight: "700",
  },
  details: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 16,
    color: "#00796B", // Darker teal
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
    color: "#4A4A4A",
  },
  categoryCard: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#42A5F5",
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1565C0", // Blue accent
  },
  sectionCard: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3949AB", // Indigo accent
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 22,
    color: "#616161", // Neutral tone
  },
  adviceContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#FFECB3", // Warm background
    borderRadius: 12,
  },
  adviceHeader: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#F57F17", // Orange shade
  },
  adviceText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#795548",
  },
  backButton: {
    marginTop: 24,
    paddingVertical: 14,
    backgroundColor: "#0288D1", // Vibrant blue
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "700",
  },
});

export default SymptomChecker;
