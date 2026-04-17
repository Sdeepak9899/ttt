import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, Star, Archive, ArchiveRestore } from 'lucide-react';
import { useNotesStore } from '@/lib/store/notesStore';
import type { Note } from '@/lib/store/notesStore';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function NoteCard({ note, onEdit, onDelete, isDeleting }: NoteCardProps) {
  const { toggleFavorite, toggleArchive } = useNotesStore();

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (note.id) toggleFavorite(note.id);
  };

  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (note.id) toggleArchive(note.id);
  };

  return (
    <Card className="p-6 hover:shadow-md transition-all duration-300 cursor-pointer group hover:border-primary/30 flex flex-col h-full">
      <div className="space-y-4 flex-1">
        {/* Header with title and favorite button */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition">
              {note.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{formatDate(note.createdAt)}</p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleFavorite}
            className="p-1 h-auto"
          >
            <Star
              className={`w-5 h-5 transition ${note.isFavorite
                ? 'fill-amber-400 text-amber-400'
                : 'text-muted-foreground'
                }`}
            />
          </Button>
        </div>

        {/* Content */}
        <p className="text-muted-foreground text-sm line-clamp-3">
          {truncateContent(note.content)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-4 border-t border-border mt-4">
        <Button
          size="sm"
          variant="ghost"
          className="flex-1 text-primary hover:bg-primary/10"
          onClick={() => onEdit(note)}
        >
          <Edit2 className="w-4 h-4 mr-2" />
          Edit
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="text-muted-foreground hover:text-primary hover:bg-primary/10"
          onClick={handleArchive}
          title={note.isArchived ? "Unarchive" : "Archive"}
        >
          {note.isArchived ? (
            <ArchiveRestore className="w-4 h-4" />
          ) : (
            <Archive className="w-4 h-4" />
          )}
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(note.id!)}
          disabled={isDeleting}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
