import { registerRootComponent } from "expo";
import { AppRegistry, Platform } from "react-native";
import App from "./App";
import appConfig from "./app.json";

const appName = appConfig.expo?.name || "DefaultAppName";

if (Platform.OS === "web") {
  AppRegistry.registerComponent(appName, () => App);
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById("root"),
  });
} else {
  registerRootComponent(App);
}
