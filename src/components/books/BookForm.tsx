import { useState, type FormEvent } from 'react';
import type { Book, CreateBookDto } from '../../types/book.types';

interface Props {
  initialData?: Book;
  onSubmit: (data: CreateBookDto) => Promise<void>;
  submitLabel?: string;
}

export default function BookForm({ initialData, onSubmit, submitLabel = 'Save' }: Props) {
  const [form, setForm] = useState<CreateBookDto>({
    title: initialData?.title || '',
    author: initialData?.author || '',
    isbn: initialData?.isbn || '',
    genre: initialData?.genre || '',
    totalCopies: initialData?.totalCopies || 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'totalCopies' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit(form);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label>Title *</label>
        <input name="title" value={form.title} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Author *</label>
        <input name="author" value={form.author} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>ISBN *</label>
        <input name="isbn" value={form.isbn} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Genre *</label>
        <input name="genre" value={form.genre} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Total Copies *</label>
        <input
          type="number"
          name="totalCopies"
          min={1}
          value={form.totalCopies}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn" disabled={loading}>
        {loading ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}