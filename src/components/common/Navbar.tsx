import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Don't show navbar on login page
  if (!isAuthenticated) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 text-xl font-bold text-gray-900 hover:text-violet-700 transition-colors"
          >
            <span className="text-2xl">📚</span>
            <span className="hidden sm:inline">Book Library</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/'
                  ? 'bg-violet-50 text-violet-700'
                  : 'text-gray-600 hover:text-violet-700 hover:bg-violet-50/50'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/books"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/books')
                  ? 'bg-violet-50 text-violet-700'
                  : 'text-gray-600 hover:text-violet-700 hover:bg-violet-50/50'
              }`}
            >
              Books
            </Link>
            <Link
              to="/borrows"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/borrows')
                  ? 'bg-violet-50 text-violet-700'
                  : 'text-gray-600 hover:text-violet-700 hover:bg-violet-50/50'
              }`}
            >
              Borrow Records
            </Link>
          </div>

          {/* User + Logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                <span className="text-sm font-semibold text-violet-700">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <span className="font-medium text-gray-800">{user?.username}</span>
            </div>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 border border-gray-200 hover:border-red-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex gap-1 pb-3 overflow-x-auto">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              location.pathname === '/'
                ? 'bg-violet-50 text-violet-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/books"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              isActive('/books')
                ? 'bg-violet-50 text-violet-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Books
          </Link>
          <Link
            to="/borrows"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              isActive('/borrows')
                ? 'bg-violet-50 text-violet-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Borrows
          </Link>
        </div>
      </div>
    </nav>
  );
}