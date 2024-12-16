import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const FirstTrimester = () => {
  useEffect(() => {
    console.log("FirstTrimester mounted");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>First Trimester</Text>
      <Text>This is the First Trimester page content.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default FirstTrimester;
