import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Trophy, Building, Compass, ArrowRight } from 'lucide-react';
import { EventItem, VenueItem } from '../types';

interface ScheduleViewProps {
  events: EventItem[];
  venues: VenueItem[];
  onSelectEvent: (event: EventItem) => void;
  onRegisterEvent: (event: EventItem) => void;
}

export function ScheduleView({
  events,
  venues,
  onSelectEvent,
  onRegisterEvent,
}: ScheduleViewProps) {
  const [activeDay, setActiveDay] = useState<number | 'all'>('all');
  const [selectedVenueCode, setSelectedVenueCode] = useState<string>('all');
  const [tab, setTab] = useState<'timeline' | 'venues'>('timeline');

  const filteredEvents = events.filter((ev) => {
    if (activeDay !== 'all' && ev.day !== activeDay) return false;
    if (selectedVenueCode !== 'all' && ev.venueCode !== selectedVenueCode) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-purple-900/30 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <span>NEXORA 2026 Master Itinerary</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>15 - 17 March 2026</span>
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Event Schedule & Campus Venues
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Track multi-track schedules, round timings, and auditorium locations across 3 festival days.
          </p>
        </div>

        {/* View Switch: Timeline vs Venue Directory */}
        <div className="flex items-center gap-1 rounded-xl border border-purple-500/30 bg-[#0c102a] p-1 text-xs">
          <button
            onClick={() => setTab('timeline')}
            className={`rounded-lg px-3.5 py-1.5 font-semibold transition ${
              tab === 'timeline'
                ? 'bg-purple-600 text-white shadow-md glow-button'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Day Timeline
          </button>
          <button
            onClick={() => setTab('venues')}
            className={`rounded-lg px-3.5 py-1.5 font-semibold transition ${
              tab === 'venues'
                ? 'bg-purple-600 text-white shadow-md glow-button'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Campus Hall Directory
          </button>
        </div>
      </div>

      {tab === 'timeline' && (
        <div className="mt-6">
          {/* Day & Venue Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-purple-500/20 bg-[#0c102a]/90 p-4 shadow-lg backdrop-blur-md">
            {/* Days Tabs */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-1">Filter Day:</span>
              <button
                onClick={() => setActiveDay('all')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeDay === 'all'
                    ? 'bg-purple-600 text-white glow-button'
                    : 'bg-slate-900 border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                All 3 Days
              </button>
              <button
                onClick={() => setActiveDay(1)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeDay === 1
                    ? 'bg-purple-600 text-white glow-button'
                    : 'bg-slate-900 border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Day 1 (15 Mar)
              </button>
              <button
                onClick={() => setActiveDay(2)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeDay === 2
                    ? 'bg-purple-600 text-white glow-button'
                    : 'bg-slate-900 border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Day 2 (16 Mar)
              </button>
              <button
                onClick={() => setActiveDay(3)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeDay === 3
                    ? 'bg-purple-600 text-white glow-button'
                    : 'bg-slate-900 border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                Day 3 (17 Mar)
              </button>
            </div>

            {/* Venue Filter Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="venue-filter" className="text-xs font-bold text-slate-400">
                Venue:
              </label>
              <select
                id="venue-filter"
                value={selectedVenueCode}
                onChange={(e) => setSelectedVenueCode(e.target.value)}
                className="rounded-lg border border-purple-500/30 bg-[#080b1e] px-3 py-1.5 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
              >
                <option value="all">All Campus Halls</option>
                {venues.map((v) => (
                  <option key={v.code} value={v.code}>
                    {v.name} ({v.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Timeline List */}
          <div className="mt-8 space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="rounded-2xl border border-purple-500/20 bg-[#0c102a]/60 p-12 text-center text-slate-400 text-xs">
                No events match this day and venue selection.
              </div>
            ) : (
              filteredEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-purple-500/20 bg-[#0c102a]/80 p-5 transition hover:border-purple-400/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
                >
                  <div className="flex items-start gap-4">
                    {/* Time & Day badge */}
                    <div className="flex flex-col items-center justify-center rounded-xl border border-purple-500/30 bg-purple-950/40 px-3.5 py-2.5 text-center shrink-0 min-w-[90px]">
                      <span className="font-mono text-xs font-bold text-cyan-400 tabular-nums">
                        Day {ev.day}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-200">
                        {ev.time.split('-')[0].trim()}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="capitalize font-semibold text-cyan-400">{ev.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{ev.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>{ev.venue} ({ev.venueCode})</span>
                      </div>
                      <h3
                        onClick={() => onSelectEvent(ev)}
                        className="mt-1 text-base font-bold text-white hover:text-cyan-300 cursor-pointer"
                      >
                        {ev.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">
                        {ev.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => onSelectEvent(ev)}
                      className="rounded-lg border border-purple-500/30 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-purple-400 hover:text-white"
                    >
                      View Rules
                    </button>
                    <button
                      onClick={() => onRegisterEvent(ev)}
                      className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-1.5 text-xs font-bold text-white shadow-md glow-button hover:from-purple-500 hover:to-indigo-500"
                    >
                      Register
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {tab === 'venues' && (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {venues.map((venue) => (
            <div
              key={venue.code}
              className="flex flex-col justify-between rounded-2xl border border-purple-500/20 bg-[#0c102a]/80 p-5 shadow-lg backdrop-blur-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    {venue.code}
                  </span>
                  <span className="text-xs text-slate-400 font-mono tabular-nums">
                    Capacity: {venue.capacity}
                  </span>
                </div>

                <h3 className="mt-2 text-base font-bold text-white">
                  {venue.name}
                </h3>
                <div className="mt-1 text-xs text-slate-400">
                  {venue.building} · {venue.floor}
                </div>

                <div className="mt-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                    Technical Facilities
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                    {venue.facilities.map((fac, i) => (
                      <span key={i} className="rounded-md border border-white/5 bg-slate-900/60 px-2 py-0.5">
                        {fac}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-white/5 pt-3 text-xs text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Compass className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Entry: {venue.nearestGate}</span>
                </span>
                <button
                  onClick={() => {
                    setSelectedVenueCode(venue.code);
                    setTab('timeline');
                  }}
                  className="font-medium text-cyan-400 hover:underline"
                >
                  View Events →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
