import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


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

  const handleSubmit = async (data: CreateBookDto) => {
    if (!id) return;
    await bookService.update(id, data);
    navigate(`/books/${id}`);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!book) return null;

  return (
    <div className="page">
      <h1>Edit Book</h1>
      <BookForm initialData={book} onSubmit={handleSubmit} submitLabel="Update Book" />
    </div>
  );
}