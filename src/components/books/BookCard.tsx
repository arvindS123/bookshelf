import { Link } from 'react-router-dom';

interface Props {
  book: Book;
  availableCopies?: number;
}

export default function BookCard({ book, availableCopies }: Props) {
  return (
    <div className="card">
      <h3>
        <Link to={`/books/${book.id}`}>{book.title}</Link>
      </h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p>
        <strong>Copies:</strong>{' '}
        {availableCopies !== undefined
          ? `${availableCopies} / ${book.totalCopies} available`
          : book.totalCopies}
      </p>
      <div className="card-actions">
        <Link to={`/books/${book.id}`} className="btn btn-sm">
          View
        </Link>
        <Link to={`/books/${book.id}/edit`} className="btn btn-sm btn-secondary">
          Edit
        </Link>
      </div>
    </div>
  );
}