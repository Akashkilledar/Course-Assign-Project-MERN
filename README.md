# 📚 Course Assigning App

A **MERN Stack** web application for managing students and assigning courses. Built with **React (Vite), Node.js, Express, and MongoDB**.

---

## 🚀 Features
- 📌 Add, edit, and delete **students**, **courses**, and **assigned courses**.
- 🔗 Assign multiple courses to students.
- 📋 View assigned courses with **populated student and course details**.
- 🎨 Fast and modern UI with **Vite + React**.
- 🛠️ RESTful API with **Express & MongoDB**.
- 🔒 Secure and efficient backend.

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite), Bootstrap
- **Backend:** Node.js, Express.js, MongoDB
- **State Management:** React Hooks
- **Package Manager:** npm / yarn

---

## 💂‍♂️ Project Structure
```
course-assigning-app/
│-- frontend/       # Vite React Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│-- backend/        # Express Backend
│   ├── models/     # MongoDB Models
│   ├── routes/     # API Routes
│   ├── index.js    # Entry Point
│   ├── package.json
│-- .gitignore
│-- README.md
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Akashkilledar/Course-Assign-Project-MERN.git
cd course-assign-project
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```
- Start the backend server:
  ```sh
  npm start
  ```

### 3️⃣ Frontend Setup
```sh
cd ../frontend
npm install
```
- Start the frontend:
  ```sh
  npm run dev
  ```

---

## 🚀 Usage
1. Open your browser and go to **`http://localhost:5173`** (Vite default).
2. Add students and courses.
3. Assign courses to students.
4. View assigned courses with populated student and course details.

---

## 📌 API Endpoints
### **Student Routes**
| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | `/api/students`     | Get all students        |
| POST   | `/api/students`     | Add a new student       |
| PUT    | `/api/students/:id` | Update a student        |
| DELETE | `/api/students/:id` | Delete a student        |

### **Course Routes**
| Method | Endpoint            | Description              |
|--------|---------------------|--------------------------|
| GET    | `/api/courses`      | Get all courses         |
| POST   | `/api/courses`      | Add a new course        |
| PUT    | `/api/courses/:id`  | Update a course         |
| DELETE | `/api/courses/:id`  | Delete a course         |

### **Assigned Course Routes**
| Method | Endpoint                      | Description                                      |
|--------|--------------------------------|--------------------------------------------------|
| GET    | `/api/assignedCourses`        | Get all assigned courses with student & course details |
| POST   | `/api/assignedCourses`        | Assign a course to a student                    |
| DELETE | `/api/assignedCourses/:id`    | Remove an assigned course                       |

---

## 🐝 License
This project is **MIT Licensed**. Feel free to use and modify.

---

## 📩 Contact
For queries, reach out to:
- **Email:** akashkilledar8066@email.com
- **GitHub:** https://github.com/Akashkilledar

---

🚀 *Happy Coding!* 🎉

