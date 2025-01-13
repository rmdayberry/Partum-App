import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
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

  if (loading || progress === null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <CircularProgress
        size={150} // Diameter of the circle
        width={5} // Thickness of the circle
        fill={progress} // Progress value (0 to 100)
        tintColor="#6A5ACD" // Enforce desired purple color
        backgroundColor="#e0e0e0" // Light gray background
        lineCap="round" // Smooth edge for progress line
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
});

export default ProgressBar;
