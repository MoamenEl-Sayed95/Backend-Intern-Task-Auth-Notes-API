---

# 📝 Backend-Intern-Task-Auth-Notes-API



## 📘 Summary:

- This project is a secure Notes API built with Node.js, Express, and TypeScript that allows users to manage their personal notes. It features a full authentication 🔑 and authorization 🛡️ system, enabling users to securely register, log in, and perform CRUD operations 📝 on their own content. The API includes features like soft deletion 🗑️, filtering 🔍, and pagination, all within a clean and well-structured architecture.

---
## ⚙️ Technologies Used:

- **Node.js** : A JavaScript runtime for server-side development.

- **Express.js** : A minimalist web framework for Node.js.

- **TypeScript** : A typed superset of JavaScript that improves code quality.

- **MongoDB** : A NoSQL document database.

- **Mongoose** : An elegant MongoDB object modeling tool for Node.js.

- **JSON Web Token (JWT)** : For secure, stateless authentication.

- **Bcrypt** : A library for hashing passwords securely.

---
## 📂 Project Structure

```
project-root/
│
├── src/
│ ├── controllers/
│ │ ├── auth.controller.ts
│ │ ├── note.controller.ts
│ │ └── user.controller.ts
│ ├── middlewares/
│ │ ├── auth.ts
│ │ ├── errorHandler.ts
│ │ ├── logger.ts
│ │ └── notFound.ts
│ ├── models/
│ │ ├── note.model.ts
│ │ └── user.model.ts
│ ├── routes/
│ │ ├── auth.routes.ts
│ │ └── note.routes.ts
│ ├── schemas/
│ │ ├── note.schema.ts
│ │ └── user.schema.ts
│ ├── services/
│ │ ├── note.service.ts
│ │ └── user.service.ts
│ ├── app.ts
│ └── server.ts
│
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md

```

---

## 💡 Features

- User Authentication (Register / Login with JWT)
- Authorization (only note owners can update/delete their notes)
- CRUD operations for notes
- Soft delete implementation
- Notes filtering & pagination
- Request logging and centralized error handling

---

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/backend-intern-task-auth-notes-api.git

---