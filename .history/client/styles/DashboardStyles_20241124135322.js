import { StyleSheet } from "react-native";
import { Color, Border, FontSize } from "./GlobalStyles";

const DashboardStyles = StyleSheet.create({
  dashboard: {
    flex: 1,
    maxWidth: "100%",
    width: "100%",
    backgroundColor: Color.nEW,
    borderRadius: Border.br_3xs,
  },
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
    backgroundColor: Color.graysWhite,
    left: 0,
    top: 0,
    position: "absolute",
  },
  partum: {
    top: 62,
    left: 131,
    fontSize: FontSize.size_5xl,
    width: 127,
    height: 29,
    color: Color.colorDarkslateblue_200,
  },
});

export default DashboardStyles;
