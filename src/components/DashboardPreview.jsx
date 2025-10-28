import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from './ProgressBar';
import { Award, BookOpen, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className="rounded-2xl p-5 bg-white/60 dark:bg-white/10 backdrop-blur border border-black/10 dark:border-white/10"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-white/70">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{value}</h3>
      </div>
      <div className={`p-2 rounded-lg ${color} text-white`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  </motion.div>
);

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="relative z-10 -mt-10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              className="rounded-2xl p-6 bg-white shadow-sm border border-black/10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-gray-900">Weekly Learning Plan</h2>
              <p className="text-sm text-gray-600 mt-1">Prioritized by your recent performance</p>
              <div className="mt-6 space-y-4">
                {[{label: 'Algebra Fundamentals', value: 72, color: 'bg-indigo-600'},
                  {label: 'Biology: Cells & Genetics', value: 43, color: 'bg-emerald-600'},
                  {label: 'World History: 1900s', value: 58, color: 'bg-fuchsia-600'}].map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-800">{row.label}</span>
                      <span className="text-sm text-gray-600">{row.value}%</span>
                    </div>
                    <Progress value={row.value} classNameTrack="bg-gray-200" classNameBar={`${row.color}`} />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="rounded-2xl p-6 bg-white shadow-sm border border-black/10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-gray-900">Recommended Next Steps</h3>
              <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                <li className="p-3 rounded-lg border border-gray-200">Practice 10 Algebra problems</li>
                <li className="p-3 rounded-lg border border-gray-200">Review mitosis vs meiosis notes</li>
                <li className="p-3 rounded-lg border border-gray-200">Take a 5-question history quiz</li>
                <li className="p-3 rounded-lg border border-gray-200">Summarize lecture into flashcards</li>
              </ul>
            </motion.div>
          </div>

          <div className="space-y-6">
            <StatCard title="Daily Streak" value="7 days" icon={Award} color="bg-amber-500" />
            <StatCard title="Topics Mastered" value="24" icon={BookOpen} color="bg-emerald-600" />
            <StatCard title="Velocity" value="+18%" icon={TrendingUp} color="bg-indigo-600" />
          </div>
        </div>
      </div>
    </section>
  );
}
