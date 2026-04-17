import { create } from "zustand";
import { api } from "@/lib/api";

interface AuthState {
  user: any;
  isLoading: boolean;
  isInitialized: boolean; 
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  me: () => Promise<void>;
  updatePassword: (data: any) => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isInitialized: false,
  error: null,

  clearError: () => set({ error: null }),

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.login({ email, password });
      set({ user: res.user, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to login", isLoading: false });
      throw err;
    }
  },

  register: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.register({ email, password, name });
      set({ user: res.user, isLoading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to register", isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await api.logout();
      set({ user: null, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
    }
  },

  me: async () => {
    set({ isLoading: true });
    try {
      const res = await api.me();
      set({ user: res, isLoading: false, isInitialized: true });
    } catch {
      set({ user: null, isLoading: false, isInitialized: true });
    }
  },

  updatePassword: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await api.updatePassword(data);
      set({ isLoading: false });
    } catch (err: any) {
      set({
        error: err.message || "Failed to update password",
        isLoading: false,
      });
      throw err;
    }
  },

  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.updateProfile(data);
      set({ user: res.user, isLoading: false });
    } catch (err: any) {
      set({
        error: err.message || "Failed to update profile",
        isLoading: false,
      });
      throw err;
    }
  },
}));
