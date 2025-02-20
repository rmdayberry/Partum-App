/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["react-native", "expo", "@expo/webpack-config"], // Ensures Expo modules work with Next.js
  experimental: {
    forceSwcTransforms: true, // Helps with React Native compatibility
  },
};

module.exports = nextConfig;
