import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { fetchSymptomList } from "../api/api";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [language, setLanguage] = useState("en"); // Replace with user preference
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const data = await fetchSymptomList();
        setSymptoms(data);
      } catch (err) {
        console.error("Error fetching symptoms:", err);
        setError("Unable to fetch symptoms. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSymptoms();
  }, []);

  const renderSymptomDetails = (symptom) => (
    <ScrollView contentContainerStyle={styles.details}>
      <Text style={styles.heading}>
        {symptom.symptom || "No Title Available"}
      </Text>
      <Text style={styles.content}>
        {symptom.overview?.[language] || "Overview not available"}
      </Text>

      {symptom.sections?.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {section.title?.[language] || "No Title"}
          </Text>
          <Text style={styles.sectionContent}>
            {section.content?.[language] || "No Content"}
          </Text>
          {section.subsections?.map((subsection, subIndex) => (
            <View key={subIndex} style={styles.subsectionContainer}>
              <Text style={styles.subsectionTitle}>
                {subsection.title?.[language] || "No Subsection Title"}
              </Text>
              <Text style={styles.subsectionContent}>
                {subsection.content?.[language] || "No Subsection Content"}
              </Text>
            </View>
          ))}
        </View>
      ))}

      {symptom.specificCases && (
        <View style={styles.specificCasesContainer}>
          <Text style={styles.caseHeader}>Specific Cases</Text>
          {symptom.specificCases.map((caseItem, caseIndex) => (
            <View key={caseIndex} style={styles.caseContainer}>
              <Text style={styles.caseTitle}>
                {caseItem.caseTitle?.[language] || "No Case Title"}
              </Text>
              <Text style={styles.caseContent}>
                {caseItem.details?.[language] || "No Case Details"}
              </Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.advice}>
        {symptom.advice?.[language] || "No Advice Available"}
      </Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setSelectedSymptom(null)}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text>Loading symptoms...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const renderSymptomItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedSymptom(item)}
    >
      <Text style={styles.itemText}>
        {item.symptom || "No Title Available"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {selectedSymptom ? (
        renderSymptomDetails(selectedSymptom)
      ) : (
        <FlatList
          data={symptoms}
          keyExtractor={(item) => item._id}
          renderItem={renderSymptomItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f8f8f8" },
  list: { paddingBottom: 16 },
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemText: { fontSize: 18, color: "#333" },
  details: { padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  content: { fontSize: 16, marginBottom: 16 },
  sectionContainer: { marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 16 },
  sectionContent: { fontSize: 16, marginTop: 8 },
  subsectionContainer: { marginTop: 12, paddingLeft: 8 },
  subsectionTitle: { fontSize: 16, fontWeight: "bold" },
  subsectionContent: { fontSize: 14, marginTop: 4 },
  specificCasesContainer: { marginTop: 20 },
  caseHeader: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  caseContainer: { marginTop: 12 },
  caseTitle: { fontSize: 16, fontWeight: "bold" },
  caseContent: { fontSize: 14, marginTop: 4 },
  advice: { marginTop: 16, fontSize: 16, color: "#d9534f" },
  backButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#6200EE",
    borderRadius: 8,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#d9534f",
    textAlign: "center",
  },
});

export default SymptomChecker;
