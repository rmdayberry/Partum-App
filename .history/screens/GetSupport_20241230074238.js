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
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Riverland Community Health</Text>
          <Text style={styles.cardSubtitle}>
            Peter J. King Family Health Center
          </Text>
          <Text style={styles.cardAddress}>
            1026 7th St W, St Paul, MN 55102
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => openDialer("6517589500")}
          >
      </ScrollView>
  )
}
