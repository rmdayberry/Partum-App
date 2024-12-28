import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width: screenWidth } = Dimensions.get("window");

const SimpleCarousel = () => {
  const data = [{ title: "Item 1" }, { title: "Item 2" }, { title: "Item 3" }];

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={screenWidth}
        height={200}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: screenWidth * 0.8,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default SimpleCarousel;
