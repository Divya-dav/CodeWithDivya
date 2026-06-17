# Code With Divya - Online Tutoring Platform

A complete full-stack website for C Language and Python online tutoring classes. It features dynamic course details, student registration/login, manual UPI payment confirmation, notes & assignments portals, and an administrator console for stats, payment approvals, student status toggles, and contact forms.

---

## 📂 Project Structure

```text
code-with-divya/
├── client/                     # Frontend Application (React + Vite + Tailwind)
│   ├── src/
│   │   ├── components/         # Reusable layouts (Navbar, Footer, ProtectedRoute)
│   │   ├── context/            # AuthContext.jsx global state provider
│   │   ├── pages/              # Views (Home, Courses, Contact, Login, Register, Payment, dashboards)
│   │   ├── services/           # api.js configured Axios interceptor
│   │   ├── App.jsx             # React Routing Configuration
│   │   ├── index.css           # Tailwind base + custom micro-animations
│   │   └── main.jsx            # React root mount wrapped in AuthProvider
│   ├── index.html              # Custom page title
│   ├── tailwind.config.js      # Custom theme colors config
│   ├── postcss.config.js       # PostCSS plugins config
│   └── .env                    # VITE_API_URL settings
└── server/                     # Backend API Server (Node.js + Express + Mongoose)
    ├── config/                 # db.js (Mongoose connection) and seeder.js (DB initialization)
    ├── controllers/            # Request handlers (Auth, Student, Admin, Course, Contact, Payment)
    ├── middleware/             # authMiddleware.js (JWT validation & role control)
    ├── models/                 # Mongoose schemas (User, Course, Contact, Payment)
    ├── routes/                 # Express route mappings
    ├── server.js               # Express application coordinator
    └── .env                    # Port, Mongo URI, and JWT Secret configuration
```

---

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed (v18+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally on port 27017

---

### Step 1: Run MongoDB Locally
Ensure your local MongoDB instance is started. In Windows, this is usually running automatically as a system service. If not, you can run it via cmd/powershell:
```bash
mongod
```

---

### Step 2: Configure Environment Variables

#### Backend Server Config
Create or inspect the `.env` file at `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/code_with_divya
JWT_SECRET=divya_secret_key_12345_secure_jwt
```

#### Frontend Client Config
Create or inspect the `.env` file at `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

### Step 3: Run the Backend API Server
1. Open a terminal and navigate to the `/server` folder.
2. Launch the backend in development hot-reload mode:
```bash
cd server
npm run dev
```
*(The server will print `MongoDB Connected: 127.0.0.1` and `Server running in development mode on port 5000`)*.
> [!NOTE]
> Upon initial startup, the database seeding routine in `server/config/seeder.js` runs automatically. It seeds default courses (C Language & Python) and inserts the administrator account.

---

### Step 4: Run the Frontend Client Dev Server
1. Open a second terminal window and navigate to the `/client` folder.
2. Start the Vite hot-reload compiler server:
```bash
cd client
npm run dev
```
3. Open the localhost link printed in your terminal (typically `http://localhost:5173`) in your browser.

---

## 🔑 Default Accounts & Credentials

### 1. Default Administrator Account
This account is seeded automatically. You can log in using these credentials under the **Admin Portal** tab:
- **Email:** `admin@code-with-divya.com`
- **Password:** `adminpassword123`

### 2. Student Registration
Students can register using the register form link. Their accounts default to:
- **Payment Status:** `Pending` (Notes and assignments locked)
- **Course Status:** `Active`

---

## 💳 Testing Student Course Enrollment & Payment Flow
1. **Register** a new test student. Choose interest (e.g. C Language).
2. **Login** as the new student. You will see a warning: `Enrollment Incomplete (Payment Needed)`.
3. Click **Complete Payment Now** or go to the **Courses** page and click "Enroll".
4. Follow the scan instructions, input a dummy 12-digit UPI Transaction ID (e.g. `112233445566`), select a course, and submit the claim proof.
5. The student dashboard changes status to `Payment Claim Pending Approval` and stays locked.
6. **Log out** as the student.
7. **Log in** as the Administrator (`admin@code-with-divya.com` / `adminpassword123`).
8. Go to the **Payment Proofs** tab on the Admin Panel. You will see the student's transaction proof claim in the list.
9. Click **Approve & Mark Paid**.
10. **Log out** as the admin, and **log back in** as the student.
11. The student dashboard is now unlocked: notes, class schedules, assignments, and downloading resources are fully accessible.
