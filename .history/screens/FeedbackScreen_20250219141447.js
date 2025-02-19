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
import { submitFeedback } from "../api/api";
import { UserContext } from "../contexts/UserContext";

// Example endpoint
const API_BASE_URL = "https://partum-app.onrender.com";

const translations = {
  English: {
    title: "Help Us Improve",
    placeholder: "Share your thoughts, suggestions, or issues...",
    submitButton: "Submit",
    thankYou: "Thank you!",
    feedbackSubmitted: "Your feedback has been submitted.",
    errorTitle: "Error",
    errorMessage: "Unable to submit feedback. Please try again.",
  },
  Español: {
    title: "Ayúdanos a mejorar",
    placeholder: "Comparte tus pensamientos, sugerencias o problemas...",
    submitButton: "Enviar",
    thankYou: "¡Gracias!",
    feedbackSubmitted: "Tu comentario ha sido enviado.",
    errorTitle: "Error",
    errorMessage: "No se pudo enviar el comentario. Inténtalo de nuevo.",
  },
};

const FeedbackScreen = () => {
  const { userId, languagePreference } = useContext(UserContext);
  const [feedback, setFeedback] = useState("");

  const t = translations[languagePreference || "English"];

  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) return;
    try {
      await submitFeedback(userId, feedback);
      Alert.alert(t.thankYou, t.feedbackSubmitted);
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Alert.alert(t.errorTitle, t.errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t.title}</Text>
      <TextInput
        style={styles.textArea}
        multiline
        numberOfLines={6}
        placeholder={t.placeholder}
        value={feedback}
        onChangeText={setFeedback}
      />
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitFeedback}>
        <Text style={styles.submitBtnText}>{t.submitButton}</Text>
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
