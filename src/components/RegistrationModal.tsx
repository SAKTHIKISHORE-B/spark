import React, { useState } from 'react';
import { X, Users, User, ArrowRight, AlertCircle, Plus, Trash2, Phone, Mail } from 'lucide-react';
import { EventItem, Registration, TeamMember } from '../types';

interface RegistrationModalProps {
  event: EventItem;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newRegistration: Registration) => void;
}

export function RegistrationModal({
  event,
  isOpen,
  onClose,
  onSuccess,
}: RegistrationModalProps) {
  if (!isOpen) return null;

  const initialParticipantType =
    event.teamType === 'both' ? 'team' : event.teamType;

  const [participantType, setParticipantType] = useState<'solo' | 'team'>(
    initialParticipantType
  );

  // Form states
  const [fullName, setFullName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [college, setCollege] = useState('Sona College of Technology');
  const [department, setDepartment] = useState('Computer Science & Eng.');
  const [year, setYear] = useState('3rd Year');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Team states
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: '', rollNumber: '', email: '', role: 'Developer' },
  ]);

  // Payment simulation state
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'college-id'>('upi');
  const [upiId, setUpiId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddMember = () => {
    if (teamMembers.length + 1 >= event.maxTeamSize) return;
    setTeamMembers([
      ...teamMembers,
      { name: '', rollNumber: '', email: '', role: 'Member' },
    ]);
  };

  const handleRemoveMember = (index: number) => {
    if (teamMembers.length <= 1) return;
    const updated = [...teamMembers];
    updated.splice(index, 1);
    setTeamMembers(updated);
  };

  const handleMemberChange = (
    index: number,
    field: keyof TeamMember,
    val: string
  ) => {
    const updated = [...teamMembers];
    updated[index] = { ...updated[index], [field]: val };
    setTeamMembers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !rollNumber.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please fill in all mandatory contact information.');
      return;
    }

    if (!email.includes('@')) {
      setErrorMsg('Please provide a valid institutional or personal email address.');
      return;
    }

    if (participantType === 'team') {
      if (!teamName.trim()) {
        setErrorMsg('Please provide a team or band name.');
        return;
      }
      for (let i = 0; i < teamMembers.length; i++) {
        const m = teamMembers[i];
        if (!m.name.trim() || !m.rollNumber.trim()) {
          setErrorMsg(`Please specify complete details for Team Member #${i + 2}.`);
          return;
        }
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedTicketId = `PP-26-${Math.floor(1000 + Math.random() * 9000)}`;

      const fullMembersList: TeamMember[] =
        participantType === 'team'
          ? [
              {
                name: fullName,
                rollNumber,
                email,
                phone,
                role: 'Team Captain',
              },
              ...teamMembers,
            ]
          : [];

      const newRegistration: Registration = {
        ticketId: generatedTicketId,
        eventId: event.id,
        eventTitle: event.title,
        eventCategory: event.category,
        eventDate: event.date,
        eventTime: event.time,
        venue: event.venue,
        venueCode: event.venueCode,
        registeredAt: new Date().toISOString(),
        participantType,
        primaryContact: {
          fullName,
          rollNumber,
          email,
          phone,
          college,
          department,
          year,
        },
        teamName: participantType === 'team' ? teamName : undefined,
        teamMembers: participantType === 'team' ? fullMembersList : undefined,
        feePaid: event.fee,
        status: 'confirmed',
        checkedIn: false,
        notes: notes.trim() || undefined,
      };

      setIsSubmitting(false);
      onSuccess(newRegistration);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#050816]/85 p-4 backdrop-blur-md">
      {/* Midnight Navy Modal Card */}
      <div className="relative w-full max-w-2xl rounded-3xl border border-[#232c58] bg-[#090d28] shadow-[0_0_60px_rgba(124,58,237,0.35)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1b2348] px-6 py-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#38bdf8]">
              <span>NEXORA 2026 · Sona College of Technology</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="capitalize text-[#a78bfa]">{event.category}</span>
            </div>
            {/* Pure White Bold Heading */}
            <h2 className="mt-0.5 text-lg font-black text-white sm:text-xl">
              {event.title} — Official Pass Registration
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-[#121a44] hover:text-[#38bdf8]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="max-h-[78vh] overflow-y-auto px-6 py-5">
          {errorMsg && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-950/40 p-3 text-xs font-bold text-red-400 border border-red-500/30">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Helpdesk Notice */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#232838] bg-[#0c0e14] px-3.5 py-2 text-[11px] text-slate-300">
            <span className="text-slate-400">Need Registration Help?</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-mono text-[#a5f3fc]">
                <Phone className="h-3 w-3 text-[#00f0ff]" /> 0000000XXX
              </span>
              <span className="flex items-center gap-1 font-mono text-[#a5f3fc]">
                <Mail className="h-3 w-3 text-[#00f0ff]" /> xyz@gmail.com
              </span>
            </div>
          </div>

          {/* Participation Mode Selection (if event allows both) */}
          {event.teamType === 'both' && (
            <div className="mb-5">
              <label className="block text-xs font-bold text-white">
                Participation Format
              </label>
              <div className="mt-1.5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setParticipantType('solo')}
                  className={`flex items-center justify-center gap-2 rounded-lg border py-2 px-3 text-xs font-bold transition ${
                    participantType === 'solo'
                      ? 'border-[#00f0ff] bg-[#00f0ff] text-[#08080a] shadow-sm'
                      : 'border-[#232838] bg-[#141620] text-slate-300 hover:text-white'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Solo / Individual</span>
                </button>
                <button
                  type="button"
                  onClick={() => setParticipantType('team')}
                  className={`flex items-center justify-center gap-2 rounded-lg border py-2 px-3 text-xs font-bold transition ${
                    participantType === 'team'
                      ? 'border-[#00f0ff] bg-[#00f0ff] text-[#08080a] shadow-sm'
                      : 'border-[#232838] bg-[#141620] text-slate-300 hover:text-white'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Team ({event.minTeamSize}-{event.maxTeamSize} Members)</span>
                </button>
              </div>
            </div>
          )}

          {/* Section 1: Lead Participant / Contact Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#a5f3fc]">
              {participantType === 'team' ? '1. Team Lead / Primary Delegate' : '1. Participant Information'}
            </h4>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aarav Patel"
                  className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300">
                  Student Roll / College ID *
                </label>
                <input
                  type="text"
                  required
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="e.g. 23CS108"
                  className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300">
                  Email Address (Pass Delivery) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@college.edu"
                  className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300">
                  Phone Number (WhatsApp verified) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Year of Study
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                  <option>Postgraduate / PhD</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-300">
                  College / Institute Name *
                </label>
                <input
                  type="text"
                  required
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="College or University"
                  className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Team Roster (if team participation) */}
          {participantType === 'team' && (
            <div className="mt-6 space-y-4 border-t border-[#1f2433] pt-5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#a5f3fc]">
                  2. Team Roster ({teamMembers.length + 1} of {event.maxTeamSize} max)
                </h4>
                {teamMembers.length + 1 < event.maxTeamSize && (
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="flex items-center gap-1 text-xs font-bold text-[#00f0ff] hover:underline"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Teammate</span>
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300">
                  Team / Squad Name *
                </label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Pixel Pirates Alpha"
                  className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff]"
                />
              </div>

              {/* Dynamic teammate inputs */}
              <div className="space-y-3">
                {teamMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-[#232838] bg-[#0c0e14] p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">
                        Teammate #{idx + 2}
                      </span>
                      {teamMembers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(idx)}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
                      <div>
                        <input
                          type="text"
                          required
                          value={member.name}
                          onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                          placeholder="Teammate Name *"
                          className="w-full rounded-md border border-[#262c3e] bg-[#141620] px-2.5 py-1.5 text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          value={member.rollNumber}
                          onChange={(e) => handleMemberChange(idx, 'rollNumber', e.target.value)}
                          placeholder="Roll Number *"
                          className="w-full rounded-md border border-[#262c3e] bg-[#141620] px-2.5 py-1.5 text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                          placeholder="Role (e.g. Lead Coder)"
                          className="w-full rounded-md border border-[#262c3e] bg-[#141620] px-2.5 py-1.5 text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Pass Summary */}
          <div className="mt-6 space-y-4 border-t border-[#1f2433] pt-5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#a5f3fc]">
              {participantType === 'team' ? '3. Pass Summary' : '2. Pass Summary'}
            </h4>

            <div className="rounded-xl border border-[#232838] bg-[#0c0e14] p-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Registration Entry Fee</span>
                <span className="font-bold text-white">
                  {event.fee === 0 ? 'Free Entry (Sponsored)' : `₹${event.fee}`}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-slate-400">
                <span>Festival Kit & Digital Barcode Pass</span>
                <span className="font-bold text-[#00f0ff]">Complimentary</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-[#1f2433] pt-2 text-sm font-bold text-white">
                <span>Total Amount Due</span>
                <span className="font-mono text-base text-[#00f0ff] tabular-nums">
                  {event.fee === 0 ? '₹0.00' : `₹${event.fee}.00`}
                </span>
              </div>

              {event.fee > 0 && (
                <div className="mt-4 border-t border-[#1f2433] pt-3">
                  <label className="block text-xs font-semibold text-slate-300">
                    Payment Channel
                  </label>
                  <div className="mt-1.5 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`flex-1 rounded-lg border py-1.5 text-xs font-bold ${
                        paymentMethod === 'upi'
                          ? 'border-[#00f0ff] bg-[#00f0ff] text-[#08080a]'
                          : 'border-[#262c3e] text-slate-400 hover:text-white'
                      }`}
                    >
                      Instant UPI
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('college-id')}
                      className={`flex-1 rounded-lg border py-1.5 text-xs font-bold ${
                        paymentMethod === 'college-id'
                          ? 'border-[#00f0ff] bg-[#00f0ff] text-[#08080a]'
                          : 'border-[#262c3e] text-slate-400 hover:text-white'
                      }`}
                    >
                      College ID Bill
                    </button>
                  </div>

                  {paymentMethod === 'upi' && (
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="Enter UPI ID (e.g. pirate@okhdfcbank)"
                      className="mt-2 w-full rounded-md border border-[#262c3e] bg-[#141620] px-2.5 py-1.5 text-xs text-white focus:border-[#00f0ff] focus:outline-none"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Optional Special Requirements */}
            <div>
              <label className="block text-xs font-semibold text-slate-300">
                Special Requests or Dietary Requirements (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Vegetarian food required, laptop desk power outlet needed"
                className="mt-1 w-full rounded-lg border border-[#262c3e] bg-[#0c0e14] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#00f0ff] focus:outline-none focus:ring-1 focus:ring-[#00f0ff]"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#1b2348] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#273260] bg-[#0c1236] px-5 py-2 text-xs font-bold text-slate-300 transition hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:from-[#8b5cf6] hover:to-[#7c3aed] hover:shadow-[0_0_20px_rgba(124,58,237,0.6)] transition disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Generating Digital Pass...</span>
              ) : (
                <>
                  <span>Complete & Generate Pass</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
