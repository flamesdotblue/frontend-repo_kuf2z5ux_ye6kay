import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Brain, Sparkles, User } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0b1020] via-[#0a0f1c] to-[#070a14] text-white">
      {/* 3D Spline Scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle gradient overlay for readability - does not block interactions */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#070a14]" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center gap-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
            <Sparkles className="h-4 w-4 text-blue-300" />
            <span className="text-sm text-blue-100">AI-powered learning platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">
            Study Smarter, Not Harder
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-blue-100/90">
            SmartLearn adapts to you with an AI Tutor, adaptive dashboard, and distraction-free focus tools — all in a sleek, accessible interface.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <a href="#tutor" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white shadow-lg shadow-blue-900/30 hover:from-blue-500 hover:to-indigo-500 transition">
              <Rocket className="h-5 w-5" />
              Get Started
            </a>
            <a href="#dashboard" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 text-white hover:bg-white/15 transition backdrop-blur">
              <User className="h-5 w-5" />
              View Dashboard
            </a>
          </div>

          {/* Quick feature highlights */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
            {[
              { icon: Brain, title: 'AI Tutor', desc: 'Step-by-step guidance' },
              { icon: Rocket, title: 'Adaptive Dashboard', desc: 'Track & improve' },
              { icon: Sparkles, title: 'Smart Notes', desc: 'Clean, sharable notes' },
            ].map((f, idx) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur"
              >
                <div className="flex items-center gap-3">
                  <f.icon className="h-5 w-5 text-blue-300" />
                  <p className="font-semibold text-blue-50">{f.title}</p>
                </div>
                <p className="mt-1 text-sm text-blue-100/80">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
