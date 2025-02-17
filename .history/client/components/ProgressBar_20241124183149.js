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
          d={`
          M ${strokeWidth / 2} ${radius + strokeWidth / 2}
          A ${radius} ${radius} 0 0 1 ${radius * 2 + strokeWidth / 2} ${
            radius + strokeWidth / 2
          }
        `}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />

        {/*Gradient Definition*/}
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor="#ff5f6d" />
            <Stop offset="100%" stopColor="#ffc371" />
          </LinearGradient>
        </Defs>
      </Svg>

      {/*Display Progress Percentage*/}
      <Text style={styles.text}>{`${Math.round(progress)}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  text: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ProgressBar;
