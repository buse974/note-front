import type { Note } from '../types';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p className="note-content">{note.content || 'Aucun contenu'}</p>
      <div className="note-meta">
        <span>Modifié le {formatDate(note.updated_at)}</span>
      </div>
      <div className="note-actions">
        <button onClick={() => onEdit(note)} className="btn-edit">
          Modifier
        </button>
        <button onClick={() => onDelete(note.id)} className="btn-delete">
          Supprimer
        </button>
      </div>
    </div>
  );
}
