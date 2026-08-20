

interface Props {
  record: BorrowRecord;
  bookTitle?: string;
  onReturn?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function BorrowCard({ record, bookTitle, onReturn, onDelete }: Props) {
 

  return (
    <div className="card">
      <div className="card-header">
        <strong>{record.borrowerName}</strong>
        <span className={`badge ${statusClass}`}>{record.status}</span>
      </div>
      {bookTitle && <p><strong>Book:</strong> {bookTitle}</p>}
      <p><strong>Borrowed:</strong> {record.borrowDate}</p>
      <p><strong>Due:</strong> {record.dueDate}</p>
      {record.returnDate && <p><strong>Returned:</strong> {record.returnDate}</p>}

      <div className="card-actions">
        {record.status !== 'Returned' && onReturn && (
          <button className="btn btn-sm btn-success" onClick={() => onReturn(record.id)}>
            Mark Returned
          </button>
        )}
        {onDelete && (
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(record.id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}