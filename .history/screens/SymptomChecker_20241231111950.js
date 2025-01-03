import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { fetchSymptomList, fetchSymptomDetails } from "../api";
import { UserContext } from "../contexts/UserContext";

const SymptomTracker = () => {
  const { languagePreference } = useContext(UserContext);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSymptoms = async () => {
      try {
        const symptomList = await fetchSymptomList();
        setSymptoms(symptomList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching symptom list:", error);
        setLoading(false);
      }
    };

    loadSymptoms();
  }, []);

  const handleSymptomSelect = async (symptom) => {
    setLoading(true);
    try {
      const symptomDetails = await fetchSymptomDetails(symptom);
      setSelectedSymptom(symptomDetails);
    } catch (error) {
      console.error("Error fetching symptom details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {languagePreference === "Español"
          ? "Seguimiento de Síntomas"
          : "Symptom Tracker"}
      </Text>
      <Text style={styles.subtitle}>
        {languagePreference === "Español"
          ? "Seleccione un síntoma para obtener más información"
          : "Select a symptom to learn more"}
      </Text>
      <View style={styles.content}>
        {loading && <ActivityIndicator size="large" color="#6200EE" />}
        {!loading && !selectedSymptom && (
          <ScrollView>
            {symptoms.map((symptom, index) => (
              <TouchableOpacity
                key={index}
                style={styles.symptomButton}
                onPress={() => handleSymptomSelect(symptom.symptom)}
              >
                <Text style={styles.symptomText}>
                  {languagePreference === "Español"
                    ? symptom.symptom_es
                    : symptom.symptom}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {!loading && selectedSymptom && (
          <ScrollView>
            <Text style={styles.symptomTitle}>
              {languagePreference === "Español"
                ? selectedSymptom.symptom_es
                : selectedSymptom.symptom}
            </Text>
            <Text style={styles.symptomOverview}>
              {languagePreference === "Español"
                ? selectedSymptom.overview.es
                : selectedSymptom.overview.en}
            </Text>
            {selectedSymptom.sections.map((section, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.sectionTitle}>
                  {languagePreference === "Español"
                    ? section.title.es
                    : section.title.en}
                </Text>
                <Text style={styles.sectionContent}>
                  {languagePreference === "Español"
                    ? section.content.es
                    : section.content.en}
                </Text>
              </View>
            ))}
            <Text style={styles.advice}>
              {languagePreference === "Español"
                ? selectedSymptom.advice.es
                : selectedSymptom.advice.en}
            </Text>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedSymptom(null)}
            >
              <Text style={styles.backButtonText}>
                {languagePreference === "Español" ? "Volver" : "Back"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 16,
  },
  content: {
    flex: 1,
  },
  symptomButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  symptomText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  symptomTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 8,
  },
  symptomOverview: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  advice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6200EE",
    marginTop: 20,
  },
  backButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#6200EE",
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SymptomTracker;
