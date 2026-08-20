import { useNavigate } from 'react-router-dom';
import { bookService } from '../services/bookService';
import BookForm from '../components/books/BookForm';
import type { CreateBookDto } from '../types/book.types';

export default function CreateBookPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data: CreateBookDto) => {
    const book = await bookService.create(data);
    navigate(`/books/${book.id}`);
  };

  return (
    <div className="page">
      <h1>Add New Book</h1>
      <BookForm onSubmit={handleSubmit} submitLabel="Create Book" />
    </div>
  );
}