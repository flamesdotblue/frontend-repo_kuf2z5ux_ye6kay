import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TimerReset, Play, Pause, RotateCcw, Music2 } from 'lucide-react';

const format = (s) => {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const r = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${r}`;
};

const FocusTimer = () => {
  const [durations] = useState({ work: 25 * 60, short: 5 * 60, long: 15 * 60 });
  const [target, setTarget] = useState('work');
  const [seconds, setSeconds] = useState(durations.work);
  const [running, setRunning] = useState(false);
  const [softMusic, setSoftMusic] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSeconds(durations[target]);
  }, [target, durations]);

  useEffect(() => {
    if (!running) return () => {};
    intervalRef.current = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    if (seconds === 0) setRunning(false);
  }, [seconds]);

  const progress = useMemo(() => {
    const total = durations[target];
    return 100 - Math.round((seconds / total) * 100);
  }, [seconds, target, durations]);

  return (
    <section className="relative w-full bg-[#0a0f1c] text-blue-50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold">Focus Mode</h2>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="opacity-80">Distraction blocker active</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { key: 'work', label: 'Pomodoro 25:00' },
                { key: 'short', label: 'Short Break 5:00' },
                { key: 'long', label: 'Long Break 15:00' },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTarget(t.key)}
                  className={`rounded-xl px-3 py-2 text-sm border transition ${
                    target === t.key
                      ? 'border-blue-400/40 bg-blue-500/20 text-blue-100'
                      : 'border-white/10 bg-white/5 text-blue-100 hover:bg-white/10'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] items-center gap-6">
              <div className="relative h-3 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-4xl sm:text-5xl font-semibold tabular-nums tracking-tight">
                {format(seconds)}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setRunning((r) => !r)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-white hover:from-blue-500 hover:to-indigo-500"
              >
                {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />} {running ? 'Pause' : 'Start'}
              </button>
              <button
                onClick={() => setSeconds(durations[target])}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-blue-100 hover:bg-white/10"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Soft background music</p>
              <button
                onClick={() => setSoftMusic((s) => !s)}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition ${
                  softMusic
                    ? 'border-green-400/40 bg-green-500/20 text-green-100'
                    : 'border-white/10 bg-white/5 text-blue-100 hover:bg-white/10'
                }`}
              >
                <Music2 className="h-4 w-4" /> {softMusic ? 'On' : 'Off'}
              </button>
            </div>
            <p className="mt-3 text-sm text-blue-100/80">
              When enabled, gentle ambient tones can help you maintain focus. Audio preview is simulated in this sandbox.
            </p>

            <div className="mt-6 rounded-xl bg-[#0f1729] p-4 text-sm text-blue-100/80 border border-white/10">
              <div className="flex items-center gap-2 text-blue-200">
                <TimerReset className="h-4 w-4" />
                Session Tips
              </div>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Close unrelated tabs and silence notifications.</li>
                <li>Study in 25-minute bursts with 5-minute breaks.</li>
                <li>Review weak areas after each session.</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FocusTimer;
