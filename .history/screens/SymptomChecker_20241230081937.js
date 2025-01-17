import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

// Sample data for symptoms and questions
const symptomData = [
  { id: "1", symptom: "Headache", category: "Common Symptoms" },
  { id: "2", symptom: "Bleeding", category: "Warning Symptoms" },
  { id: "3", symptom: "Nausea", category: "Common Symptoms" },
];

const SymptomChecker = () => {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [response, setResponse] = useState("");

  const handleSymptomSelect = (symptom) => {
    setSelectedSymptom(symptom);
    setResponse("");
  };

  const handleInputChange = (text) => {
    setResponse(text);
  };

  const renderSymptom = ({ item }) => (
    <TouchableOpacity
      style={styles.symptomButton}
      onPress={() => handleSymptomSelect(item.symptom)}
    >
      <Text style={styles.symptomText}>{item.symptom}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Symptom Checker</Text>

      {!selectedSymptom ? (
        <FlatList
          data={symptomData}
          keyExtractor={(item) => item.id}
          renderItem={renderSymptom}
          contentContainerStyle={styles.symptomList}
        />
      ) : (
        <View style={styles.responseSection}>
          <Text style={styles.question}>
            Please describe your {selectedSymptom} symptoms in detail:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Type your response here"
            value={response}
            onChangeText={handleInputChange}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => alert(`Submitted: ${response}`)}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedSymptom && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedSymptom(null)}
        >
          <Text style={styles.backButtonText}>Back to Symptoms</Text>
        </TouchableOpacity>
      )}
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: FontFamily.montserrat,
    color: Color.colorDarkslateblue_200,
  },
  symptomList: {
    paddingHorizontal: 10,
  },
  symptomButton: {
    backgroundColor: Color.primary,
    padding: 16,
    borderRadius: Border.br_md,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  symptomText: {
    color: "#fff",
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.montserrat,
    textAlign: "center",
  },
  responseSection: {
    padding: 16,
  },
  question: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.montserrat,
    marginBottom: 10,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: Border.br_md,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: Color.primary,
    padding: 12,
    borderRadius: Border.br_md,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.montserrat,
  },
  backButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  backButtonText: {
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslateblue_200,
    textDecorationLine: "underline",
  },
});

export default SymptomChecker;
