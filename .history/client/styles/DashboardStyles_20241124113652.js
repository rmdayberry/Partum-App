import { StyleSheet } from "react-native";
import { Color } from "./GlobalStyles";

const DashboardStyles = StyleSheet.create({
  containerBorder: {
    borderWidth: 1,
    borderColor: Color.colorGray_100,
    borderStyle: "solid",
  },
  containerFlexbox: {
    textAlign: "center",
    position: "absolute",
  },
  riverlandIcon: {
    width: 66,
    height: 55,
    left: 65,
    top: 49,
    position: "absolute",
  },
  header: {
    width: 375,
    height: 123,
    overflow: "hidden",
    backgroundColor: Color.grayWhite,
    left: 0,
    top: 0,
    position: "absolute",
  },
});

export default DashboardStyles;
