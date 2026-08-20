import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { bookService } from '../services/bookService';
import BookForm from '../components/books/BookForm';
import type { CreateBookDto } from '../types/book.types';

export default function CreateBookPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateBookDto, coverFile?: File | null) => {
  const book = await bookService.create(data, coverFile);
  navigate(`/books/${book.id}`);
};
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
            <span className="text-gray-900">Add New</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
          <p className="mt-1 text-gray-500">Fill in the details below to add a book to the library</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <BookForm onSubmit={handleSubmit} submitLabel="Create Book" />
        </div>
      </div>
    </div>
  );
}