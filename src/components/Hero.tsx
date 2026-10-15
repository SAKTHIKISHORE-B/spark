import React from 'react';
import { Search, Calendar, MapPin, Users, Award, Sparkles } from 'lucide-react';
import { EventCategory } from '../types';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: EventCategory;
  onSelectCategory: (cat: EventCategory) => void;
  totalEventsCount: number;
  totalRegisteredCount: number;
  onQuickRegister: () => void;
}

export function Hero({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  totalEventsCount,
  totalRegisteredCount,
  onQuickRegister,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white">
      {/* Background Graphic / Photography Container */}
      <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-12 sm:px-6 lg:px-8 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Headline, Proposition & Direct Search */}
          <div className="flex flex-col justify-center lg:col-span-7">
            {/* Unboxed natural editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-blue-700">
              <span>Synapse &apos;26 Annual University Fest</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Oct 24 - 26, 2026</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Main Campus</span>
            </div>

            {/* Headline with strict containment & text balance */}
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]" style={{ textWrap: 'balance' }}>
              Where campus ambition turns into real impact.
            </h1>

            <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
              Explore national hackathons, battle of the bands, robotics arenas, esports tournaments, and leadership summits. Register solo or assemble your squad with instant verifiable QR event passes.
            </p>

            {/* Functional search bar */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search by event title, tech stack, club, or venue..."
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                  >
                    Clear
                  </button>
                )}
              </div>

              <button
                onClick={onQuickRegister}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 whitespace-nowrap shrink-0"
              >
                Browse All Competitions
              </button>
            </div>

            {/* Quick helper note */}
            <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
              <span className="font-medium text-slate-700">Quick Filters:</span>
              <button
                onClick={() => onSelectCategory('technical')}
                className="hover:text-blue-700 underline underline-offset-2"
              >
                Hackathons
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => onSelectCategory('cultural')}
                className="hover:text-blue-700 underline underline-offset-2"
              >
                Live Music & Dance
              </button>
              <span aria-hidden="true">·</span>
              <button
                onClick={() => onSelectCategory('workshops')}
                className="hover:text-blue-700 underline underline-offset-2"
              >
                Robotics & AI
              </button>
            </div>
          </div>

          {/* Right Column: Marquee Fest Photography Spotlight */}
          <div className="relative flex lg:col-span-5">
            <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
              <img
                src="/src/assets/images/hero_college_fest_stage_1792043266159.jpg"
                alt="Synapse Festival main amphitheatre stage with student audience and stage lighting"
                className="h-72 w-full object-cover sm:h-96 lg:h-full"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs font-semibold text-amber-300">
                  Main Amphitheatre · Grand Arena
                </div>
                <div className="mt-1 text-base font-bold sm:text-lg">
                  Synapse Fest 2026: 3 Days of Innovation & Culture
                </div>
                <div className="mt-1 flex items-center gap-3 text-xs text-slate-300">
                  <span>Verified Inter-College Pass</span>
                  <span aria-hidden="true">·</span>
                  <span>Instant QR Check-in</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column metric strip in full width row below hero split */}
        <div className="mt-10 grid grid-cols-2 gap-4 border-t border-slate-200 pt-8 sm:grid-cols-4 lg:gap-8">
          <div className="flex flex-col">
            <span className="font-mono text-2xl font-bold tracking-tight text-slate-900 tabular-nums sm:text-3xl">
              {totalEventsCount}+
            </span>
            <span className="mt-1 text-xs text-slate-600 sm:text-sm">
              Competitions & Workshops
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-2xl font-bold tracking-tight text-slate-900 tabular-nums sm:text-3xl">
              ₹350,000+
            </span>
            <span className="mt-1 text-xs text-slate-600 sm:text-sm">
              Cash Prizes & Grants
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-2xl font-bold tracking-tight text-slate-900 tabular-nums sm:text-3xl">
              {totalRegisteredCount}+
            </span>
            <span className="mt-1 text-xs text-slate-600 sm:text-sm">
              Students Registered
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-2xl font-bold tracking-tight text-slate-900 tabular-nums sm:text-3xl">
              100%
            </span>
            <span className="mt-1 text-xs text-slate-600 sm:text-sm">
              Digital E-Passes & Verified Certs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
