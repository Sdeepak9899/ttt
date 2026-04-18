const BASE = process.env.NEXT_PUBLIC_API_URL;
// process.env.NEXT_PUBLIC_API_RENDER ||
// "http://localhost:5000/api";

const request = async (url: string, options: any = {}) => {
  const res = await fetch(`${BASE}${url}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  // Handle No Content (204) or empty responses
  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const api = {
  // --- Auth ---
  register: (data: any) =>
    request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: any) =>
    request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    request("/api/auth/logout", {
      method: "POST",
    }),

  me: () => request("/api/auth/me"),

  updatePassword: (data: any) =>
    request("/api/auth/update-password", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  updateProfile: (data: any) =>
    request("/api/auth/update-profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // --- Notes ---
  getNotes: () => request("/api/notes"),

  getNoteById: (id: string) => request(`/api/notes/${id}`),

  createNote: (data: any) =>
    request("/api/notes", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateNote: (id: string, data: any) =>
    request(`/api/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteNote: (id: string) =>
    request(`/api/notes/${id}`, {
      method: "DELETE",
    }),

  toggleFavorite: (id: string) =>
    request(`/api/notes/${id}/favorite`, {
      method: "PATCH",
    }),

  toggleArchive: (id: string) =>
    request(`/api/notes/${id}/archive`, {
      method: "PATCH",
    }),
};
