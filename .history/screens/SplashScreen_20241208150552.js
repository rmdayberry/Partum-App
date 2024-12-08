import * as React from "react";
import {Image} from "expo-image";
import { StyleSheet, View } from "react-native";
import {Color} from "../GlobalStyles";

const SplashScreenComponent = ()=> {
  return(
    <View style= {styles.splashScreen}>
      <Image 
      style={styles.riverland.png}
      contentFit= "cover"
      source= {require("../assets/riverland")}
    </View>
  )
}