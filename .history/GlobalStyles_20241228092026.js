// GlobalStyles.js

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Colors
export const Color = {
  primary: "#6200EE", // Example primary color
  secondary: "#03DAC6", // Example secondary color
  accent: "#03A9F4", // Accent or highlight color
  background: "#FFFFFF",
  surface: "#F5F5F5",
  error: "#B00020",
  textPrimary: "#212121",
  textSecondary: "#757575",
  disabled: "#BDBDBD",
  divider: "#E0E0E0",
};

// Font sizes
export const FontSize = {
  tiny: 10,
  small: 12,
  medium: 14,
  large: 18,
  extraLarge: 24,
  header: 32,
};

// Font families
export const FontFamily = {
  regular: "Arial", // Replace with your app's default font
  bold: "Arial-BoldMT", // Ensure you load these fonts properly
  montserrat: "Montserrat-Regular",
  montserratBold: "Montserrat-Bold",
};

// Border radius
export const Border = {
  small: 4,
  medium: 8,
  large: 12,
  round: 50, // For circular elements
};

// Padding/Margin
export const Padding = {
  tiny: 4,
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,
};

// Spacing
export const Gap = {
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,
};

// Screen dimensions
export const Screen = {
  width,
  height,
};

// Shadows
export const Shadow = {
  default: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2, // For Android
  },
  heavy: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
};

// Common reusable styles
export const CommonStyles = {
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  fullWidth: {
    width: "100%",
  },
  fullHeight: {
    height: "100%",
  },
};
