import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fetchPregnancyProgress } from "../api/api";

const ProgressBar = ({ userId }) => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProgress = async () => {
      try {
        const progressValue = await fetchPregnancyProgress(userId);
        setProgress(progressValue);
      } catch (error) {
        console.error("Error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    };
    getProgress();
  }, [userId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pregnancy Progress: {progress}%</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    display: "none",
  },
  progressBarContainer: {
    width: "90%",
    height: 20,
    backgroundColor: "#e0e0e0", //light gray for unfilled bar
    borderRadius: 10,
    overflow: "hidden", //Ensure no overflow
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#9083FC",
  },
});

export default ProgressBar;
