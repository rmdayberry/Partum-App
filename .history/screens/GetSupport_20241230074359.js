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
            <Text style = {styles.buttonText}>Call: 651-7558-9500</Text>
            </TouchableOpacity>
            <Text style={styles.cardDescription}>
            Phones are answered 24 hours a day. Language assistance is offered
            after hours. Please ask for language line assistance from AT&T.
          </Text>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hours</Text>
            <Text style={styles.sectionText}>
              Clinic Visits & Telehealth: Monday - Friday, 8:00 a.m. – 5:00
              p.m.
            </Text>
            <Text style={styles.sectionText}>
              Scheduling: Monday - Friday, 7:30 a.m. – 5:00 p.m.
            </Text>
            <Text style={styles.sectionText}>
              Pharmacy: Monday - Friday, 8:30 a.m. – 5:00 p.m.
            </Text>
            <Text style={styles.sectionText}>
              After Hours Care Line: Monday - Friday, 5:00 p.m. – 8:00 a.m.
            </Text>
            <Text style={styles.sectionText}>24/7 Nurse Triage Line</Text>
          </View>
        </View>

        {/* App Support */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>For App Support</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => openEmail("partumApp@gmail.com")}
          >
            <Text style={styles.buttonText}>Contact: partumApp@gmail.com</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
      </ScrollView>
  
