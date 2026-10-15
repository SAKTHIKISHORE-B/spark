import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { NexoraHero } from './components/NexoraHero';
import { NexoraFeaturedEvents } from './components/NexoraFeaturedEvents';
import { NexoraBottomHighlights } from './components/NexoraBottomHighlights';
import { EventCard } from './components/EventCard';
import { EventDetailModal } from './components/EventDetailModal';
import { RegistrationModal } from './components/RegistrationModal';
import { DigitalPassModal } from './components/DigitalPassModal';
import { MyTicketsView } from './components/MyTicketsView';
import { ScheduleView } from './components/ScheduleView';
import { OrganizerPortal } from './components/OrganizerPortal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { Footer } from './components/Footer';

import {
  EventItem,
  Registration,
  VenueItem,
  EventCategory,
} from './types';
import {
  INITIAL_EVENTS,
  INITIAL_REGISTRATIONS,
  INITIAL_VENUES,
} from './data/mockEvents';

export default function App() {
  // Persistence with localStorage
  const [events, setEvents] = useState<EventItem[]>(() => {
    try {
      const saved = localStorage.getItem('campuspulse_events');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_EVENTS;
  });

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    try {
      const saved = localStorage.getItem('campuspulse_registrations');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REGISTRATIONS;
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('campuspulse_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['ev-hacknova-2026', 'ev-roboforge-combat'];
  });

  const [venues] = useState<VenueItem[]>(INITIAL_VENUES);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('campuspulse_events', JSON.stringify(events));
    } catch (e) {
      console.error(e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem('campuspulse_registrations', JSON.stringify(registrations));
    } catch (e) {
      console.error(e);
    }
  }, [registrations]);

  useEffect(() => {
    try {
      localStorage.setItem('campuspulse_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  // Views & Filter states
  const [currentView, setCurrentView] = useState<'events' | 'schedule' | 'my-tickets' | 'organizer'>('events');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const [filterFormat, setFilterFormat] = useState<'all' | 'solo' | 'team'>('all');
  const [filterFee, setFilterFee] = useState<'all' | 'free' | 'paid'>('all');

  // Modals & Drawers
  const [detailEvent, setDetailEvent] = useState<EventItem | null>(null);
  const [registerEvent, setRegisterEvent] = useState<EventItem | null>(null);
  const [activeDigitalPass, setActiveDigitalPass] = useState<Registration | null>(null);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);

  // Computed registered event IDs
  const registeredEventIds = new Set(
    registrations.filter((r) => r.status === 'confirmed').map((r) => r.eventId)
  );

  // Toggle bookmark
  const handleToggleBookmark = (eventId: string) => {
    setBookmarks((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  };

  // Successful registration callback
  const handleRegistrationSuccess = (newReg: Registration) => {
    setRegistrations((prev) => [newReg, ...prev]);

    // Update slots count on event
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === newReg.eventId
          ? { ...ev, registeredCount: ev.registeredCount + 1 }
          : ev
      )
    );

    setRegisterEvent(null);
    setDetailEvent(null);
    setActiveDigitalPass(newReg);
  };

  // Cancel registration callback
  const handleCancelRegistration = (ticketId: string) => {
    const target = registrations.find((r) => r.ticketId === ticketId);
    if (!target) return;

    setRegistrations((prev) =>
      prev.map((r) => (r.ticketId === ticketId ? { ...r, status: 'cancelled' } : r))
    );

    // Release slot
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === target.eventId
          ? { ...ev, registeredCount: Math.max(0, ev.registeredCount - 1) }
          : ev
      )
    );
  };

  // Organizer QR Gate Check-in
  const handleCheckInTicket = (ticketId: string) => {
    const reg = registrations.find(
      (r) => r.ticketId.toUpperCase() === ticketId.toUpperCase()
    );

    if (!reg) {
      return {
        success: false,
        message: `Pass #${ticketId} not found in central registry. Please verify student ID.`,
      };
    }

    if (reg.status === 'cancelled') {
      return {
        success: false,
        message: `Pass #${ticketId} was cancelled by the student delegate. Admission denied.`,
        reg,
      };
    }

    if (reg.checkedIn) {
      return {
        success: false,
        message: `Pass #${ticketId} was ALREADY checked in earlier at ${new Date(reg.checkedInAt || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Duplicate entry alert!`,
        reg,
      };
    }

    const updatedReg: Registration = {
      ...reg,
      checkedIn: true,
      checkedInAt: new Date().toISOString(),
    };

    setRegistrations((prev) =>
      prev.map((r) => (r.ticketId === reg.ticketId ? updatedReg : r))
    );

    return {
      success: true,
      message: `Verified successfully! Delegate admitted to ${reg.venue}.`,
      reg: updatedReg,
    };
  };

  // Organizer creates new event
  const handleCreateEvent = (newEvent: EventItem) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  // Filter events catalog
  const filteredEvents = events.filter((ev) => {
    if (selectedCategory !== 'all' && ev.category !== selectedCategory) return false;
    if (filterFormat === 'solo' && ev.teamType === 'team') return false;
    if (filterFormat === 'team' && ev.teamType === 'solo') return false;
    if (filterFee === 'free' && ev.fee > 0) return false;
    if (filterFee === 'paid' && ev.fee === 0) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ev.title.toLowerCase().includes(q);
      const matchDesc = ev.description.toLowerCase().includes(q);
      const matchDept = ev.department.toLowerCase().includes(q);
      const matchVenue = ev.venue.toLowerCase().includes(q);
      const matchCategory = ev.category.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchDept && !matchVenue && !matchCategory) {
        return false;
      }
    }

    return true;
  });

  const bookmarkedEventItems = events.filter((e) => bookmarks.includes(e.id));
  const activeConfirmedTickets = registrations.filter((r) => r.status === 'confirmed');

  // Helper when clicking a featured card from the top 5
  const handleFeaturedCategorySelect = (category: string) => {
    setSelectedCategory(category as EventCategory);
    const el = document.getElementById('events-catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectEventByTitle = (keyword: string) => {
    const found = events.find((e) =>
      e.title.toLowerCase().includes(keyword.toLowerCase())
    );
    if (found) {
      setDetailEvent(found);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#060814] text-slate-100 selection:bg-purple-600 selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        bookmarksCount={bookmarks.length}
        ticketsCount={activeConfirmedTickets.length}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onQuickRegister={() => {
          const flagship = events[0] || INITIAL_EVENTS[0];
          setRegisterEvent(flagship);
        }}
      />

      {/* Main View Switch */}
      <main className="flex-1">
        {currentView === 'events' && (
          <>
            {/* 1. Nexora 2026 Giant 3D Holographic Cube Hero matching user image */}
            <NexoraHero
              onRegisterClick={() => {
                const flagship = events[0] || INITIAL_EVENTS[0];
                setRegisterEvent(flagship);
              }}
              onExploreEvents={() => {
                const el = document.getElementById('featured-events-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* 2. Featured Events 5-Card Glowing Carousel matching user image */}
            <NexoraFeaturedEvents
              onSelectCategory={handleFeaturedCategorySelect}
              onExploreAll={() => {
                setSelectedCategory('all');
                const el = document.getElementById('events-catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectEventByTitle={handleSelectEventByTitle}
            />

            {/* 3. Bottom 3-Column: Event Schedule, Why Attend, Gallery matching user image */}
            <NexoraBottomHighlights
              onViewSchedule={() => {
                setCurrentView('schedule');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewAllGallery={() => {
                const el = document.getElementById('events-catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 4. Complete Catalog & Registration Section */}
            <section
              id="events-catalog-section"
              className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 border-t border-purple-900/20"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-purple-900/30 pb-5">
                <div>
                  <span className="text-[11px] font-bold tracking-[0.25em] text-cyan-400 uppercase">
                    COMPETITIONS DIRECTORY
                  </span>
                  <h2 className="mt-0.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    All Festival Competitions & Tracks
                  </h2>
                </div>

                {/* Sub-Filters: Team format & Fee */}
                <div className="flex items-center gap-3">
                  <select
                    value={filterFormat}
                    onChange={(e) => setFilterFormat(e.target.value as any)}
                    className="rounded-lg border border-purple-500/30 bg-[#0c102a] px-3 py-1.5 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="all">Any Team Size</option>
                    <option value="solo">Solo / Individual</option>
                    <option value="team">Team Only</option>
                  </select>

                  <select
                    value={filterFee}
                    onChange={(e) => setFilterFee(e.target.value as any)}
                    className="rounded-lg border border-purple-500/30 bg-[#0c102a] px-3 py-1.5 text-xs text-slate-200 focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="all">Free & Paid</option>
                    <option value="free">Free Events Only</option>
                    <option value="paid">Paid Competitions</option>
                  </select>
                </div>
              </div>

              {/* Category Filter Buttons */}
              <div className="mt-5 flex items-center gap-1.5 overflow-x-auto p-1 bg-[#0c102a]/80 border border-purple-500/20 rounded-xl">
                {(
                  [
                    { id: 'all', label: 'All Tracks' },
                    { id: 'technical', label: 'Hackathons & Tech' },
                    { id: 'cultural', label: 'Cultural & Bands' },
                    { id: 'workshops', label: 'Workshops & Robotics' },
                    { id: 'sports', label: 'Sports Arena' },
                    { id: 'gaming', label: 'Esports' },
                    { id: 'management', label: 'E-Cell & Summits' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                      selectedCategory === tab.id
                        ? 'bg-purple-600 text-white shadow-md glow-button'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Active Filter Indicators & Count */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>
                  Showing <strong className="text-cyan-400 font-mono">{filteredEvents.length}</strong> events
                  {selectedCategory !== 'all' && (
                    <span> in <strong className="capitalize text-purple-300">{selectedCategory}</strong></span>
                  )}
                </span>
                {(searchQuery || selectedCategory !== 'all' || filterFormat !== 'all' || filterFee !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setFilterFormat('all');
                      setFilterFee('all');
                    }}
                    className="font-medium text-cyan-400 hover:underline"
                  >
                    Reset all filters
                  </button>
                )}
              </div>

              {/* Event Cards Grid */}
              {filteredEvents.length === 0 ? (
                <div className="mt-8 rounded-2xl border border-purple-500/20 bg-[#0c102a]/60 p-16 text-center">
                  <h3 className="text-base font-bold text-white">
                    No competitions match your search
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Try altering your search keywords or switching category filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setFilterFormat('all');
                      setFilterFee('all');
                    }}
                    className="mt-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white glow-button"
                  >
                    Show All Competitions
                  </button>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onSelect={(ev) => setDetailEvent(ev)}
                      onRegister={(ev) => setRegisterEvent(ev)}
                      isBookmarked={bookmarks.includes(event.id)}
                      onToggleBookmark={handleToggleBookmark}
                      isRegistered={registeredEventIds.has(event.id)}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {currentView === 'schedule' && (
          <div className="bg-[#060814] text-slate-100 min-h-[70vh]">
            <ScheduleView
              events={events}
              venues={venues}
              onSelectEvent={(ev) => setDetailEvent(ev)}
              onRegisterEvent={(ev) => setRegisterEvent(ev)}
            />
          </div>
        )}

        {currentView === 'my-tickets' && (
          <div className="bg-[#060814] text-slate-100 min-h-[70vh]">
            <MyTicketsView
              registrations={registrations}
              onSelectRegistration={(reg) => setActiveDigitalPass(reg)}
              onCancelRegistration={handleCancelRegistration}
              onBrowseEvents={() => {
                setCurrentView('events');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {currentView === 'organizer' && (
          <div className="bg-[#060814] text-slate-100 min-h-[70vh]">
            <OrganizerPortal
              events={events}
              registrations={registrations}
              venues={venues}
              onCheckInTicket={handleCheckInTicket}
              onCreateEvent={handleCreateEvent}
            />
          </div>
        )}
      </main>

      {/* Global Modals & Drawers */}
      <EventDetailModal
        event={detailEvent}
        isOpen={!!detailEvent}
        onClose={() => setDetailEvent(null)}
        onRegister={(ev) => {
          setDetailEvent(null);
          setRegisterEvent(ev);
        }}
        isBookmarked={detailEvent ? bookmarks.includes(detailEvent.id) : false}
        onToggleBookmark={handleToggleBookmark}
        isRegistered={detailEvent ? registeredEventIds.has(detailEvent.id) : false}
        onViewPass={() => {
          if (detailEvent) {
            const matchReg = registrations.find(
              (r) => r.eventId === detailEvent.id && r.status === 'confirmed'
            );
            if (matchReg) setActiveDigitalPass(matchReg);
          }
        }}
      />

      {registerEvent && (
        <RegistrationModal
          event={registerEvent}
          isOpen={!!registerEvent}
          onClose={() => setRegisterEvent(null)}
          onSuccess={handleRegistrationSuccess}
        />
      )}

      {activeDigitalPass && (
        <DigitalPassModal
          registration={activeDigitalPass}
          isOpen={!!activeDigitalPass}
          onClose={() => setActiveDigitalPass(null)}
        />
      )}

      <BookmarksDrawer
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarkedEvents={bookmarkedEventItems}
        onSelectEvent={(ev) => setDetailEvent(ev)}
        onRemoveBookmark={handleToggleBookmark}
        onRegisterEvent={(ev) => setRegisterEvent(ev)}
      />

      {/* Nexora Footer */}
      <Footer onNavigate={(view) => setCurrentView(view)} />
    </div>
  );
}
