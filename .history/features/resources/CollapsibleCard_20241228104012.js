import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const CollapsibleCard = ({ title, content, language }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={toggleExpand} style={styles.header}>
        <Text style={styles.title}>{title[language]}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.content}>
          <Text style={styles.text}>{content[language]}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#f8f8f8",
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    padding: 15,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
});

export default CollapsibleCard;
