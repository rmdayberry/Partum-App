import React, { useState, useEffect, useContext } from "react";

import {
  ScrollView,
  View,
  Text,
  Stylesheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

const { width: screenWidth } = Dimensions.get("window");

//Placeholder images
const graphics = {
  periBottle: require("../../assets/graphic_periBottle.png"),
  incisionCare: require("../../assets/graphic_incisionCare.png"),
  recoveryTips: require("../../assets/graphic_recoveryTips.png"),
};

const Postpartum = () => {
  return (
    <View>
      <Text>Postpartum</Text>
      <Text>This is a placeholder for the Postpartum screen.</Text>
    </View>
  );
};
export default Postpartum;
