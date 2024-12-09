const fs = require("fs");
const path = require("path");

// List of all files referencing 'expo-module-scripts/tsconfig.base'
const tsconfigPaths = [
  "node_modules/expo-application/tsconfig.json",
  "node_modules/expo-file-system/tsconfig.json",
  "node_modules/expo-keep-awake/tsconfig.json",
  "node_modules/expo-status-bar/tsconfig.json",
  "node_modules/xdl/node_modules/expo-file-system/tsconfig.json",
  "node_modules/xdl/node_modules/expo-keep-awake/tsconfig.json",
  "node_modules/xdl/node_modules/expo-asset/node_modules/expo-file-system/tsconfig.json",
  "node_modules/xdl/node_modules/expo-asset/node_modules/expo-constants/tsconfig.json",
  "node_modules/xdl/node_modules/expo-asset/tsconfig.json",
  "node_modules/xdl/node_modules/expo-font/tsconfig.json",
  "node_modules/xdl/node_modules/expo-constants/tsconfig.json",
  "node_modules/xdl/node_modules/expo-modules-core/tsconfig.json",
  "node_modules/expo-splash-screen/tsconfig.json",
  "node_modules/expo-constants/tsconfig.json",
  "node_modules/expo-modules-core/tsconfig.json",
  "node_modules/expo-app-loading/node_modules/expo-splash-screen/tsconfig.json",
  "node_modules/expo-app-loading/tsconfig.json",
];

// Path to your local tsconfig.base.json
const localTsconfigBasePath = "./config/tsconfig.base.json"; // Adjust if necessary

// Function to remove comments from JSON
function stripJsonComments(jsonString) {
  return jsonString
    .replace(/\/\/.*$/gm, "") // Remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, ""); // Remove multi-line comments
}

// Fix each tsconfig.json file
tsconfigPaths.forEach((tsconfigPath) => {
  const fullPath = path.resolve(__dirname, tsconfigPath);
  if (fs.existsSync(fullPath)) {
    try {
      // Read and clean the file
      let tsconfigContent = fs.readFileSync(fullPath, "utf-8");
      tsconfigContent = stripJsonComments(tsconfigContent);

      // Parse the JSON and update the "extends" field
      const tsconfig = JSON.parse(tsconfigContent);
      tsconfig.extends = localTsconfigBasePath; // Update to use your local tsconfig.base.json

      // Write the modified JSON back to the file
      fs.writeFileSync(fullPath, JSON.stringify(tsconfig, null, 2));
      console.log(`Fixed tsconfig.json for ${tsconfigPath}`);
    } catch (error) {
      console.error(
        `Failed to fix tsconfig.json for ${tsconfigPath}:`,
        error.message
      );
    }
  } else {
    console.warn(`tsconfig.json not found: ${tsconfigPath}`);
  }
});
