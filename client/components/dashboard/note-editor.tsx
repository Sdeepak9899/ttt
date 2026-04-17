'use client';

import { useState, useEffect } from 'react';
import { useNotesStore } from '@/lib/store/notesStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { X, Save } from 'lucide-react';
import type { Note } from '@/lib/store/notesStore';

interface NoteEditorProps {
  note?: Note | null;
  onClose: () => void;
  onSave?: () => void;
}

export function NoteEditor({ note, onClose, onSave }: NoteEditorProps) {
  const { createNote, updateNote, isLoading, error } = useNotesStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!title.trim()) {
      setLocalError('Title is required');
      return;
    }

    if (!content.trim()) {
      setLocalError('Content is required');
      return;
    }

    try {
      if (note) {
        const noteId = note._id || note.id || '';
        await updateNote(noteId, title, content);
      } else {
        await createNote(title, content);
      }
      setTitle('');
      setContent('');
      onClose();
      onSave?.();
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Failed to save note');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {note ? 'Edit Note' : 'New Note'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded-md transition"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-6 gap-4 overflow-y-auto">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-foreground">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              className="w-full"
            />
          </div>

          <div className="space-y-2 flex-1">
            <label htmlFor="content" className="text-sm font-medium text-foreground">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter note content"
              className="w-full h-64 p-3 border border-border rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {(error || localError) && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
              {error || localError}
            </div>
          )}

          <div className="flex items-center gap-2 pt-4 border-t border-border">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Note'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
