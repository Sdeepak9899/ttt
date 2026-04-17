'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useNotesStore } from '@/lib/store/notesStore';
import { Sidebar } from '@/components/dashboard/sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { NotesFilter } from '@/components/dashboard/notes-filter';
import { NoteCard } from '@/components/dashboard/note-card';
import { NoteEditor } from '@/components/dashboard/note-editor';
import { Empty, EmptyTitle, EmptyDescription } from '@/components/ui/empty';
import type { Note } from '@/lib/store/notesStore';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';

export default function DashboardMain() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isInitialized } = useAuthStore();
  const { notes, isLoading, deleteNote, fetchNotes } = useNotesStore();
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'favorites' | 'archived'>('all');

  // Wait for auth check to complete, THEN redirect if no user
  useEffect(() => {
    if (isInitialized && !user) {
      router.push('/');
    }
  }, [isInitialized, user, router]);

  // Fetch notes once user is confirmed
  useEffect(() => {
    if (isInitialized && user) {
      fetchNotes();
    }
  }, [isInitialized, user, fetchNotes]);

  // Get initial filter from URL
  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter === 'favorites' || filter === 'archived') {
      setActiveFilter(filter);
    }
  }, [searchParams]);

  // Filter and search notes
  const filteredNotes = useMemo(() => {
    let result = notes;

    // Apply filter
    if (activeFilter === 'favorites') {
      result = result.filter((note) => note.isFavorite);
    } else if (activeFilter === 'archived') {
      result = result.filter((note) => note.isArchived);
    } else {
      result = result.filter((note) => !note.isArchived);
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      );
    }

    return result;
  }, [notes, activeFilter, searchQuery]);

  // Calculate stats
  const stats = {
    totalNotes: notes.filter((n) => !n.isArchived).length,
    favorites: notes.filter((n) => n.isFavorite).length,
    archived: notes.filter((n) => n.isArchived).length,
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setShowEditor(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleDeleteNote = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    setDeletingId(id);
    try {
      await deleteNote(id);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setEditingNote(null);
  };

  const handleFilterChange = (filter: 'all' | 'favorites' | 'archived') => {
    setActiveFilter(filter);
    setSearchQuery('');
  };

  if (!isInitialized || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Spinner className="w-8 h-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-0">
        <DashboardHeader onCreateNote={handleCreateNote} />

        <main className="flex-1 px-4 sm:px-8 py-8 md:pt-12">
          {isLoading && notes.length === 0 ? (
            <div className="flex items-center justify-center min-h-96">
              <Spinner className="w-8 h-8 text-primary" />
            </div>
          ) : (
            <>
              {/* Stats */}
              <DashboardStats
                totalNotes={stats.totalNotes}
                favorites={stats.favorites}
                archived={stats.archived}
              />

              {/* Filter and Search */}
              <NotesFilter
                onSearchChange={setSearchQuery}
                onFilterChange={handleFilterChange}
                activeFilter={activeFilter}
              />

              {/* Notes Grid */}
              {filteredNotes.length === 0 ? (
                <Empty>
                  <EmptyTitle>
                    {activeFilter !== 'all'
                      ? `No ${activeFilter} notes`
                      : searchQuery
                        ? 'No notes found'
                        : 'No notes yet'}
                  </EmptyTitle>
                  <EmptyDescription>
                    {searchQuery
                      ? 'Try searching with different keywords'
                      : 'Create your first note to get started'}
                  </EmptyDescription>
                  <div className="mt-4">
                    <Button onClick={handleCreateNote}>Create Note</Button>
                  </div>
                </Empty>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onEdit={handleEditNote}
                      onDelete={handleDeleteNote}
                      isDeleting={deletingId === note.id}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {showEditor && (
        <NoteEditor
          note={editingNote}
          onClose={handleCloseEditor}
          onSave={fetchNotes}
        />
      )}
    </div>
  );
}
