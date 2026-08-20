import { useState, useEffect, type FormEvent } from 'react';
import { bookService } from '../../services/bookService';
import type { Book } from '../../types/book.types';
import type { CreateBorrowDto } from '../../types/borrow.types';

interface Props {
  preselectedBookId?: string;
  onSubmit: (data: CreateBorrowDto) => Promise<void>;
}

export default function BorrowForm({ preselectedBookId, onSubmit }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState<CreateBorrowDto>({
    bookId: preselectedBookId || '',
    borrowerName: '',
    dueDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    bookService.getAll({ limit: 100 }).then((res) => setBooks(res.data));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit(form);
    } catch (err: any) {
      const msg = err.response?.data?.message;
      setError(Array.isArray(msg) ? msg.join(', ') : msg || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label>Book *</label>
        <select
          name="bookId"
          value={form.bookId}
          onChange={handleChange}
          required
          disabled={!!preselectedBookId}
        >
          <option value="">Select a book</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title} — {b.author}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Borrower Name *</label>
        <input
          name="borrowerName"
          value={form.borrowerName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Due Date *</label>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn" disabled={loading}>
        {loading ? 'Creating...' : 'Create Borrow Record'}
      </button>
    </form>
  );
}