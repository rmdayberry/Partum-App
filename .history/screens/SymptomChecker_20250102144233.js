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

      {symptom.categories?.map((category, catIndex) => (
        <View key={catIndex} style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>
            {category.categoryTitle?.[language] || "No Category Title"}
          </Text>
          {category.sections?.map((section, secIndex) => (
            <View key={secIndex} style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                {section.sectionTitle?.[language] || "No Section Title"}
              </Text>
              <Text style={styles.sectionContent}>
                {section.content?.[language] || "No Section Content"}
              </Text>
            </View>
          ))}
        </View>
      ))}

      <View style={styles.adviceContainer}>
        <Text style={styles.adviceHeader}>Advice</Text>
        <Text style={styles.adviceContent}>
          {symptom.advice?.general?.[language] || "No General Advice Available"}
        </Text>
        <Text style={styles.adviceContent}>
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
  categoryContainer: { marginTop: 16 },
  categoryTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  sectionContainer: { marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 16 },
  sectionContent: { fontSize: 16, marginTop: 8 },
  adviceContainer: { marginTop: 20 },
  adviceHeader: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  adviceContent: { fontSize: 16, marginBottom: 8, color: "#d9534f" },
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
