import type { BorrowRecord } from '../../types/borrow.types';

interface Props {
  record: BorrowRecord;
  bookTitle?: string;
  onReturn?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function BorrowCard({ record, bookTitle, onReturn, onDelete }: Props) {
  const statusStyles =
    record.status === 'Overdue'
      ? 'bg-red-50 text-red-700 border-red-100'
      : record.status === 'Returned'
        ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
        : 'bg-blue-50 text-blue-700 border-blue-100';

  const statusIcon =
    record.status === 'Overdue'
      ? '⚠️'
      : record.status === 'Returned'
        ? '✓'
        : '📚';

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Header with Status Flag */}
      <div
        className={`px-5 py-4 border-b border-gray-100 flex items-start justify-between gap-3 ${statusStyles
          .split(' ')
          .slice(0, 2)
          .join(' ')}`}
      >
        <div className="flex-1 min-w-0 space-y-3">
          {/* Borrower Name - clearly labeled & prominent */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Borrower
            </p>
            <h3 className="font-bold text-lg text-gray-900 break-words leading-snug">
              {record.borrowerName || '—'}
            </h3>
          </div>

          {/* Book Title - clearly labeled & prominent */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
              Book
            </p>
            <p className="text-base font-semibold text-gray-800 break-words leading-snug">
              {bookTitle || '—'}
            </p>
          </div>
        </div>

        <div className="text-3xl shrink-0">{statusIcon}</div>
      </div>

      {/* Status Badge */}
      <div className="px-5 pt-3 pb-2">
        <span
          className={`inline-block text-sm font-bold px-3 py-1.5 rounded-full border ${statusStyles}`}
        >
          {record.status}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-3 flex-1">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Borrowed
            </p>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {record.borrowDate}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Due
            </p>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {record.dueDate}
            </p>
          </div>
        </div>

        {record.returnDate && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Returned
            </p>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {record.returnDate}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      {(onReturn || onDelete) && (
        <div className="px-5 py-4 border-t border-gray-100 flex gap-2">
          {record.status !== 'Returned' && onReturn && (
            <button
              onClick={() => onReturn(record.id)}
              className="flex-1 text-sm font-medium py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              Mark Returned
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(record.id)}
              className={`text-sm font-medium py-2.5 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 transition-colors ${
                record.status === 'Returned' ? 'flex-1' : 'px-4'
              }`}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}