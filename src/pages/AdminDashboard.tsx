import { useEffect, useState } from 'react';
import { authService } from '../services/authService';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await authService.me();
        setUser(res.user);
      } catch (err: any) {
        setError(err?.response?.data?.message || 'Failed to fetch user');
      }
    })();
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {user ? (
        <div>
          <p>Signed in as: {user.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
