# 🚀 Project Task Manager

A full-stack Task Manager web application built with:

- React + Vite
- Node.js + Express
- PostgreSQL
- Prisma ORM

---

# ✨ Features

- Add Tasks
- Edit Tasks
- Delete Tasks
- Mark Complete
- Search Tasks
- Filter Tasks
- PostgreSQL Database
- REST API

---

# 🛠 Tech Stack

## Frontend
- React
- Vite
- Axios
- CSS

## Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

---

# 📂 Project Structure

```bash
project-task-manager/
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── prisma/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/yourusername/project-task-manager.git
```

---

## 2. Install Frontend

```bash
cd frontend
npm install
```

---

## 3. Install Backend

```bash
cd backend
npm install
```

---

# 🗄 Database Setup

Create `.env` file inside backend folder.

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/task_manager_db"
```

---

# ▶ Run Backend

```bash
cd backend
npm run dev
```

Backend running on:

```bash
http://localhost:5000
```

---

# ▶ Run Frontend

```bash
cd frontend
npm run dev
```

Frontend running on:

```bash
http://localhost:5173
```

---

# 🔥 API Endpoints

## Get Tasks

```http
GET /tasks
```

## Create Task

```http
POST /tasks
```

## Update Task

```http
PUT /tasks/:id
```

## Delete Task

```http
DELETE /tasks/:id
```

---

# 🐳 Docker Support

```bash
docker-compose up
```

---

# ☁ Deployment

Frontend:
- Vercel

Backend:
- Render

Database:
- PostgreSQL

---

# 👨‍💻 Author
Kyaw Sit THu