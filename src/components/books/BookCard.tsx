import { Link } from 'react-router-dom';
import type { Book } from '../../types/book.types';

interface Props {
  book: Book;
  availableCopies?: number;
}

export default function BookCard({ book, availableCopies }: Props) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Cover Image – taller & more prominent */}
      <div className="aspect-[2/3] bg-gradient-to-br from-violet-50 to-violet-100 relative overflow-hidden">
        {book.coverUrl ? (
          <img
            src={`http://localhost:3000${book.coverUrl}`}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-violet-300">
            <svg
              className="w-16 h-16 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span className="text-xs font-medium text-violet-400">No Cover</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-lg leading-snug line-clamp-2 group-hover:text-violet-700 transition-colors">
          <Link to={`/books/${book.id}`}>{book.title}</Link>
        </h3>

        {/* Author */}
        <p className="text-sm text-gray-500 mt-1.5 truncate">{book.author}</p>

        {/* Genre */}
        {book.genre && (
          <div className="mt-3">
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-50 text-violet-700">
              {book.genre}
            </span>
          </div>
        )}

        {/* Copies */}
        <div className="mt-4 flex items-center gap-1.5 text-sm">
          <span className="font-semibold text-gray-900">
            {availableCopies !== undefined ? availableCopies : book.totalCopies}
          </span>
          <span className="text-gray-500">
            {availableCopies !== undefined
              ? `/ ${book.totalCopies} available`
              : 'copies'}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-5 flex gap-2.5">
          <Link
            to={`/books/${book.id}`}
            className="flex-1 text-center text-sm font-semibold py-2.5 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-sm"
          >
            View
          </Link>
          <Link
            to={`/books/${book.id}/edit`}
            className="flex-1 text-center text-sm font-semibold py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}