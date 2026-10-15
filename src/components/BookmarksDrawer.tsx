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
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#08080a]/80 backdrop-blur-md">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-[#10121a] border-l border-[#232838] text-slate-100 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#1f2433] px-6 py-4">
            <div className="flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-[#00f0ff] fill-[#00f0ff]" />
              <h3 className="text-base font-black text-white">
                Saved Competitions ({bookmarkedEvents.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-[#00f0ff] transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {bookmarkedEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400">
                <Bookmark className="h-8 w-8 text-slate-600" />
                <span className="mt-2 text-sm font-bold text-white">
                  No saved competitions yet
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  Click the bookmark icon on any card to save it for instant access.
                </span>
              </div>
            ) : (
              bookmarkedEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-[#232838] bg-[#141620] p-4 shadow-md hover:border-[#00f0ff]/50 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#a5f3fc]">
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
                    className="mt-1 text-sm font-bold text-white hover:text-[#00f0ff] cursor-pointer line-clamp-2"
                  >
                    {event.title}
                  </h4>

                  <div className="mt-2 space-y-1 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[#00f0ff] shrink-0" />
                      <span>{event.date} · {event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#a5f3fc] shrink-0" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-[#1f2433] pt-2.5">
                    <span className="text-xs font-bold text-white">
                      {event.fee === 0 ? 'Free Entry' : `₹${event.fee}`}
                    </span>

                    <button
                      onClick={() => {
                        onClose();
                        onRegisterEvent(event);
                      }}
                      className="inline-flex items-center gap-1 rounded-md bg-[#00f0ff] px-3 py-1 text-xs font-bold text-[#08080a] shadow-sm hover:bg-[#3bf4ff] transition"
                    >
                      <span>Register</span>
                      <ArrowRight className="h-3 w-3 stroke-[3]" />
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
