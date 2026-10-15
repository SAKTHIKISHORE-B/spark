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
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-b from-[#0e1330]/90 to-[#080b1e]/90 backdrop-blur-md transition-all duration-300 hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]">
      {/* Media Container with resilient zero-broken image fallback */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
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

        {/* Dark cyber gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b1e] via-transparent to-transparent pointer-events-none" />

        {/* Fallback pattern underneath if image fails */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center bg-slate-950 text-cyan-400">
          <span className="text-xs font-semibold">{event.category.toUpperCase()}</span>
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
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-slate-950/70 text-slate-300 hover:bg-slate-900 hover:text-white border border-white/10'
          }`}
        >
          <Bookmark className="h-4 w-4" fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>

        {/* Fee Indicator */}
        <div className="absolute bottom-3 left-3 rounded-full border border-purple-400/40 bg-purple-950/80 px-3 py-1 text-xs font-semibold text-purple-200 backdrop-blur-md">
          {event.fee === 0 ? 'Free Entry' : `₹${event.fee} / registration`}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5">
        {/* Unboxed clean metadata text with · separators */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
          <span className="font-semibold text-cyan-400 capitalize">{event.category}</span>
          <span aria-hidden="true">·</span>
          <span>Day {event.day}</span>
          <span aria-hidden="true">·</span>
          <span className="truncate max-w-[150px]">{event.department}</span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(event)}
          className="mt-2 text-base font-bold text-white transition hover:text-cyan-300 sm:text-lg cursor-pointer line-clamp-2"
        >
          {event.title}
        </h3>

        {/* Tagline */}
        <p className="mt-1 text-xs text-slate-400 line-clamp-2">{event.tagline}</p>

        {/* Event Key Schedule & Venue Metadata */}
        <div className="mt-4 space-y-1.5 border-t border-white/5 pt-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">
              {event.date} · {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-purple-400 shrink-0" />
            <span className="truncate">
              {event.venue} ({event.venueCode})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-pink-400 shrink-0" />
            <span>
              {event.teamType === 'solo'
                ? 'Individual participation'
                : `Team of ${event.minTeamSize}-${event.maxTeamSize}`}
            </span>
          </div>
        </div>

        {/* Capacity / Slots Left Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Registration Capacity</span>
            <span className="font-mono text-xs font-medium text-cyan-300 tabular-nums">
              {spotsLeft === 0 ? 'Full' : `${spotsLeft} spots left`}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full transition-all duration-300 ${
                spotsLeft <= 5 ? 'bg-amber-400' : 'bg-gradient-to-r from-cyan-400 to-purple-500'
              }`}
              style={{
                width: `${Math.min(100, (event.registeredCount / event.totalSlots) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Prize Pool & Value */}
        <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            <span>Prize Pool:</span>
            <span className="font-semibold text-white">{event.prizePool}</span>
          </span>
          {event.certificate && (
            <span className="text-[11px] text-slate-400">Certificate Provided</span>
          )}
        </div>

        {/* Action Controls */}
        <div className="mt-5 flex items-center gap-2 pt-2">
          <button
            onClick={() => onSelect(event)}
            className="flex-1 rounded-lg border border-purple-500/30 py-2 px-3 text-xs font-semibold text-slate-300 transition hover:border-purple-400 hover:bg-purple-950/40 hover:text-white text-center"
          >
            Details & Rules
          </button>

          {isRegistered ? (
            <button
              onClick={() => onSelect(event)}
              className="flex items-center justify-center gap-1.5 flex-1 rounded-lg bg-emerald-700/80 border border-emerald-500 py-2 px-3 text-xs font-semibold text-white transition hover:bg-emerald-600"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
              <span>Pass Issued</span>
            </button>
          ) : isFull ? (
            <button
              disabled
              className="flex-1 cursor-not-allowed rounded-lg bg-slate-900 border border-slate-800 py-2 px-3 text-xs font-semibold text-slate-500 text-center"
            >
              Registration Closed
            </button>
          ) : (
            <button
              onClick={() => onRegister(event)}
              className="flex items-center justify-center gap-1.5 flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-2 px-3 text-xs font-bold text-white shadow-md glow-button hover:from-purple-500 hover:to-indigo-500 transition"
            >
              <span>Register</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
