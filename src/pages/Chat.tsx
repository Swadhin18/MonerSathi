import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, AlertCircle } from 'lucide-react';
import ChatMessage from '../components/ChatMessage';
import TypingIndicator from '../components/TypingIndicator';
import DisclaimerModal from '../components/DisclaimerModal';
import { useSession } from '../contexts/SessionContext';
import { sendMessage } from '../services/api';
import { MoodType } from '../utils/moodColors';
import { getMoodTheme } from '../utils/moodColors';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  mood?: MoodType;
  isCrisis?: boolean;
}

export default function Chat() {
  const { sessionToken, isDisclaimerAccepted, acceptDisclaimer } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType>('neutral');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);

    try {
      const response = await sendMessage(userMessage.text, sessionToken);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.reply,
        sender: 'ai',
        mood: response.mood,
        isCrisis: response.crisis,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setCurrentMood(response.mood);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'একটি সমস্যা হয়েছে';
      setError(errorMessage);

      const errorMessageObj: Message = {
        id: (Date.now() + 1).toString(),
        text: 'এই মুহূর্তে আমি সাড়া দিতে পারছি না। একটু পরে আবার চেষ্টা করো।',
        sender: 'ai',
        mood: 'neutral',
        isCrisis: false,
      };
      setMessages((prev) => [...prev, errorMessageObj]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const theme = getMoodTheme(currentMood);

  return (
    <>
      <DisclaimerModal isOpen={!isDisclaimerAccepted} onAccept={acceptDisclaimer} />

      <div className="min-h-screen md:pb-20 transition-colors duration-500">
        <div className="fixed top-0 left-0 right-0 h-1 md:h-1.5 z-40">
          <div
            className={`h-full bg-gradient-to-r ${theme.gradient} transition-all duration-500`}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 pt-6 pb-32 md:pb-36">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-xl"
              >
                <Heart className="w-12 h-12 text-white" />
              </motion.div>
              <h2
                className="text-3xl font-bold mb-3 text-slate-800"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                আমি তোমার মনেরসাথী
              </h2>
              <p
                className="text-slate-600 text-lg"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                তোমার মনের কথা শেয়ার করো, আমি শুনছি।
              </p>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </motion.div>
          )}

          <div className="space-y-1">
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg.text}
                  sender={msg.sender}
                  mood={msg.mood}
                  isCrisis={msg.isCrisis}
                />
              ))}
            </AnimatePresence>

            {isTyping && <TypingIndicator />}
          </div>

          <div ref={messagesEndRef} />
        </div>

        <div className="fixed bottom-20 md:bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200 p-4 z-30">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="তোমার মনের কথা লিখো..."
                  disabled={isTyping}
                  rows={1}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl resize-none focus:outline-none focus:border-teal-500 focus:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif", minHeight: '56px', maxHeight: '120px' }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-14 h-14 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
              >
                <Send className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
