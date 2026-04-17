import { create } from "zustand";
import { api } from "@/lib/api";

export interface Note {
  _id?: string;
  id?: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isFavorite?: boolean;
  isArchived?: boolean;
}

interface NotesState {
  notes: any[];
  isLoading: boolean;
  error: string | null;
  fetchNotes: () => Promise<void>;
  createNote: (title: string, content: string) => Promise<any>;
  updateNote: (id: string, title: string, content: string) => Promise<any>;
  deleteNote: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  toggleArchive: (id: string) => Promise<void>;
  clearError: () => void;
}

const normalizeNote = (note: any): Note => ({
  ...note,
  id: note._id || note.id,
  content: note.body || note.content || "",
  isFavorite: note.isFavorite || false,
  isArchived: note.isArchived || false,
});

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  isLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchNotes: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await api.getNotes();
      const normalizedData = (data || []).map(normalizeNote);
      set({ notes: normalizedData, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch notes", isLoading: false });
    }
  },

  createNote: async (title, content) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.createNote({ title, body: content });
      const newNote = normalizeNote(res);
      set((state) => ({
        notes: [newNote, ...state.notes],
        isLoading: false,
      }));
      return newNote;
    } catch (err: any) {
      set({ error: err.message || "Failed to create note", isLoading: false });
      throw err;
    }
  },

  updateNote: async (id, title, content) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.updateNote(id, { title, body: content });
      const updatedNote = normalizeNote(res);
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === id ? updatedNote : note,
        ),
        isLoading: false,
      }));
      return updatedNote;
    } catch (err: any) {
      set({ error: err.message || "Failed to update note", isLoading: false });
      throw err;
    }
  },

  deleteNote: async (id: string) => {
    set({ error: null });
    try {
      await api.deleteNote(id);
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to delete note" });
      throw err;
    }
  },

  toggleFavorite: async (id: string) => {
    const previousNotes = get().notes;
    // Optimistic Update
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
      ),
    }));

    try {
      await api.toggleFavorite(id);
    } catch (err: any) {
      // Revert on error
      set({ notes: previousNotes, error: err.message || "Failed to toggle favorite" });
    }
  },

  toggleArchive: async (id: string) => {
    const previousNotes = get().notes;
    // Optimistic Update
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, isArchived: !note.isArchived } : note
      ),
    }));

    try {
      await api.toggleArchive(id);
    } catch (err: any) {
      // Revert on error
      set({ notes: previousNotes, error: err.message || "Failed to toggle archive" });
    }
  },
}));
