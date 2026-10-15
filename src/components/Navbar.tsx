import React, { useState } from 'react';
import { Bookmark, Menu, X, Ticket, ArrowRight, Shield } from 'lucide-react';
import { NexoraBrand } from './NexoraLogo';

interface NavbarProps {
  currentView: 'events' | 'schedule' | 'my-tickets' | 'organizer';
  onViewChange: (view: 'events' | 'schedule' | 'my-tickets' | 'organizer') => void;
  bookmarksCount: number;
  ticketsCount: number;
  onOpenBookmarks: () => void;
  onQuickRegister: () => void;
}

export function Navbar({
  currentView,
  onViewChange,
  bookmarksCount,
  ticketsCount,
  onOpenBookmarks,
  onQuickRegister,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-900/30 bg-[#060814]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Nexora Geometric Logo & Brand */}
        <NexoraBrand
          onClick={() => {
            onViewChange('events');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Center: Clean Nav Links with active blue indicator line */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wide text-slate-300">
          <button
            onClick={() => {
              onViewChange('events');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`relative py-1 transition-colors hover:text-white ${
              currentView === 'events' ? 'text-white' : 'text-slate-400'
            }`}
          >
            <span>Home</span>
            {currentView === 'events' && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            )}
          </button>

          <button
            onClick={() => {
              onViewChange('events');
              const el = document.getElementById('featured-events-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="py-1 transition-colors text-slate-400 hover:text-white"
          >
            Events
          </button>

          <button
            onClick={() => onViewChange('schedule')}
            className={`relative py-1 transition-colors hover:text-white ${
              currentView === 'schedule' ? 'text-white' : 'text-slate-400'
            }`}
          >
            <span>Schedule</span>
            {currentView === 'schedule' && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            )}
          </button>

          <button
            onClick={() => {
              onViewChange('events');
              const el = document.getElementById('gallery-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="py-1 transition-colors text-slate-400 hover:text-white"
          >
            Gallery
          </button>

          <button
            onClick={() => onViewChange('my-tickets')}
            className={`relative py-1 transition-colors hover:text-white flex items-center gap-1.5 ${
              currentView === 'my-tickets' ? 'text-white' : 'text-slate-400'
            }`}
          >
            <span>My Passes</span>
            {ticketsCount > 0 && (
              <span className="rounded-full bg-purple-600/60 px-1.5 py-0.2 text-[10px] text-purple-200 border border-purple-400/40">
                {ticketsCount}
              </span>
            )}
            {currentView === 'my-tickets' && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            )}
          </button>

          <button
            onClick={() => onViewChange('organizer')}
            className={`relative py-1 transition-colors hover:text-white ${
              currentView === 'organizer' ? 'text-white' : 'text-slate-400'
            }`}
          >
            <span>Organizer</span>
            {currentView === 'organizer' && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            )}
          </button>
        </nav>

        {/* Right: Bookmark Counter & Glowing Purple Pill "Register Now →" Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBookmarks}
            aria-label="Saved events"
            className="flex items-center gap-1.5 rounded-full border border-purple-800/40 bg-purple-950/40 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-purple-900/50 hover:text-white"
            title="Saved Events"
          >
            <Bookmark className="h-3.5 w-3.5 text-purple-400" />
            <span className="hidden sm:inline">Saved</span>
            {bookmarksCount > 0 && (
              <span className="font-mono text-xs font-bold text-amber-400 tabular-nums">
                ({bookmarksCount})
              </span>
            )}
          </button>

          <button
            onClick={onQuickRegister}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-lg glow-button hover:from-purple-500 hover:to-indigo-500 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            <span>Register Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-purple-800/40 bg-slate-900 text-slate-300 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-purple-900/40 bg-[#060814]/98 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-semibold text-slate-300">
            <button
              onClick={() => {
                onViewChange('events');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-purple-950/50"
            >
              <span>Home</span>
            </button>
            <button
              onClick={() => {
                onViewChange('events');
                setMobileMenuOpen(false);
                const el = document.getElementById('featured-events-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-purple-950/50"
            >
              <span>Events</span>
            </button>
            <button
              onClick={() => {
                onViewChange('schedule');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-purple-950/50"
            >
              <span>Schedule</span>
            </button>
            <button
              onClick={() => {
                onViewChange('events');
                setMobileMenuOpen(false);
                const el = document.getElementById('gallery-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-purple-950/50"
            >
              <span>Gallery</span>
            </button>
            <button
              onClick={() => {
                onViewChange('my-tickets');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-purple-950/50"
            >
              <span>My Passes</span>
              {ticketsCount > 0 && (
                <span className="font-mono text-xs text-purple-300">
                  {ticketsCount} active
                </span>
              )}
            </button>
            <button
              onClick={() => {
                onViewChange('organizer');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-purple-950/50"
            >
              <span>Organizer Hub</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
