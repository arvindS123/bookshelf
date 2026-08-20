import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { bookService } from '../services/bookService';
import BookForm from '../components/books/BookForm';
import type { Book, CreateBookDto } from '../types/book.types';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';

export default function EditBookPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    bookService
      .getById(id)
      .then(setBook)
      .catch((err) => setError(err.response?.data?.message || 'Book not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: CreateBookDto, coverFile?: File | null) => {
  if (!id) return;
  await bookService.update(id, data, coverFile);
  navigate(`/books/${id}`);
};

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!book) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link to="/books" className="hover:text-violet-600 transition-colors">
              Books
            </Link>
            <span>/</span>
            <Link to={`/books/${id}`} className="hover:text-violet-600 transition-colors truncate max-w-[180px]">
              {book.title}
            </Link>
            <span>/</span>
            <span className="text-gray-900">Edit</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Book</h1>
          <p className="mt-1 text-gray-500">Update the details of “{book.title}”</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <BookForm
            initialData={book}
            onSubmit={handleSubmit}
            submitLabel="Update Book"
          />
        </div>
      </div>
    </div>
  );
}