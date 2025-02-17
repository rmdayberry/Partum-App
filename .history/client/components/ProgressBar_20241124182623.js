import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const ProgressBar = ({ progress }) => {
  //Calculate the length of the progress arc
  const radius = 100; //Radius of arc
  const strokeWidth = 10; // Thickness of arc
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference; // Length of remaining arc

  return (
    <View style={styles.container}>
      {/*SVG for the progress bar */}
      <Svg width={radius * 2 + strokeWidth} height={radius + strokeWidth}>
        {/*Background arc*/}
        <Path
          d={`
          M ${strokeWidth / 2} ${radius + strokeWidth / 2}
          A ${radius} ${radius} 0 0 1 ${radius * 2 + strokeWidth / 2} ${
            radius + strokeWidth / 2
          }
          `}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/*Progress Arc*/}
        <Path
        
      </Svg>
      <View style={[styles.progress, { width: `${progress}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    height: 20,
    width: "90%",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 8,
  },
  progress: {
    height: "100%",
    backgroundColor: "#76c7c0",
  },
});

export default ProgressBar;
