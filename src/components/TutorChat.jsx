import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Globe } from 'lucide-react';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
];

function Message({ role, text }) {
  const isUser = role === 'user';
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="shrink-0 p-2 rounded-lg bg-indigo-600 text-white"><Bot className="w-4 h-4" /></div>
      )}
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${isUser ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>
        {text}
      </div>
      {isUser && (
        <div className="shrink-0 p-2 rounded-lg bg-gray-900 text-white"><User className="w-4 h-4" /></div>
      )}
    </div>
  );
}

export default function TutorChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I\'m your AI tutor. What topic would you like help with today?' },
  ]);
  const [input, setInput] = useState('');
  const [lang, setLang] = useState('en');
  const listRef = useRef(null);

  const placeholder = useMemo(() => {
    switch (lang) {
      case 'es':
        return 'Pregunta sobre un tema (p. ej., Álgebra, Biología)';
      case 'fr':
        return 'Posez une question (ex: algèbre, biologie)';
      case 'de':
        return 'Stelle eine Frage (z. B. Algebra, Biologie)';
      default:
        return 'Ask a question (e.g., Algebra, Biology)';
    }
  }, [lang]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { role: 'user', text };
    setMessages((m) => [...m, userMsg]);
    setInput('');

    setTimeout(() => {
      const hint = 'Here\'s a quick explanation and a 3-step plan to master it: 1) Review the concept, 2) Try an example, 3) Practice 5 problems.';
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          text: `(${lang.toUpperCase()}) Great question about: "${text}". ${hint}`,
        },
      ]);
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    }, 600);
  };

  return (
    <section id="tutor" className="bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">AI Tutor</h2>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-600" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm"
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div ref={listRef} className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <Message key={i} role={m.role} text={m.text} />
            ))}
          </div>
          <div className="flex items-center gap-3 p-3 border-t border-gray-200">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder={placeholder}
            />
            <button
              onClick={sendMessage}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-4 py-3 font-medium hover:bg-indigo-700 active:bg-indigo-800"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
