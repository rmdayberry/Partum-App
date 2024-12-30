import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from "react-native";


const openDialer = (phoneNumber) => {
  Linking.openURL(`tel:${phoneNumber}`);
};

const openEmail = (email)=> {
  Linking.openURL(`mailto:${email}`);
};

const GetSupport = () => {
  return(
    
  )
}
