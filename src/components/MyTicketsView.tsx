import React, { useState } from 'react';
import { Ticket, Calendar, MapPin, QrCode, Trash2, ArrowRight } from 'lucide-react';
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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-slate-100 bg-[#050816]">
      {/* Title & Filter Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#1b2348] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#38bdf8]">
            <span>NEXORA 2026 · Sona College of Technology</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-[#a78bfa]">Digital Pass Wallet</span>
          </div>
          {/* Pure White Bold Heading */}
          <h2 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
            My Event Passes & Credentials
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Access admission QR codes, event venues, and gate barcodes. Helpline: 0000000XXX | xyz@gmail.com
          </p>
        </div>

        {/* Filter buttons in Midnight Navy */}
        <div className="flex items-center gap-1 rounded-full border border-[#273260] bg-[#0c1236] p-1 text-xs">
          <button
            onClick={() => setFilterStatus('confirmed')}
            className={`rounded-full px-3.5 py-1.5 font-bold transition ${
              filterStatus === 'confirmed'
                ? 'bg-[#7c3aed] text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Active Passes ({registrations.filter((r) => r.status === 'confirmed').length})
          </button>
          <button
            onClick={() => setFilterStatus('all')}
            className={`rounded-full px-3.5 py-1.5 font-bold transition ${
              filterStatus === 'all'
                ? 'bg-[#7c3aed] text-white shadow'
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
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#232c58] bg-[#090d28] text-[#38bdf8]">
            <Ticket className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-base font-bold text-white">
            No active passes found
          </h3>
          <p className="mt-1 max-w-sm text-xs text-slate-400">
            You haven&apos;t registered for any competitions yet. Explore upcoming hackathons, workshops, and esports at Sona.
          </p>
          <button
            onClick={onBrowseEvents}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:from-[#8b5cf6] hover:to-[#7c3aed] transition cursor-pointer"
          >
            <span>Explore Campus Events</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filtered.map((reg) => (
            <div
              key={reg.ticketId}
              className={`overflow-hidden rounded-3xl border transition ${
                reg.status === 'cancelled'
                  ? 'border-white/10 bg-[#090d28]/50 opacity-60'
                  : 'border-[#232c58] bg-[#090d28] hover:border-[#38bdf8]/60 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]'
              }`}
            >
              {/* Card Banner */}
              <div className="flex items-center justify-between border-b border-[#1b2348] bg-[#070b1e] px-5 py-3 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                  <span className="capitalize font-bold text-[#38bdf8]">{reg.eventCategory}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="font-mono text-[#a78bfa] font-bold tabular-nums">
                    {reg.ticketId}
                  </span>
                </div>

                <div className="text-xs">
                  {reg.checkedIn ? (
                    <span className="font-bold text-emerald-400">
                      ✓ Checked In
                    </span>
                  ) : reg.status === 'cancelled' ? (
                    <span className="text-red-400 font-bold">Cancelled</span>
                  ) : (
                    <span className="text-[#38bdf8] font-bold">Valid Pass</span>
                  )}
                </div>
              </div>

              {/* Card Content Split */}
              <div className="flex flex-col sm:flex-row p-5 gap-5">
                {/* Left: Info */}
                <div className="flex-1 space-y-3">
                  <div>
                    {/* Pure White Bold Heading */}
                    <h3 className="text-base font-black text-white sm:text-lg">
                      {reg.eventTitle}
                    </h3>
                    <div className="mt-1 text-xs text-slate-400">
                      Delegate: <span className="font-bold text-white">{reg.primaryContact.fullName}</span> ({reg.primaryContact.rollNumber})
                    </div>
                  </div>

                  {reg.teamName && (
                    <div className="text-xs text-slate-300">
                      Team: <span className="font-bold text-[#a78bfa]">{reg.teamName}</span> ({reg.teamMembers?.length || 1} members)
                    </div>
                  )}

                  <div className="space-y-1 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-[#38bdf8] shrink-0" />
                      <span>{reg.eventDate} · {reg.eventTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-[#a78bfa] shrink-0" />
                      <span>{reg.venue} ({reg.venueCode})</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      onClick={() => onSelectRegistration(reg)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:from-[#8b5cf6] hover:to-[#7c3aed] transition"
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
                      className="inline-flex items-center gap-1 rounded-full border border-[#273260] bg-[#0c1236] px-3 py-1.5 text-xs font-bold text-[#7dd3fc] hover:text-white"
                    >
                      <Calendar className="h-3.5 w-3.5 text-[#38bdf8]" />
                      <span>iCal</span>
                    </button>

                    {reg.status === 'confirmed' && !reg.checkedIn && (
                      <button
                        onClick={() => setConfirmCancelId(reg.ticketId)}
                        title="Cancel Registration"
                        className="inline-flex items-center gap-1 rounded-full border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-400 hover:bg-red-950/40"
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
                  className="flex flex-col items-center justify-center rounded-2xl border border-[#232c58] bg-[#070b1e] p-3 cursor-pointer hover:border-[#38bdf8] transition shrink-0"
                >
                  <SvgQrCode value={`NEXORA-PASS:${reg.ticketId}:${reg.eventId}`} size={90} />
                  <span className="mt-1 font-mono text-[10px] text-[#38bdf8] tabular-nums font-bold">
                    {reg.ticketId}
                  </span>
                  <span className="text-[10px] text-[#a78bfa] font-medium">Click to enlarge</span>
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
                      className="rounded-full bg-red-600 px-4 py-1 font-semibold text-white hover:bg-red-700"
                    >
                      Confirm Cancellation
                    </button>
                    <button
                      onClick={() => setConfirmCancelId(null)}
                      className="rounded-full border border-white/20 bg-slate-900 px-4 py-1 font-semibold text-slate-300 hover:bg-slate-800"
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
