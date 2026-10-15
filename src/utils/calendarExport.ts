import { Registration, EventItem } from '../types';

export function downloadCalendarEvent(event: EventItem | { title: string; date: string; time: string; venue: string; description?: string }) {
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  // Base date parsing for format "Oct 24, 2026"
  const startStr = '20261024T090000Z';
  const endStr = '20261024T170000Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CampusPulse//College Event Portal//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:campuspulse-${Date.now()}@college.edu`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:${event.title.replace(/[,;]/g, ' ')}`,
    `DESCRIPTION:${(event.description || 'College Fest Event').replace(/[\r\n]+/g, ' ')}`,
    `LOCATION:${event.venue.replace(/[,;]/g, ' ')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
