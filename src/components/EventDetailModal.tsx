import React, { useState } from 'react';
import {
  X,
  Clock,
  MapPin,
  Users,
  Trophy,
  Award,
  Phone,
  Mail,
  Bookmark,
  Calendar,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { EventItem } from '../types';
import { downloadCalendarEvent } from '../utils/calendarExport';

interface EventDetailModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
  onRegister: (event: EventItem) => void;
  isBookmarked: boolean;
  onToggleBookmark: (eventId: string) => void;
  isRegistered: boolean;
  onViewPass?: () => void;
}

export function EventDetailModal({
  event,
  isOpen,
  onClose,
  onRegister,
  isBookmarked,
  onToggleBookmark,
  isRegistered,
  onViewPass,
}: EventDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'schedule' | 'coordinators' | 'faqs'>('overview');

  if (!isOpen || !event) return null;

  const isFull = event.registeredCount >= event.totalSlots;
  const spotsLeft = Math.max(0, event.totalSlots - event.registeredCount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#08080a]/85 p-4 backdrop-blur-md">
      {/* Dark Grey Modal Card */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-[#232838] bg-[#12141c] shadow-[0_0_50px_rgba(0,240,255,0.2)] text-slate-100">
        {/* Header Cover Banner */}
        <div className="relative h-48 w-full bg-[#0c0e14] sm:h-56">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover opacity-70"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-[#12141c]/50 to-transparent" />

          {/* Close & Bookmark Floating controls */}
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(event.id)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md transition ${
                isBookmarked
                  ? 'bg-[#00f0ff] text-[#08080a] font-bold'
                  : 'bg-[#08080a]/70 text-white hover:bg-[#161922]'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark event'}
            >
              <Bookmark className="h-4 w-4" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#08080a]/70 text-white backdrop-blur-md transition hover:bg-[#161922] hover:text-[#00f0ff]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Title & Metadata over Banner with Pure White Bold Heading */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00f0ff]">
              <span className="capitalize text-[#a5f3fc]">{event.category}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Day {event.day}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-300">{event.department}</span>
            </div>
            <h2 className="mt-1 text-xl font-black text-white sm:text-3xl drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Tab Controls Bar */}
        <div className="flex items-center border-b border-[#1f2433] bg-[#10121a] px-6">
          <div className="flex space-x-6 overflow-x-auto text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 border-b-2 transition whitespace-nowrap shrink-0 ${
                activeTab === 'overview'
                  ? 'border-[#00f0ff] text-[#00f0ff]'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Overview & Details
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`py-3.5 border-b-2 transition whitespace-nowrap shrink-0 ${
                activeTab === 'rules'
                  ? 'border-[#00f0ff] text-[#00f0ff]'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Rules & Guidelines
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`py-3.5 border-b-2 transition whitespace-nowrap shrink-0 ${
                activeTab === 'schedule'
                  ? 'border-[#00f0ff] text-[#00f0ff]'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Timeline / Rounds
            </button>
            <button
              onClick={() => setActiveTab('coordinators')}
              className={`py-3.5 border-b-2 transition whitespace-nowrap shrink-0 ${
                activeTab === 'coordinators'
                  ? 'border-[#00f0ff] text-[#00f0ff]'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Coordinators & Help
            </button>
            {event.faqs && event.faqs.length > 0 && (
              <button
                onClick={() => setActiveTab('faqs')}
                className={`py-3.5 border-b-2 transition whitespace-nowrap shrink-0 ${
                  activeTab === 'faqs'
                    ? 'border-[#00f0ff] text-[#00f0ff]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                FAQs
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="max-h-[50vh] overflow-y-auto px-6 py-6 text-sm">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#a5f3fc]">
                  Event Description
                </h4>
                <p className="mt-2 text-slate-300 leading-relaxed text-xs sm:text-sm">
                  {event.description}
                </p>
              </div>

              {/* High level specifications */}
              <div className="grid grid-cols-2 gap-4 rounded-xl border border-[#232838] bg-[#0c0e14] p-4 sm:grid-cols-4">
                <div>
                  <span className="text-[11px] text-slate-400">Date</span>
                  <div className="mt-0.5 text-xs font-bold text-white">{event.date}</div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400">Time</span>
                  <div className="mt-0.5 text-xs font-bold text-white">{event.time}</div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400">Venue</span>
                  <div className="mt-0.5 text-xs font-bold text-white">{event.venue}</div>
                  <div className="text-[10px] text-[#00f0ff] font-mono">{event.venueCode}</div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400">Team Size</span>
                  <div className="mt-0.5 text-xs font-bold text-white">
                    {event.teamType === 'solo'
                      ? 'Solo individual'
                      : `${event.minTeamSize}-${event.maxTeamSize} Members`}
                  </div>
                </div>
              </div>

              {/* Prize and Certification banner */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-[#00f0ff]/30 bg-[#0e1724] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00f0ff] text-[#08080a] font-black">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#a5f3fc]">Prize Pool</div>
                    <div className="text-lg font-black text-white">{event.prizePool}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-[#a5f3fc]">
                  <Award className="h-4 w-4 text-[#00f0ff]" />
                  <span>PixelPirates Merit Certificate for all participants</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#a5f3fc]">
                Official Rules & Guidelines
              </h4>
              <ul className="space-y-3">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00f0ff] text-xs font-black text-[#08080a]">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#a5f3fc]">
                Detailed Round Timeline
              </h4>
              <div className="relative border-l border-[#282f42] pl-4 space-y-5">
                {event.scheduleTimeline.map((slot, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[#12141c] bg-[#00f0ff]" />
                    <div className="font-mono text-xs font-bold text-[#00f0ff] tabular-nums">
                      {slot.time}
                    </div>
                    <div className="mt-0.5 text-xs sm:text-sm font-bold text-white">
                      {slot.activity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'coordinators' && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#a5f3fc]">
                Faculty & Student Leads
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {event.coordinators.map((coord, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#232838] bg-[#0c0e14] p-4"
                  >
                    <div className="font-bold text-white">{coord.name}</div>
                    <div className="text-xs text-[#a5f3fc]">{coord.role}</div>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                      <a
                        href={`tel:${coord.phone}`}
                        className="flex items-center gap-2 hover:text-[#00f0ff]"
                      >
                        <Phone className="h-3.5 w-3.5 text-[#00f0ff]" />
                        <span>{coord.phone}</span>
                      </a>
                      <a
                        href={`mailto:${coord.email}`}
                        className="flex items-center gap-2 hover:text-[#00f0ff]"
                      >
                        <Mail className="h-3.5 w-3.5 text-[#00f0ff]" />
                        <span>{coord.email}</span>
                      </a>
                    </div>
                  </div>
                ))}

                {/* General Helpdesk Card with 0000000XXX & xyz@gmail.com */}
                <div className="rounded-xl border border-[#00f0ff]/30 bg-[#0e1724] p-4">
                  <div className="font-bold text-white">Festival Central Helpdesk</div>
                  <div className="text-xs text-[#a5f3fc]">PixelPirates Inquiries</div>
                  <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-[#00f0ff]" />
                      <span className="font-mono text-[#00f0ff] font-bold">0000000XXX</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-[#00f0ff]" />
                      <span className="font-mono text-[#a5f3fc]">xyz@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#a5f3fc]">
                Frequently Asked Questions
              </h4>
              <div className="space-y-3">
                {event.faqs?.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#232838] bg-[#0c0e14] p-4"
                  >
                    <div className="text-xs font-bold text-white sm:text-sm">
                      {faq.question}
                    </div>
                    <div className="mt-1 text-xs text-slate-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Action Footer in Dark Grey */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#1f2433] bg-[#0e1017] px-6 py-4">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-[11px] text-slate-400">Entry Registration</div>
              <div className="text-sm font-bold text-white">
                {event.fee === 0 ? 'Free Entry' : `₹${event.fee} / pass`}
              </div>
            </div>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <div className="text-xs text-slate-400">
              <span className="font-bold text-[#00f0ff] font-mono tabular-nums">
                {spotsLeft}
              </span>{' '}
              spots left
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                downloadCalendarEvent({
                  title: event.title,
                  date: event.date,
                  time: event.time,
                  venue: event.venue,
                  description: event.description,
                })
              }
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[#262c3e] bg-[#141622] px-3 py-2 text-xs font-bold text-[#a5f3fc] transition hover:border-[#00f0ff] hover:text-white"
            >
              <Calendar className="h-3.5 w-3.5 text-[#00f0ff]" />
              <span>Calendar</span>
            </button>

            {isRegistered ? (
              <button
                onClick={() => {
                  onClose();
                  if (onViewPass) onViewPass();
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0e2424] border border-[#00f0ff] px-5 py-2 text-xs font-bold text-[#00f0ff] transition hover:bg-[#143232]"
              >
                <CheckCircle className="h-4 w-4" />
                <span>View Issued Pass</span>
              </button>
            ) : isFull ? (
              <button
                disabled
                className="cursor-not-allowed rounded-lg bg-[#141620] px-5 py-2 text-xs font-semibold text-slate-500"
              >
                Registration Closed
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onRegister(event);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-[#00f0ff] px-5 py-2 text-xs font-bold text-[#08080a] shadow-lg hover:bg-[#3bf4ff] hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition cursor-pointer"
              >
                <span>Register for Event</span>
                <ArrowRight className="h-4 w-4 stroke-[3]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
