import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookService } from '../services/bookService';
import { borrowService } from '../services/borrowService';
import Loading from '../components/common/Loading';

// Adjust this type if your Book type is different
interface Book {
  id: string;
  title: string;
  author?: string;
  coverImage?: string;
  category?: string;
}

export default function HomePage() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalBorrows: 0,
    activeBorrows: 0,
    overdue: 0,
  });
  const [recentBooks, setRecentBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      bookService.getAll({ limit: 8 }), // fetch more books for "Recent Books"
      borrowService.getAll({ limit: 100 }),
    ]).then(([booksRes, borrowsRes]) => {
      const borrows = borrowsRes.data;

      setStats({
        totalBooks: booksRes.meta.total,
        totalBorrows: borrowsRes.meta.total,
        activeBorrows: borrows.filter((b) => b.status === 'Active').length,
        overdue: borrows.filter((b) => b.status === 'Overdue').length,
      });

      // Take the latest books (assuming the API returns newest first)
      setRecentBooks(booksRes.data.slice(0, 6));
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========== FULL WIDTH WELCOME BANNER ========== */}
      <div className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[30vh] min-h-[220px] flex flex-col justify-center">
          <p className="text-violet-100 text-sm font-medium mb-2 tracking-wide uppercase">
            Library Management System
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Welcome back! 👋
          </h1>
          <p className="mt-3 text-violet-100 text-lg max-w-2xl">
            Here's what's happening in your library today. Manage books, track borrows, and keep everything organized.
          </p>
        </div>
      </div>

      {/* ========== MAIN CONTENT ========== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="mt-1 text-gray-500">Overview of your library</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Total Books */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Books</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalBooks}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          {/* Active Borrows */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Borrows</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stats.activeBorrows}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Overdue */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Overdue</p>
                <p className="mt-2 text-3xl font-bold text-red-600">{stats.overdue}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Records */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Records</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{stats.totalBorrows}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/books/new"
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-colors"
            >
              <span className="text-lg leading-none">+</span>
              Add Book
            </Link>
            <Link
              to="/borrows/new"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-medium px-5 py-2.5 rounded-lg border border-gray-200 shadow-sm transition-colors"
            >
              <span className="text-lg leading-none">+</span>
              New Borrow
            </Link>
            <Link
              to="/books"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium px-5 py-2.5 rounded-lg border border-gray-200 shadow-sm transition-colors"
            >
              View Books
            </Link>
            <Link
              to="/borrows"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-medium px-5 py-2.5 rounded-lg border border-gray-200 shadow-sm transition-colors"
            >
              View Borrows
            </Link>
          </div>
        </div>

        {/* ========== RECENT BOOKS ========== */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Recent Books</h2>
            <Link
              to="/books"
              className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
            >
              View all →
            </Link>
          </div>

          {recentBooks.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-10 text-center text-gray-500">
              No books found. Start by adding your first book!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentBooks.map((book) => (
                <Link
                  key={book.id}
                  to={`/books/${book.id}`}
                  className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
                >
                  {/* Book cover / placeholder */}
                  <div className="h-40 bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="w-16 h-16 text-violet-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-semibold text-gray-900 group-hover:text-violet-700 transition-colors line-clamp-2">
                      {book.title}
                    </h3>
                    {book.author && (
                      <p className="mt-1 text-sm text-gray-500">by {book.author}</p>
                    )}
                    {book.category && (
                      <span className="mt-3 inline-block self-start text-xs font-medium px-2.5 py-1 rounded-full bg-violet-50 text-violet-700">
                        {book.category}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}