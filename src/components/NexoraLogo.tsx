import React from 'react';

export function NexoraLogoIcon({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Geometric Origami Wolf / Fox Mascot Head from NEXORA interface */}
      <defs>
        <linearGradient id="wolfGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <linearGradient id="wolfGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <linearGradient id="wolfDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>

      {/* Outer Ears */}
      <polygon points="50,22 28,12 36,36" fill="url(#wolfGrad1)" />
      <polygon points="50,22 72,12 64,36" fill="url(#wolfGrad1)" />

      {/* Ear Shadow / Inner */}
      <polygon points="36,36 32,20 44,28" fill="url(#wolfDark)" />
      <polygon points="64,36 68,20 56,28" fill="url(#wolfDark)" />

      {/* Forehead & Brow Facets */}
      <polygon points="50,22 36,36 50,44" fill="#ffffff" />
      <polygon points="50,22 64,36 50,44" fill="#e0f2fe" />

      {/* Cheek Facets */}
      <polygon points="36,36 18,44 32,56" fill="url(#wolfGrad2)" />
      <polygon points="64,36 82,44 68,56" fill="url(#wolfGrad2)" />

      <polygon points="36,36 50,44 32,56" fill="#38bdf8" />
      <polygon points="64,36 50,44 68,56" fill="#0ea5e9" />

      {/* Snout & Nose Bridge */}
      <polygon points="50,44 42,66 50,72" fill="#ffffff" />
      <polygon points="50,44 58,66 50,72" fill="#bae6fd" />

      {/* Muzzle Sides */}
      <polygon points="32,56 42,66 50,72 38,76" fill="#0284c7" />
      <polygon points="68,56 58,66 50,72 62,76" fill="#0369a1" />

      {/* Jaw & Chin Point */}
      <polygon points="50,72 44,84 50,90 56,84" fill="#38bdf8" />
      <polygon points="42,66 50,72 44,84 38,76" fill="#0f172a" />
      <polygon points="58,66 50,72 56,84 62,76" fill="#1e1b4b" />

      {/* Glowing Cyan Eyes */}
      <polygon points="40,46 46,45 44,50" fill="#00f0ff" />
      <polygon points="60,46 54,45 56,50" fill="#00f0ff" />
      <circle cx="43" cy="48" r="1.5" fill="#ffffff" />
      <circle cx="57" cy="48" r="1.5" fill="#ffffff" />
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
      className={`flex items-center gap-3 text-left transition hover:opacity-90 whitespace-nowrap shrink-0 group ${className}`}
    >
      <div className="relative">
        <NexoraLogoIcon className="h-9 w-9 filter drop-shadow-[0_0_12px_rgba(56,189,248,0.7)] group-hover:scale-105 transition-transform" />
      </div>
      <div className="flex flex-col">
        <span className="font-rajdhani text-2xl font-black tracking-[0.2em] text-white leading-none group-hover:text-cyan-300 transition-colors drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]">
          NEXORA
        </span>
        <span className="text-[9px] font-bold tracking-[0.3em] text-[#38bdf8] uppercase leading-tight mt-1">
          COLLEGE FEST
        </span>
      </div>
    </button>
  );
}
