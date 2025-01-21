import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const SymptomDetails = ({ symptom, language, onBack }) => {
  return (
    <ScrollView contentContainerStyle={styles.details}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
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
};

const styles = StyleSheet.create({
  details: { padding: 16 },
  backButton: {
    padding: 10,
    backgroundColor: "#6A5ACD",
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  heading: {
    fontSize: 22,
    color: "#2A4B68",
    fontWeight: "800",
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 20,
    color: "#555",
    marginBottom: 20,
    fontWeight: "600",
    backgroundColor: "#E7E0EC",
    padding: 10,
    borderRadius: 10,
  },
  categoryCard: { marginBottom: 20 },
  categoryTitle: { fontSize: 18, fontWeight: "bold", color: "#4A4A4A" },
  sectionCard: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A4A4A",
    marginBottom: 4,
  },
  sectionContent: { fontSize: 14, color: "#555", lineHeight: 20 },
  adviceContainer: {
    padding: 16,
    backgroundColor: "#E7E0EC",
    borderRadius: 12,
    elevation: 2,
  },
  adviceHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A4A4A",
    marginBottom: 10,
  },
  adviceText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6C7A89",
    marginBottom: 10,
  },
});

export default SymptomDetails;
