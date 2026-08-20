import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await authService.me();
        setUser(res.user);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to fetch user');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-gray-500">Account & system settings</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="p-6">
              <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                {error}
              </div>
            </div>
          ) : user ? (
            <>
              {/* User Info */}
              <div className="p-6 sm:p-8 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-violet-700">
                      {user.username?.charAt(0).toUpperCase() || 'A'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-lg font-semibold text-gray-900">{user.username}</p>
                    {user.role && (
                      <span className="inline-block mt-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-700">
                        {user.role}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 sm:p-8 space-y-3">
                <Link
                  to="/"
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-800 font-medium"
                >
                  <span>Go to Dashboard</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 rounded-lg bg-red-50 text-red-700 font-medium hover:bg-red-100 transition-colors border border-red-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}