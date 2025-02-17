import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const FirstTrimester = () => {
  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        onPress={() => NavigationPreloadManager.goBack()}
        style={styles.backButton}
      >
        <Text style={backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        {" "}
        Welcome to the 1st Trimester Wellness Page!{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default FirstTrimester;
