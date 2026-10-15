import React, { useState } from 'react';
import { X, Printer, Calendar, Copy, Check, MapPin, Clock, Phone, Mail } from 'lucide-react';
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
      description: `Official campus pass #${registration.ticketId} for ${registration.primaryContact.fullName}. NEXORA 2026 at Sona College of Technology. Hotline: 0000000XXX | xyz@gmail.com`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#050816]/85 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-3xl border border-[#232c58] bg-[#090d28] shadow-[0_0_60px_rgba(124,58,237,0.35)]">
        {/* Top Control Bar (Hidden during print) */}
        <div className="no-print flex items-center justify-between border-b border-[#1b2348] px-6 py-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#38bdf8] animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              NEXORA Verified Digital Pass · Sona College
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCalendar}
              title="Add to Calendar (.ics)"
              className="flex items-center gap-1.5 rounded-full border border-[#273260] bg-[#0c1236] px-3.5 py-1.5 text-xs font-bold text-[#7dd3fc] transition hover:border-[#38bdf8] hover:text-white"
            >
              <Calendar className="h-3.5 w-3.5 text-[#38bdf8]" />
              <span className="hidden sm:inline">Add to Calendar</span>
            </button>

            <button
              onClick={handlePrint}
              title="Print Pass / Save PDF"
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] px-4 py-1.5 text-xs font-bold text-white shadow transition hover:from-[#8b5cf6] hover:to-[#7c3aed]"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-[#121a44] hover:text-[#38bdf8]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Ticket Pass Container */}
        <div className="p-6">
          <div className="print-ticket-container overflow-hidden rounded-2xl border border-[#232c58] bg-[#070b1e] shadow-sm text-slate-100">
            {/* Ticket Header Banner */}
            <div className="border-b border-[#1b2348] bg-[#050816] px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#38bdf8]">
                    <span>NEXORA &apos;26 · SONA COLLEGE OF TECHNOLOGY</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-[#a78bfa]">OFFICIAL DELEGATE</span>
                  </div>
                  {/* Pure White Bold Heading */}
                  <h3 className="mt-1 text-lg font-black text-white sm:text-xl">
                    {registration.eventTitle}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">TICKET PASS NO.</div>
                  <button
                    onClick={handleCopyTicketId}
                    className="no-print mt-0.5 inline-flex items-center gap-1 font-mono text-sm font-black text-[#38bdf8] hover:underline"
                    title="Click to copy ticket ID"
                  >
                    <span>{registration.ticketId}</span>
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <span className="print-only font-mono text-sm font-black text-[#38bdf8]">
                    {registration.ticketId}
                  </span>
                </div>
              </div>
            </div>

            {/* Ticket Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                {/* Left zone: Participant & Event Logistics */}
                <div className="space-y-4 md:col-span-8">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#a78bfa]">
                      Primary Delegate
                    </div>
                    <div className="mt-0.5 text-base font-black text-white">
                      {registration.primaryContact.fullName}
                    </div>
                    <div className="text-xs text-slate-300">
                      Roll No: {registration.primaryContact.rollNumber} · {registration.primaryContact.year}
                    </div>
                    <div className="text-xs text-slate-400">
                      {registration.primaryContact.college}
                    </div>
                  </div>

                  {registration.participantType === 'team' && registration.teamName && (
                    <div className="rounded-xl border border-[#232c58] bg-[#090d28] p-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#38bdf8]">
                        Team: {registration.teamName}
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-2 text-xs text-slate-200">
                        {registration.teamMembers?.map((m, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 font-medium text-white"
                          >
                            <span>{m.name}</span>
                            <span className="text-[#a78bfa]">({m.rollNumber})</span>
                            {i < (registration.teamMembers?.length || 0) - 1 && (
                              <span className="text-slate-500">·</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 border-t border-[#1b2348] pt-3 text-xs">
                    <div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="h-3.5 w-3.5 text-[#38bdf8]" />
                        <span>Date & Time</span>
                      </div>
                      <div className="mt-1 font-bold text-white">
                        {registration.eventDate}
                      </div>
                      <div className="text-[#7dd3fc]">{registration.eventTime}</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="h-3.5 w-3.5 text-[#38bdf8]" />
                        <span>Venue Location</span>
                      </div>
                      <div className="mt-1 font-bold text-white">
                        {registration.venue}
                      </div>
                      <div className="text-[#a78bfa] font-mono text-[11px]">
                        Hall: {registration.venueCode} · Sona Campus
                      </div>
                    </div>
                  </div>

                  {/* Security check status */}
                  <div className="flex items-center justify-between border-t border-[#1b2348] pt-3 text-xs">
                    <span className="text-slate-400">Check-in Status</span>
                    {registration.checkedIn ? (
                      <span className="font-bold text-emerald-400">
                        ✓ Verified & Admitted ({new Date(registration.checkedInAt || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                      </span>
                    ) : (
                      <span className="font-bold text-[#38bdf8]">
                        Ready for Entry Scan at Gate
                      </span>
                    )}
                  </div>
                </div>

                {/* Right zone: QR Code and Gate Security */}
                <div className="flex flex-col items-center justify-center border-t border-[#1b2348] pt-4 md:border-t-0 md:border-l md:border-[#1b2348] md:pl-6 md:pt-0 md:col-span-4">
                  <div className="rounded-xl border border-white/20 p-2 shadow-xs bg-white">
                    <SvgQrCode value={`NEXORA-PASS:${registration.ticketId}:${registration.eventId}`} size={130} />
                  </div>
                  <span className="mt-2 text-[10px] text-center font-bold text-[#38bdf8] uppercase tracking-wider">
                    Scan for Gate Entry
                  </span>
                  <span className="mt-0.5 font-mono text-[10px] text-slate-400">
                    ID: {registration.ticketId}
                  </span>
                </div>
              </div>

              {/* Bottom decorative barcode */}
              <div className="mt-6 border-t border-dashed border-[#232c58] pt-4 flex flex-col items-center">
                <SvgBarcode value={registration.ticketId} height={32} />
              </div>
            </div>
          </div>

          {/* Hotline & support footnote */}
          <div className="no-print mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <span>Present this pass with Sona College of Technology student ID card.</span>
            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="text-[#7dd3fc] flex items-center gap-1">
                <Phone className="h-3 w-3 text-[#38bdf8]" /> 0000000XXX
              </span>
              <span className="text-[#7dd3fc] flex items-center gap-1">
                <Mail className="h-3 w-3 text-[#38bdf8]" /> xyz@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
