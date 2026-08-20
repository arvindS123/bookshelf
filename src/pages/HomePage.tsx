import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="page">
      <h1>Library Management System</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Books</h3>
          <p>Browse available books</p>
        </div>

        <div className="stat-card">
          <h3>Borrows</h3>
          <p>View borrowing records</p>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/books" className="btn btn-outline">
          View Books
        </Link>

        <Link to="/borrows" className="btn btn-outline">
          View Borrows
        </Link>
      </div>
    </div>
  );
}