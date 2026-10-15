import React from 'react';
import { NexoraBrand } from './NexoraLogo';
import { Instagram, Youtube, Twitter, Facebook } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'events' | 'schedule' | 'my-tickets' | 'organizer') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-purple-900/30 bg-[#050712] py-8 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Bar matching the exact uploaded image layout */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Left: Nexora Geometric Wolf Brand */}
          <NexoraBrand onClick={() => onNavigate('events')} />

          {/* Center: Script Cursive Tagline */}
          <div className="font-script text-xl sm:text-2xl text-purple-200 tracking-wide drop-shadow-[0_0_12px_rgba(192,132,252,0.6)]">
            More Than Just a Fest — It&apos;s an Experience!
          </div>

          {/* Right: Follow Us with Social Icons */}
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
            <span>Follow Us</span>
            <div className="flex items-center gap-3 text-slate-400">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="hover:text-pink-400 transition"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="hover:text-red-500 transition"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#twitter"
                aria-label="X / Twitter"
                className="hover:text-cyan-400 transition"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="hover:text-blue-500 transition"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Secondary quiet row for essential portal links & copyright */}
        <div className="mt-8 border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            © 2026 NEXORA College Fest & ABC College Student Affairs. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('events')}
              className="hover:text-slate-300 transition"
            >
              All Events
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onNavigate('schedule')}
              className="hover:text-slate-300 transition"
            >
              Master Schedule
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onNavigate('my-tickets')}
              className="hover:text-slate-300 transition"
            >
              Delegate Passes
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onNavigate('organizer')}
              className="hover:text-slate-300 transition"
            >
              Organizer Console
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
