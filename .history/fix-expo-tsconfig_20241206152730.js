const fs = require("fs");
const path = require("path");

// List of packages to fix
const packagesToFix = ["expo-font", "expo-image", "expo-asset"];
const localTsconfigBasePath = "./config/tsconfig.base.json"; // Adjust the path if necessary

// Function to remove comments from JSON
function stripJsonComments(jsonString) {
  return jsonString
    .replace(/\/\/.*$/gm, "") // Remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, ""); // Remove multi-line comments
}

packagesToFix.forEach((pkg) => {
  const tsconfigPath = path.resolve(
    __dirname,
    `node_modules/${pkg}/tsconfig.json`
  );
  if (fs.existsSync(tsconfigPath)) {
    try {
      // Read the file and remove comments
      let tsconfigContent = fs.readFileSync(tsconfigPath, "utf-8");
      tsconfigContent = stripJsonComments(tsconfigContent);

      // Parse the JSON and modify the extends field
      const tsconfig = JSON.parse(tsconfigContent);
      tsconfig.extends = localTsconfigBasePath; // Update the "extends" path

      // Write the modified JSON back to the file
      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
      console.log(`Fixed tsconfig.json for ${pkg}`);
    } catch (error) {
      console.error(`Failed to fix tsconfig.json for ${pkg}:`, error.message);
    }
  } else {
    console.warn(`tsconfig.json not found for ${pkg}`);
  }
});
