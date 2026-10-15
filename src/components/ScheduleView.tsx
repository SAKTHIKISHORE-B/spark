import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Trophy, Building, Compass, ArrowRight, Phone, Mail } from 'lucide-react';
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-slate-100 bg-[#050816]">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#1b2348] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#38bdf8]">
            <span>NEXORA 2026 · Sona College of Technology Itinerary</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-[#a78bfa]">15 - 17 March 2026</span>
          </div>
          {/* Pure White Bold Heading */}
          <h2 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Event Schedule & Campus Venues
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Track multi-track schedules, round timings, and auditorium locations across 3 festival days at Sona.
          </p>
          <div className="mt-2 flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-[#38bdf8]" /> Helpline: <strong className="text-[#7dd3fc]">0000000XXX</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3 w-3 text-[#38bdf8]" /> <strong className="text-[#7dd3fc]">xyz@gmail.com</strong>
            </span>
          </div>
        </div>

        {/* View Switch: Timeline vs Venue Directory */}
        <div className="flex items-center gap-1 rounded-full border border-[#273260] bg-[#0c1236] p-1 text-xs">
          <button
            onClick={() => setTab('timeline')}
            className={`rounded-full px-4 py-1.5 font-bold transition ${
              tab === 'timeline'
                ? 'bg-[#7c3aed] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Day Timeline
          </button>
          <button
            onClick={() => setTab('venues')}
            className={`rounded-full px-4 py-1.5 font-bold transition ${
              tab === 'venues'
                ? 'bg-[#7c3aed] text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sona Hall Directory
          </button>
        </div>
      </div>

      {tab === 'timeline' && (
        <div className="mt-6">
          {/* Day & Venue Filter Bar in Midnight Navy Panel */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#232c58] bg-[#090d28] p-4 shadow-lg backdrop-blur-md">
            {/* Days Tabs */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 mr-1">Filter Day:</span>
              <button
                onClick={() => setActiveDay('all')}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                  activeDay === 'all'
                    ? 'bg-[#7c3aed] text-white shadow-sm'
                    : 'bg-[#0c1236] border border-[#273260] text-slate-300 hover:text-white'
                }`}
              >
                All 3 Days
              </button>
              <button
                onClick={() => setActiveDay(1)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                  activeDay === 1
                    ? 'bg-[#7c3aed] text-white shadow-sm'
                    : 'bg-[#0c1236] border border-[#273260] text-slate-300 hover:text-white'
                }`}
              >
                Day 1 (15 Mar)
              </button>
              <button
                onClick={() => setActiveDay(2)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                  activeDay === 2
                    ? 'bg-[#7c3aed] text-white shadow-sm'
                    : 'bg-[#0c1236] border border-[#273260] text-slate-300 hover:text-white'
                }`}
              >
                Day 2 (16 Mar)
              </button>
              <button
                onClick={() => setActiveDay(3)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                  activeDay === 3
                    ? 'bg-[#7c3aed] text-white shadow-sm'
                    : 'bg-[#0c1236] border border-[#273260] text-slate-300 hover:text-white'
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
                className="rounded-full border border-[#273260] bg-[#070b1e] px-3.5 py-1.5 text-xs text-slate-200 focus:border-[#38bdf8] focus:outline-none"
              >
                <option value="all">All Sona Campus Halls</option>
                {venues.map((v) => (
                  <option key={v.code} value={v.code}>
                    {v.name} ({v.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Timeline List in Midnight Navy Cards */}
          <div className="mt-8 space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="rounded-3xl border border-[#232c58] bg-[#090d28] p-12 text-center text-slate-400 text-xs">
                No events match this day and venue selection.
              </div>
            ) : (
              filteredEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-[#232c58] bg-[#090d28] p-5 transition hover:border-[#38bdf8]/60 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]"
                >
                  <div className="flex items-start gap-4">
                    {/* Time & Day badge */}
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#273260] bg-[#070b1e] px-3.5 py-2.5 text-center shrink-0 min-w-[95px]">
                      <span className="font-mono text-xs font-bold text-[#38bdf8] tabular-nums">
                        Day {ev.day}
                      </span>
                      <span className="text-[11px] font-semibold text-[#a78bfa]">
                        {ev.time.split('-')[0].trim()}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="capitalize font-semibold text-[#38bdf8]">{ev.category}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-[#a78bfa]">{ev.date}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-slate-300">{ev.venue} ({ev.venueCode})</span>
                      </div>
                      {/* Pure White Bold Heading */}
                      <h3
                        onClick={() => onSelectEvent(ev)}
                        className="mt-1 text-base font-bold text-white hover:text-[#38bdf8] cursor-pointer"
                      >
                        {ev.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">
                        {ev.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Actions: Details & Purple Register Pill */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => onSelectEvent(ev)}
                      className="rounded-full border border-[#273260] bg-[#0c1236] px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:border-[#38bdf8] hover:text-white"
                    >
                      View Rules
                    </button>
                    <button
                      onClick={() => onRegisterEvent(ev)}
                      className="rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] px-4 py-1.5 text-xs font-bold text-white shadow-md hover:from-[#8b5cf6] hover:to-[#7c3aed] hover:shadow-[0_0_15px_rgba(124,58,237,0.6)] cursor-pointer"
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
              className="flex flex-col justify-between rounded-3xl border border-[#232c58] bg-[#090d28] p-5 shadow-lg backdrop-blur-md hover:border-[#38bdf8]/50 transition"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#38bdf8]">
                    {venue.code}
                  </span>
                  <span className="text-xs text-[#a78bfa] font-mono tabular-nums">
                    Capacity: {venue.capacity}
                  </span>
                </div>

                {/* Pure White Bold Heading */}
                <h3 className="mt-2 text-base font-bold text-white">
                  {venue.name}
                </h3>
                <div className="mt-1 text-xs text-slate-400">
                  {venue.building} · {venue.floor} · Sona Campus
                </div>

                <div className="mt-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#38bdf8]">
                    Technical Facilities
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                    {venue.facilities.map((fac, i) => (
                      <span key={i} className="rounded-md border border-[#273260] bg-[#070b1e] px-2 py-0.5">
                        {fac}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 border-t border-[#1b2348] pt-3 text-xs text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Compass className="h-3.5 w-3.5 text-[#38bdf8]" />
                  <span>Entry: {venue.nearestGate}</span>
                </span>
                <button
                  onClick={() => {
                    setSelectedVenueCode(venue.code);
                    setTab('timeline');
                  }}
                  className="font-bold text-[#38bdf8] hover:underline"
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
