import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const ProgressBar = ({ progress }) => {
  const radius = 100; // Radius of arc
  const strokeWidth = 10; // Thickness of arc
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={radius * 2 + strokeWidth} height={radius * 2}>
        {/* Background arc */}
        <Path
          d={`
            M ${radius} ${radius * 2}
            A ${radius} ${radius} 0 1 0 ${radius * 2} ${radius * 2}
          `}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress Arc */}
        <Path
          d={`
            M ${radius} ${radius * 2}
            A ${radius} ${radius} 0 1 0 ${radius * 2} ${radius * 2}
          `}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - strokeOffset}
          strokeLinecap="round"
        />

        {/* Gradient Definition */}
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#ff5f6d" />
            <Stop offset="100%" stopColor="#ffc371" />
          </LinearGradient>
        </Defs>
      </Svg>

      {/* Display Progress Percentage */}
      <Text style={styles.text}>{`${Math.round(progress)}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20, // Adjust to fit within your layout appropriately
  },
  text: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20, // Adjust as needed to position the text above the bar
  },
});

export default ProgressBar;
