import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Color } from "../GlobalStyles";

const SplashScreenComponent = () => {
  return (
    <View style={styles.splashScreen}>
      <Image
        style={styles.riverlandSplashIcon}
        contentFit="cover"
        source={require("../assets/Riverland.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  riverlandSplashIcon: {
    position: "absolute",
    top: 313,
    left: 87,
    width: 200,
    height: 167,
  },
  splashScreen: {
    backgroundColor: Color.graysWhite,
    flex: 1,
    width: "100%",
    height: 866,
  },
});

export default SplashScreenComponent;
