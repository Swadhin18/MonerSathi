import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';
import { MoodType, getMoodTheme } from '../utils/moodColors';

interface ChatMessageProps {
  message: string;
  sender: 'user' | 'ai';
  mood?: MoodType;
  isCrisis?: boolean;
}

export default function ChatMessage({ message, sender, mood, isCrisis }: ChatMessageProps) {
  const theme = mood ? getMoodTheme(mood) : null;
  const isUser = sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}
    >
      <div
        className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg ${
          isUser
            ? 'bg-gradient-to-br from-teal-500 to-emerald-600'
            : theme
            ? `bg-gradient-to-br ${theme.gradient}`
            : 'bg-gradient-to-br from-slate-400 to-slate-500'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
        <div
          className={`rounded-3xl px-5 py-3 shadow-lg ${
            isUser
              ? 'bg-gradient-to-br from-teal-500 to-emerald-600 text-white'
              : isCrisis
              ? 'bg-red-50 border-2 border-red-300 text-red-900'
              : theme
              ? `${theme.bgOpacity} border border-slate-200`
              : 'bg-slate-100'
          }`}
        >
          <p
            className={`text-base leading-relaxed whitespace-pre-wrap ${
              isUser ? 'text-white' : isCrisis ? 'text-red-900' : 'text-slate-800'
            }`}
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            {message}
          </p>
        </div>

        {mood && !isUser && !isCrisis && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-xs mt-1 px-2 py-0.5 rounded-full ${theme?.bgOpacity} ${theme?.textColor} font-medium`}
          >
            {mood === 'sad' && 'দুঃখিত'}
            {mood === 'anxious' && 'উদ্বিগ্ন'}
            {mood === 'positive' && 'আনন্দিত'}
            {mood === 'neutral' && 'স্বাভাবিক'}
          </motion.span>
        )}

        {isCrisis && !isUser && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-xs mt-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold`}
          >
            জরুরি সাহায্য
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}
