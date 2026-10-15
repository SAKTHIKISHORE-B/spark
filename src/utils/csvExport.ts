import { Registration } from '../types';

export function exportRegistrationsToCSV(registrations: Registration[], eventTitle?: string) {
  const headers = [
    'Ticket ID',
    'Event Title',
    'Participant Type',
    'Student Name',
    'Roll Number',
    'College',
    'Department',
    'Year',
    'Email',
    'Phone',
    'Team Name',
    'Team Size',
    'Fee Paid',
    'Status',
    'Checked In',
    'Checked In Timestamp',
    'Registration Date',
  ];

  const rows = registrations.map((r) => [
    `"${r.ticketId}"`,
    `"${r.eventTitle.replace(/"/g, '""')}"`,
    `"${r.participantType}"`,
    `"${r.primaryContact.fullName.replace(/"/g, '""')}"`,
    `"${r.primaryContact.rollNumber}"`,
    `"${r.primaryContact.college.replace(/"/g, '""')}"`,
    `"${r.primaryContact.department.replace(/"/g, '""')}"`,
    `"${r.primaryContact.year}"`,
    `"${r.primaryContact.email}"`,
    `"${r.primaryContact.phone}"`,
    `"${(r.teamName || 'N/A').replace(/"/g, '""')}"`,
    r.teamMembers ? r.teamMembers.length : 1,
    r.feePaid,
    `"${r.status}"`,
    r.checkedIn ? 'Yes' : 'No',
    `"${r.checkedInAt || 'N/A'}"`,
    `"${new Date(r.registeredAt).toLocaleDateString()}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileName = eventTitle
    ? `registrations-${eventTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.csv`
    : `campuspulse-all-registrations-${new Date().toISOString().split('T')[0]}.csv`;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
