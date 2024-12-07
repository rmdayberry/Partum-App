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
        source={require("../assets/Riverland.png")}
      />
      <Text style={styles.title}>Partum</Text>
    </Appbar.Header>
  );
};

const styles= StyleSheet.create({
  header: {
    width: width,
    backgroundColor: Color.graysWhite,
    height: 80,
    justifyContent: "flex-start",
    paddingHorizontal: 100,
    alignItems:"center",
    borderBottomWidth: 2, 
    borderBottomColor: Color.colorGray_100,
  },
  content:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width:60,
    height: 60,
    marginRight: 8,
  },
  title:{
  fontSize: FontSize.size_5xl,
  fontWeight: "700",
  FontFamily: FontFamily.montserrat,
  color: Color.colorDarkslateblue_200,
},
})

export default Header;
