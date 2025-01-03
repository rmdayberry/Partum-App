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

const SymptomChecker = () => {
  const [symptoms] = useState([bleeding]); // Static symptoms array
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
        <View key={index} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>
            {category.categoryTitle?.[language] || "No Category Title"}
          </Text>
          {category.sections?.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.sectionContainer}>
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
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  list: { padding: 16 },
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
  itemText: { fontSize: 18, color: "#1C1C1E", fontWeight: "600" },
  details: { padding: 16, backgroundColor: "#FFFFFF" },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
    color: "#1C1C1E",
  },
  content: {
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 24,
    color: "#3A3A3C",
  },
  categoryContainer: { marginBottom: 24 },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1C1C1E",
  },
  sectionContainer: { marginBottom: 16, paddingLeft: 12 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1C1C1E",
  },
  sectionContent: {
    fontSize: 16,
    lineHeight: 22,
    color: "#3A3A3C",
  },
  adviceContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#F2F3F5",
    borderRadius: 12,
  },
  adviceHeader: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1C1C1E",
  },
  adviceText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#3A3A3C",
    marginBottom: 12,
  },
  backButton: {
    marginTop: 24,
    paddingVertical: 14,
    backgroundColor: "#007AFF",
    borderRadius: 12,
  },
  buttonText: { color: "#FFFFFF", textAlign: "center", fontWeight: "600" },
});

export default SymptomChecker;
