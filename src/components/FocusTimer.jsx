import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, RotateCw, Timer } from 'lucide-react';

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function FocusTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' | 'break'
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(focusMinutes * 60);
  const intervalRef = useRef(null);

  const total = useMemo(() => (mode === 'focus' ? focusMinutes : breakMinutes) * 60, [mode, focusMinutes, breakMinutes]);
  const progress = Math.max(0, Math.min(100, ((total - secondsLeft) / total) * 100 || 0));

  useEffect(() => {
    setSecondsLeft(focusMinutes * 60);
  }, [focusMinutes]);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          const nextMode = mode === 'focus' ? 'break' : 'focus';
          const next = nextMode === 'focus' ? focusMinutes * 60 : breakMinutes * 60;
          setMode(nextMode);
          return next;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode, focusMinutes, breakMinutes]);

  const toggle = () => setIsRunning((v) => !v);
  const reset = () => {
    setIsRunning(false);
    setMode('focus');
    setSecondsLeft(focusMinutes * 60);
  };

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-4">
          <Timer className="w-5 h-5 text-indigo-600" />
          <h2 className="text-2xl font-semibold text-gray-900">Focus Timer</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-2xl p-6 border border-gray-200 bg-white shadow-sm">
            <div className="text-sm text-gray-600">Mode</div>
            <div className="mt-2 inline-flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                className={`px-4 py-2 text-sm font-medium ${mode === 'focus' ? 'bg-indigo-600 text-white' : 'bg-white'}`}
                onClick={() => { setMode('focus'); setSecondsLeft(focusMinutes * 60); }}
              >Focus</button>
              <button
                className={`px-4 py-2 text-sm font-medium ${mode === 'break' ? 'bg-indigo-600 text-white' : 'bg-white'}`}
                onClick={() => { setMode('break'); setSecondsLeft(breakMinutes * 60); }}
              >Break</button>
            </div>

            <div className="mt-6">
              <div className="text-7xl font-bold tabular-nums tracking-tight text-gray-900">{formatTime(secondsLeft)}</div>
              <div className="mt-3 h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button onClick={toggle} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700">
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />} {isRunning ? 'Pause' : 'Start'}
              </button>
              <button onClick={reset} className="inline-flex items-center gap-2 rounded-xl bg-gray-900 text-white px-4 py-2 font-medium hover:bg-black">
                <RotateCw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>

          <div className="rounded-2xl p-6 border border-gray-200 bg-white shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Session Settings</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm text-gray-700">Focus (minutes)</span>
                <input type="number" min={1} max={90} value={focusMinutes} onChange={(e) => setFocusMinutes(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" />
              </label>
              <label className="block">
                <span className="text-sm text-gray-700">Break (minutes)</span>
                <input type="number" min={1} max={30} value={breakMinutes} onChange={(e) => setBreakMinutes(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2" />
              </label>
            </div>
            <p className="mt-4 text-sm text-gray-600">Use the Pomodoro technique: focus deeply, then take short breaks to recharge.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
