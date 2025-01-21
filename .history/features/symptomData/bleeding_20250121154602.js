import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { UserContext } from "././contexts/UserContext";
import bleeding from "../features/symptomData/bleeding";

const Bleeding = () => {
  const { languagePreference } = useContext(UserContext);
  const language = languagePreference === "English" ? "en" : "es";
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (index) => {
    setExpandedCategories((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        {/* Header */}
        <Text style={styles.header}>
          {bleeding.symptom[language] || "No Title Available"}
        </Text>

        {/* Overview */}
        <Text style={styles.overview}>
          {bleeding.overview[language] || "Overview not available"}
        </Text>

        {/* Categories */}
        {bleeding.categories.map((category, index) => (
          <View key={index} style={styles.categoryContainer}>
            <TouchableOpacity
              style={styles.categoryHeader}
              onPress={() => toggleCategory(index)}
            >
              <Text style={styles.categoryTitle}>
                {category.categoryTitle[language] || "No Category Title"}
              </Text>
              <Text style={styles.expandIcon}>
                {expandedCategories.includes(index) ? "−" : "+"}
              </Text>
            </TouchableOpacity>

            {expandedCategories.includes(index) &&
              category.sections.map((section, sectionIndex) => (
                <View key={sectionIndex} style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    {section.sectionTitle[language] || "No Section Title"}
                  </Text>
                  <Text style={styles.sectionContent}>
                    {section.content[language] || "No Content Available"}
                  </Text>
                </View>
              ))}
          </View>
        ))}

        {/* General and Emergency Advice */}
        <View style={styles.adviceContainer}>
          <Text style={styles.adviceHeader}>
            {language === "en" ? "General Advice" : "Consejos Generales"}
          </Text>
          <Text style={styles.adviceText}>
            {bleeding.advice.general[language] || "No General Advice Available"}
          </Text>
          <Text style={styles.adviceHeader}>
            {language === "en" ? "Emergency Advice" : "Consejos de Emergencia"}
          </Text>
          <Text style={styles.adviceText}>
            {bleeding.advice.emergency[language] ||
              "No Emergency Advice Available"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFF",
  },
  contentContainer: {
    padding: 20,
  },
  backButton: {
    backgroundColor: "#6A5ACD",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: "#555",
    marginBottom: 20,
    backgroundColor: "#F4F4F4",
    padding: 12,
    borderRadius: 8,
  },
  categoryContainer: {
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#6A5ACD",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  categoryTitle: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  expandIcon: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 22,
    color: "#555",
  },
  adviceContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#FFF7E5",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  adviceHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  adviceText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#555",
  },
});

export default Bleeding;
