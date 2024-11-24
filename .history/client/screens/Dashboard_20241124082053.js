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
        <Image contentFit="cover" source={require("../assets/Riverland.png")} />
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
