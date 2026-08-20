import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookService } from '../services/bookService';
import type { Book } from '../types/book.types';
import BookCard from '../components/books/BookCard';
import Pagination from '../components/common/Pagination';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await bookService.getAll({
        page,
        limit: 8,
        search: search || undefined,
        genre: genre || undefined,
      });
      setBooks(res.data);
      setTotalPages(res.meta.totalPages);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, [page, search, genre]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-5xl font-bold text-gray-900">Books</h1>
          <Link
            to="/books/new"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            <span className="text-lg leading-none">+</span>
            Add Book
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search title, author, ISBN..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
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

          {/* Genre Text Input (Kept from Code 1, styled to match Code 2) */}
          <div className="relative sm:w-56">
            <input
              type="text"
              placeholder="Filter by genre"
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm text-base"
            />
          </div>
        </div>

        {error && <ErrorMessage message={error} onClose={() => setError('')} />}

        {loading ? (
          <Loading />
        ) : (
          <>
            {/* Books Grid - 4 columns x 2 rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <Link key={book.id} to={`/books/${book.id}`} className="text-decoration-none hover:opacity-90 transition-opacity">
                  <BookCard book={book} />
                </Link>
              ))}
            </div>

            {books.length === 0 && (
              <p className="text-center text-gray-500 py-16 text-2xl">No books found.</p>
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