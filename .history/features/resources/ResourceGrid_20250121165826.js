import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const ResourceGrid = ({
  resources,
  translations,
  languagePreference,
  onNavigate,
}) => {
  const t = translations[languagePreference] || translations.English;

  const renderResource = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onNavigate(item.route)}
    >
      <Image source={item.icon} style={styles.image} />
      <Text style={styles.title}>{t[item.titleKey]}</Text>
      <Text style={styles.subtitle}>{t.subtitle}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={resources}
      renderItem={renderResource}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#FEF5F1",
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 8,
    borderRadius: 8,
    alignSelf: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Arial",
  },
});

export default ResourceGrid;
