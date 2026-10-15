import React, { useState } from 'react';
import { X, Users, User, ArrowRight, ShieldCheck, Check, AlertCircle, Plus, Trash2 } from 'lucide-react';
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
  const [college, setCollege] = useState('Institute of Technology & Science');
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
      const generatedTicketId = `CP-26-${Math.floor(1000 + Math.random() * 9000)}`;

      const fullMembersList: TeamMember[] =
        participantType === 'team'
          ? [
              {
                name: fullName,
                rollNumber,
                email,
                role: 'Team Leader',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
              <span>Event Registration</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="capitalize">{event.category}</span>
            </div>
            <h2 className="mt-0.5 text-lg font-bold text-slate-900 sm:text-xl">
              {event.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="max-h-[78vh] overflow-y-auto px-6 py-5">
          {errorMsg && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Participation Mode Selection (if event allows both) */}
          {event.teamType === 'both' && (
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-700">
                Participation Format
              </label>
              <div className="mt-1.5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setParticipantType('solo')}
                  className={`flex items-center justify-center gap-2 rounded-lg border py-2 px-3 text-xs font-medium transition ${
                    participantType === 'solo'
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Solo / Individual</span>
                </button>
                <button
                  type="button"
                  onClick={() => setParticipantType('team')}
                  className={`flex items-center justify-center gap-2 rounded-lg border py-2 px-3 text-xs font-medium transition ${
                    participantType === 'team'
                      ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Squad / Team ({event.minTeamSize}-{event.maxTeamSize} Members)</span>
                </button>
              </div>
            </div>
          )}

          {/* Section 1: Lead Participant / Contact Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {participantType === 'team' ? '1. Team Lead / Primary Delegate' : '1. Participant Information'}
            </h4>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700">
                  Full Legal Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aarav Patel"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">
                  Student Roll / College ID *
                </label>
                <input
                  type="text"
                  required
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="e.g. 23CS108"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700">
                  Email Address (For E-Pass & Updates) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@college.edu"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">
                  Phone Number (WhatsApp verified) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <label className="block text-xs font-medium text-slate-700">
                  Year of Study
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                  <option>Postgraduate / PhD</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-700">
                  College / Institute Name *
                </label>
                <input
                  type="text"
                  required
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="College or University"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Team Roster (if team participation) */}
          {participantType === 'team' && (
            <div className="mt-6 space-y-4 border-t border-slate-200 pt-5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  2. Team Roster ({teamMembers.length + 1} of {event.maxTeamSize} max)
                </h4>
                {teamMembers.length + 1 < event.maxTeamSize && (
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Teammate</span>
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700">
                  Team Name *
                </label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Apex Innovators"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              {/* Dynamic teammate inputs */}
              <div className="space-y-3">
                {teamMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border border-slate-200 bg-slate-50/50 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-700">
                        Teammate #{idx + 2}
                      </span>
                      {teamMembers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(idx)}
                          className="text-xs text-red-600 hover:text-red-700"
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
                          className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          value={member.rollNumber}
                          onChange={(e) => handleMemberChange(idx, 'rollNumber', e.target.value)}
                          placeholder="Roll Number *"
                          className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={member.role}
                          onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                          placeholder="Role (e.g. Designer)"
                          className="w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Fee Breakdown & Campus Checkout */}
          <div className="mt-6 space-y-4 border-t border-slate-200 pt-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {participantType === 'team' ? '3. Pass Summary' : '2. Pass Summary'}
            </h4>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Registration Entry Fee</span>
                <span className="font-semibold text-slate-900">
                  {event.fee === 0 ? 'Free Entry (Sponsored)' : `₹${event.fee}`}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
                <span>Festival Kit & ID Badge</span>
                <span className="font-semibold text-slate-900">Complimentary</span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-2 text-sm font-bold text-slate-900">
                <span>Total Amount Due</span>
                <span className="font-mono text-base tabular-nums">
                  {event.fee === 0 ? '₹0.00' : `₹${event.fee}.00`}
                </span>
              </div>

              {event.fee > 0 && (
                <div className="mt-4 border-t border-slate-200 pt-3">
                  <label className="block text-xs font-medium text-slate-700">
                    Payment Channel
                  </label>
                  <div className="mt-1.5 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`flex-1 rounded-lg border py-1.5 text-xs font-medium ${
                        paymentMethod === 'upi'
                          ? 'border-slate-900 bg-white text-slate-900 shadow-sm'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Instant UPI
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('college-id')}
                      className={`flex-1 rounded-lg border py-1.5 text-xs font-medium ${
                        paymentMethod === 'college-id'
                          ? 'border-slate-900 bg-white text-slate-900 shadow-sm'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-100'
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
                      placeholder="Enter UPI ID (e.g. student@oksbi)"
                      className="mt-2 w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-slate-900 focus:outline-none"
                    />
                  )}
                </div>
              )}
            </div>

            {/* Optional Special Requirements */}
            <div>
              <label className="block text-xs font-medium text-slate-700">
                Special Requests or Dietary Requirements (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Vegetarian food required, wheelchair ramp access needed"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Generating Digital Pass...</span>
              ) : (
                <>
                  <span>Complete & Generate Pass</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
