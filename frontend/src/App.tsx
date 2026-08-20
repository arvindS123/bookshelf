import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';
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
        <Navbar />
        {/* Remove the old "container" class */}
        <main className="min-h-screen">
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books"
              element={
                <ProtectedRoute>
                  <BooksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books/new"
              element={
                <ProtectedRoute>
                  <CreateBookPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books/:id"
              element={
                <ProtectedRoute>
                  <BookDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/books/:id/edit"
              element={
                <ProtectedRoute>
                  <EditBookPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/borrows"
              element={
                <ProtectedRoute>
                  <BorrowsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/borrows/new"
              element={
                <ProtectedRoute>
                  <CreateBorrowPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 text-gray-300 py-6 border-t border-gray-800 z-40">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Book Library. All rights reserved.
              </p>
            </div>
          </div>
        </footer>

        {/* Padding at bottom to prevent content from being hidden under fixed footer */}
        <div className="h-20" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;