// Nhà Chung API client.
// All hooks are client-side and read the JWT from localStorage.

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api/v1";

const TOKEN_KEY = "nc.accessToken";
const REFRESH_KEY = "nc.refreshToken";

export const auth = {
  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(TOKEN_KEY);
  },
  getRefresh(): string | null {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(REFRESH_KEY);
  },
  setTokens(accessToken: string, refreshToken: string) {
    window.localStorage.setItem(TOKEN_KEY, accessToken);
    window.localStorage.setItem(REFRESH_KEY, refreshToken);
  },
  clear() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_KEY);
  },
};

export class ApiError extends Error {
  constructor(public statusCode: number, message: string, public body?: unknown) {
    super(message);
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = auth.getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init.headers as Record<string, string> | undefined),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  if (!res.ok) {
    let body: unknown;
    try { body = await res.json(); } catch { body = await res.text(); }
    if (res.status === 401 && typeof window !== "undefined") {
      auth.clear();
      if (!window.location.pathname.startsWith("/login")) window.location.href = "/login";
    }
    throw new ApiError(res.status, `${res.status} ${res.statusText}`, body);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<{ accessToken: string; refreshToken: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  signup: (data: { email: string; password: string; fullName: string; phone?: string; invitationCode?: string }) =>
    request<{ accessToken: string; refreshToken: string }>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  me: () => request<any>("/auth/me"),
  logout: () => request<{ success: boolean }>("/auth/logout", { method: "POST" }),

  // Domain
  dashboard: () => request<any>("/dashboard"),
  profile: () => request<any>("/users/me/profile"),
  apartmentMe: () => request<any>("/apartments/me"),
  buildings: () => request<any[]>("/buildings"),

  family: () => request<any>("/family/me"),
  familyCreate: (data: any) => request<any>("/family", { method: "POST", body: JSON.stringify(data) }),
  familyUpdate: (id: string, data: any) => request<any>(`/family/${id}`, { method: "PATCH", body: JSON.stringify(data) }),

  notifications: (params?: { type?: string; unreadOnly?: boolean }) => {
    const q = new URLSearchParams();
    if (params?.type) q.set("type", params.type);
    if (params?.unreadOnly) q.set("unreadOnly", "true");
    return request<any>(`/notifications${q.toString() ? `?${q}` : ""}`);
  },
  notificationsMarkAll: () => request<any>("/notifications/mark-all-read", { method: "POST" }),
  notificationMarkRead: (id: string) => request<any>(`/notifications/${id}/read`, { method: "POST" }),

  finance: (months = 6) => request<any>(`/finance/overview?months=${months}`),
  incomeExpense: (months = 6) => request<any>(`/finance/income-expense?months=${months}`),
  maintenanceFund: () => request<any>("/maintenance-fund"),

  operations: (status?: string) => request<any>(`/operations/overview${status ? `?status=${status}` : ""}`),
  workOrderCreate: (data: any) => request<any>("/operations/work-orders", { method: "POST", body: JSON.stringify(data) }),

  kpi: () => request<any>("/kpi/overview"),
  reports: (type?: string, year?: number) => {
    const q = new URLSearchParams();
    if (type) q.set("type", type);
    if (year) q.set("year", String(year));
    return request<any>(`/reports${q.toString() ? `?${q}` : ""}`);
  },
  documents: (folderId?: string, q?: string) => {
    const sp = new URLSearchParams();
    if (folderId) sp.set("folderId", folderId);
    if (q) sp.set("q", q);
    return request<any>(`/documents${sp.toString() ? `?${sp}` : ""}`);
  },
  archive: (year?: number) => request<any>(`/documents/archive${year ? `?year=${year}` : ""}`),

  news: (category?: string) => request<any>(`/news${category ? `?category=${category}` : ""}`),

  feedback: (status?: string) => request<any>(`/feedback${status ? `?status=${status}` : ""}`),
  feedbackById: (id: string) => request<any>(`/feedback/${id}`),
  feedbackCreate: (data: any) => request<any>("/feedback", { method: "POST", body: JSON.stringify(data) }),
  feedbackReply: (id: string, data: any) => request<any>(`/feedback/${id}/reply`, { method: "POST", body: JSON.stringify(data) }),

  aiConversations: () => request<any[]>("/ai-assistant/conversations"),
  aiConversation: (id: string) => request<any>(`/ai-assistant/conversations/${id}`),
  aiCreate: (content: string) => request<any>("/ai-assistant/conversations", { method: "POST", body: JSON.stringify({ content }) }),
  aiSend: (id: string, content: string) => request<any>(`/ai-assistant/conversations/${id}/messages`, { method: "POST", body: JSON.stringify({ content }) }),

  settings: () => request<any>("/settings"),
  settingsUpdate: (data: any) => request<any>("/settings", { method: "PATCH", body: JSON.stringify(data) }),
};

export { request };
