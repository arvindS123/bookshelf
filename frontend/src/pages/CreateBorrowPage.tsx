import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { borrowService } from '../services/borrowService';
import BorrowForm from '../components/borrows/BorrowForm';
import type { CreateBorrowDto } from '../types/borrow.types';

export default function CreateBorrowPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedBookId = searchParams.get('bookId') || undefined;

  const handleSubmit = async (data: CreateBorrowDto) => {
    await borrowService.create(data);
    navigate('/borrows');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Link to="/borrows" className="hover:text-violet-600 transition-colors">
              Borrow Records
            </Link>
            <span>/</span>
            <span className="text-gray-900">New Borrow</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">New Borrow Record</h1>
          <p className="mt-1 text-gray-500">Create a new borrow entry for a book</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
          <BorrowForm
            preselectedBookId={preselectedBookId}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}