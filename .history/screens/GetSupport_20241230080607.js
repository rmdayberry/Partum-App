import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { UserContext } from "../contexts/UserContext";

const openDialer = (phoneNumber) => {
  const url = `tel:${phoneNumber}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Error", "Your device does not support phone calls.");
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => {
      console.error("An error occurred while trying to open the dialer:", err);
      Alert.alert(
        "Error",
        "Unable to open the phone dialer. Please try again."
      );
    });
};

const openEmail = (email) => {
  const url = `mailto:${email}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Error", "Your device does not support email clients.");
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => {
      console.error(
        "An error occurred while trying to open the email client:",
        err
      );
      Alert.alert(
        "Error",
        "Unable to open the email client. Please try again."
      );
    });
};
const translations = {
  English: {
    title: "Get Support",
    subtitle: "Reach out for help when you need it most",
    clinicName: "Riverland Community Health",
    clinicSubtitle: "Peter J. King Family Health Center",
    address: "1026 7th St W, St Paul, MN 55102",
    callButton: "Call Clinic",
    clinicDetails:
      "Phones are answered 24 hours a day. Language assistance is available after hours. Ask for AT&T language line assistance.",
    hours: {
      title: "Hours:",
      clinic: "Clinic Visits & Telehealth: Mon - Fri, 8:00 AM - 5:00 PM",
      scheduling: "Scheduling: Mon - Fri, 7:30 AM - 5:00 PM",
      pharmacy: "Pharmacy: Mon - Fri, 8:30 AM - 5:00 PM",
      afterHours: "After Hours Care Line: Mon - Fri, 5:00 PM - 8:00 AM",
      nurseLine: "24/7 Nurse Triage Line",
    },
    appSupport: {
      title: "For App Support",
      description: "Need help with the app? Reach out to us via email.",
      button: "Contact: partumApp@gmail.com",
    },
  },
  Español: {
    title: "Obtener Ayuda",
    subtitle: "Comuníquese para obtener ayuda cuando más la necesite",
    clinicName: "Salud Comunitaria Riverland",
    clinicSubtitle: "Centro de Salud Familiar Peter J. King",
    address: "1026 7th St W, St Paul, MN 55102",
    callButton: "Llamar",
    clinicDetails:
      "Los teléfonos están disponibles las 24 horas del día. La asistencia lingüística está disponible después del horario laboral. Solicite asistencia de línea de idiomas AT&T.",
    hours: {
      title: "Horario:",
      clinic:
        "Visitas a la clínica y telesalud: lunes a viernes, 8:00 AM - 5:00 PM",
      scheduling: "Programación: lunes a viernes, 7:30 AM - 5:00 PM",
      pharmacy: "Farmacia: lunes a viernes, 8:30 AM - 5:00 PM",
      afterHours:
        "Línea de atención fuera de horario: lunes a viernes, 5:00 PM - 8:00 AM",
      nurseLine: "Línea de triaje de enfermería 24/7",
    },
    appSupport: {
      title: "Soporte de Aplicación",
      description:
        "¿Necesita ayuda con la aplicación? Comuníquese con nosotros por correo electrónico.",
      button: "Contacto: partumApp@gmail.com",
    },
  },
};

const GetSupport = () => {
  const { languagePreference } = useContext(UserContext);
  const texts = translations[languagePreference] || translations.English;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{texts.title}</Text>
        <Text style={styles.subtitle}>{texts.subtitle}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Clinic Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{texts.clinicName}</Text>
          <Text style={styles.cardSubtitle}>{texts.clinicSubtitle}</Text>
          <Text style={styles.cardAddress}>{texts.address}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => openDialer("6517589500")}
          >
            <Text style={styles.buttonText}>{texts.callButton}</Text>
          </TouchableOpacity>
          <Text style={styles.cardDescription}>{texts.clinicDetails}</Text>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{texts.hours.title}</Text>
            <Text style={styles.sectionText}>{texts.hours.clinic}</Text>
            <Text style={styles.sectionText}>{texts.hours.scheduling}</Text>
            <Text style={styles.sectionText}>{texts.hours.pharmacy}</Text>
            <Text style={styles.sectionText}>{texts.hours.afterHours}</Text>
            <Text style={styles.sectionText}>{texts.hours.nurseLine}</Text>
          </View>
        </View>

        {/* App Support */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{texts.appSupport.title}</Text>
          <Text style={styles.cardDescription}>
            {texts.appSupport.description}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => openEmail("partumApp@gmail.com")}
          >
            <Text style={styles.buttonText}>{texts.appSupport.button}</Text>
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
