import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, LineChart, BookOpenCheck, CheckCircle2 } from 'lucide-react';

const ProgressBar = ({ label, value, color }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm text-blue-100/80">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
      <div
        className={`h-full rounded-full ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const DashboardPreview = () => {
  return (
    <section className="relative w-full bg-[#0a0f1c] text-blue-50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">Adaptive Learning Dashboard</h2>
            <p className="text-blue-100/80 max-w-xl">
              Track progress across subjects, discover weak areas, and get personalized micro-lessons.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-yellow-300" />
                  <p className="font-semibold">Weekly Streak</p>
                </div>
                <p className="mt-1 text-sm text-blue-100/80">4 days in a row — keep it up!</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <LineChart className="h-5 w-5 text-green-300" />
                  <p className="font-semibold">Performance</p>
                </div>
                <p className="mt-1 text-sm text-blue-100/80">You improved 15% in Math this week</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className="grid gap-4">
              <ProgressBar label="Mathematics" value={72} color="bg-blue-500" />
              <ProgressBar label="Science" value={58} color="bg-green-500" />
              <ProgressBar label="English" value={84} color="bg-purple-500" />
              <ProgressBar label="Social" value={40} color="bg-pink-500" />
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-white/10 bg-[#0f1729] p-4">
                <div className="flex items-center gap-2 text-sm">
                  <BookOpenCheck className="h-4 w-4 text-blue-300" />
                  Recommended:
                </div>
                <ul className="mt-2 space-y-2 text-sm text-blue-100/80">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-300"/>Quadratic Equations Quiz</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-300"/>Photosynthesis Micro-lesson</li>
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#0f1729] p-4">
                <div className="flex items-center gap-2 text-sm">
                  <LineChart className="h-4 w-4 text-indigo-300" />
                  Focus Areas:
                </div>
                <ul className="mt-2 space-y-2 text-sm text-blue-100/80">
                  <li>Word problems in Algebra</li>
                  <li>Human digestive system</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
