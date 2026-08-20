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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-5xl font-bold text-gray-900">Borrow Records</h1>
            <p className="mt-1 text-gray-600 text-lg">Manage all book borrows</p>
          </div>
          <Link
            to="/borrows/new"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            <span className="text-lg leading-none">+</span>
            New Borrow
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Status Dropdown */}
          <div className="relative sm:w-48">
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Overdue">Overdue</option>
              <option value="Returned">Returned</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Borrower Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search borrower name..."
              value={borrower}
              onChange={(e) => {
                setBorrower(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {error && <ErrorMessage message={error} onClose={() => setError('')} />}

        {loading ? (
          <Loading />
        ) : (
          <>
            {/* Records Grid - 4 columns x 2 rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
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

            {records.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-16 text-center">
                <p className="text-gray-500 text-xl font-medium">No records found.</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 mb-32">
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}