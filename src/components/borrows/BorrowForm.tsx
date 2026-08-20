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
    <form onSubmit={handleSubmit} className="max-w-xl">
      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-5">
        {/* Book Select */}
        <div>
          <label htmlFor="bookId" className="block text-sm font-medium text-gray-700 mb-1.5">
            Book <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="bookId"
              name="bookId"
              value={form.bookId}
              onChange={handleChange}
              required
              disabled={!!preselectedBookId}
              className="w-full appearance-none px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm cursor-pointer disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
              <option value="">Select a book</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title} — {b.author}
                </option>
              ))}
            </select>
            {!preselectedBookId && (
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
        </div>

        {/* Borrower Name */}
        <div>
          <label htmlFor="borrowerName" className="block text-sm font-medium text-gray-700 mb-1.5">
            Borrower Name <span className="text-red-500">*</span>
          </label>
          <input
            id="borrowerName"
            name="borrowerName"
            value={form.borrowerName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition"
            placeholder="Enter borrower full name"
          />
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1.5">
            Due Date <span className="text-red-500">*</span>
          </label>
          <input
            id="dueDate"
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Creating...
            </>
          ) : (
            'Create Borrow Record'
          )}
        </button>
      </div>
    </form>
  );
}