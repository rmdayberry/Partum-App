import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CircularProgress } from "react-native-svg-circular-progress";
import { fetchPregnancyProgress } from "../../api/api";

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
      <Text style={styles.header}>Pregnancy Progress</Text>
      <View style={styles.progressContainer}>
        <CircularProgress
          size={150} // Diameter of the circle
          width={15} // Thickness of the circle
          fill={progress} // Progress value (0 to 100)
          tintColor="#6A5ACD" // Progress bar color
          backgroundColor="#e0e0e0" // Background bar color
          lineCap="round" // Smooth edge for progress line
        />
        <Text style={styles.progressText}>
          {progress ? `${progress}%` : "0%"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A5ACD",
    marginBottom: 16,
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  progressText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6A5ACD",
    position: "absolute", // Place the percentage in the center of the circle
  },
});

export default ProgressBar;
