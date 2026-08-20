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
  console.log('Token:', localStorage.getItem('book_library_token'));
  console.log('User:', localStorage.getItem('book_library_user'));
}, []);
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
    <div className="page">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.totalBooks}</h3>
          <p>Total Books</p>
        </div>
        <div className="stat-card">
          <h3>{stats.activeBorrows}</h3>
          <p>Active Borrows</p>
        </div>
        <div className="stat-card danger">
          <h3>{stats.overdue}</h3>
          <p>Overdue</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalBorrows}</h3>
          <p>Total Records</p>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/books/new" className="btn">+ Add Book</Link>
        <Link to="/borrows/new" className="btn btn-secondary">+ New Borrow</Link>
        <Link to="/books" className="btn btn-outline">View Books</Link>
        <Link to="/borrows" className="btn btn-outline">View Borrows</Link>
      </div>
    </div>
  );
}