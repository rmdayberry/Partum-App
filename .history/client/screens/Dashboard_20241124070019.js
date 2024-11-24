import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DashboardStyles from "../styles/DashboardStyles";

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View>
        <Image
          contentFit="cover"
          source={require("../assets/riverland-1.png")}
        />
      </View>

      <View>{/*Progress bar goes here*/}</View>

      <View>
        <Text>What You Can Expect This Week:</Text>
      </View>

      <View>
        <Text>Upcoming Appointments</Text>
        {/*add appointment cards here*/}
      </View>
    </ScrollView>
  );
};

export default Dashboard;
