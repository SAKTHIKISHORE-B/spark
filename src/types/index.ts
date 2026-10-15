export type EventCategory =
  | 'all'
  | 'technical'
  | 'cultural'
  | 'workshops'
  | 'sports'
  | 'gaming'
  | 'management';

export interface Coordinator {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface TimelineSlot {
  time: string;
  activity: string;
  stage?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  category: EventCategory;
  department: string;
  date: string;
  time: string;
  day: 1 | 2 | 3;
  venue: string;
  venueCode: string;
  fee: number;
  teamType: 'solo' | 'team' | 'both';
  minTeamSize: number;
  maxTeamSize: number;
  totalSlots: number;
  registeredCount: number;
  prizePool: string;
  certificate: boolean;
  image: string;
  description: string;
  rules: string[];
  scheduleTimeline: TimelineSlot[];
  coordinators: Coordinator[];
  faqs: FAQItem[];
  featured?: boolean;
}

export interface TeamMember {
  name: string;
  rollNumber: string;
  email: string;
  role: string;
}

export interface Registration {
  ticketId: string;
  eventId: string;
  eventTitle: string;
  eventCategory: EventCategory;
  eventDate: string;
  eventTime: string;
  venue: string;
  venueCode: string;
  registeredAt: string;
  participantType: 'solo' | 'team';
  primaryContact: {
    fullName: string;
    rollNumber: string;
    email: string;
    phone: string;
    college: string;
    department: string;
    year: string;
  };
  teamName?: string;
  teamMembers?: TeamMember[];
  feePaid: number;
  status: 'confirmed' | 'cancelled';
  checkedIn: boolean;
  checkedInAt?: string;
  notes?: string;
}

export interface VenueItem {
  code: string;
  name: string;
  building: string;
  floor: string;
  capacity: number;
  facilities: string[];
  nearestGate: string;
}
