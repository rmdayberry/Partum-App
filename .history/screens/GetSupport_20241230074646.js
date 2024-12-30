import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";

const openDialer = (phoneNumber) => {
  Linking.openURL(`tel:${phoneNumber}`);
};

const openEmail = (email) => {
  Linking.openURL(`mailto:${email}`);
};

const GetSupport = () => {
  return (
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
            <Text style={styles.buttonText}>Call: 651-758-9500</Text>
          </TouchableOpacity>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Clinic Details:</Text>
            <Text style={styles.sectionText}>
              Phones are answered 24 hours a day. Language assistance is
              available after hours. Ask for AT&T language line assistance.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hours:</Text>
            <Text style={styles.sectionText}>
              • Clinic Visits & Telehealth: Mon - Fri, 8:00 AM - 5:00 PM
            </Text>
            <Text style={styles.sectionText}>
              • Scheduling: Mon - Fri, 7:30 AM - 5:00 PM
            </Text>
            <Text style={styles.sectionText}>
              • Pharmacy: Mon - Fri, 8:30 AM - 5:00 PM
            </Text>
            <Text style={styles.sectionText}>
              • After Hours Care Line: Mon - Fri, 5:00 PM - 8:00 AM
            </Text>
            <Text style={styles.sectionText}>• 24/7 Nurse Triage Line</Text>
          </View>
        </View>

        {/* App Support */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>For App Support</Text>
          <Text style={styles.cardDescription}>
            Need help with the app? Reach out to us via email.
          </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    marginBottom: 20,
    paddingHorizontal: 16,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#666",
    textAlign: "center",
  },
  content: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  cardAddress: {
    fontSize: 14,
    color: "#777",
    marginBottom: 12,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default GetSupport;
