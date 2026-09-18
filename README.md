# Library Management System

A full-stack web application developed using Express.js, React.js, and Node.js with Tailwind CSS styling. The system operates with **hardcoded in-memory data (Zero MongoDB / Database setup required)**. Librarians can manage books, library members, and track book issues and returns with real-time stock updating and validation checks.

## Objectives
- **Book Management**: Add, update, view, and delete books.
- **Member Management**: Register and manage library members.
- **Issue & Return**: Record book issue transactions, automatically decrementing available stock, and record book returns to restore stock.
- **Dashboard**: Display key library metrics (total book titles, copies, members, active issues, and returned history).
- **Zero Database Setup**: Pre-configured with rich hardcoded library inventory, registered members, and lending history.

---

## Folder Structure

```text
library-management-system/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── components/         # Shared UI components (Layout, Navbar, StatCard)
│   │   ├── pages/              # Page views (Dashboard, Books, Members, Transactions, Issue)
│   │   ├── services/           # Hardcoded API & fallback store
│   │   ├── App.jsx             # React Routes and layouts
│   │   ├── main.jsx            # React root mount
│   │   └── index.css           # Tailwind CSS styles
│   └── package.json
├── server/                     # Express Backend (Node.js)
│   ├── data/                   # In-memory hardcoded data store (No MongoDB)
│   ├── controllers/            # Controller logic for Books, Members, Transactions
│   ├── models/                 # Pure schema references
│   ├── routes/                 # Express API routes
│   ├── server.js               # Express server entrypoint
│   ├── seed.js                 # Hardcoded data reset utility
│   └── package.json
├── package.json                # Root package.json coordinating dev operations
└── README.md
```

---

## Hardcoded Data Architecture

The system uses an in-memory data store (`server/data/store.js`) initialized with rich sample data:
- **10 Books**: Fiction, Science, History, Technology, Self-Help, Sci-Fi, Psychology with individual ISBNs and available copy tracking.
- **6 Members**: Borrower accounts with email and contact details.
- **7 Transactions**: Active loans and historical returned books.

All CRUD operations, issue/return transactions, and validation constraints (e.g. ISBN uniqueness, email validation, negative quantity checks, and preventing deletion of actively loaned books) operate in-memory.

---

## Backend API Endpoints

### Books API
- `GET /api/books` - Retrieve all books in inventory.
- `GET /api/books/:id` - Get details of a specific book.
- `POST /api/books` - Register a new book title.
- `PUT /api/books/:id` - Update book details (safely handles overall quantity changes against active issue count).
- `DELETE /api/books/:id` - Remove a book (fails if there are active outstanding issues).

### Members API
- `GET /api/members` - Retrieve all registered members.
- `GET /api/members/:id` - Get details of a specific member.
- `POST /api/members` - Register a new member.
- `PUT /api/members/:id` - Update member details.
- `DELETE /api/members/:id` - Delete a member (fails if they currently have issued books).

### Transactions API
- `GET /api/transactions` - Fetch list of all borrow/return transactions.
- `POST /api/transactions/issue` - Record book issue (decrements available stock, checks eligibility).
- `PUT /api/transactions/:id/return` - Return an issued book (increments available stock).
- `GET /api/transactions/dashboard/stats` - Fetch aggregate numbers for dashboard cards.

---

## Installation and Quick Start

### Prerequisites
- **Node.js**: Installed on your system (v16+ recommended).
- **MongoDB**: **NOT NEEDED** - The application runs completely with hardcoded in-memory state.

### Step-by-Step Setup

1. **Install Root and Child Dependencies**:
   ```bash
   npm install
   npm run install-all
   ```

2. **Run the Application**:
   Start both the backend server and Vite frontend development server concurrently:
   ```bash
   npm run dev
   ```
   
   - **Frontend React app**: `http://localhost:5173`
   - **Backend API server**: `http://localhost:5001`

3. **Optional - Run Individually**:
   - Backend only: `npm run server`
   - Frontend only: `npm run client` (also includes client-side fallback store so it functions even without the server running)
   - Reset sample data: `npm run seed`
