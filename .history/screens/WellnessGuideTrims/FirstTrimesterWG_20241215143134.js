import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color } from "../../GlobalStyles";

const FirstTrimester = () => {
  const navigation = useNavigation();
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.nEW,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default FirstTrimester;
