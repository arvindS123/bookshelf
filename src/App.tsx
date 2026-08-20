import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BookDetailsPage from './pages/BookDetailsPage';
import CreateBookPage from './pages/CreateBookPage';
import EditBookPage from './pages/EditBookPage';
import BorrowsPage from './pages/BorrowsPage';
import CreateBorrowPage from './pages/CreateBorrowPage';

import './index.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <main className="container">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/new" element={<CreateBookPage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route path="/books/:id/edit" element={<EditBookPage />} />
            <Route path="/borrows" element={<BorrowsPage />} />
            <Route path="/borrows/new" element={<CreateBorrowPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;