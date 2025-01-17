import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { UserContext } from "../contexts/UserContext";

// Example endpoint
const API_BASE_URL = "http://localhost:5002";

const FeedbackScreen = () => {
  const { userId } = useContext(UserContext);
  const [feedback, setFeedback] = useState("");

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) return;
    try {
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          message: feedback,
        }),
      });
      if (!response.ok) throw new Error("Failed to send feedback.");

      Alert.alert("Thank you!", "Your feedback has been submitted.");
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Alert.alert("Error", "Unable to submit feedback. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Help Us Improve</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={6}
        placeholder="Share your thoughts, suggestions, or issues..."
        value={feedback}
        onChangeText={setFeedback}
      />
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitFeedback}>
        <Text style={styles.submitBtnText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F9FAFF",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4F46E5",
    textAlign: "center",
    marginBottom: 20,
  },
  textArea: {
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: "#6A5ACD",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
