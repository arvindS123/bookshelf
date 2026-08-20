# 📚 Book Library Management System

A full-stack web application for managing books and borrow records in a library.  
Built as a self-contained project focusing on clean data modeling, CRUD operations, validation, and realistic edge-case handling.

---

## ✨ Features

### Core Functionality
- **Full CRUD** for Books and Borrow Records
- Parent-Child relationship: View all borrow records of a specific book (`GET /books/:id/borrows`)
- **Pagination** and **Filtering** on list views
- Field-level validation with clear error messages
- Clear distinction between bad input (400), not found (404), and server errors (500)

### Edge Cases Handled
- **Overdue Flagging**: Automatically marks borrow records as `Overdue` when `dueDate` has passed and the book is not returned
- **Borrow Blocking**: Prevents creating a new borrow record when no copies of the book are available

### Authentication
- Secure **Admin Login** using JWT
- Protected routes (frontend + backend)
- Automatic token attachment and logout on unauthorized access

### Frontend
- Clean and responsive UI
- Dashboard with key statistics
- Search & filter capabilities
- Protected routes with login redirection

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React + Vite + TypeScript           |
| Backend    | NestJS (Node.js)                    |
| Storage    | JSON files (no external database)   |
| Auth       | JWT + Passport + bcrypt             |
| Validation | class-validator + class-transformer |
| HTTP Client| Axios                               |
| Routing    | React Router DOM                    |

---

## 📁 Project Structure

```text
book-library/
├── backend/                  # NestJS API
│   ├── src/
│   │   ├── auth/             # Login, JWT strategy & guards
│   │   ├── books/            # Book module (CRUD + validation)
│   │   ├── borrows/          # BorrowRecord module + edge cases
│   │   ├── data/             # JSON storage (books.json, borrows.json)
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
│
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── context/          # Auth context
│   │   ├── pages/            # Route-level pages
│   │   ├── services/         # API calls
│   │   ├── types/            # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

Check versions:
```bash
node -v
npm -v
```

---

## 🚀 Setup Instructions

### 1. Open the Project
```bash
cd book-library
```

### 2. Backend Setup

```bash
cd backend
npm install

# Install additional required packages (if not already present)
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt class-validator class-transformer uuid
npm install -D @types/passport-jwt @types/bcrypt @types/uuid
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Install additional packages
npm install react-router-dom axios
```

---

## ▶️ How to Run the Project

You need **two terminals**.

### Terminal 1 – Backend
```bash
cd backend
npm run start:dev
```
Backend will start at: **http://localhost:3000**

### Terminal 2 – Frontend
```bash
cd frontend
npm run dev
```
Frontend will start at: **http://localhost:5173**

Open your browser and go to:  
→ [http://localhost:5173](http://localhost:5173)

---

## 🔐 Admin Login Credentials

| Field    | Value     |
|----------|-----------|
| Username | `admin`   |
| Password | `admin123`|

After successful login you will be redirected to the Dashboard.

---

## 🧪 How to Test the Project

### 1. Authentication
- Try accessing any page without logging in → should redirect to `/login`
- Login with correct credentials → should go to Dashboard
- Login with wrong credentials → should show error message
- Click **Logout** → should clear session and return to login page

### 2. Books Module
- View list of books (with pagination)
- Search by title / author / ISBN
- Filter by genre
- Create a new book
- Edit an existing book
- Delete a book
- Open a book’s detail page and see its borrow records

### 3. Borrow Records Module
- View all borrow records
- Filter by status (`Active`, `Overdue`, `Returned`)
- Search by borrower name
- Create a new borrow record
- Mark a book as returned
- Delete a borrow record

### 4. Edge Cases (Important)
- Try to borrow a book when **all copies are already borrowed** → should be blocked with a clear error
- Create a borrow record with a past due date and leave it unreturned → it should appear as **Overdue**
- Observe available copies count on book details page

### 5. API Testing (Optional – using Postman / Thunder Client)

**Login first:**
```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

Copy the `access_token` and add it as:
```
Authorization: Bearer <your_token>
```

Then test the protected endpoints.

---

## 📡 API Endpoints Overview

### Auth
| Method | Endpoint          | Description     | Auth Required |
|--------|-------------------|-----------------|---------------|
| POST   | `/auth/login`     | Admin login     | No            |

### Books
| Method | Endpoint                | Description                        | Auth Required |
|--------|-------------------------|------------------------------------|---------------|
| GET    | `/books`                | List books (pagination + filters)  | Yes           |
| GET    | `/books/:id`            | Get single book                    | Yes           |
| GET    | `/books/:id/borrows`    | Get borrow records of a book       | Yes           |
| POST   | `/books`                | Create book                        | Yes           |
| PATCH  | `/books/:id`            | Update book                        | Yes           |
| DELETE | `/books/:id`            | Delete book                        | Yes           |

### Borrow Records
| Method | Endpoint                | Description                        | Auth Required |
|--------|-------------------------|------------------------------------|---------------|
| GET    | `/borrows`              | List records (pagination + filters)| Yes           |
| GET    | `/borrows/:id`          | Get single record                  | Yes           |
| POST   | `/borrows`              | Create borrow record               | Yes           |
| PATCH  | `/borrows/:id`          | Update record                      | Yes           |
| PATCH  | `/borrows/:id/return`   | Mark as returned                   | Yes           |
| DELETE | `/borrows/:id`          | Delete record                      | Yes           |

---

## 📝 Query Parameters

### Books (`GET /books`)
- `search` – search in title, author, ISBN
- `genre` – filter by genre
- `author` – filter by author
- `page` – page number (default: 1)
- `limit` – items per page (default: 10)

### Borrows (`GET /borrows`)
- `status` – `Active` | `Overdue` | `Returned`
- `borrowerName` – search by borrower name
- `bookId` – filter by book
- `page` / `limit` – pagination

---

## 📦 Data Storage

Data is stored in JSON files (no database required):

- `backend/src/data/books.json`
- `backend/src/data/borrows.json`

These files are read and written by the NestJS services.  
Data persists between server restarts.

---

## ⚠️ Important Notes

- This project uses **file-based storage** for simplicity. It is suitable for demonstration and small-scale use.
- Only one admin user is supported (`admin` / `admin123`).
- JWT tokens expire after **24 hours**.
- Make sure the backend is running before using the frontend.

---

## 🧑‍💻 Development Scripts

### Backend
```bash
npm run start:dev     # Start with hot-reload
npm run build         # Build for production
npm run start:prod    # Run production build
```

### Frontend
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
```

---

## 📄 License

This project is created for educational / evaluation purposes.

---

**Happy Coding!** 🚀
```
