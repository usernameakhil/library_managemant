# Library Management System (MERN Stack)

A simple full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js) with Tailwind CSS styling. The system helps librarians manage books, library members, and track book issues and returns with real-time stock updating and validation checks.

## Objectives
- **Book Management**: Add, update, view, and delete books.
- **Member Management**: Register and manage library members.
- **Issue & Return**: Record book issue transactions, automatically decrementing available stock, and record book returns to restore stock.
- **Dashboard**: Display key library metrics (total book titles, copies, members, active issues, and returned history).

---

## Folder Structure

```text
library-management-system/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── components/         # Shared UI components (Layout, Navbar, StatCard)
│   │   ├── pages/              # Page views (Dashboard, Books, Members, Transactions, Issue)
│   │   ├── services/           # Axios HTTP API client
│   │   ├── App.jsx             # React Routes and layouts
│   │   ├── main.jsx            # React root mount
│   │   └── index.css           # Tailwind CSS styles
│   └── package.json
├── server/                     # Express Backend (Node.js)
│   ├── config/                 # DB configuration
│   ├── controllers/            # Controller logic for Books, Members, Transactions
│   ├── models/                 # Mongoose database models
│   ├── routes/                 # Express API routes
│   ├── server.js               # Express server entrypoint
│   └── package.json
├── package.json                # Root package.json coordinating dev operations
└── README.md
```

---

## Database Design

The database contains three collection schemas:

1. **Books** (`Book` model):
   - `title` (String, required)
   - `author` (String, required)
   - `category` (String, required)
   - `isbn` (String, required, unique)
   - `quantity` (Number, min 0, default 1)
   - `availableQuantity` (Number, min 0, default equal to quantity)

2. **Members** (`Member` model):
   - `name` (String, required)
   - `email` (String, required, unique, format validated)
   - `phone` (String, required)
   - `membershipDate` (Date, default Date.now)

3. **Transactions** (`Transaction` model):
   - `bookId` (ObjectId referencing Book, required)
   - `memberId` (ObjectId referencing Member, required)
   - `issueDate` (Date, default Date.now)
   - `returnDate` (Date, default null)
   - `status` (String enum: `['Issued', 'Returned']`, default `'Issued'`)

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

## Installation and Setup

### Prerequisites
- **Node.js**: Installed on your system (v16+ recommended).
- **MongoDB**: Installed locally and running on port `27017` (or configured via `.env` file).

### Step-by-Step Setup

1. **Clone or Navigate to Project Directory**:
   ```bash
   cd "/Users/akhil/LIBRARY MANAGEMENT SYSTEM"
   ```

2. **Install Root and Child Dependencies**:
   You can install all dependencies (root, backend, and frontend) at once using the root coordinator scripts:
   ```bash
   # Install root dependencies
   npm install
   
   # Automatically install server & client dependencies
   npm run install-all
   ```

3. **Database Configuration**:
   Ensure MongoDB is running locally. The server is pre-configured to look for `mongodb://127.0.0.1:27017/library_db` in `server/.env`. If you need to change this, modify `server/.env`:
   ```text
   PORT=5001
   MONGO_URI=mongodb://127.0.0.1:27017/your_db_name
   ```

4. **Run the Application**:
   Start both the backend server and Vite frontend development server concurrently:
   ```bash
   npm run dev
   ```
   
   - **Frontend React app** will start at: `http://localhost:5173`
   - **Backend API server** will start at: `http://localhost:5001`
