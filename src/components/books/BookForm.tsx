import { useState, type FormEvent } from 'react';



export default function BookForm({ initialData, onSubmit, submitLabel = 'Save' }: Props) {
 
  

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label>Title *</label>
        <input name="title" value={form.title} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Author *</label>
        <input name="author" value={form.author} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>ISBN *</label>
        <input name="isbn" value={form.isbn} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Genre *</label>
        <input name="genre" value={form.genre} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Total Copies *</label>
        <input
          type="number"
          name="totalCopies"
          min={1}
          value={form.totalCopies}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn" disabled={loading}>
        {loading ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}