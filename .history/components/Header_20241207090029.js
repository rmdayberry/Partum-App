import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { Image } from "expo-image";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const { width } = Dimensions.get("window");

const Header = () => {
  return (
    <Appbar.Header style={styles.header}>
      <Image
        style={styles.logo}
        contentFit="cover"
        source={require("../assets/riverland-1.png")}
      />
      <Text style={styles.title}>Partum</Text>
    </Appbar.Header>
  );
};
