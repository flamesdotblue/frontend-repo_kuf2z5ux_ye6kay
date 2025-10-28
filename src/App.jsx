import React from 'react';
import Hero from './components/Hero';
import DashboardPreview from './components/DashboardPreview';
import TutorChat from './components/TutorChat';
import FocusTimer from './components/FocusTimer';
import { GraduationCap } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-white/70 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <span>SmartLearn</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#dashboard" className="hover:text-indigo-600">Dashboard</a>
            <a href="#tutor" className="hover:text-indigo-600">AI Tutor</a>
            <a href="#timer" className="hover:text-indigo-600">Focus</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#tutor" className="px-3 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium">Get Started</a>
          </div>
        </div>
      </header>

      <main id="top" className="pt-16">
        <Hero />
        <DashboardPreview />
        <div id="timer">
          <TutorChat />
          <FocusTimer />
        </div>
      </main>

      <footer className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-gray-600 flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} SmartLearn. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#dashboard" className="hover:text-indigo-600">Overview</a>
            <a href="#tutor" className="hover:text-indigo-600">Tutor</a>
            <a href="#timer" className="hover:text-indigo-600">Focus</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
