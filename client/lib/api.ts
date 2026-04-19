const BASE = process.env.BACKEND_API_URL+"/api";
console.log(BASE, "BACKEND URL");

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
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: any) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    request("/auth/logout", {
      method: "POST",
    }),

  me: () => request("/auth/me"),

  updatePassword: (data: any) =>
    request("/auth/update-password", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  updateProfile: (data: any) =>
    request("/auth/update-profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // --- Notes ---
  getNotes: () => request("/notes"),

  getNoteById: (id: string) => request(`/notes/${id}`),

  createNote: (data: any) =>
    request("/notes", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateNote: (id: string, data: any) =>
    request(`/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteNote: (id: string) =>
    request(`/notes/${id}`, {
      method: "DELETE",
    }),

  toggleFavorite: (id: string) =>
    request(`/notes/${id}/favorite`, {
      method: "PATCH",
    }),

  toggleArchive: (id: string) =>
    request(`/notes/${id}/archive`, {
      method: "PATCH",
    }),
};
