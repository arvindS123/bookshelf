import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookService } from '../services/bookService';
import { borrowService } from '../services/borrowService';
import Loading from '../components/common/Loading';

export default function HomePage() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalBorrows: 0,
    activeBorrows: 0,
    overdue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      bookService.getAll({ limit: 1 }),
      borrowService.getAll({ limit: 100 }),
    ]).then(([booksRes, borrowsRes]) => {
      const borrows = borrowsRes.data;
      setStats({
        totalBooks: booksRes.meta.total,
        totalBorrows: borrowsRes.meta.total,
        activeBorrows: borrows.filter((b) => b.status === 'Active').length,
        overdue: borrows.filter((b) => b.status === 'Overdue').length,
      });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
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
        <div>
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
      </div>
    </div>
  );
}