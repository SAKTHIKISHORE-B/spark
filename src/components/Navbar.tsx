import React, { useState } from 'react';
import { Bookmark, Menu, X, ArrowRight, Phone, Mail, Ticket, Sparkles } from 'lucide-react';
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
    <header className="sticky top-0 z-40 w-full border-b border-[#1b2348] bg-[#050816]/95 backdrop-blur-xl">
      {/* Top micro hotline strip */}
      <div className="border-b border-[#131b3b] bg-[#070b1e] px-4 py-1 text-[11px] text-slate-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Phone className="h-3 w-3 text-[#38bdf8]" />
              <span className="font-mono text-[#7dd3fc] font-semibold">0000000XXX</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Mail className="h-3 w-3 text-[#38bdf8]" />
              <span className="font-mono text-[#7dd3fc]">xyz@gmail.com</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#a78bfa]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
            <span>SONA COLLEGE OF TECHNOLOGY · NEXORA 2026</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Nexora Logo & Brand from Screenshot */}
        <NexoraBrand
          onClick={() => {
            onViewChange('events');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Center: Navigation Links matching image (Home, Events, Schedule, Gallery, Contact) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wide text-slate-300">
          <button
            onClick={() => {
              onViewChange('events');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`relative py-1 transition-colors hover:text-white ${
              currentView === 'events' ? 'text-white font-bold' : 'text-slate-400'
            }`}
          >
            <span>Home</span>
            {currentView === 'events' && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]" />
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
              currentView === 'schedule' ? 'text-white font-bold' : 'text-slate-400'
            }`}
          >
            <span>Schedule</span>
            {currentView === 'schedule' && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]" />
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
            onClick={() => {
              const el = document.getElementById('footer-contact-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="py-1 transition-colors text-slate-400 hover:text-white"
          >
            Contact
          </button>

          <button
            onClick={() => onViewChange('my-tickets')}
            className={`relative py-1 transition-colors hover:text-white flex items-center gap-1.5 ${
              currentView === 'my-tickets' ? 'text-white font-bold' : 'text-slate-400'
            }`}
          >
            <span>My Passes</span>
            {ticketsCount > 0 && (
              <span className="rounded-full bg-[#7c3aed] px-1.5 py-0.2 text-[10px] text-white font-mono font-bold">
                {ticketsCount}
              </span>
            )}
            {currentView === 'my-tickets' && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]" />
            )}
          </button>

          <button
            onClick={() => onViewChange('organizer')}
            className={`relative py-1 transition-colors hover:text-white ${
              currentView === 'organizer' ? 'text-white font-bold' : 'text-slate-400'
            }`}
          >
            <span>Organizer</span>
            {currentView === 'organizer' && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8]" />
            )}
          </button>
        </nav>

        {/* Right: Saved Bookmarks Counter & Royal Purple Register Now Pill Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBookmarks}
            aria-label="Saved events"
            className="flex items-center gap-1.5 rounded-full border border-[#273260] bg-[#0c1236] px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-[#141d4f] hover:text-white"
            title="Saved Events"
          >
            <Bookmark className="h-3.5 w-3.5 text-[#38bdf8]" />
            <span className="hidden sm:inline">Saved</span>
            {bookmarksCount > 0 && (
              <span className="font-mono text-xs font-bold text-[#7dd3fc] tabular-nums">
                ({bookmarksCount})
              </span>
            )}
          </button>

          {/* Royal Purple Pill Button from Screenshot: Register Now → */}
          <button
            onClick={onQuickRegister}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] px-6 py-2.5 text-xs font-bold text-white shadow-[0_0_25px_rgba(124,58,237,0.55)] hover:from-[#8b5cf6] hover:to-[#7c3aed] hover:shadow-[0_0_35px_rgba(139,92,246,0.75)] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
          >
            <span>Register Now</span>
            <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#273260] bg-[#0c1236] text-slate-300 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-[#38bdf8]" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#1b2348] bg-[#070b1e] px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-semibold text-slate-300">
            <button
              onClick={() => {
                onViewChange('events');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-white"
            >
              Home
            </button>
            <button
              onClick={() => {
                onViewChange('events');
                setMobileMenuOpen(false);
                const el = document.getElementById('featured-events-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left py-1 hover:text-white"
            >
              Events
            </button>
            <button
              onClick={() => {
                onViewChange('schedule');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-white"
            >
              Schedule
            </button>
            <button
              onClick={() => {
                onViewChange('events');
                setMobileMenuOpen(false);
                const el = document.getElementById('gallery-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left py-1 hover:text-white"
            >
              Gallery
            </button>
            <button
              onClick={() => {
                onViewChange('my-tickets');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-white"
            >
              My Passes ({ticketsCount})
            </button>
            <button
              onClick={() => {
                onViewChange('organizer');
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 hover:text-white"
            >
              Organizer Console
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
