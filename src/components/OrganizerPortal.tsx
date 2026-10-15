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
  const [newDate, setNewDate] = useState('Oct 26, 2026');
  const [newTime, setNewTime] = useState('10:00 AM - 01:00 PM');
  const [newDay, setNewDay] = useState<1 | 2 | 3>(3);
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
    const result = onCheckInTicket(ticketInput.trim().toUpperCase());
    setCheckInFeedback(result);
    setTicketInput('');
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const venueObj = venues.find((v) => v.code === newVenueCode) || venues[0];

    const rulesList = newRules
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const createdEvent: EventItem = {
      id: `ev-${Date.now()}`,
      title: newTitle.trim(),
      tagline: newTagline.trim(),
      category: newCategory,
      department: newDepartment.trim(),
      date: newDate.trim(),
      time: newTime.trim(),
      day: newDay,
      venue: venueObj.name,
      venueCode: venueObj.code,
      fee: Number(newFee) || 0,
      teamType: newTeamType,
      minTeamSize: newTeamType === 'solo' ? 1 : 2,
      maxTeamSize: newTeamType === 'solo' ? 1 : Number(newMaxTeam) || 4,
      totalSlots: Number(newSlots) || 50,
      registeredCount: 0,
      prizePool: newPrize.trim() || 'Merit Certificates',
      certificate: true,
      image: '/src/assets/images/hero_college_fest_stage_1792043266159.jpg',
      description: newDesc.trim() || 'College fest event session.',
      rules:
        rulesList.length > 0
          ? rulesList
          : ['All participants must carry their university ID card.', 'Strict adherence to reporting time.'],
      scheduleTimeline: [
        { time: newTime.split('-')[0]?.trim() || '10:00 AM', activity: 'Registration & Commencement' },
        { time: newTime.split('-')[1]?.trim() || '01:00 PM', activity: 'Conclusion & Valedictory' },
      ],
      coordinators: [
        { name: 'Event Desk Coordinator', role: 'Faculty Lead', phone: '+91 98400 00000', email: 'events@college.edu' },
      ],
      faqs: [{ question: 'Who can participate?', answer: 'Enrolled undergraduate and postgraduate students.' }],
    };

    onCreateEvent(createdEvent);
    setIsCreateModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-slate-100">
      {/* Top Banner & Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-purple-900/30 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <span>NEXORA 2026 Organizing Committee</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>Gate & Registrations Console</span>
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Festival Organizer Portal
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-400">
            Monitor real-time student check-ins, manage attendee manifests, and publish new campus competitions.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => exportRegistrationsToCSV(filteredRegistrations)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-[#0c102a] px-3.5 py-2 text-xs font-semibold text-slate-200 shadow-sm hover:border-cyan-400 hover:text-white"
          >
            <Download className="h-4 w-4 text-cyan-400" />
            <span>Export CSV Manifest</span>
          </button>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md glow-button hover:from-purple-500 hover:to-indigo-500"
          >
            <Plus className="h-4 w-4" />
            <span>Publish New Event</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
        <div className="rounded-2xl border border-purple-500/20 bg-[#0c102a]/90 p-5 shadow-lg backdrop-blur-md">
          <span className="text-xs text-slate-400">Total Registrations</span>
          <div className="mt-1 font-mono text-2xl font-bold tracking-tight text-white tabular-nums sm:text-3xl">
            {totalRegistrations}
          </div>
          <span className="mt-1 block text-[11px] text-cyan-400 font-mono">
            Across {events.length} campus tracks
          </span>
        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-[#0c102a]/90 p-5 shadow-lg backdrop-blur-md">
          <span className="text-xs text-slate-400">Checked In Attendees</span>
          <div className="mt-1 font-mono text-2xl font-bold tracking-tight text-emerald-400 tabular-nums sm:text-3xl">
            {checkedInCount}
          </div>
          <span className="mt-1 block text-[11px] text-slate-400">
            {checkInRate}% gate turnout rate
          </span>
        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-[#0c102a]/90 p-5 shadow-lg backdrop-blur-md">
          <span className="text-xs text-slate-400">Total Collections</span>
          <div className="mt-1 font-mono text-2xl font-bold tracking-tight text-amber-300 tabular-nums sm:text-3xl">
            ₹{totalRevenue.toLocaleString()}
          </div>
          <span className="mt-1 block text-[11px] text-slate-400">
            Online UPI & Hall Billing
          </span>
        </div>

        <div className="rounded-2xl border border-purple-500/20 bg-[#0c102a]/90 p-5 shadow-lg backdrop-blur-md">
          <span className="text-xs text-slate-400">Active Campus Venues</span>
          <div className="mt-1 font-mono text-2xl font-bold tracking-tight text-purple-300 tabular-nums sm:text-3xl">
            {venues.length}
          </div>
          <span className="mt-1 block text-[11px] text-slate-400">
            Halls & Amphitheatre
          </span>
        </div>
      </div>

      {/* Organizer Navigation Tabs */}
      <div className="mt-8 flex items-center border-b border-purple-900/30">
        <div className="flex space-x-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('attendees')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'attendees'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Attendee Manifest ({filteredRegistrations.length})
          </button>
          <button
            onClick={() => setActiveTab('checkin')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'checkin'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Live Gate Check-in Terminal
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-3 border-b-2 transition ${
              activeTab === 'events'
                ? 'border-cyan-400 text-cyan-300'
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
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-purple-500/20 bg-[#0c102a]/90 p-4 shadow-lg backdrop-blur-md">
            <div className="relative min-w-[240px] flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400" />
              <input
                type="text"
                value={searchAttendee}
                onChange={(e) => setSearchAttendee(e.target.value)}
                placeholder="Search attendee by name, roll no, college, or ticket..."
                className="w-full rounded-lg border border-purple-500/30 bg-[#080b1e] py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedEventFilter}
                onChange={(e) => setSelectedEventFilter(e.target.value)}
                className="rounded-lg border border-purple-500/30 bg-[#080b1e] px-3 py-2 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
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
                className="rounded-lg border border-purple-500/30 bg-[#080b1e] px-3 py-2 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
              >
                <option value="all">All Check-in States</option>
                <option value="checked">Checked In Only</option>
                <option value="pending">Pending Gate Entry</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-purple-500/20 bg-[#0c102a]/80 shadow-lg">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-purple-500/20 bg-slate-950/70 font-semibold text-slate-300">
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
              <tbody className="divide-y divide-white/5 text-slate-300">
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-500">
                      No registrations found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.ticketId} className="hover:bg-purple-950/20 transition">
                      <td className="py-3 px-4 font-mono font-bold text-amber-300 tabular-nums">
                        {reg.ticketId}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">
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
                        <div className="text-[11px] text-cyan-400 font-mono">
                          {reg.venueCode}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {reg.participantType === 'team' ? (
                          <div>
                            <span className="font-semibold text-purple-300">{reg.teamName}</span>
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
                          <span className="font-semibold text-emerald-400">
                            ✓ Checked In
                          </span>
                        ) : (
                          <span className="text-slate-500">
                            Pending Entry
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {!reg.checkedIn ? (
                          <button
                            onClick={() => onCheckInTicket(reg.ticketId)}
                            className="rounded-md bg-purple-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm glow-button hover:bg-purple-500"
                          >
                            Mark Entry
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-500">Verified</span>
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
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left: Input station */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
              <QrCode className="h-4 w-4" />
              <span>Gate 1 Security Scanner Terminal</span>
            </div>
            <h3 className="mt-1 text-lg font-bold text-slate-900">
              Scan or Type Ticket Pass ID
            </h3>
            <p className="mt-1 text-xs text-slate-600">
              Enter the 7-character ticket ID printed on the student pass (e.g., CP-26-8491) or scan via barcode prober.
            </p>

            <form onSubmit={handleRunCheckIn} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Ticket Pass ID
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    value={ticketInput}
                    onChange={(e) => setTicketInput(e.target.value)}
                    placeholder="CP-26-XXXX"
                    className="flex-1 uppercase font-mono rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700"
                  >
                    Verify Pass
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Demo Test Buttons for organizer */}
            <div className="mt-6 border-t border-slate-100 pt-4">
              <span className="text-xs font-semibold text-slate-500">
                Quick Test Sample Tickets:
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {registrations.slice(0, 3).map((r) => (
                  <button
                    key={r.ticketId}
                    type="button"
                    onClick={() => {
                      setTicketInput(r.ticketId);
                      const res = onCheckInTicket(r.ticketId);
                      setCheckInFeedback(res);
                    }}
                    className="font-mono text-xs rounded border border-slate-200 bg-slate-50 px-2 py-1 text-slate-700 hover:bg-slate-100"
                  >
                    {r.ticketId} ({r.primaryContact.fullName.split(' ')[0]})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Real-time scan result feedback */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-2xs lg:col-span-7">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Scanner Verification Feedback
            </h3>

            {checkInFeedback ? (
              <div
                className={`mt-4 rounded-xl border p-5 ${
                  checkInFeedback.success
                    ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950'
                    : 'border-red-200 bg-red-50/70 text-red-950'
                }`}
              >
                <div className="flex items-center gap-3">
                  {checkInFeedback.success ? (
                    <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-bold text-base">
                      {checkInFeedback.success ? 'Admission Approved' : 'Admission Alert'}
                    </h4>
                    <p className="text-xs">{checkInFeedback.message}</p>
                  </div>
                </div>

                {checkInFeedback.reg && (
                  <div className="mt-4 rounded-lg bg-white/80 p-4 text-xs text-slate-800 space-y-1.5 border border-slate-200">
                    <div>
                      <span className="text-slate-500">Event:</span>{' '}
                      <span className="font-semibold">{checkInFeedback.reg.eventTitle}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Participant:</span>{' '}
                      <span className="font-semibold">
                        {checkInFeedback.reg.primaryContact.fullName}
                      </span>{' '}
                      ({checkInFeedback.reg.primaryContact.rollNumber})
                    </div>
                    <div>
                      <span className="text-slate-500">College:</span>{' '}
                      <span>{checkInFeedback.reg.primaryContact.college}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Venue Allocated:</span>{' '}
                      <span className="font-mono">{checkInFeedback.reg.venue}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 p-12 text-center text-xs text-slate-400">
                <ShieldCheck className="h-8 w-8 text-slate-300" />
                <span className="mt-2 font-medium">Awaiting next pass scan</span>
                <span className="text-[11px]">Results will immediately update gate admission logs</span>
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
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="capitalize font-semibold text-blue-700">{ev.category}</span>
                    <span>Day {ev.day}</span>
                  </div>

                  <h3 className="mt-2 text-base font-bold text-slate-900">
                    {ev.title}
                  </h3>
                  <div className="mt-1 text-xs text-slate-600">
                    {ev.venue} ({ev.venueCode})
                  </div>

                  {/* Capacity progress */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Slots Taken</span>
                      <span className="font-mono font-medium text-slate-900 tabular-nums">
                        {ev.registeredCount} / {ev.totalSlots} ({pct}%)
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full bg-blue-600"
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-3 text-xs text-slate-500 flex items-center justify-between">
                  <span>Fee: {ev.fee === 0 ? 'Free' : `₹${ev.fee}`}</span>
                  <span className="font-semibold text-slate-900">{ev.prizePool}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Publish New Event */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Publish New College Competition / Workshop
                </h3>
                <p className="text-xs text-slate-500">
                  The event will immediately appear in the student registration catalog.
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="max-h-[75vh] overflow-y-auto px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. DesignSprint: UX Prototype Challenge"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Tagline / 1-Line Hook *
                </label>
                <input
                  type="text"
                  required
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  placeholder="e.g. Rapid 4-hour mobile app design sprint judged by industry leads"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as EventCategory)}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
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
                  <label className="block text-xs font-semibold text-slate-700">
                    Festival Day
                  </label>
                  <select
                    value={newDay}
                    onChange={(e) => setNewDay(Number(e.target.value) as 1 | 2 | 3)}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  >
                    <option value={1}>Day 1 (Oct 24)</option>
                    <option value={2}>Day 2 (Oct 25)</option>
                    <option value={3}>Day 3 (Oct 26)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Campus Venue
                  </label>
                  <select
                    value={newVenueCode}
                    onChange={(e) => setNewVenueCode(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
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
                  <label className="block text-xs font-semibold text-slate-700">
                    Date & Time
                  </label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="10:00 AM - 01:00 PM"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Registration Fee (₹)
                  </label>
                  <input
                    type="number"
                    value={newFee}
                    onChange={(e) => setNewFee(Number(e.target.value))}
                    min={0}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Total Slots / Capacity
                  </label>
                  <input
                    type="number"
                    value={newSlots}
                    onChange={(e) => setNewSlots(Number(e.target.value))}
                    min={5}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Participation Format
                  </label>
                  <select
                    value={newTeamType}
                    onChange={(e) => setNewTeamType(e.target.value as any)}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  >
                    <option value="solo">Individual / Solo</option>
                    <option value="team">Team Only</option>
                    <option value="both">Both Solo & Team</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Prize Pool Award
                  </label>
                  <input
                    type="text"
                    value={newPrize}
                    onChange={(e) => setNewPrize(e.target.value)}
                    placeholder="e.g. ₹25,000 + Trophies"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Event Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Provide an overview of the event, deliverables, and judging criteria..."
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Rules (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={newRules}
                  onChange={(e) => setNewRules(e.target.value)}
                  placeholder="All team members must carry college ID&#10;Strict reporting 15 mins prior to commencement"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
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
