import React from 'react';
import { X, Bookmark, ArrowRight, Trash2, Clock, MapPin } from 'lucide-react';
import { EventItem } from '../types';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedEvents: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onRemoveBookmark: (eventId: string) => void;
  onRegisterEvent: (event: EventItem) => void;
}

export function BookmarksDrawer({
  isOpen,
  onClose,
  bookmarkedEvents,
  onSelectEvent,
  onRemoveBookmark,
  onRegisterEvent,
}: BookmarksDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-[#080b1e] border-l border-purple-500/30 text-slate-100 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-purple-500/20 px-6 py-4">
            <div className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-amber-400 fill-amber-400" />
              <h3 className="text-base font-bold text-white">
                Saved Competitions ({bookmarkedEvents.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {bookmarkedEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
                <Bookmark className="h-8 w-8 text-slate-600" />
                <span className="mt-2 text-sm font-semibold text-slate-200">
                  No saved events yet
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  Click the bookmark icon on any competition card to save it for quick access.
                </span>
              </div>
            ) : (
              bookmarkedEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-purple-500/20 bg-[#0c102a] p-4 shadow-md hover:border-purple-400/50 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                      {event.category} · Day {event.day}
                    </span>
                    <button
                      onClick={() => onRemoveBookmark(event.id)}
                      className="text-slate-400 hover:text-red-400 transition"
                      title="Remove from saved"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <h4
                    onClick={() => {
                      onClose();
                      onSelectEvent(event);
                    }}
                    className="mt-1 text-sm font-bold text-white hover:text-cyan-300 cursor-pointer line-clamp-2"
                  >
                    {event.title}
                  </h4>

                  <div className="mt-2 space-y-1 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span>{event.date} · {event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2.5">
                    <span className="text-xs font-semibold text-white">
                      {event.fee === 0 ? 'Free Entry' : `₹${event.fee}`}
                    </span>

                    <button
                      onClick={() => {
                        onClose();
                        onRegisterEvent(event);
                      }}
                      className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1 text-xs font-bold text-white shadow-sm glow-button hover:from-purple-500 hover:to-indigo-500"
                    >
                      <span>Register</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
