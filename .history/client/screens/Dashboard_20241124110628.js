import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import DashboardStyles from "../styles/DashboardStyles";

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View>
        <Image
          style={[styles.riverlandIcon]}
          source={require("../assets/Riverland.png")}
        />
      </View>

      <View>{/*Progress bar goes here*/}</View>

      <View>
        <Text>What You Can Expect This Week:</Text>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
