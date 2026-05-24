*NEXUS.AI — Intelligent Full-Stack AI Chatbot Platform*

NEXUS.AI is a modern AI-powered chatbot platform built using the MERN stack with real-time communication, persistent memory, scalable backend architecture, and intelligent conversational capabilities.
The project focuses on delivering a seamless AI interaction experience with secure authentication, responsive UI, memory-aware conversations, and optimized API handling.

# 🚀 Features

* 🤖 AI-powered conversational chatbot
* 🧠 Long-Term & Short-Term Memory support
* 💬 Real-time AI responses using Socket.IO
* 🔐 Secure Authentication & Authorization
* 📂 Persistent Chat History Management
* ⚡ Fast and scalable backend architecture
* 🎨 Modern responsive UI/UX
* 🌙 Theme-based frontend styling
* 📡 REST API + WebSocket integration
* ☁️ Deployment-ready structure
  

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* CSS3
* App.css & Theme.css
* Axios
* Socket.IO Client
* React Router DOM

## Backend

* Node.js
* Express.js
* Socket.IO
* JWT Authentication
* bcrypt.js

## Database

* MongoDB
* Mongoose ODM

## AI & Memory Integration

* LLM API Integration
* Context-based Memory Handling
* Long-Term & Short-Term Conversation Storage

## Dev Tools

* Git & GitHub
* Postman
* VS Code
* Nodemon

---

# 📁 Project Structure

```bash
NEXUS.AI/
│
├── client/                 # Frontend React Application
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── App.css
│   └── Theme.css
│
├── server/                 # Backend Express Server
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── sockets/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# ⚙️ Core Functionalities

## 🔹 Authentication System

* User Registration
* Secure Login
* JWT Token-based Authorization
* Password Hashing using bcrypt

## 🔹 AI Chat Engine

* AI-generated conversational responses
* Real-time streaming architecture
* Context-aware response generation

## 🔹 Memory System

### Short-Term Memory

Maintains active conversational context during a session for better continuity.

### Long-Term Memory

Stores previous interactions and important conversation history for personalized AI responses.

## 🔹 Real-Time Communication

Implemented using Socket.IO for:

* Persistent bidirectional connection
* Faster AI response delivery
* Live messaging experience

---

# 🎨 Frontend Overview

The frontend is designed with a responsive and modern interface to improve user interaction and accessibility.

### Main Pages

* Home Page
* Login Page
* Register Page
* Chat Interface

### Styling

Custom styling handled using:

* `App.css`
* `Theme.css`

---

# 🔒 Security Features

* JWT Authentication
* Password Encryption
* Protected Routes
* Environment Variable Protection
* Secure API Handling

---

# 📦 Installation & Setup

## Clone Repository

```bash
git clone https://github.com/your-username/NEXUS.AI.git
```

## Navigate to Project

```bash
cd NEXUS.AI
```

## Install Dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd server
npm install
```

---

# ▶️ Run Project

## Start Backend

```bash
npm run server
```

## Start Frontend

```bash
npm run dev
```

---

# 🌐 Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
AI_API_KEY=your_api_key
```

---

# 📈 Future Enhancements

* Voice Assistant Integration
* Multi-AI Model Support
* AI File Analysis
* Vector Database Integration
* RAG-based Retrieval System
* AI Agent Workflows
* Group Chat Functionality
* Cloud Deployment & Scaling

---

# 👨‍💻 Author

Developed by **Aaryan Awasthi**
Tech Enthusiast | MERN Stack Developer | AI Developer

---

# ⭐ Contribution

Contributions, issues, and feature requests are welcome.
Feel free to fork the repository and submit pull requests.

---

# 📄 License

This project is licensed under the MIT License.
