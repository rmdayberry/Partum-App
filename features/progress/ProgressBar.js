import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";

const ProgressBar = ({ userId }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const getProgress = async () => {
      try {
        const progressValue = 85; // Example: 85% for 34 weeks
        setProgress(progressValue / 100); // Normalize to 0 - 1 range
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    getProgress();
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {/* Background Progress Track */}
        <Progress.Bar
          progress={1} // Full length (100%)
          width={300}
          height={15}
          borderRadius={12}
          borderWidth={0}
          unfilledColor="#D3D3D3" // Light Gray background track
          color="transparent"
        />

        {/* Foreground Gradient Progress */}
        <View style={[styles.progressOverlay, { width: `${progress * 100}%` }]}>
          <LinearGradient
            colors={["#6A5ACD", "#8A2BE2"]} // Purple to Blue-Violet
            style={styles.gradient}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  progressContainer: {
    width: 300,
    height: 15,
    borderRadius: 12,
    backgroundColor: "#D3D3D3", // Light Gray for visibility
    position: "relative",
  },
  progressOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    borderRadius: 12,
  },
  gradient: {
    flex: 1,
    borderRadius: 12,
  },
});

export default ProgressBar;
