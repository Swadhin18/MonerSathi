export type MoodType = 'sad' | 'anxious' | 'positive' | 'neutral' | 'crisis';

export interface MoodTheme {
  gradient: string;
  bgGradient: string;
  textColor: string;
  accentColor: string;
  bgOpacity: string;
}

export const moodThemes: Record<MoodType, MoodTheme> = {
  sad: {
    gradient: 'from-blue-400 via-blue-500 to-blue-600',
    bgGradient: 'from-blue-50 via-blue-100 to-blue-200',
    textColor: 'text-blue-900',
    accentColor: 'bg-blue-500',
    bgOpacity: 'bg-blue-100/40',
  },
  anxious: {
    gradient: 'from-orange-300 via-orange-400 to-orange-500',
    bgGradient: 'from-orange-50 via-orange-100 to-orange-200',
    textColor: 'text-orange-900',
    accentColor: 'bg-orange-500',
    bgOpacity: 'bg-orange-100/40',
  },
  positive: {
    gradient: 'from-emerald-400 via-green-500 to-teal-500',
    bgGradient: 'from-emerald-50 via-green-100 to-teal-100',
    textColor: 'text-emerald-900',
    accentColor: 'bg-emerald-500',
    bgOpacity: 'bg-emerald-100/40',
  },
  neutral: {
    gradient: 'from-slate-400 via-slate-500 to-slate-600',
    bgGradient: 'from-slate-50 via-slate-100 to-slate-200',
    textColor: 'text-slate-900',
    accentColor: 'bg-slate-500',
    bgOpacity: 'bg-slate-100/40',
  },
  crisis: {
    gradient: 'from-red-500 via-red-600 to-red-700',
    bgGradient: 'from-red-50 via-red-100 to-red-200',
    textColor: 'text-red-900',
    accentColor: 'bg-red-600',
    bgOpacity: 'bg-red-100/40',
  },
};

export function getMoodTheme(mood: MoodType): MoodTheme {
  return moodThemes[mood] || moodThemes.neutral;
}
