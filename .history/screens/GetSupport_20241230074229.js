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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Get Support</Text>
        <Text style={styles.subtitle}>
          Reach out for help when you need it most
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Clinic Info */}
        
      </ScrollView>
  )
}
