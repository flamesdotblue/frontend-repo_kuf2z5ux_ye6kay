import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Brain, Award, BookOpen } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const Feature = ({ icon: Icon, title, desc }) => (
  <motion.div
    className="flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur border border-white/10"
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.5 }}
  >
    <div className="p-2 rounded-lg bg-white/20 text-white">
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h4 className="font-semibold text-white">{title}</h4>
      <p className="text-sm text-white/80">{desc}</p>
    </div>
  </motion.div>
);

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-gradient-to-b from-indigo-600 via-violet-600 to-fuchsia-600">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl text-white"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            SmartLearn
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            An AI-powered study companion that adapts to your goals. Master topics faster with personalized guidance, focused sessions, and a beautiful, minimal interface.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#tutor"
              className="inline-flex items-center gap-2 rounded-lg bg-white text-indigo-700 font-semibold px-5 py-3 shadow hover:shadow-md transition"
            >
              <Rocket className="w-5 h-5" /> Start with the AI Tutor
            </a>
            <a
              href="#dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500/30 text-white font-semibold px-5 py-3 border border-white/20 hover:bg-indigo-500/40 transition"
            >
              <BookOpen className="w-5 h-5" /> Explore Dashboard
            </a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">
          <Feature icon={Brain} title="Adaptive Learning" desc="Dynamic plans that learn with you and target your weak spots." />
          <Feature icon={Award} title="Gamified Progress" desc="Earn XP, maintain streaks, and unlock milestones as you study." />
          <Feature icon={BookOpen} title="Smart Notes" desc="Auto-generate concise notes, summaries, and flashcards." />
        </div>
      </div>
    </section>
  );
}
