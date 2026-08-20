import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';


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
    <div className="page">
      <div className="page-header">
        <h1>{book.title}</h1>
        <div>
          <Link to={`/books/${id}/edit`} className="btn btn-secondary">Edit</Link>
          <button className="btn btn-danger" onClick={handleDeleteBook}>Delete</button>
        </div>
      </div>

      <div className="details-card">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Total Copies:</strong> {book.totalCopies}</p>
        <p>
          <strong>Available:</strong>{' '}
          <span className={available === 0 ? 'text-danger' : 'text-success'}>
            {available}
          </span>
        </p>
      </div>

      <div className="section-header">
        <h2>Borrow Records</h2>
        {available > 0 ? (
          <Link to={`/borrows/new?bookId=${id}`} className="btn btn-sm">
            + Borrow this book
          </Link>
        ) : (
          <span className="text-danger">No copies available</span>
        )}
      </div>

      <div className="grid">
        {borrows.map((b) => (
          <BorrowCard
            key={b.id}
            record={b}
            onReturn={handleReturn}
          />
        ))}
      </div>
      {borrows.length === 0 && <p className="empty">No borrow records yet.</p>}
    </div>
  );
}