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
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setSelectedSymptom(null)}
      >
        <Text style={styles.backButtonText}>←</Text>
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
    backgroundColor: "#F8F9FA", // Soft neutral background
  },
  list: {
    padding: 16,
  },
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  itemText: {
    fontSize: 18,
    color: "#2C3E50",
    fontWeight: "600",
  },
  details: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 16,
    zIndex: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#8E44AD", // Accent color
    borderRadius: 8,
    elevation: 2,
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
    marginTop: 60, // Adjust for back button space
    color: "#2C3E50",
    textAlign: "center",
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
    backgroundColor: "#F4F4F4",
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#34495E",
  },
  sectionCard: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#7F8C8D",
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 22,
    color: "#626567",
  },
  adviceContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#EAECEE",
    borderRadius: 10,
  },
  adviceHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#2C3E50",
  },
  adviceText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#4A4A4A",
  },
});

export default SymptomChecker;
