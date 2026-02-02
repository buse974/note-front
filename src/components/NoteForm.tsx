import { useState, useEffect } from 'react';
import type { Note, NoteInput } from '../types';

interface NoteFormProps {
  note?: Note | null;
  onSubmit: (note: NoteInput) => void;
  onCancel: () => void;
}

export function NoteForm({ note, onSubmit, onCancel }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), content: content.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <h2>{note ? 'Modifier la note' : 'Nouvelle note'}</h2>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        autoFocus
      />
      <textarea
        placeholder="Contenu (optionnel)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
      />
      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {note ? 'Enregistrer' : 'Créer'}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Annuler
        </button>
      </div>
    </form>
  );
}
