# **Partum - Pregnancy & Postpartum Education App**

## **Overview**

Partum is a cross-platform pregnancy and postpartum education app built with the MERN stack, using React Native for mobile development. It provides users with evidence-based health education in multiple languages, appointment tracking with reminders, and a structured notes section linked to visits. The dashboard includes a pregnancy progress tracker and an interactive sliding card UI for quick access to key information.

## **Live Demo**

### **Expo Go (Easiest - Requires Expo Account)**

The easiest way to test the app is using **Expo Go**.

### **Steps to Access the App:**

1. **Download Expo Go** on your **iOS** or **Android** device:

   - 📱 [Download for iOS](https://apps.apple.com/us/app/expo-go/id982107779)
   - 📱 [Download for Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Sign in or create an Expo account.**
3. **Open the app link in your mobile browser** and follow the prompts:  
   👉 **[Partum on Expo EAS](https://expo.dev/accounts/rdayberry/projects/Partum)**
4. Tap **"Open project in Expo Go"** to launch the app.

---

## **How to Run the App Locally**

Since there’s currently no **public build**, follow these steps to run the app using **Expo Go** or an emulator.

### **Prerequisites**

✔ Install **Node.js (LTS version) & npm**  
✔ Install **Expo CLI** globally:

````bash
npm install -g expo-cli


✔ **MongoDB Atlas** (or a local MongoDB instance)
✔ **Expo Go** installed on your phone:
[iOS - App Store](https://apps.apple.com/us/app/expo-go/id982107779)
[Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
✔ **Xcode (for iOS Simulator) or Android Studio (for Android Emulator)** (optional)

## **1. Clone the Repository**
```bash
git clone https://github.com/rmdayberry/Partum-App.git
cd Partum-App

## **2. Install Dependencies**
Navigate to the project directory and install all required dependencies:

```bash
npm install

## **3. Set Up Environment Variables**
Create a `.env` file in the root directory and add the following:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

## **4. Start the Backend Server**

### ***Navigate to the backend directory and install dependencies:

```bash
cd server
npm install

### **Start the Backend Server**
```bash
npm start

By default, the backend will run at http://localhost:5002.

### **Start the Expo Development Server**
Navigate back to the root project directory:
```bash
cd ..

Start the Expo development server:
```bash
npx expo start

### **Open the App on a Device or Emulator**
#### **Option 1: Run on a Physical Device (Recommended)**
1. Ensure you have **Expo Go** installed on your phone:
   - 📱 **iOS** - [Download from the App Store](https://apps.apple.com/app/expo-go/id982107779)
   - 📱 **Android** - [Download from Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Scan the QR code displayed in the terminal or in the Expo Developer Tools with your **Expo Go** app.
3. The app will open on your device.

#### **Option 2: Run on an Emulator or Simulator**
- **iOS Simulator (Mac only)**
  1. Install **Xcode** from the Mac App Store.
  2. In the Expo Developer Tools, click **"Run on iOS simulator"**.

- **Android Emulator**
  1. Install **Android Studio** and set up a virtual device.
  2. Ensure the emulator is running.
  3. In the Expo Developer Tools, click **"Run on Android device/emulator"**.





**Backend (Render):** [API Server](https://partum-app.onrender.com)
**API Health Check:** [Check API Status](https://partum-app.onrender.com/api/health)

---

## **Features**

✔ **Pregnancy Progress Tracker** - Displays gestational progress with weekly updates
✔ **Appointment Tracking** - Schedule and manage medical visits with reminders
✔ **Structured Notes Section** - Users can add notes linked to specific appointments
✔ **Multi-Language Support** - Health education content available in multiple languages
✔ **Sliding Card UI** - Interactive dashboard for easy access to key information
✔ **Mobile-First Design** - Built with React Native for both iOS and Android support

---

## **Tech Stack**

### **Frontend:**

- React Native (Expo)
- Context API for state management
- React Navigation

### **Backend:**

- Node.js with Express
- MongoDB & Mongoose for database management
- JWT for authentication
- CORS-enabled API (for secure cross-origin requests)

### **Deployment:**

- **Frontend:** Expo EAS
- **Backend:** Render

----

## **API Endpoints**

| Method   | Endpoint          | Description              |
| -------- | ----------------- | ------------------------ |
| **GET**  | `/api/health`     | Check if API is running  |
| **POST** | `/users/register` | Register a new user      |
| **POST** | `/users/login`    | Log in a user            |
| **GET**  | `/appointments`   | Fetch user appointments  |
| **POST** | `/appointments`   | Create a new appointment |
| **GET**  | `/pregnancy`      | Get pregnancy week info  |

---

## **Future Enhancements**

**Push Notifications** for upcoming appointments
 **Dark Mode Support**
 **Offline Mode** – View content without an internet connection
 **Community Forum** for support and discussions

---

## **Acknowledgments**

Special thanks to healthcare professionals who provided content guidance.

---

### **Ready to Test?**

Open **[Partum on Expo EAS](https://expo.dev/accounts/rdayberry/projects/Partum)** and explore the app!
````
