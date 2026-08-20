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
    <div className="page">
      <div className="page-header">
        <h1>Books</h1>
        <Link to="/books/new" className="btn">+ Add Book</Link>
      </div>

      <div className="filters">
        <input
          placeholder="Search title, author, ISBN..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <input
          placeholder="Filter by genre"
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {error && <ErrorMessage message={error} onClose={() => setError('')} />}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grid">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          {books.length === 0 && <p className="empty">No books found.</p>}
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}