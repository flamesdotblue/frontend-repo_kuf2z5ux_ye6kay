import React from 'react';

export function Progress({ value = 0, classNameTrack = 'bg-gray-100', classNameBar = 'bg-indigo-600' }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={`w-full h-3 rounded-full overflow-hidden ${classNameTrack}`} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      <div
        className={`h-full ${classNameBar} transition-all duration-500`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

export default Progress;
