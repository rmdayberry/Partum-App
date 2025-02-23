## **Partum - Pregnancy & Postpartum Education App**

### **Overview**

Partum is a cross-platform pregnancy and postpartum education app built with the MERN stack, using React Native for mobile development. It provides users with evidence-based health education in multiple languages, appointment tracking with reminders, and a structured notes section linked to visits. The dashboard includes a pregnancy progress tracker and an interactive sliding card UI for quick access to key information.

### **Live Demo**

**Frontend (Vercel):** [Partum Web App](https://partum-f29ksf0cm-reagans-projects-2fcbf7b0.vercel.app)  
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

- **Frontend:** Vercel
- **Backend:** Render

---

## **Installation & Setup**

### **Prerequisites**

✔ **Node.js & npm** installed  
✔ **MongoDB Atlas** account for database storage  
✔ **Vercel CLI** (optional, for local testing of deployment)

### **1. Clone the Repository**

```bash
git clone https://github.com/rmdayberry/Partum-App.git
cd Partum-App
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Set Up Environment Variables**

Create a `.env` file in the root directory and add the following:

```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### **4. Start the Backend Server**

```bash
cd server
npm install
npm start
```

- The backend will run at **http://localhost:5002**

### **5. Start the Frontend (Web Version)**

```bash
npm run dev
```

- Open **http://localhost:3000** to view the app in your browser

---

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

## **License**

This project is licensed under the **MIT License**.

## **Acknowledgments**

Special thanks to healthcare professionals who provided content guidance.  
Built as a **Software Engineering Capstone Project**.

---

### **Ready to Test?**

Open **[Partum on Vercel](https://partum-f29ksf0cm-reagans-projects-2fcbf7b0.vercel.app)** and explore the app! 🚀
