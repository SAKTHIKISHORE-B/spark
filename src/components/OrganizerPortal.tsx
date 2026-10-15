import React, { useState } from 'react';
import {
  Download,
  Search,
  CheckCircle2,
  XCircle,
  Plus,
  QrCode,
  Users,
  DollarSign,
  Ticket,
  Calendar,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail,
} from 'lucide-react';
import { EventItem, Registration, VenueItem, EventCategory } from '../types';
import { exportRegistrationsToCSV } from '../utils/csvExport';

interface OrganizerPortalProps {
  events: EventItem[];
  registrations: Registration[];
  venues: VenueItem[];
  onCheckInTicket: (ticketId: string) => { success: boolean; message: string; reg?: Registration };
  onCreateEvent: (newEvent: EventItem) => void;
}

export function OrganizerPortal({
  events,
  registrations,
  venues,
  onCheckInTicket,
  onCreateEvent,
}: OrganizerPortalProps) {
  const [activeTab, setActiveTab] = useState<'attendees' | 'checkin' | 'events'>('attendees');

  // Search & filter for attendee table
  const [searchAttendee, setSearchAttendee] = useState('');
  const [selectedEventFilter, setSelectedEventFilter] = useState('all');
  const [checkInStatusFilter, setCheckInStatusFilter] = useState<'all' | 'checked' | 'pending'>('all');

  // Manual QR Check-in Terminal states
  const [ticketInput, setTicketInput] = useState('');
  const [checkInFeedback, setCheckInFeedback] = useState<{
    success: boolean;
    message: string;
    reg?: Registration;
  } | null>(null);

  // Create event modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newCategory, setNewCategory] = useState<EventCategory>('technical');
  const [newDepartment, setNewDepartment] = useState('Department of Computer Science & Eng.');
  const [newDate, setNewDate] = useState('16 Mar 2026');
  const [newTime, setNewTime] = useState('10:00 AM - 01:00 PM');
  const [newDay, setNewDay] = useState<1 | 2 | 3>(2);
  const [newVenueCode, setNewVenueCode] = useState(venues[0]?.code || 'AUD-01');
  const [newFee, setNewFee] = useState<number>(0);
  const [newTeamType, setNewTeamType] = useState<'solo' | 'team' | 'both'>('solo');
  const [newMaxTeam, setNewMaxTeam] = useState<number>(1);
  const [newSlots, setNewSlots] = useState<number>(50);
  const [newPrize, setNewPrize] = useState('₹20,000');
  const [newDesc, setNewDesc] = useState('');
  const [newRules, setNewRules] = useState('');

  // Derived metrics
  const totalRegistrations = registrations.filter((r) => r.status === 'confirmed').length;
  const checkedInCount = registrations.filter((r) => r.checkedIn).length;
  const totalRevenue = registrations
    .filter((r) => r.status === 'confirmed')
    .reduce((sum, r) => sum + r.feePaid, 0);
  const checkInRate =
    totalRegistrations > 0
      ? Math.round((checkedInCount / totalRegistrations) * 100)
      : 0;

  // Filtered registrations
  const filteredRegistrations = registrations.filter((r) => {
    if (selectedEventFilter !== 'all' && r.eventId !== selectedEventFilter) return false;
    if (checkInStatusFilter === 'checked' && !r.checkedIn) return false;
    if (checkInStatusFilter === 'pending' && r.checkedIn) return false;
    if (searchAttendee.trim()) {
      const q = searchAttendee.toLowerCase();
      const matchName = r.primaryContact.fullName.toLowerCase().includes(q);
      const matchRoll = r.primaryContact.rollNumber.toLowerCase().includes(q);
      const matchTicket = r.ticketId.toLowerCase().includes(q);
      const matchCollege = r.primaryContact.college.toLowerCase().includes(q);
      const matchTeam = r.teamName?.toLowerCase().includes(q);
      if (!matchName && !matchRoll && !matchTicket && !matchCollege && !matchTeam) {
        return false;
      }
    }
    return true;
  });

  const handleRunCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketInput.trim()) return;

    let cleanId = ticketInput.trim();
    if (cleanId.includes(':')) {
      const parts = cleanId.split(':');
      if (parts.length >= 2) cleanId = parts[1];
    }

    const result = onCheckInTicket(cleanId);
    setCheckInFeedback(result);
    if (result.success) {
      setTicketInput('');
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTagline.trim()) return;

    const rulesList = newRules
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const createdEvent: EventItem = {
      id: `ev-${Date.now()}`,
      title: newTitle.trim(),
      tagline: newTagline.trim(),
      track: newCategory === 'technical' || newCategory === 'workshops' ? 'technical' : 'non-technical',
      category: newCategory,
      department: newDepartment.trim(),
      date: newDate.trim(),
      time: newTime.trim(),
      day: newDay,
      venue: venues.find((v) => v.code === newVenueCode)?.name || 'Main Auditorium',
      venueCode: newVenueCode,
      fee: Number(newFee) || 0,
      teamType: newTeamType,
      minTeamSize: newTeamType === 'team' ? 2 : 1,
      maxTeamSize: newTeamType === 'solo' ? 1 : Number(newMaxTeam) || 4,
      totalSlots: Number(newSlots) || 50,
      registeredCount: 0,
      prizePool: newPrize.trim() || 'Merit Certificates',
      certificate: true,
      image: '/src/assets/images/hero_college_fest_stage_1792043266159.jpg',
      description: newDesc.trim() || 'PixelPirates college fest competition session.',
      rules:
        rulesList.length > 0
          ? rulesList
          : ['All participants must carry their university ID card.', 'Strict adherence to reporting time.'],
      scheduleTimeline: [
        { time: newTime.split('-')[0]?.trim() || '10:00 AM', activity: 'Registration & Commencement' },
        { time: newTime.split('-')[1]?.trim() || '01:00 PM', activity: 'Conclusion & Valedictory' },
      ],
      coordinators: [
        { name: 'Festival Committee Desk', role: 'Staff Lead', phone: '0000000XXX', email: 'xyz@gmail.com' },
      ],
      faqs: [{ question: 'Who can participate?', answer: 'Enrolled undergraduate and postgraduate students.' }],
    };

    onCreateEvent(createdEvent);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-slate-100 bg-[#050816]">
      {/* Top Banner & Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#1b2348] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#38bdf8]">
            <span>NEXORA 2026 · Sona College of Technology Committee</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-[#a78bfa]">Gate & Registrations Console</span>
          </div>
          {/* Pure White Bold Heading */}
          <h2 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Festival Organizer Portal
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Monitor real-time student check-ins, manage attendee manifests, and publish new campus competitions.
          </p>
          <div className="mt-2 flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-[#38bdf8]" /> Hotline: <strong className="text-[#7dd3fc]">0000000XXX</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="h-3 w-3 text-[#38bdf8]" /> <strong className="text-[#7dd3fc]">xyz@gmail.com</strong>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportRegistrationsToCSV(filteredRegistrations)}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#273260] bg-[#0c1236] px-4 py-2 text-xs font-bold text-[#7dd3fc] shadow-sm hover:border-[#38bdf8] hover:text-white"
          >
            <Download className="h-4 w-4 text-[#38bdf8]" />
            <span>Export CSV Manifest</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] px-5 py-2.5 text-xs font-black text-white shadow-lg hover:from-[#8b5cf6] hover:to-[#7c3aed] hover:shadow-[0_0_20px_rgba(124,58,237,0.6)] cursor-pointer"
          >
            <Plus className="h-4 w-4 stroke-[3]" />
            <span>Publish New Event</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row in Dark Grey with Cyan and Ice Blue Highlights */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
        <div className="rounded-2xl border border-[#232838] bg-[#12141c] p-5 shadow-lg backdrop-blur-md">
          <span className="text-xs text-slate-400">Total Registrations</span>
          <div className="mt-1 font-mono text-2xl font-black tracking-tight text-white tabular-nums sm:text-3xl">
            {totalRegistrations}
          </div>
          <span className="mt-1 block text-[11px] text-[#00f0ff] font-mono">
            Across {events.length} competitions
          </span>
        </div>

        <div className="rounded-2xl border border-[#232838] bg-[#12141c] p-5 shadow-lg backdrop-blur-md">
          <span className="text-xs text-slate-400">Checked In Delegates</span>
          <div className="mt-1 font-mono text-2xl font-black tracking-tight text-emerald-400 tabular-nums sm:text-3xl">
            {checkedInCount}
          </div>
          <span className="mt-1 block text-[11px] text-[#a5f3fc]">
            {checkInRate}% gate turnout rate
          </span>
        </div>

        <div className="rounded-2xl border border-[#232838] bg-[#12141c] p-5 shadow-lg backdrop-blur-md">
          <span className="text-xs text-slate-400">Total Collections</span>
          <div className="mt-1 font-mono text-2xl font-black tracking-tight text-[#00f0ff] tabular-nums sm:text-3xl">
            ₹{totalRevenue.toLocaleString()}
          </div>
          <span className="mt-1 block text-[11px] text-slate-400">
            Online UPI & Hall Billing
          </span>
        </div>

        <div className="rounded-2xl border border-[#232838] bg-[#12141c] p-5 shadow-lg backdrop-blur-md">
          <span className="text-xs text-slate-400">Active Campus Venues</span>
          <div className="mt-1 font-mono text-2xl font-black tracking-tight text-[#a5f3fc] tabular-nums sm:text-3xl">
            {venues.length}
          </div>
          <span className="mt-1 block text-[11px] text-slate-400">
            Halls & Amphitheatre
          </span>
        </div>
      </div>

      {/* Organizer Navigation Tabs */}
      <div className="mt-8 flex items-center border-b border-[#1f2433]">
        <div className="flex space-x-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('attendees')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'attendees'
                ? 'border-[#00f0ff] text-[#00f0ff]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Attendee Manifest ({filteredRegistrations.length})
          </button>
          <button
            onClick={() => setActiveTab('checkin')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'checkin'
                ? 'border-[#00f0ff] text-[#00f0ff]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Live Gate Check-in Terminal
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'events'
                ? 'border-[#00f0ff] text-[#00f0ff]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Active Events Overview ({events.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Attendee Manifest Table */}
      {activeTab === 'attendees' && (
        <div className="mt-6 space-y-4">
          {/* Filter Bar in Dark Grey Panel */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#232838] bg-[#12141c] p-4 shadow-lg backdrop-blur-md">
            <div className="relative min-w-[240px] flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#00f0ff]" />
              <input
                type="text"
                value={searchAttendee}
                onChange={(e) => setSearchAttendee(e.target.value)}
                placeholder="Search attendee by name, roll no, college, or ticket..."
                className="w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-[#00f0ff] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedEventFilter}
                onChange={(e) => setSelectedEventFilter(e.target.value)}
                className="rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-slate-200 focus:border-[#00f0ff] focus:outline-none"
              >
                <option value="all">All Events</option>
                {events.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title}
                  </option>
                ))}
              </select>

              <select
                value={checkInStatusFilter}
                onChange={(e) => setCheckInStatusFilter(e.target.value as any)}
                className="rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-slate-200 focus:border-[#00f0ff] focus:outline-none"
              >
                <option value="all">All Check-in States</option>
                <option value="checked">Checked In Only</option>
                <option value="pending">Pending Gate Entry</option>
              </select>
            </div>
          </div>

          {/* Table Container in Dark Grey */}
          <div className="overflow-x-auto rounded-2xl border border-[#232838] bg-[#12141c] shadow-lg">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#1f2433] bg-[#0c0e14] font-bold text-slate-300">
                <tr>
                  <th className="py-3 px-4">Ticket Pass</th>
                  <th className="py-3 px-4">Student Delegate</th>
                  <th className="py-3 px-4">College & Dept</th>
                  <th className="py-3 px-4">Registered Event</th>
                  <th className="py-3 px-4">Type / Team</th>
                  <th className="py-3 px-4">Gate Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2433] text-slate-300">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No registrations found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.ticketId} className="hover:bg-[#181b26] transition">
                      <td className="py-3 px-4 font-mono font-bold text-[#00f0ff] tabular-nums">
                        {reg.ticketId}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">
                          {reg.primaryContact.fullName}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Roll: {reg.primaryContact.rollNumber} · {reg.primaryContact.phone}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="truncate max-w-[180px] font-medium text-slate-200">
                          {reg.primaryContact.college}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {reg.primaryContact.department}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="truncate max-w-[180px] font-medium text-white">
                          {reg.eventTitle}
                        </div>
                        <div className="text-[11px] text-[#a5f3fc] font-mono">
                          {reg.venueCode}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {reg.participantType === 'team' ? (
                          <div>
                            <span className="font-bold text-[#a5f3fc]">{reg.teamName}</span>
                            <div className="text-[11px] text-slate-400">
                              {reg.teamMembers?.length || 1} members
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400">Solo Delegate</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {reg.checkedIn ? (
                          <span className="font-bold text-emerald-400">
                            ✓ Checked In
                          </span>
                        ) : (
                          <span className="font-bold text-[#a5f3fc]">
                            • Pending Scan
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {!reg.checkedIn ? (
                          <button
                            onClick={() => {
                              const res = onCheckInTicket(reg.ticketId);
                              setCheckInFeedback(res);
                            }}
                            className="rounded-lg bg-[#00f0ff] px-2.5 py-1 text-[11px] font-bold text-[#08080a] shadow hover:bg-[#3bf4ff]"
                          >
                            Scan & Admit
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-500 font-mono">
                            {new Date(reg.checkedInAt || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Live Gate Check-in Terminal */}
      {activeTab === 'checkin' && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Terminal Input Card in Dark Grey Panel */}
          <div className="rounded-2xl border border-[#232838] bg-[#12141c] p-6 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00f0ff]">
              <QrCode className="h-4 w-4" />
              <span>Barcode / QR Scanner Interface</span>
            </div>
            {/* Pure White Bold Heading */}
            <h3 className="mt-1 text-lg font-black text-white">
              Scan Pass or Enter Ticket ID
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Compatible with standard handheld USB/Bluetooth 2D barcode scanners and manual typing.
            </p>

            <form onSubmit={handleRunCheckIn} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300">
                  Ticket Identifier or Scan Payload
                </label>
                <div className="mt-1.5 flex gap-2">
                  <input
                    type="text"
                    value={ticketInput}
                    onChange={(e) => setTicketInput(e.target.value)}
                    placeholder="e.g. TKT-98234 or scan QR"
                    autoFocus
                    className="flex-1 rounded-xl border border-[#262c3e] bg-[#0c0e14] px-4 py-2.5 font-mono text-sm text-white placeholder-slate-500 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff]"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#00f0ff] px-5 py-2.5 text-xs font-black text-[#08080a] shadow hover:bg-[#3bf4ff] transition cursor-pointer"
                  >
                    <span>Verify</span>
                    <ArrowRight className="h-4 w-4 stroke-[3]" />
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-[#232838] bg-[#0c0e14] p-3 text-xs text-slate-400">
                <span className="font-bold text-white">Quick Test Pass IDs:</span>
                <div className="mt-1 flex flex-wrap gap-2">
                  {registrations.slice(0, 3).map((r) => (
                    <button
                      key={r.ticketId}
                      type="button"
                      onClick={() => setTicketInput(r.ticketId)}
                      className="font-mono text-[#00f0ff] hover:underline"
                    >
                      {r.ticketId}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* Scanner Feedback Display in Dark Grey */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#232838] bg-[#12141c] p-6 shadow-xl">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#a5f3fc]">
                Scan Outcome
              </div>
              <h3 className="mt-1 text-lg font-black text-white">
                Live Admission Feedback
              </h3>
            </div>

            {checkInFeedback ? (
              <div
                className={`mt-4 rounded-xl border p-5 ${
                  checkInFeedback.success
                    ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-200'
                    : 'border-red-500/50 bg-red-950/30 text-red-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  {checkInFeedback.success ? (
                    <CheckCircle2 className="h-8 w-8 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-red-400 shrink-0" />
                  )}
                  <div>
                    <h4 className="text-sm font-black text-white">
                      {checkInFeedback.success ? 'Admission Approved' : 'Check-in Rejected'}
                    </h4>
                    <p className="text-xs mt-0.5">{checkInFeedback.message}</p>
                  </div>
                </div>

                {checkInFeedback.reg && (
                  <div className="mt-4 rounded-lg bg-[#0c0e14] p-4 text-xs text-slate-300 space-y-1.5 border border-[#232838]">
                    <div>
                      <span className="text-slate-400">Competition:</span>{' '}
                      <span className="font-bold text-white">{checkInFeedback.reg.eventTitle}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Participant:</span>{' '}
                      <span className="font-bold text-[#00f0ff]">
                        {checkInFeedback.reg.primaryContact.fullName}
                      </span>{' '}
                      ({checkInFeedback.reg.primaryContact.rollNumber})
                    </div>
                    <div>
                      <span className="text-slate-400">College:</span>{' '}
                      <span className="text-slate-200">{checkInFeedback.reg.primaryContact.college}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Venue Allocated:</span>{' '}
                      <span className="font-mono text-[#a5f3fc]">{checkInFeedback.reg.venue}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-[#232838] p-12 text-center text-xs text-slate-400">
                <ShieldCheck className="h-8 w-8 text-[#00f0ff]" />
                <span className="mt-2 font-bold text-white">Awaiting next pass scan</span>
                <span className="text-[11px] text-slate-400">Results will immediately update gate admission logs</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Active Events Capacity Overview */}
      {activeTab === 'events' && (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((ev) => {
            const pct = Math.round((ev.registeredCount / ev.totalSlots) * 100);
            return (
              <div
                key={ev.id}
                className="rounded-2xl border border-[#232838] bg-[#12141c] p-5 shadow-lg flex flex-col justify-between hover:border-[#00f0ff]/50 transition"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="capitalize font-bold text-[#00f0ff]">{ev.category}</span>
                    <span className="text-[#a5f3fc]">Day {ev.day}</span>
                  </div>

                  {/* Pure White Bold Heading */}
                  <h3 className="mt-2 text-base font-bold text-white">
                    {ev.title}
                  </h3>
                  <div className="mt-1 text-xs text-slate-400">
                    {ev.venue} ({ev.venueCode})
                  </div>

                  {/* Capacity progress */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Slots Taken</span>
                      <span className="font-mono font-bold text-[#00f0ff] tabular-nums">
                        {ev.registeredCount} / {ev.totalSlots} ({pct}%)
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#0c0e14]">
                      <div
                        className="h-full bg-gradient-to-r from-[#00f0ff] to-[#a5f3fc]"
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#1f2433] pt-3 text-xs text-slate-400 flex items-center justify-between">
                  <span>Fee: {ev.fee === 0 ? 'Free' : `₹${ev.fee}`}</span>
                  <span className="font-bold text-[#a5f3fc]">{ev.prizePool}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Publish New Event */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#08080a]/85 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl border border-[#232838] bg-[#12141c] shadow-[0_0_50px_rgba(0,240,255,0.2)]">
            <div className="flex items-center justify-between border-b border-[#1f2433] px-6 py-4">
              <div>
                <h3 className="text-lg font-black text-white">
                  Publish New College Competition / Workshop
                </h3>
                <p className="text-xs text-slate-400">
                  The event will immediately appear in the student registration catalog.
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="max-h-[75vh] overflow-y-auto px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. DesignSprint: UX Prototype Challenge"
                  className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#00f0ff] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300">
                  Tagline / 1-Line Hook *
                </label>
                <input
                  type="text"
                  required
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  placeholder="e.g. Rapid 4-hour mobile app design sprint judged by industry leads"
                  className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#00f0ff] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as EventCategory)}
                    className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                  >
                    <option value="technical">Technical</option>
                    <option value="cultural">Cultural</option>
                    <option value="workshops">Workshops</option>
                    <option value="sports">Sports</option>
                    <option value="gaming">Gaming</option>
                    <option value="management">Management</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Festival Day
                  </label>
                  <select
                    value={newDay}
                    onChange={(e) => setNewDay(Number(e.target.value) as 1 | 2 | 3)}
                    className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                  >
                    <option value={1}>Day 1 (15 Mar)</option>
                    <option value={2}>Day 2 (16 Mar)</option>
                    <option value={3}>Day 3 (17 Mar)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Campus Venue
                  </label>
                  <select
                    value={newVenueCode}
                    onChange={(e) => setNewVenueCode(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                  >
                    {venues.map((v) => (
                      <option key={v.code} value={v.code}>
                        {v.name} ({v.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Date & Time
                  </label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="10:00 AM - 01:00 PM"
                    className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Registration Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={newFee}
                    onChange={(e) => setNewFee(Number(e.target.value))}
                    min={0}
                    className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Total Slots / Capacity
                  </label>
                  <input
                    type="number"
                    value={newSlots}
                    onChange={(e) => setNewSlots(Number(e.target.value))}
                    min={5}
                    className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Participation Format
                  </label>
                  <select
                    value={newTeamType}
                    onChange={(e) => setNewTeamType(e.target.value as any)}
                    className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                  >
                    <option value="solo">Individual / Solo</option>
                    <option value="team">Team Only</option>
                    <option value="both">Both Solo & Team</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300">
                    Prize Pool Award
                  </label>
                  <input
                    type="text"
                    value={newPrize}
                    onChange={(e) => setNewPrize(e.target.value)}
                    placeholder="e.g. ₹25,000 + Trophies"
                    className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300">
                  Event Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Provide an overview of the event, deliverables, and judging criteria..."
                  className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300">
                  Rules (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={newRules}
                  onChange={(e) => setNewRules(e.target.value)}
                  placeholder="All team members must carry college ID&#10;Strict reporting 15 mins prior to commencement"
                  className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-[#1f2433] pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-lg border border-[#262c3e] bg-[#161824] px-4 py-2 text-xs font-bold text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#00f0ff] px-5 py-2 text-xs font-black text-[#08080a] shadow hover:bg-[#3bf4ff] cursor-pointer"
                >
                  Publish to Student Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
