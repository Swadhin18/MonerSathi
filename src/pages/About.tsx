import { motion } from 'framer-motion';
import { Heart, Shield, AlertTriangle, Users, Phone, Mail } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-2xl">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 text-slate-800"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            মনেরসাথী সম্পর্কে
          </h1>
          <p
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            বাংলাভাষী মানুষের জন্য একটি আবেগী সহায়ক সিস্টেম
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 shadow-xl mb-8 border border-slate-100"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h2
                className="text-2xl font-bold mb-3 text-slate-800"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                আমাদের উদ্দেশ্য
              </h2>
              <p
                className="text-slate-600 leading-relaxed"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                মনেরসাথী একটি সহানুভূতিশীল বাংলা ভাষার সহযোগী, যা মানসিক চাপ, দুঃখ, উদ্বেগ বা
                একাকীত্বের সময় বাংলাভাষী ব্যবহারকারীদের আবেগী সমর্থন প্রদান করে। আমরা একটি
                নিরাপদ, গোপনীয় ও সহানুভূতিশীল পরিবেশ তৈরি করেছি যেখানে আপনি আপনার মনের কথা
                শেয়ার করতে পারেন।
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-amber-50 rounded-3xl p-8 shadow-xl mb-8 border-2 border-amber-200"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-200 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h2
                className="text-2xl font-bold mb-3 text-amber-900"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                গুরুত্বপূর্ণ সতর্কতা
              </h2>
              <ul
                className="space-y-3 text-amber-900"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>মনেরসাথী কোনো চিকিৎসক বা থেরাপিস্ট নয়</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>এটি পেশাদার মানসিক স্বাস্থ্য সেবার বিকল্প নয়</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>গুরুতর মানসিক সমস্যার জন্য অবশ্যই বিশেষজ্ঞের পরামর্শ নিন</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>জরুরি পরিস্থিতিতে হটলাইন বা হাসপাতালে যোগাযোগ করুন</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-8 shadow-xl mb-8 border border-slate-100"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h2
                className="text-2xl font-bold mb-3 text-slate-800"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                গোপনীয়তা ও নিরাপত্তা
              </h2>
              <ul
                className="space-y-2 text-slate-600"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>কোনো ব্যক্তিগত ডেটা সংরক্ষিত নয়</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>সংকট সনাক্তকরণ সিস্টেম সক্রিয়</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>সম্পূর্ণ বাংলায় কথোপকথন</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-1">✓</span>
                  <span>২৪/৭ সাহায্য উপলব্ধ</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl mb-8 text-white"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                জরুরি হটলাইন নম্বর
              </h2>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="font-bold text-lg">জাতীয় মানসিক স্বাস্থ্য হটলাইন</p>
                  <p className="text-teal-300 text-xl mt-1">০২-৯১৩৭৯৭৮</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="font-bold text-lg">ঢাকা মেডিকেল কলেজ হাসপাতাল</p>
                  <p className="text-teal-300 text-xl mt-1">০২-৮৬২৬৭১৮</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="font-bold text-lg">চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল</p>
                  <p className="text-teal-300 text-xl mt-1">০৩১-৬৫০৪৫০</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2
                className="text-2xl font-bold mb-3 text-slate-800"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                মনেরসাথী কাদের জন্য?
              </h2>
              <ul
                className="space-y-2 text-slate-600"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>যারা মানসিক চাপে আছেন</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>যারা একাকী বোধ করছেন</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>যারা আবেগী সমর্থন চান</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>যারা বাংলায় কথা বলতে স্বাচ্ছন্দ্য বোধ করেন</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
