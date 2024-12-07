const fs = require("fs");
const path = require("path");

const packagesToFix = ["expo-font", "expo-image", "expo-asset"]; // Add more packages if needed
const localTsconfigBasePath = "./config/tsconfig.base.json"; // Adjust the path if necessary

packagesToFix.forEach((pkg) => {
  const tsconfigPath = path.resolve(
    __dirname,
    `node_modules/${pkg}/tsconfig.json`
  );
  if (fs.existsSync(tsconfigPath)) {
    try {
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf-8"));
      tsconfig.extends = localTsconfigBasePath; // Update the "extends" path
      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
      console.log(`Fixed tsconfig.json for ${pkg}`);
    } catch (error) {
      console.error(`Failed to fix tsconfig.json for ${pkg}:`, error);
    }
  } else {
    console.warn(`tsconfig.json not found for ${pkg}`);
  }
});
