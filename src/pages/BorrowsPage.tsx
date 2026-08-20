import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { borrowService } from '../services/borrowService';
import { bookService } from '../services/bookService';
import type { BorrowRecord } from '../types/borrow.types';
import type { Book } from '../types/book.types';
import BorrowCard from '../components/borrows/BorrowCard';
import Pagination from '../components/common/Pagination';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function BorrowsPage() {
  const [records, setRecords] = useState<BorrowRecord[]>([]);
  const [booksMap, setBooksMap] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState('');
  const [borrower, setBorrower] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [borrowsRes, booksRes] = await Promise.all([
        borrowService.getAll({
          page,
          limit: 8,
          status: status || undefined,
          borrowerName: borrower || undefined,
        }),
        bookService.getAll({ limit: 100 }),
      ]);
      setRecords(borrowsRes.data);
      setTotalPages(borrowsRes.meta.totalPages);

      const map: Record<string, string> = {};
      booksRes.data.forEach((b: Book) => {
        map[b.id] = b.title;
      });
      setBooksMap(map);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, status, borrower]);

  const handleReturn = async (id: string) => {
    await borrowService.returnBook(id);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this record?')) return;
    await borrowService.remove(id);
    load();
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Borrow Records</h1>
        <Link to="/borrows/new" className="btn">+ New Borrow</Link>
      </div>

      <div className="filters">
        <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Overdue">Overdue</option>
          <option value="Returned">Returned</option>
        </select>
        <input
          placeholder="Search borrower name..."
          value={borrower}
          onChange={(e) => { setBorrower(e.target.value); setPage(1); }}
        />
      </div>

      {error && <ErrorMessage message={error} onClose={() => setError('')} />}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grid">
            {records.map((r) => (
              <BorrowCard
                key={r.id}
                record={r}
                bookTitle={booksMap[r.bookId]}
                onReturn={handleReturn}
                onDelete={handleDelete}
              />
            ))}
          </div>
          {records.length === 0 && <p className="empty">No records found.</p>}
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}