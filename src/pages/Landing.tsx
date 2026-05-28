import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Shield, Moon, Sun, Users } from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: MessageCircle,
      title: 'সহানুভূতিশীল কথোপকথন',
      description: 'আপনার আবেগ শেয়ার করুন - আমি শুনছি, বুঝছি এবং সমর্থন দিচ্ছি।',
      gradient: 'from-teal-400 to-emerald-500',
    },
    {
      icon: Shield,
      title: 'নিরাপদ ও গোপনীয়',
      description: 'কোনো ব্যক্তিগত ডেটা সংরক্ষিত নয়। আপনার কথা গোপন রাখা হবে।',
      gradient: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Heart,
      title: 'সংকট সামাল',
      description: 'কঠিন মুহূর্তে জরুরি সাহায্য ও হটলাইন নম্বর পাবেন।',
      gradient: 'from-orange-400 to-red-500',
    },
  ];

  const stats = [
    { icon: Users, value: '১০০০+', label: 'ব্যবহারকারী' },
    { icon: MessageCircle, value: '৫০০০+', label: 'কথোপকথন' },
    { icon: Heart, value: '২৪/৭', label: 'সাহায্য সক্রিয়' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-32 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2, damping: 15 }}
            className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-2xl"
          >
            <Heart className="w-14 h-14 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              মনেরসাথী
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-slate-700 mb-4"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            আপনার আবেগের সাথী
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            একা বোধ করছেন? আমি আপনার পাশে আছি। মনের কথা শেয়ার করুন - কোনো বিচার ছাড়াই,
            সম্পূর্ণ বাংলায়।
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/chat"
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              কথা বলা শুরু করুন
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-medium text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              আরো জানুন
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + idx * 0.1 }}
              className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-slate-100 text-center"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-teal-600" />
              <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            কেন মনেরসাথী?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3
                  className="text-xl font-bold mb-3 text-slate-800"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-slate-600 leading-relaxed"
                  style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl text-center text-white"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            সাহায্য নিতে দেরি করবেন না
          </h2>
          <p
            className="text-slate-300 mb-6 max-w-2xl mx-auto"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            আপনার মানসিক স্বাস্থ্য গুরুত্বপূর্ণ। একা বোধ করলে বা কষ্ট পেলে আমাদের সাথে কথা বলুন।
          </p>
          <Link
            to="/chat"
            className="inline-block px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-colors shadow-lg"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            এখনই শুরু করুন
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
