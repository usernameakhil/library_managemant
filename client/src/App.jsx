import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BooksList from './pages/BooksList';
import BookForm from './pages/BookForm';
import MembersList from './pages/MembersList';
import MemberForm from './pages/MemberForm';
import IssueBook from './pages/IssueBook';
import TransactionsList from './pages/TransactionsList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="books" element={<BooksList />} />
          <Route path="books/add" element={<BookForm />} />
          <Route path="books/edit/:id" element={<BookForm />} />
          <Route path="members" element={<MembersList />} />
          <Route path="members/add" element={<MemberForm />} />
          <Route path="members/edit/:id" element={<MemberForm />} />
          <Route path="transactions" element={<TransactionsList />} />
          <Route path="transactions/issue" element={<IssueBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
