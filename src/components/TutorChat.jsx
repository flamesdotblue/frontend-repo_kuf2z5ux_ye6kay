import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, Globe, BookmarkPlus } from 'lucide-react';

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'te', label: 'తెలుగు' },
];

const TutorChat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your SmartLearn tutor. Ask me anything from your syllabus. 👋' },
  ]);
  const [input, setInput] = useState('Explain Pythagorean theorem with an example');
  const [lang, setLang] = useState('en');
  const [recording, setRecording] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fakeAIResponse = (text) => {
    // Simple local formatter to simulate a step-by-step explanation
    const steps = [
      'Identify the right-angled triangle with sides a, b and hypotenuse c.',
      'Apply the formula: a² + b² = c².',
      'Substitute the known values and solve for the unknown.',
      'Verify units and reason about the result.'
    ];
    const translatedPrefix = {
      en: 'Here\'s a step-by-step explanation:',
      hi: 'चरण-दर-चरण व्याख्या:',
      te: 'దశల వారీ వివరణ:',
    }[lang];
    return `${translatedPrefix}\n- ${steps.join('\n- ')}`;
  };

  const onSend = () => {
    const content = input.trim();
    if (!content) return;
    const next = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', content: fakeAIResponse(content) }]);
    }, 400);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) onSend();
  };

  return (
    <section className="relative w-full bg-[#0b1120] text-blue-50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">AI Tutor</h2>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
              <Globe className="h-4 w-4 text-blue-200" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-sm focus:outline-none"
              >
                {LANGS.map((l) => (
                  <option key={l.code} value={l.code} className="bg-[#0b1120]">
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur grid grid-rows-[1fr_auto] min-h-[24rem] max-h-[28rem] overflow-hidden"
        >
          {/* Messages */}
          <div className="overflow-y-auto p-4 space-y-3">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'ml-auto bg-blue-600/90 text-white'
                    : 'bg-white/10 text-blue-50 border border-white/10'
                }`}
              >
                {m.content}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Composer */}
          <div className="border-t border-white/10 bg-[#0f1729]/60 p-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRecording((r) => !r)}
                className={`inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm transition ${
                  recording
                    ? 'border-red-400/40 bg-red-500/20 text-red-200'
                    : 'border-white/10 bg-white/5 text-blue-100 hover:bg-white/10'
                }`}
                aria-label="Toggle voice input"
              >
                <Mic className="h-4 w-4" />
              </button>
              <input
                className="flex-1 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-blue-50 placeholder:text-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                placeholder="Type your question... (Ctrl/Cmd + Enter to send)"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
              />
              <button
                onClick={onSend}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-white hover:from-blue-500 hover:to-indigo-500"
              >
                <Send className="h-4 w-4" /> Send
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-blue-100 hover:bg-white/10"
                title="Save answer to notes"
              >
                <BookmarkPlus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        <p className="mt-3 text-xs text-blue-200/70">
          Tip: Language switch affects how the explanation is presented. Voice input is simulated in this preview.
        </p>
      </div>
    </section>
  );
};

export default TutorChat;
