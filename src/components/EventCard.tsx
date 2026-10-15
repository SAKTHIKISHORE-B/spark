import React from 'react';
import { Bookmark, Clock, MapPin, Users, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { EventItem } from '../types';

interface EventCardProps {
  event: EventItem;
  onSelect: (event: EventItem) => void;
  onRegister: (event: EventItem) => void;
  isBookmarked: boolean;
  onToggleBookmark: (eventId: string) => void;
  isRegistered?: boolean;
}

export function EventCard({
  event,
  onSelect,
  onRegister,
  isBookmarked,
  onToggleBookmark,
  isRegistered = false,
}: EventCardProps) {
  const isFull = event.registeredCount >= event.totalSlots;
  const spotsLeft = Math.max(0, event.totalSlots - event.registeredCount);

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#232c58] bg-[#0b102e]/90 backdrop-blur-md transition-all duration-300 hover:border-[#38bdf8]/70 hover:shadow-[0_0_30px_rgba(56,189,248,0.25)]">
      {/* Media Container with resilient zero-broken image fallback */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070b1e]">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLElement;
            target.style.display = 'none';
          }}
        />

        {/* Midnight space gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b102e] via-transparent to-transparent pointer-events-none" />

        {/* Fallback pattern underneath if image fails */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center bg-[#050816] text-[#38bdf8]">
          <span className="text-xs font-bold">{event.category.toUpperCase()}</span>
        </div>

        {/* Track Badge (Technical vs Non-Technical) */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md ${
              event.track === 'technical'
                ? 'border border-[#38bdf8]/60 bg-[#07132e]/90 text-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                : 'border border-[#c084fc]/60 bg-[#1e0e38]/90 text-[#c084fc] shadow-[0_0_12px_rgba(192,132,252,0.4)]'
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            <span>{event.track === 'technical' ? 'Technical' : 'Non-Technical'}</span>
          </span>
        </div>

        {/* Subtle bookmark action top right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(event.id);
          }}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark event'}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md transition ${
            isBookmarked
              ? 'bg-[#7c3aed] text-white shadow-sm font-bold'
              : 'bg-[#050816]/80 text-slate-300 hover:bg-[#0e163b] hover:text-white border border-[#273260]'
          }`}
        >
          <Bookmark className="h-4 w-4" fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>

        {/* Fee Indicator */}
        <div className="absolute bottom-3 left-3 rounded-full border border-[#273260] bg-[#070b1e]/90 px-3 py-1 text-xs font-bold text-[#7dd3fc] backdrop-blur-md">
          {event.fee === 0 ? 'Free Entry' : `₹${event.fee} / pass`}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5">
        {/* Metadata text with · separators */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
          <span className="font-semibold text-[#38bdf8] capitalize">{event.category}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-[#a78bfa] font-medium">Day {event.day}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="truncate max-w-[150px] text-slate-300">{event.department}</span>
        </div>

        {/* Pure White Bold Heading */}
        <h3
          onClick={() => onSelect(event)}
          className="mt-2 text-base font-bold text-white transition hover:text-[#38bdf8] sm:text-lg cursor-pointer line-clamp-2"
        >
          {event.title}
        </h3>

        {/* Tagline */}
        <p className="mt-1 text-xs text-slate-400 line-clamp-2">{event.tagline}</p>

        {/* Event Key Schedule & Venue Metadata */}
        <div className="mt-4 space-y-1.5 border-t border-[#1b2348] pt-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-[#38bdf8] shrink-0" />
            <span className="truncate">
              {event.date} · {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-[#a78bfa] shrink-0" />
            <span className="truncate">
              {event.venue} ({event.venueCode})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-[#38bdf8] shrink-0" />
            <span>
              {event.teamType === 'solo'
                ? 'Individual entry'
                : `Team of ${event.minTeamSize}-${event.maxTeamSize}`}
            </span>
          </div>
        </div>

        {/* Capacity / Slots Left Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Pass Capacity</span>
            <span className="font-mono text-xs font-bold text-[#38bdf8] tabular-nums">
              {spotsLeft === 0 ? 'Full' : `${spotsLeft} spots left`}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#070b1e]">
            <div
              className={`h-full transition-all duration-300 ${
                spotsLeft <= 5 ? 'bg-amber-400' : 'bg-gradient-to-r from-[#7c3aed] to-[#38bdf8]'
              }`}
              style={{
                width: `${Math.min(100, (event.registeredCount / event.totalSlots) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Prize Pool & Value */}
        <div className="mt-3 flex items-center justify-between border-t border-[#1b2348] pt-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Trophy className="h-3.5 w-3.5 text-[#facc15]" />
            <span className="text-slate-400">Prize Pool:</span>
            <span className="font-bold text-white">{event.prizePool}</span>
          </span>
          {event.certificate && (
            <span className="text-[11px] text-[#a78bfa]">Certificate Provided</span>
          )}
        </div>

        {/* Action Controls: Details & Purple Register Pill */}
        <div className="mt-5 flex items-center gap-2 pt-2">
          <button
            onClick={() => onSelect(event)}
            className="flex-1 rounded-full border border-[#273260] bg-[#0c1236] py-2 px-3 text-xs font-semibold text-slate-200 transition hover:border-[#38bdf8] hover:text-white text-center"
          >
            Details & Rules
          </button>

          {isRegistered ? (
            <button
              onClick={() => onSelect(event)}
              className="flex items-center justify-center gap-1.5 flex-1 rounded-full bg-[#182a4d] border border-[#38bdf8] py-2 px-3 text-xs font-bold text-[#38bdf8] transition hover:bg-[#203766]"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-[#38bdf8]" />
              <span>Pass Issued</span>
            </button>
          ) : isFull ? (
            <button
              disabled
              className="flex-1 cursor-not-allowed rounded-full bg-[#070b1e] border border-[#1b2348] py-2 px-3 text-xs font-semibold text-slate-500 text-center"
            >
              Registration Closed
            </button>
          ) : (
            <button
              onClick={() => onRegister(event)}
              className="flex items-center justify-center gap-1.5 flex-1 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] py-2 px-3 text-xs font-bold text-white shadow-md hover:from-[#8b5cf6] hover:to-[#7c3aed] hover:shadow-[0_0_20px_rgba(124,58,237,0.6)] transition cursor-pointer"
            >
              <span>Register</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
