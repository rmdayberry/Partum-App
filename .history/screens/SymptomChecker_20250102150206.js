import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import bleeding from "../features/symptomData/bleeding"; // Import the static data

const SymptomChecker = () => {
  const [symptoms] = useState([bleeding]); // Static symptoms array
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [language, setLanguage] = useState("en"); // Replace with user preference

  const renderSymptomDetails = (symptom) => (
    <ScrollView contentContainerStyle={styles.details}>
      <Text style={styles.heading}>
        {symptom.symptom || "No Title Available"}
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

      <Text style={styles.advice}>
        {symptom.advice?.general?.[language] || "No General Advice Available"}
      </Text>
      <Text style={styles.advice}>
        {symptom.advice?.emergency?.[language] ||
          "No Emergency Advice Available"}
      </Text>
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
          keyExtractor={(item) => item.symptom}
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
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 8 },
  sectionContent: { fontSize: 16, marginTop: 4 },
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
