import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { bookService } from '../services/bookService';
import { borrowService } from '../services/borrowService';
import type { Book } from '../types/book.types';
import type { BorrowRecord } from '../types/borrow.types';
import BorrowCard from '../components/borrows/BorrowCard';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [borrows, setBorrows] = useState<BorrowRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const [bookData, borrowData] = await Promise.all([
        bookService.getById(id),
        bookService.getBorrows(id),
      ]);
      setBook(bookData);
      setBorrows(borrowData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Book not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleReturn = async (borrowId: string) => {
    await borrowService.returnBook(borrowId);
    load();
  };

  const handleDeleteBook = async () => {
    if (!id || !confirm('Delete this book?')) return;
    await bookService.remove(id);
    navigate('/books');
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!book) return null;

  const activeCount = borrows.filter((b) => !b.returnDate).length;
  const available = book.totalCopies - activeCount;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Link to="/books" className="hover:text-violet-600 transition-colors">
            Books
          </Link>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-xs">{book.title}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
            <p className="mt-1 text-lg text-gray-600">by {book.author}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Link
              to={`/books/${id}/edit`}
              className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              Edit
            </Link>
            <button
              onClick={handleDeleteBook}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-red-50 text-red-700 font-medium hover:bg-red-100 transition-colors border border-red-100"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">ISBN</p>
              <p className="text-gray-900 font-medium">{book.isbn}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Genre</p>
              <span className="inline-block text-sm font-medium px-3 py-1 rounded-full bg-violet-50 text-violet-700">
                {book.genre}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Copies</p>
              <p className="text-gray-900 font-medium">{book.totalCopies}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Available</p>
              <p
                className={`text-lg font-bold ${
                  available === 0 ? 'text-red-600' : 'text-emerald-600'
                }`}
              >
                {available}
              </p>
            </div>
          </div>
        </div>

        {/* Borrow Records Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <h2 className="text-xl font-semibold text-gray-900">Borrow Records</h2>
          {available > 0 ? (
            <Link
              to={`/borrows/new?bookId=${id}`}
              className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              <span className="text-base leading-none">+</span>
              Borrow this book
            </Link>
          ) : (
            <span className="text-sm font-medium text-red-600 bg-red-50 px-3 py-1.5 rounded-lg">
              No copies available
            </span>
          )}
        </div>

        {/* Borrows Grid */}
        {borrows.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {borrows.map((b) => (
              <BorrowCard key={b.id} record={b} onReturn={handleReturn} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-12 text-center">
            <p className="text-gray-500">No borrow records yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}