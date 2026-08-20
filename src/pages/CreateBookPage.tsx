import { useNavigate } from 'react-router-dom';

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