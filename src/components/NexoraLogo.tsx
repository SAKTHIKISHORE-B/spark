import React from 'react';

export function NexoraLogoIcon({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Geometric Wolf/Fox head facets in cyan, indigo, and bright white */}
      <polygon points="50,15 30,35 42,42" fill="#38bdf8" />
      <polygon points="50,15 70,35 58,42" fill="#818cf8" />
      <polygon points="30,35 15,22 25,48" fill="#0284c7" />
      <polygon points="70,35 85,22 75,48" fill="#6366f1" />
      <polygon points="42,42 50,15 58,42" fill="#e0f2fe" />
      <polygon points="42,42 50,60 58,42" fill="#c084fc" />
      <polygon points="30,35 42,42 32,58" fill="#0ea5e9" />
      <polygon points="70,35 58,42 68,58" fill="#a855f7" />
      <polygon points="25,48 32,58 18,65" fill="#0369a1" />
      <polygon points="75,48 68,58 82,65" fill="#7e22ce" />
      <polygon points="32,58 50,60 50,78 38,72" fill="#38bdf8" />
      <polygon points="68,58 50,60 50,78 62,72" fill="#c084fc" />
      <polygon points="38,72 50,78 50,92 45,86" fill="#0284c7" />
      <polygon points="62,72 50,78 50,92 55,86" fill="#9333ea" />
      <polygon points="50,78 45,86 50,92 55,86" fill="#ffffff" />
      {/* Glowing neon eyes */}
      <polygon points="36,46 42,44 40,49" fill="#38bdf8" />
      <polygon points="64,46 58,44 60,49" fill="#c084fc" />
    </svg>
  );
}

export function NexoraBrand({
  onClick,
  className = '',
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2.5 text-left transition hover:opacity-95 whitespace-nowrap shrink-0 ${className}`}
    >
      <NexoraLogoIcon className="h-8 w-8 filter drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
      <div className="flex flex-col">
        <span className="font-rajdhani text-xl font-black tracking-widest text-white leading-none">
          N E X O R A
        </span>
        <span className="text-[9px] font-bold tracking-[0.22em] text-slate-400 uppercase leading-tight mt-0.5">
          College Fest
        </span>
      </div>
    </button>
  );
}
