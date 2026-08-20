import { useState, type FormEvent, useRef } from 'react';
import type { Book, CreateBookDto } from '../../types/book.types';

interface Props {
  initialData?: Book;
  onSubmit: (data: CreateBookDto, coverFile?: File | null) => Promise<void>;
  submitLabel?: string;
}

export default function BookForm({
  initialData,
  onSubmit,
  submitLabel = 'Save',
}: Props) {
  const [form, setForm] = useState<CreateBookDto>({
    title: initialData?.title || '',
    author: initialData?.author || '',
    isbn: initialData?.isbn || '',
    genre: initialData?.genre || '',
    totalCopies: initialData?.totalCopies || 1,
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.coverUrl
      ? `http://localhost:3000${initialData.coverUrl}`
      : null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'totalCopies' ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCoverFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(
        initialData?.coverUrl
          ? `http://localhost:3000${initialData.coverUrl}`
          : null
      );
    }
  };

  const removeCover = () => {
    setCoverFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit(form, coverFile);
    } catch (err: any) {
  const msg = err.response?.data?.message;
  setError(msg || 'Something went wrong');
} finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      {error && (
  <div className="mb-6 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm space-y-1">
    {Array.isArray(error) ? (
      error.map((msg, i) => <p key={i}>• {msg}</p>)
    ) : (
      <p>{error}</p>
    )}
  </div>
)}

      <div className="space-y-5">
        {/* Cover Image (Optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Cover Image <span className="text-gray-400 font-normal">(optional)</span>
          </label>

          <div className="flex items-start gap-5">
            {/* Preview */}
            <div className="w-28 h-40 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center shrink-0">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-xs text-center px-2">
                  No cover
                </span>
              )}
            </div>

            <div className="flex-1 space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-medium
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100
                  cursor-pointer"
              />
              <p className="text-xs text-gray-500">
                JPG, PNG or WebP. Max 5 MB.
              </p>
              {previewUrl && (
                <button
                  type="button"
                  onClick={removeCover}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Remove image
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition"
            placeholder="Enter book title"
          />
        </div>

        {/* Author */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1.5">
            Author <span className="text-red-500">*</span>
          </label>
          <input
            id="author"
            name="author"
            value={form.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition"
            placeholder="Enter author name"
          />
        </div>

        {/* ISBN */}
        <div>
          <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1.5">
            ISBN <span className="text-red-500">*</span>
          </label>
          <input
            id="isbn"
            name="isbn"
            value={form.isbn}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition"
            placeholder="978-..."
          />
        </div>

        {/* Genre */}
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1.5">
            Genre <span className="text-red-500">*</span>
          </label>
          <input
            id="genre"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition"
            placeholder="e.g. Fiction, Mystery, Sci-Fi..."
          />
        </div>

        {/* Total Copies */}
        <div>
          <label htmlFor="totalCopies" className="block text-sm font-medium text-gray-700 mb-1.5">
            Total Copies <span className="text-red-500">*</span>
          </label>
          <input
            id="totalCopies"
            type="number"
            name="totalCopies"
            min={1}
            value={form.totalCopies}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent shadow-sm transition"
          />
        </div>
      </div>

      {/* Submit */}
      <div className="mt-8">
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Saving...
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}