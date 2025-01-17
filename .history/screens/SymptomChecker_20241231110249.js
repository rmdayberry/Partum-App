import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { fetchSymptomList, fetchSymptomDetails } from "..api/api";
import { UserContext } from "../contexts/UserContext";

const SymptomTracker = () => {
  const { languagePreference } = useContext(UserContext);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of symptoms when the component mounts
    const loadSymptoms = async () => {
      setLoading(true);
      try {
        const data = await fetchSymptomList();
        setSymptoms(data);
      } catch (error) {
        console.error("Error fetching symptom list:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSymptoms();
  }, []);

  const handleSymptomClick = async (id) => {
    setLoading(true);
    try {
      const data = await fetchSymptomDetails(id);
      setSelectedSymptom(data);
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
          ? "Rastreador de Síntomas"
          : "Symptom Tracker"}
      </Text>

      {loading && <ActivityIndicator size="large" color="#6200EE" />}

      {!selectedSymptom ? (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {symptoms.map((symptom) => (
            <TouchableOpacity
              key={symptom._id}
              style={styles.symptomButton}
              onPress={() => handleSymptomClick(symptom._id)}
            >
              <Text style={styles.symptomText}>
                {languagePreference === "Español"
                  ? symptom.symptom.es
                  : symptom.symptom.en}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.detailContainer}>
          <Text style={styles.detailTitle}>
            {languagePreference === "Español"
              ? selectedSymptom.symptom.es
              : selectedSymptom.symptom.en}
          </Text>
          <Text style={styles.detailOverview}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  listContainer: {
    paddingVertical: 16,
  },
  symptomButton: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  symptomText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  detailContainer: {
    paddingVertical: 16,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailOverview: {
    fontSize: 16,
    marginBottom: 20,
    color: "#555",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: "#555",
  },
  advice: {
    fontSize: 16,
    color: "#00796B",
    marginVertical: 20,
    fontWeight: "600",
  },
  backButton: {
    padding: 12,
    backgroundColor: "#6200EE",
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default SymptomTracker;
