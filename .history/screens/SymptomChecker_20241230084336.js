import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [loading, setLoading] = useState(true);
  const language = "en"; // Replace with dynamic language selection.

  // Fetch symptoms from the backend
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/symptoms");
        setSymptoms(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching symptoms:", err);
        setLoading(false);
      }
    };

    fetchSymptoms();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderSymptomList = () => (
    <View>
      {symptoms.map((symptom) => (
        <TouchableOpacity
          key={symptom.symptom}
          style={styles.card}
          onPress={() => setSelectedSymptom(symptom)}
        >
          <Text style={styles.cardTitle}>{symptom.symptom}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSymptomDetails = () => (
    <ScrollView contentContainerStyle={styles.detailContainer}>
      <Text style={styles.detailHeader}>{selectedSymptom.symptom}</Text>
      <Text style={styles.overview}>{selectedSymptom.overview[language]}</Text>
      {selectedSymptom.sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title[language]}</Text>
          <Text style={styles.sectionContent}>{section.content[language]}</Text>
        </View>
      ))}
      <Text style={styles.advice}>{selectedSymptom.advice[language]}</Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setSelectedSymptom(null)}
      >
        <Text style={styles.backButtonText}>Back to Symptoms</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {language === "en" ? "Symptom Checker" : "Verificador de síntomas"}
      </Text>
      {selectedSymptom ? renderSymptomDetails() : renderSymptomList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.nEW,
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: FontFamily.montserrat,
    color: Color.colorDarkslateblue_200,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: Border.br_md,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.montserrat,
    color: Color.primary,
  },
  detailContainer: {
    padding: 16,
  },
  detailHeader: {
    fontSize: FontSize.size_lg,
    fontWeight: "bold",
    marginBottom: 16,
  },
  overview: {
    fontSize: FontSize.size_md,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: FontSize.size_md,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: FontSize.size_md,
    color: "#555",
  },
  advice: {
    fontSize: FontSize.size_md,
    color: Color.primary,
    marginBottom: 24,
  },
  backButton: {
    alignSelf: "center",
    padding: 12,
    borderRadius: Border.br_md,
    backgroundColor: Color.primary,
    marginTop: 16,
  },
  backButtonText: {
    color: "#fff",
    fontSize: FontSize.size_md,
  },
});

export default SymptomChecker;
