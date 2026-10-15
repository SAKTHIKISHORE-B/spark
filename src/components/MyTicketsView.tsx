import React, { useState } from 'react';
import { Ticket, Calendar, MapPin, QrCode, Trash2, Printer, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { Registration } from '../types';
import { SvgQrCode } from '../utils/qrGenerator';
import { downloadCalendarEvent } from '../utils/calendarExport';

interface MyTicketsViewProps {
  registrations: Registration[];
  onSelectRegistration: (reg: Registration) => void;
  onCancelRegistration: (ticketId: string) => void;
  onBrowseEvents: () => void;
}

export function MyTicketsView({
  registrations,
  onSelectRegistration,
  onCancelRegistration,
  onBrowseEvents,
}: MyTicketsViewProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'cancelled'>('confirmed');
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  const filtered = registrations.filter((r) => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-slate-100">
      {/* Title & Filter Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-purple-900/30 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <span>NEXORA 2026 Student Delegate Wallet</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Digital Passes</span>
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            My Event Passes & Credentials
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Access your admission QR codes, event schedules, and hall details. Keep your passes handy at security gates.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 rounded-xl border border-purple-500/30 bg-[#0c102a] p-1 text-xs">
          <button
            onClick={() => setFilterStatus('confirmed')}
            className={`rounded-lg px-3 py-1.5 font-semibold transition ${
              filterStatus === 'confirmed'
                ? 'bg-purple-600 text-white shadow-md glow-button'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Active Passes ({registrations.filter((r) => r.status === 'confirmed').length})
          </button>
          <button
            onClick={() => setFilterStatus('all')}
            className={`rounded-lg px-3 py-1.5 font-semibold transition ${
              filterStatus === 'all'
                ? 'bg-purple-600 text-white shadow-md glow-button'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All History
          </button>
        </div>
      </div>

      {/* Ticket List or Empty State */}
      {filtered.length === 0 ? (
        <div className="my-16 flex flex-col items-center justify-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-950/40 text-purple-400">
            <Ticket className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-base font-bold text-white">
            No active passes found
          </h3>
          <p className="mt-1 max-w-sm text-xs text-slate-400">
            You haven&apos;t registered for any events yet. Explore upcoming hackathons, battle of bands, and workshops.
          </p>
          <button
            onClick={onBrowseEvents}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md glow-button hover:from-purple-500 hover:to-indigo-500"
          >
            <span>Explore Campus Events</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filtered.map((reg) => (
            <div
              key={reg.ticketId}
              className={`overflow-hidden rounded-2xl border transition ${
                reg.status === 'cancelled'
                  ? 'border-white/10 bg-slate-900/40 opacity-60'
                  : 'border-purple-500/30 bg-[#0c102a]/90 hover:border-purple-400/60 hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]'
              }`}
            >
              {/* Card Banner */}
              <div className="flex items-center justify-between border-b border-purple-500/20 bg-slate-950/80 px-5 py-3 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <span className="capitalize font-semibold text-cyan-400">{reg.eventCategory}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="font-mono text-amber-300 tabular-nums">
                    {reg.ticketId}
                  </span>
                </div>

                <div className="text-xs">
                  {reg.checkedIn ? (
                    <span className="font-semibold text-emerald-400">
                      ✓ Checked In
                    </span>
                  ) : reg.status === 'cancelled' ? (
                    <span className="text-red-400">Cancelled</span>
                  ) : (
                    <span className="text-cyan-300 font-medium">Valid Pass</span>
                  )}
                </div>
              </div>

              {/* Card Content Split */}
              <div className="flex flex-col sm:flex-row p-5 gap-5">
                {/* Left: Info */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white sm:text-lg">
                      {reg.eventTitle}
                    </h3>
                    <div className="mt-1 text-xs text-slate-400">
                      Delegate: <span className="font-medium text-slate-200">{reg.primaryContact.fullName}</span> ({reg.primaryContact.rollNumber})
                    </div>
                  </div>

                  {reg.teamName && (
                    <div className="text-xs text-slate-300">
                      Team: <span className="font-semibold text-cyan-300">{reg.teamName}</span> ({reg.teamMembers?.length || 1} members)
                    </div>
                  )}

                  <div className="space-y-1 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span>{reg.eventDate} · {reg.eventTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-purple-400 shrink-0" />
                      <span>{reg.venue} ({reg.venueCode})</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      onClick={() => onSelectRegistration(reg)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm glow-button hover:from-purple-500 hover:to-indigo-500"
                    >
                      <QrCode className="h-3.5 w-3.5" />
                      <span>View Pass</span>
                    </button>

                    <button
                      onClick={() =>
                        downloadCalendarEvent({
                          title: reg.eventTitle,
                          date: reg.eventDate,
                          time: reg.eventTime,
                          venue: reg.venue,
                        })
                      }
                      title="Add to Calendar (.ics)"
                      className="inline-flex items-center gap-1 rounded-lg border border-purple-500/30 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5"
                    >
                      <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                      <span>iCal</span>
                    </button>

                    {reg.status === 'confirmed' && !reg.checkedIn && (
                      <button
                        onClick={() => setConfirmCancelId(reg.ticketId)}
                        title="Cancel Registration"
                        className="inline-flex items-center gap-1 rounded-lg border border-red-500/30 px-2.5 py-1.5 text-xs font-medium text-red-400 hover:bg-red-950/40"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Right: Quick QR Thumbnail */}
                <div
                  onClick={() => onSelectRegistration(reg)}
                  className="flex flex-col items-center justify-center rounded-xl border border-purple-500/30 bg-[#080b1e] p-3 cursor-pointer hover:border-cyan-400 transition shrink-0"
                >
                  <SvgQrCode value={`CAMPUS-PASS:${reg.ticketId}:${reg.eventId}`} size={90} />
                  <span className="mt-1 font-mono text-[10px] text-amber-400 tabular-nums font-bold">
                    {reg.ticketId}
                  </span>
                  <span className="text-[10px] text-cyan-400 font-medium">Click to enlarge</span>
                </div>
              </div>

              {/* Cancel confirmation drawer */}
              {confirmCancelId === reg.ticketId && (
                <div className="border-t border-red-500/30 bg-red-950/30 p-4 text-xs text-red-200">
                  <div className="font-semibold">Cancel this registration?</div>
                  <p className="mt-0.5 text-red-300">
                    Your reserved slot will be released back to other students. This action cannot be undone.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => {
                        onCancelRegistration(reg.ticketId);
                        setConfirmCancelId(null);
                      }}
                      className="rounded-md bg-red-600 px-3 py-1 font-semibold text-white hover:bg-red-700"
                    >
                      Confirm Cancellation
                    </button>
                    <button
                      onClick={() => setConfirmCancelId(null)}
                      className="rounded-md border border-white/20 bg-slate-900 px-3 py-1 font-semibold text-slate-300 hover:bg-slate-800"
                    >
                      Keep Pass
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
