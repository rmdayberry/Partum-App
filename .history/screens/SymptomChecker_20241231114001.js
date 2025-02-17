import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { fetchSymptomList } from "../api";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [language, setLanguage] = useState("en"); // Replace with user preference

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const data = await fetchSymptomList();
        setSymptoms(data);
      } catch (error) {
        console.error("Error fetching symptoms:", error);
      }
    };
    fetchSymptoms();
  }, []);

  const renderSymptomDetails = (symptom) => (
    <View style={styles.details}>
      <Text style={styles.heading}>{symptom.symptom}</Text>
      <Text style={styles.content}>{symptom.overview[language]}</Text>
      {symptom.sections.map((section, index) => (
        <View key={index}>
          <Text style={styles.sectionTitle}>{section.title[language]}</Text>
          <Text style={styles.sectionContent}>{section.content[language]}</Text>
        </View>
      ))}
      <Text style={styles.advice}>{symptom.advice[language]}</Text>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setSelectedSymptom(null)}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSymptomItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedSymptom(item)}
    >
      <Text style={styles.itemText}>{item.symptom}</Text>
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
  details: { flex: 1, padding: 16, backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  content: { fontSize: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 16 },
  sectionContent: { fontSize: 16, marginTop: 8 },
  advice: { marginTop: 16, fontSize: 16, color: "#d9534f" },
  backButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#6200EE",
    borderRadius: 8,
  },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});

export default SymptomChecker;
