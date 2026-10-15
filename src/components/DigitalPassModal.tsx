import React, { useState } from 'react';
import { X, Printer, Calendar, Copy, Check, ShieldCheck, MapPin, Clock, Users, ArrowDownToLine } from 'lucide-react';
import { Registration } from '../types';
import { SvgQrCode, SvgBarcode } from '../utils/qrGenerator';
import { downloadCalendarEvent } from '../utils/calendarExport';

interface DigitalPassModalProps {
  registration: Registration;
  isOpen: boolean;
  onClose: () => void;
}

export function DigitalPassModal({
  registration,
  isOpen,
  onClose,
}: DigitalPassModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyTicketId = () => {
    navigator.clipboard.writeText(registration.ticketId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddToCalendar = () => {
    downloadCalendarEvent({
      title: registration.eventTitle,
      date: registration.eventDate,
      time: registration.eventTime,
      venue: `${registration.venue} (${registration.venueCode})`,
      description: `Official campus pass #${registration.ticketId} for ${registration.primaryContact.fullName}`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl">
        {/* Top Control Bar (Hidden during print) */}
        <div className="no-print flex items-center justify-between border-b border-slate-200 px-6 py-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Verified Digital E-Pass
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCalendar}
              title="Add to Calendar (.ics)"
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Add to Calendar</span>
            </button>

            <button
              onClick={handlePrint}
              title="Print Pass / Save PDF"
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Pass Container */}
        <div className="p-6">
          <div className="print-ticket-container overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
            {/* Ticket Header Banner */}
            <div className="border-b border-slate-200 bg-slate-900 px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                    <span>SYNAPSE &apos;26 INTER-COLLEGE FEST</span>
                    <span aria-hidden="true" className="text-slate-500">·</span>
                    <span>OFFICIAL DELEGATE</span>
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-white sm:text-xl">
                    {registration.eventTitle}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-[11px] font-medium text-slate-400">TICKET PASS NO.</div>
                  <button
                    onClick={handleCopyTicketId}
                    className="no-print mt-0.5 inline-flex items-center gap-1 font-mono text-sm font-bold text-amber-300 hover:text-amber-200"
                    title="Click to copy ticket ID"
                  >
                    <span>{registration.ticketId}</span>
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <span className="print-only font-mono text-sm font-bold text-amber-300">
                    {registration.ticketId}
                  </span>
                </div>
              </div>
            </div>

            {/* Ticket Body: Two-zone perforated card aesthetic */}
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                {/* Left zone: Participant & Event Logistics */}
                <div className="space-y-4 md:col-span-8">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Primary Delegate
                    </div>
                    <div className="mt-0.5 text-base font-bold text-slate-900">
                      {registration.primaryContact.fullName}
                    </div>
                    <div className="text-xs text-slate-600">
                      Roll No: {registration.primaryContact.rollNumber} · {registration.primaryContact.year}
                    </div>
                    <div className="text-xs text-slate-500">
                      {registration.primaryContact.college}
                    </div>
                  </div>

                  {registration.participantType === 'team' && registration.teamName && (
                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Team: {registration.teamName}
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-2 text-xs text-slate-700">
                        {registration.teamMembers?.map((m, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 font-medium text-slate-800"
                          >
                            <span>{m.name}</span>
                            <span className="text-slate-400">({m.rollNumber})</span>
                            {i < (registration.teamMembers?.length || 0) - 1 && (
                              <span className="text-slate-300">·</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-3 text-xs">
                    <div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>Date & Time</span>
                      </div>
                      <div className="mt-1 font-semibold text-slate-900">
                        {registration.eventDate}
                      </div>
                      <div className="text-slate-600">{registration.eventTime}</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span>Venue Location</span>
                      </div>
                      <div className="mt-1 font-semibold text-slate-900">
                        {registration.venue}
                      </div>
                      <div className="text-slate-600 font-mono text-[11px]">
                        Hall: {registration.venueCode}
                      </div>
                    </div>
                  </div>

                  {/* Security check status */}
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                    <span className="text-slate-500">Check-in Status</span>
                    {registration.checkedIn ? (
                      <span className="font-semibold text-emerald-700">
                        ✓ Verified & Checked In ({new Date(registration.checkedInAt || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                      </span>
                    ) : (
                      <span className="font-medium text-blue-700">
                        Ready for Entry Scan at Gate
                      </span>
                    )}
                  </div>
                </div>

                {/* Right zone: QR Code and Gate Security */}
                <div className="flex flex-col items-center justify-center border-t border-slate-200 pt-4 md:border-t-0 md:border-l md:pl-6 md:pt-0 md:col-span-4">
                  <div className="rounded-xl border border-slate-200 p-2 shadow-xs bg-white">
                    <SvgQrCode value={`CAMPUS-PASS:${registration.ticketId}:${registration.eventId}`} size={130} />
                  </div>
                  <span className="mt-2 text-[10px] text-center font-medium text-slate-500 uppercase tracking-wider">
                    Scan for Admission
                  </span>
                  <span className="mt-0.5 font-mono text-[10px] text-slate-400">
                    ID: {registration.ticketId}
                  </span>
                </div>
              </div>

              {/* Bottom decorative barcode */}
              <div className="mt-6 border-t border-dashed border-slate-200 pt-4">
                <SvgBarcode value={registration.ticketId} height={32} />
              </div>
            </div>
          </div>

          <p className="no-print mt-4 text-center text-xs text-slate-500">
            Please present this digital pass or physical printout alongside your valid college ID card at the entry gate.
          </p>
        </div>
      </div>
    </div>
  );
}
