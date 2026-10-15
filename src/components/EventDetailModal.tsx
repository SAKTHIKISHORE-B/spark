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
  HelpCircle,
  AlertCircle,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header Cover Banner */}
        <div className="relative h-48 w-full bg-slate-900 sm:h-56">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover opacity-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Close & Bookmark Floating controls */}
          <div className="absolute right-4 top-4 flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(event.id)}
              className={`flex h-8 w-8 items-center justify-center rounded-lg backdrop-blur-md transition ${
                isBookmarked
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-900/60 text-white hover:bg-slate-900/90'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark event'}
            >
              <Bookmark className="h-4 w-4" fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900/60 text-white backdrop-blur-md transition hover:bg-slate-900/90"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Title & Metadata over Banner */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300">
              <span className="capitalize">{event.category}</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Day {event.day}</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>{event.department}</span>
            </div>
            <h2 className="mt-1 text-xl font-extrabold sm:text-2xl text-white">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Tab Controls Bar */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50/80 px-6">
          <div className="flex space-x-6 overflow-x-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 border-b-2 transition whitespace-nowrap shrink-0 ${
                activeTab === 'overview'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Overview & Key Info
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`py-3.5 border-b-2 transition whitespace-nowrap shrink-0 ${
                activeTab === 'rules'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Rules & Guidelines
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`py-3.5 border-b-2 transition whitespace-nowrap shrink-0 ${
                activeTab === 'schedule'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Timeline / Rounds
            </button>
            <button
              onClick={() => setActiveTab('coordinators')}
              className={`py-3.5 border-b-2 transition whitespace-nowrap shrink-0 ${
                activeTab === 'coordinators'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Coordinators
            </button>
            {event.faqs && event.faqs.length > 0 && (
              <button
                onClick={() => setActiveTab('faqs')}
                className={`py-3.5 border-b-2 transition whitespace-nowrap shrink-0 ${
                  activeTab === 'faqs'
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
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
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Description
                </h4>
                <p className="mt-2 text-slate-700 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* High level specifications */}
              <div className="grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4 sm:grid-cols-4">
                <div>
                  <span className="text-xs text-slate-500">Date</span>
                  <div className="mt-0.5 text-xs font-semibold text-slate-900">{event.date}</div>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Time</span>
                  <div className="mt-0.5 text-xs font-semibold text-slate-900">{event.time}</div>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Venue</span>
                  <div className="mt-0.5 text-xs font-semibold text-slate-900">{event.venue}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{event.venueCode}</div>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Team Size</span>
                  <div className="mt-0.5 text-xs font-semibold text-slate-900">
                    {event.teamType === 'solo'
                      ? 'Solo individual'
                      : `${event.minTeamSize}-${event.maxTeamSize} Members`}
                  </div>
                </div>
              </div>

              {/* Prize and Certification banner */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500 text-white">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-amber-800">Prize Pool</div>
                    <div className="text-lg font-bold text-amber-950">{event.prizePool}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-amber-900">
                  <Award className="h-4 w-4 text-amber-600" />
                  <span>Verified Inter-Collegiate Certificate for all participants</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Official Rules & Regulations
              </h4>
              <ul className="space-y-3">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
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
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Detailed Round Timeline
              </h4>
              <div className="relative border-l border-slate-200 pl-4 space-y-5">
                {event.scheduleTimeline.map((slot, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-slate-900" />
                    <div className="font-mono text-xs font-semibold text-blue-700 tabular-nums">
                      {slot.time}
                    </div>
                    <div className="mt-0.5 text-xs sm:text-sm font-medium text-slate-800">
                      {slot.activity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'coordinators' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Faculty & Student Leads
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {event.coordinators.map((coord, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50/80"
                  >
                    <div className="font-bold text-slate-900">{coord.name}</div>
                    <div className="text-xs text-slate-500">{coord.role}</div>

                    <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                      <a
                        href={`tel:${coord.phone}`}
                        className="flex items-center gap-2 hover:text-blue-700"
                      >
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        <span>{coord.phone}</span>
                      </a>
                      <a
                        href={`mailto:${coord.email}`}
                        className="flex items-center gap-2 hover:text-blue-700"
                      >
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        <span>{coord.email}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Frequently Asked Questions
              </h4>
              <div className="space-y-3">
                {event.faqs?.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 p-4 bg-slate-50/50"
                  >
                    <div className="text-xs font-bold text-slate-900 sm:text-sm">
                      {faq.question}
                    </div>
                    <div className="mt-1 text-xs text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-[11px] text-slate-500">Entry Registration</div>
              <div className="text-sm font-bold text-slate-900">
                {event.fee === 0 ? 'Free Entry' : `₹${event.fee} / registration`}
              </div>
            </div>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <div className="text-xs text-slate-600">
              <span className="font-semibold text-slate-900 font-mono tabular-nums">
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
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Calendar</span>
            </button>

            {isRegistered ? (
              <button
                onClick={() => {
                  onClose();
                  if (onViewPass) onViewPass();
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-800"
              >
                <CheckCircle className="h-4 w-4" />
                <span>View Issued Pass</span>
              </button>
            ) : isFull ? (
              <button
                disabled
                className="cursor-not-allowed rounded-lg bg-slate-100 px-5 py-2 text-xs font-semibold text-slate-400"
              >
                Registration Closed
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onRegister(event);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                <span>Register for Event</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
