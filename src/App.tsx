import { useState, useEffect } from 'react';
import type { Note, NoteInput } from './types';
import { fetchNotes, createNote, updateNote, deleteNote } from './api';
import { NoteList } from './components/NoteList';
import { NoteForm } from './components/NoteForm';
import './App.css';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNotes();
      setNotes(data);
    } catch {
      setError('Impossible de charger les notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleCreate = () => {
    setEditingNote(null);
    setShowForm(true);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette note ?')) return;
    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n.id !== id));
    } catch {
      setError('Impossible de supprimer la note');
    }
  };

  const handleSubmit = async (input: NoteInput) => {
    try {
      if (editingNote) {
        const updated = await updateNote(editingNote.id, input);
        setNotes(notes.map((n) => (n.id === updated.id ? updated : n)));
      } else {
        const created = await createNote(input);
        setNotes([created, ...notes]);
      }
      setShowForm(false);
      setEditingNote(null);
    } catch {
      setError('Impossible de sauvegarder la note');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Notes</h1>
        {!showForm && (
          <button onClick={handleCreate} className="btn-primary">
            + Nouvelle note
          </button>
        )}
      </header>

      <main className="app-main">
        {error && <div className="error-message">{error}</div>}

        {showForm ? (
          <NoteForm
            note={editingNote}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        ) : loading ? (
          <div className="loading">Chargement...</div>
        ) : (
          <NoteList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}

export default App;
