# 🔐 PassOP – Local Password Manager

A full-stack password manager app built with **React**, **Node.js**, and **MongoDB (Local)**. Save, edit, delete, and copy your passwords securely — all stored in your local MongoDB database.

---

## 🛠 Tech Stack

- **Frontend:** React + Tailwind CSS + Toastify
- **Backend:** Node.js + Express
- **Database:** MongoDB (Local)

---

## ⚙️ Setup Instructions

### 🔙 Backend (Node.js + MongoDB Local)

1. Ensure MongoDB is installed and running locally (`mongodb://localhost:27017`).

2. Navigate to the backend folder:
   ```bash
   cd backend
    ```

3. Install backend dependencies:
   ```bash
   npm install
   ```
4. Create a .env file:

   ```bash
     MONGO_URI=mongodb://localhost:27017
    ```
5.Start the server:
  ```bash
     node index.js
  ```

## Server runs at http://localhost:3000
### 💻 Frontend (React)
1. Install frontend dependencies:
 
   ```bash
   npm install
   ```
2. Start the React app:
    ```bash
    npm run dev
    ```
### App runs at http://localhost:5173 or similar

### ✅ Features
1. Add a password (site, username, password)
2. Edit an existing password
3. Delete a password entry
4. Copy password to clipboard
5. Toast notifications for feedback
6. Data stored in MongoDB locally

### 📡 API Endpoints
| Method   | URL | Description               |
| -------- | --- | ------------------------- |
| `GET`    | `/` | Fetch all saved passwords |
| `POST`   | `/` | Save new password data    |
| `DELETE` | `/` | Delete password by `id`   |



### 🧪 Requirements
1. Node.js & npm
2. MongoDB installed and running locally
3. React with Vite or CRA setup

### 🧑‍💻 Author
Built by PraveenRajput 
### 📜 License
MIT License
