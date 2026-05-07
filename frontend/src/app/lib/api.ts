import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear auth and emit a logout event so the SPA can react without a full reload
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      try {
        window.dispatchEvent(new CustomEvent('auth:logout'));
      } catch (e) {
        // fall back to full reload navigation if CustomEvent isn't supported
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Concours {
  id: number;
  title: string;
  description: string;
  exam_date: string;
  application_deadline: string;
  max_participants: number;
  status: 'upcoming' | 'open' | 'closed' | 'cancelled';
  created_by?: number;
}

export interface Candidature {
  id: number;
  candidat_id: number;
  concours_id: number;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
}

export interface Notification {
  id: number;
  type: string;
  message: string;
  user_name: string;
  is_read: boolean;
  created_at: string;
}

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/login', { email, password });
    return response.data;
  },

  register: async (data: { name: string; email: string; password: string }): Promise<User> => {
    const response = await api.post<{ user: User; message?: string }>('/register', data);
    return response.data.user;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/logout');
    } catch (e) {
      // ignore network errors during logout
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    try {
      window.dispatchEvent(new CustomEvent('auth:logout'));
    } catch (e) {
      window.location.href = '/login';
    }
  },

  me: async (): Promise<User> => {
    const response = await api.get<User>('/me');
    return response.data;
  },
};

export const concoursApi = {
  getAll: async (status?: string): Promise<Concours[]> => {
    const params = status ? { status } : {};
    const response = await api.get<{ data: Concours[] }>('/concours', { params });
    return response.data.data;
  },

  getById: async (id: number): Promise<Concours> => {
    const response = await api.get<Concours>(`/concours/${id}`);
    return response.data;
  },

  create: async (data: Partial<Concours>): Promise<Concours> => {
    const response = await api.post<Concours>('/concours', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Concours>): Promise<Concours> => {
    const response = await api.put<Concours>(`/concours/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/concours/${id}`);
  },
};

export const candidatureApi = {
  getAll: async (): Promise<Candidature[]> => {
    const response = await api.get<{ data: Candidature[] }>('/candidatures');
    return response.data.data;
  },

  create: async (data: { concours_id: number }): Promise<Candidature> => {
    const response = await api.post<Candidature>('/candidatures', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Candidature>): Promise<Candidature> => {
    const response = await api.put<Candidature>(`/candidatures/${id}`, data);
    return response.data;
  },
};

export const dashboardApi = {
  getStats: async (): Promise<any> => {
    const response = await api.get('/dashboard');
    return response.data;
  },
};

export const notificationApi = {
  getAll: async (): Promise<Notification[]> => {
    const response = await api.get<Notification[]>('/notifications');
    return response.data;
  },

  markAsRead: async (id: number): Promise<Notification> => {
    const response = await api.patch<Notification>(`/notifications/${id}/read`);
    return response.data;
  },

  clearAll: async (): Promise<void> => {
    await api.delete('/notifications');
  },
};

export const fonctionnaireApi = {
  create: async (data: any): Promise<any> => {
    const response = await api.post('/fonctionnaires', data);
    return response.data;
  },
  getAll: async (): Promise<any[]> => {
    const response = await api.get('/fonctionnaires');
    return response.data;
  }
};

export const saveAuth = (response: AuthResponse): void => {
  localStorage.setItem('token', response.token);
  localStorage.setItem('user', JSON.stringify(response.user));
  try {
    window.dispatchEvent(new CustomEvent('auth:login', { detail: response.user }));
  } catch (e) {
    // ignore
  }
};

export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};