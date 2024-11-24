import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import DashboardStyles from "../styles/DashboardStyles";

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={[DashboardStyles.dashboard, DashboardStyles.containerBorder]}
    >
      <View style={[DashboardStyles.header, DashboardStyles.containerBorder]}>
        <Image
          style={DashboardStyles.riverlandIcon}
          contentFit="cover"
          source={require("../assets/Riverland.png")}
        />
        <Text
          style={[DashboardStyles.partum, DashboardStyles.containerFlexBox]}
        >
          Partum
        </Text>
      </View>

      <View styles={[styles.frame, styles.frameLayout1]}></View>

      <View>
        <Text>What You Can Expect This Week:</Text>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
