import axios from 'axios';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const api = axios.create({
  baseURL: `${supabaseUrl}/functions/v1`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${supabaseAnonKey}`,
  },
});

export interface ChatResponse {
  reply: string;
  mood: 'sad' | 'anxious' | 'positive' | 'neutral' | 'crisis';
  crisis: boolean;
}

export async function sendMessage(message: string, sessionToken: string): Promise<ChatResponse> {
  try {
    const response = await api.post<ChatResponse>('/chat', {
      message,
      sessionToken,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw new Error(error.response.data.error || 'Failed to send message');
    }
    throw new Error('Network error. Please check your connection.');
  }
}
