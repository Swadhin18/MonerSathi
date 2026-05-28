import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Heart, Shield } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export default function DisclaimerModal({ isOpen, onAccept }: DisclaimerModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">মনেরসাথী</h2>
              <p className="text-teal-50">আপনার আবেগের সাথী</p>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-amber-900 mb-2">গুরুত্বপূর্ণ নোটিশ</h3>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    মনেরসাথী কোনো চিকিৎসক বা থেরাপিস্ট নয়। এটি পেশাদার মানসিক স্বাস্থ্য সেবার বিকল্প নয়।
                    গুরুতর মানসিক সমস্যার জন্য অবশ্যই বিশেষজ্ঞের পরামর্শ নিন।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-teal-50 rounded-2xl border border-teal-200">
                <Shield className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-teal-900 mb-2">আপনার গোপনীয়তা সুরক্ষিত</h3>
                  <p className="text-sm text-teal-800 leading-relaxed">
                    আপনার কথোপকথন গোপন রাখা হবে। কোনো ব্যক্তিগত তথ্য সংরক্ষণ করা হয় না।
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-slate-600 text-center">
                  এই অ্যাপ শুধুমাত্র আবেগী সমর্থন প্রদান করে। চিকিৎসা পরামর্শ দেয় না।
                </p>

                <ul className="text-xs text-slate-500 space-y-1">
                  <li>• সংকটে সাহায্য নিন - হটলাইন নম্বর দেখানো হবে</li>
                  <li>• সব কথোপকথন সম্পূর্ণ বাংলায়</li>
                  <li>• কোনো ব্যক্তিগত ডেটা সংরক্ষিত নয়</li>
                </ul>
              </div>

              <button
                onClick={onAccept}
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                বুঝেছি, শুরু করুন
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
