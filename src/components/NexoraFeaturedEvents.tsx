import React, { useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Cpu,
  Laptop,
  Lightbulb,
  Music,
  Gamepad2,
  Sparkles,
  PartyPopper,
  Briefcase,
  Bot,
  BrainCircuit,
} from 'lucide-react';

interface FeaturedCategoryCard {
  id: string;
  title: string;
  tags: string;
  categoryFilter: string;
  trackType: 'technical' | 'non-technical';
  borderClass: string;
  bgGlowClass: string;
  accentText: string;
  svgIcon: React.ReactNode;
}

interface NexoraFeaturedEventsProps {
  onSelectCategory: (category: string) => void;
  onExploreAll: () => void;
  onSelectEventByTitle: (keyword: string) => void;
}

export function NexoraFeaturedEvents({
  onSelectCategory,
  onExploreAll,
  onSelectEventByTitle,
}: NexoraFeaturedEventsProps) {
  const [activeTab, setActiveTab] = useState<'both' | 'technical' | 'non-technical'>('both');

  const techScrollRef = useRef<HTMLDivElement>(null);
  const nonTechScrollRef = useRef<HTMLDivElement>(null);

  const technicalCards: FeaturedCategoryCard[] = [
    {
      id: 'hackathon',
      title: 'Hackathon',
      tags: 'Think | Build | Solve',
      categoryFilter: 'technical',
      trackType: 'technical',
      borderClass: 'border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.45)]',
      bgGlowClass: 'from-cyan-950/40 via-[#0a122c] to-[#070b1a]',
      accentText: 'text-cyan-400',
      svgIcon: (
        <div className="relative flex h-24 w-full items-center justify-center">
          <div className="relative flex flex-col items-center">
            <div className="relative flex h-16 w-24 items-center justify-center rounded-t-lg border-2 border-cyan-400 bg-slate-950/80 shadow-[0_0_20px_rgba(6,182,212,0.6)]">
              <span className="font-mono text-sm font-extrabold text-cyan-300 drop-shadow-[0_0_8px_#38bdf8]">
                &lt;/&gt;
              </span>
              <div className="absolute top-1.5 left-2 h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
            </div>
            <div className="h-2 w-28 rounded-b-md bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-600 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
          </div>
        </div>
      ),
    },
    {
      id: 'technical-events',
      title: 'Technical Events',
      tags: 'Learn | Compete | Innovate',
      categoryFilter: 'technical',
      trackType: 'technical',
      borderClass: 'border-teal-500/40 hover:border-teal-400 hover:shadow-[0_0_25px_rgba(20,184,166,0.45)]',
      bgGlowClass: 'from-teal-950/40 via-[#0a1b24] to-[#070b1a]',
      accentText: 'text-teal-400',
      svgIcon: (
        <div className="relative flex h-24 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-16 w-16 rounded-full bg-teal-500/20 blur-md" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-400/60 bg-slate-950/80 shadow-[0_0_20px_rgba(20,184,166,0.5)]">
              <Lightbulb className="h-9 w-9 text-amber-300 filter drop-shadow-[0_0_12px_#fde047]" />
            </div>
            <div className="absolute -right-2 -bottom-1 h-6 w-6 rounded-full border border-teal-400 bg-slate-900 flex items-center justify-center text-[10px] text-teal-300">
              ⚙
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'robotics-arena',
      title: 'Robotics & Combat Wars',
      tags: 'Design | Fabricate | Battle',
      categoryFilter: 'workshops',
      trackType: 'technical',
      borderClass: 'border-blue-500/40 hover:border-blue-400 hover:shadow-[0_0_25px_rgba(59,130,246,0.45)]',
      bgGlowClass: 'from-blue-950/40 via-[#0a1532] to-[#070b1a]',
      accentText: 'text-blue-400',
      svgIcon: (
        <div className="relative flex h-24 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-16 w-16 rounded-full bg-blue-500/25 blur-lg" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-blue-400 bg-slate-950/80 shadow-[0_0_25px_rgba(59,130,246,0.5)]">
              <Bot className="h-9 w-9 text-blue-300 drop-shadow-[0_0_10px_#60a5fa]" />
            </div>
            <div className="absolute -top-1 -right-2 text-[10px] font-bold text-cyan-300 font-mono">
              2.4G
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ai-promptcraft',
      title: 'AI & Web3 Systems',
      tags: 'Prompt | Model | Deploy',
      categoryFilter: 'workshops',
      trackType: 'technical',
      borderClass: 'border-indigo-500/40 hover:border-indigo-400 hover:shadow-[0_0_25px_rgba(99,102,241,0.45)]',
      bgGlowClass: 'from-indigo-950/40 via-[#0e1136] to-[#070b1a]',
      accentText: 'text-indigo-400',
      svgIcon: (
        <div className="relative flex h-24 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-16 w-16 rounded-full bg-indigo-500/25 blur-lg" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-indigo-400 bg-slate-950/80 shadow-[0_0_25px_rgba(99,102,241,0.5)]">
              <BrainCircuit className="h-9 w-9 text-indigo-300 drop-shadow-[0_0_10px_#818cf8]" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const nonTechnicalCards: FeaturedCategoryCard[] = [
    {
      id: 'cultural-fest',
      title: 'Cultural Fest',
      tags: 'Dance | Music | Arts',
      categoryFilter: 'cultural',
      trackType: 'non-technical',
      borderClass: 'border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_25px_rgba(245,158,11,0.45)]',
      bgGlowClass: 'from-amber-950/40 via-[#1c120c] to-[#070b1a]',
      accentText: 'text-amber-400',
      svgIcon: (
        <div className="relative flex h-24 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-16 w-16 rounded-full bg-amber-500/25 blur-lg" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-400 bg-slate-950/80 shadow-[0_0_25px_rgba(245,158,11,0.6)]">
              <Sparkles className="h-8 w-8 text-amber-400" />
            </div>
            <div className="absolute -top-1 -right-2 text-amber-300 text-xs font-bold animate-pulse">
              ♫
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'gaming',
      title: 'Gaming & Esports',
      tags: 'Play | Compete | Win',
      categoryFilter: 'gaming',
      trackType: 'non-technical',
      borderClass: 'border-purple-500/40 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.45)]',
      bgGlowClass: 'from-purple-950/40 via-[#160c28] to-[#070b1a]',
      accentText: 'text-purple-400',
      svgIcon: (
        <div className="relative flex h-24 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-16 w-16 rounded-full bg-purple-600/30 blur-lg" />
            <div className="relative flex h-16 w-20 items-center justify-center rounded-2xl border-2 border-purple-400 bg-slate-950/80 shadow-[0_0_25px_rgba(168,85,247,0.6)]">
              <Gamepad2 className="h-10 w-10 text-purple-300 drop-shadow-[0_0_10px_#c084fc]" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'fun-events',
      title: 'Fun Events',
      tags: 'Games | Food | Entertainment',
      categoryFilter: 'sports',
      trackType: 'non-technical',
      borderClass: 'border-pink-500/40 hover:border-pink-400 hover:shadow-[0_0_25px_rgba(236,72,153,0.45)]',
      bgGlowClass: 'from-pink-950/40 via-[#200c1e] to-[#070b1a]',
      accentText: 'text-pink-400',
      svgIcon: (
        <div className="relative flex h-24 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-16 w-16 rounded-full bg-pink-500/25 blur-lg" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-pink-400 bg-slate-950/80 shadow-[0_0_25px_rgba(236,72,153,0.6)]">
              <PartyPopper className="h-8 w-8 text-pink-300 drop-shadow-[0_0_10px_#f472b6]" />
            </div>
            <div className="absolute -top-1 -right-2 text-pink-300 text-xs font-bold">
              ♪
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'management-ecell',
      title: 'Management & Pitch',
      tags: 'Pitch | Negotiate | Lead',
      categoryFilter: 'management',
      trackType: 'non-technical',
      borderClass: 'border-rose-500/40 hover:border-rose-400 hover:shadow-[0_0_25px_rgba(244,63,94,0.45)]',
      bgGlowClass: 'from-rose-950/40 via-[#1c0c16] to-[#070b1a]',
      accentText: 'text-rose-400',
      svgIcon: (
        <div className="relative flex h-24 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-16 w-16 rounded-full bg-rose-500/25 blur-lg" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-rose-400 bg-slate-950/80 shadow-[0_0_25px_rgba(244,63,94,0.6)]">
              <Briefcase className="h-9 w-9 text-rose-300 drop-shadow-[0_0_10px_#fb7185]" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (!ref.current) return;
    const scrollAmount = 300;
    ref.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const renderCardRow = (cards: FeaturedCategoryCard[], ref: React.RefObject<HTMLDivElement | null>) => (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={() => handleScroll(ref, 'left')}
        aria-label="Scroll left"
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-purple-500/30 bg-[#0a0d24]/90 text-white backdrop-blur-md transition hover:border-purple-400 hover:bg-purple-900/50"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => handleScroll(ref, 'right')}
        aria-label="Scroll right"
        className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-purple-500/30 bg-[#0a0d24]/90 text-white backdrop-blur-md transition hover:border-purple-400 hover:bg-purple-900/50"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Cards Row */}
      <div
        ref={ref}
        className="flex items-stretch gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => {
              onSelectCategory(card.categoryFilter);
              onSelectEventByTitle(card.title);
            }}
            className={`group flex min-w-[220px] max-w-[280px] flex-1 flex-col justify-between rounded-2xl border ${card.borderClass} bg-gradient-to-b ${card.bgGlowClass} p-5 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer`}
          >
            {/* Visual Icon / Mascot */}
            <div className="py-2">{card.svgIcon}</div>

            {/* Card Info */}
            <div className="mt-4 text-center">
              <h3 className="text-base font-bold text-white transition-colors group-hover:text-cyan-300 sm:text-lg">
                {card.title}
              </h3>
              <div className="mt-1 text-[11px] font-medium text-slate-400">
                {card.tags}
              </div>
            </div>

            {/* View Details Action Link */}
            <div className="mt-5 border-t border-white/5 pt-3 text-center">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-bold ${card.accentText} transition group-hover:underline`}
              >
                <span>View Details</span>
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="featured-events-section" className="relative bg-[#060814] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Track View Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-purple-900/20 pb-4">
          <div>
            <span className="text-[11px] font-bold tracking-[0.25em] text-cyan-400 uppercase">
              CATEGORIZED TRACKS
            </span>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Featured Events by Category
            </h2>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-xl bg-[#0c102a] border border-purple-500/20 text-xs">
            <button
              onClick={() => setActiveTab('both')}
              className={`rounded-lg px-3.5 py-1.5 font-semibold transition ${
                activeTab === 'both'
                  ? 'bg-purple-600 text-white shadow-md glow-button'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Featured Tracks
            </button>
            <button
              onClick={() => setActiveTab('technical')}
              className={`rounded-lg px-3.5 py-1.5 font-semibold transition ${
                activeTab === 'technical'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Technical Events
            </button>
            <button
              onClick={() => setActiveTab('non-technical')}
              className={`rounded-lg px-3.5 py-1.5 font-semibold transition ${
                activeTab === 'non-technical'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Non-Technical Events
            </button>
          </div>
        </div>

        {/* 1. SEPARATE TITLE: TECHNICAL EVENTS */}
        {(activeTab === 'both' || activeTab === 'technical') && (
          <div className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-[0.25em] text-cyan-400 uppercase">
                  OUR EVENTS · ENGINEERING & CODE
                </span>
                <h3 className="mt-0.5 text-2xl font-bold tracking-tight text-white sm:text-3xl flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                  <span>Technical Events</span>
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  National hackathons, speed debugging, robotics combat, and artificial intelligence workshops.
                </p>
              </div>

              <button
                onClick={() => {
                  onSelectCategory('technical');
                  onExploreAll();
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:underline transition"
              >
                <span>View All Technical Events</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {renderCardRow(technicalCards, techScrollRef)}
          </div>
        )}

        {/* 2. SEPARATE TITLE: NON-TECHNICAL EVENTS */}
        {(activeTab === 'both' || activeTab === 'non-technical') && (
          <div className="space-y-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-[0.25em] text-pink-400 uppercase">
                  OUR EVENTS · CULTURE & ENTERTAINMENT
                </span>
                <h3 className="mt-0.5 text-2xl font-bold tracking-tight text-white sm:text-3xl flex items-center gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-pink-400 shadow-[0_0_10px_#f472b6]" />
                  <span>Non-Technical Events</span>
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Battle of the bands, inter-college dance trophies, esports championships, and startup pitches.
                </p>
              </div>

              <button
                onClick={() => {
                  onSelectCategory('cultural');
                  onExploreAll();
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:underline transition"
              >
                <span>View All Non-Technical Events</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {renderCardRow(nonTechnicalCards, nonTechScrollRef)}
          </div>
        )}
      </div>
    </section>
  );
}
