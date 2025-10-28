import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

import Hero from './components/Hero.jsx';
import DashboardPreview from './components/DashboardPreview.jsx';
import TutorChat from './components/TutorChat.jsx';
import FocusTimer from './components/FocusTimer.jsx';

function App() {
  return (
    <div className="min-h-screen w-full bg-[#070a14] text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-[#070a14]/60 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-300" />
            <span className="font-semibold tracking-tight">SmartLearn</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-blue-100/80">
            <a href="#tutor" className="hover:text-white">Tutor</a>
            <a href="#dashboard" className="hover:text-white">Dashboard</a>
            <a href="#focus" className="hover:text-white">Focus</a>
          </nav>
          <button className="rounded-xl bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15">Dark</button>
        </div>
      </header>

      {/* Hero with Spline */}
      <Hero />

      {/* Adaptive dashboard preview */}
      <div id="dashboard">
        <DashboardPreview />
      </div>

      {/* AI Tutor Chat */}
      <div id="tutor">
        <TutorChat />
      </div>

      {/* Focus Timer */}
      <div id="focus">
        <FocusTimer />
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#070a14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-blue-200/70"
          >
            © {new Date().getFullYear()} SmartLearn — Built for focused, accessible, and adaptive learning.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}

export default App;
