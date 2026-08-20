import { useNavigate, useSearchParams } from 'react-router-dom';
import { borrowService } from '../services/borrowService';


export default function CreateBorrowPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedBookId = searchParams.get('bookId') || undefined;

  const handleSubmit = async (data: CreateBorrowDto) => {
    await borrowService.create(data);
    navigate('/borrows');
  };

  return (
    <div className="page">
      <h1>New Borrow Record</h1>
      <BorrowForm preselectedBookId={preselectedBookId} onSubmit={handleSubmit} />
    </div>
  );
}