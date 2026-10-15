import React, { useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Cpu,
  Laptop,
  FileText,
  Bug,
  HelpCircle,
  Wrench,
  Music,
  Gamepad2,
  Mic,
  Palette,
  Megaphone,
  Video,
  Smile,
  Sparkles,
  LayoutGrid,
  SlidersHorizontal,
  Trophy,
  Calendar,
  MapPin,
} from 'lucide-react';

export interface FeaturedCardData {
  id: string;
  title: string;
  tags: string;
  trackType: 'technical' | 'non-technical';
  categoryFilter: string;
  prize: string;
  date: string;
  venue: string;
  glowColor: string;
  borderColor: string;
  svgIcon: React.ReactNode;
}

interface NexoraFeaturedEventsProps {
  onSelectCategory: (category: string) => void;
  onExploreAll: () => void;
  onSelectEventByTitle: (keyword: string) => void;
  onRegisterByTitle: (keyword: string) => void;
}

export function NexoraFeaturedEvents({
  onSelectCategory,
  onExploreAll,
  onSelectEventByTitle,
  onRegisterByTitle,
}: NexoraFeaturedEventsProps) {
  const [filterTrack, setFilterTrack] = useState<'all' | 'technical' | 'non-technical'>('all');
  const [techDisplayMode, setTechDisplayMode] = useState<'slider' | 'grid'>('slider');
  const [nonTechDisplayMode, setNonTechDisplayMode] = useState<'slider' | 'grid'>('slider');

  const techScrollRef = useRef<HTMLDivElement>(null);
  const nonTechScrollRef = useRef<HTMLDivElement>(null);

  // ================= TECHNICAL EVENTS (6 Events including Workshop) =================
  const technicalCards: FeaturedCardData[] = [
    {
      id: 'hackathon',
      title: 'Hackathon',
      tags: 'Think | Build | Solve',
      trackType: 'technical',
      categoryFilter: 'technical',
      prize: '₹75,000',
      date: '15 Mar · 09:00 AM',
      venue: 'Turing Lab · Sona College',
      glowColor: 'rgba(56, 189, 248, 0.4)',
      borderColor: 'border-[#38bdf8]/60',
      svgIcon: (
        <div className="relative flex h-20 w-full items-center justify-center">
          <div className="relative flex flex-col items-center">
            <div className="relative flex h-14 w-20 items-center justify-center rounded-t-lg border-2 border-[#38bdf8] bg-[#070c24] shadow-[0_0_20px_rgba(56,189,248,0.5)]">
              <span className="font-mono text-sm font-extrabold text-[#38bdf8] drop-shadow-[0_0_8px_#38bdf8]">
                &lt;/&gt;
              </span>
              <div className="absolute top-1.5 left-2 h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
            </div>
            <div className="h-1.5 w-24 rounded-b-md bg-gradient-to-r from-[#38bdf8] via-[#a78bfa] to-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.7)]" />
          </div>
        </div>
      ),
    },
    {
      id: 'workshop',
      title: 'Workshop',
      tags: 'Learn | Build | Innovate',
      trackType: 'technical',
      categoryFilter: 'workshops',
      prize: 'Kit + Certificate',
      date: '15 Mar · 11:00 AM',
      venue: 'Robotics Lab · Sona College',
      glowColor: 'rgba(245, 158, 11, 0.4)',
      borderColor: 'border-[#f59e0b]/60',
      svgIcon: (
        <div className="relative flex h-20 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-14 w-14 rounded-full bg-[#f59e0b]/20 blur-md" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#f59e0b] bg-[#070c24] shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              <span className="text-2xl">💡</span>
            </div>
            <div className="absolute -top-1 -right-2 text-xs font-bold text-[#38bdf8] animate-spin">
              ⚙️
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'circuit-design',
      title: 'Circuit Design',
      tags: 'Trace | Simulate | Solder',
      trackType: 'technical',
      categoryFilter: 'technical',
      prize: '₹25,000',
      date: '15 Mar · 11:00 AM',
      venue: 'VLSI Wing · Sona College',
      glowColor: 'rgba(56, 189, 248, 0.4)',
      borderColor: 'border-[#38bdf8]/60',
      svgIcon: (
        <div className="relative flex h-20 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-14 w-14 rounded-full bg-[#38bdf8]/20 blur-md" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#38bdf8]/80 bg-[#070c24] shadow-[0_0_20px_rgba(56,189,248,0.5)]">
              <Cpu className="h-8 w-8 text-[#7dd3fc] drop-shadow-[0_0_10px_#38bdf8]" />
            </div>
            <div className="absolute -right-2 -bottom-1 h-5 w-5 rounded-full border border-[#38bdf8] bg-[#050816] flex items-center justify-center text-[9px] text-[#38bdf8] font-mono font-bold">
              IC
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'paper-presentation',
      title: 'Paper Presentation',
      tags: 'Research | Document | Present',
      trackType: 'technical',
      categoryFilter: 'technical',
      prize: '₹30,000',
      date: '16 Mar · 10:00 AM',
      venue: 'Executive Hall · Sona College',
      glowColor: 'rgba(167, 139, 250, 0.4)',
      borderColor: 'border-[#a78bfa]/60',
      svgIcon: (
        <div className="relative flex h-20 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-14 w-14 rounded-full bg-[#a78bfa]/20 blur-md" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#a78bfa] bg-[#070c24] shadow-[0_0_20px_rgba(167,139,250,0.5)]">
              <FileText className="h-8 w-8 text-[#c4b5fd] drop-shadow-[0_0_10px_#a78bfa]" />
            </div>
            <div className="absolute -top-1 -right-2 text-[9px] font-bold text-[#38bdf8] font-mono">
              IEEE
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'debugging',
      title: 'Debugging',
      tags: 'Inspect | Trace | Fix',
      trackType: 'technical',
      categoryFilter: 'technical',
      prize: '₹20,000',
      date: '15 Mar · 02:30 PM',
      venue: 'Computing Lab · Sona College',
      glowColor: 'rgba(236, 72, 153, 0.4)',
      borderColor: 'border-[#ec4899]/60',
      svgIcon: (
        <div className="relative flex h-20 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-14 w-14 rounded-full bg-[#ec4899]/20 blur-md" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#ec4899] bg-[#070c24] shadow-[0_0_20px_rgba(236,72,153,0.5)]">
              <Bug className="h-8 w-8 text-[#f472b6] drop-shadow-[0_0_10px_#ec4899]" />
            </div>
            <div className="absolute -top-1 -right-2 text-[10px] font-mono text-[#38bdf8] font-bold">
              0x0
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'quiz-competition',
      title: 'Quiz Competition',
      tags: 'Buzzer | Knowledge | Win',
      trackType: 'technical',
      categoryFilter: 'technical',
      prize: '₹25,000',
      date: '16 Mar · 02:00 PM',
      venue: 'Auditorium · Sona College',
      glowColor: 'rgba(124, 58, 237, 0.4)',
      borderColor: 'border-[#7c3aed]/60',
      svgIcon: (
        <div className="relative flex h-20 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-14 w-14 rounded-full bg-[#7c3aed]/20 blur-md" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#7c3aed] bg-[#070c24] shadow-[0_0_20px_rgba(124,58,237,0.5)]">
              <HelpCircle className="h-8 w-8 text-[#a78bfa] drop-shadow-[0_0_10px_#7c3aed]" />
            </div>
            <div className="absolute -top-1 -right-2 text-xs font-bold text-[#38bdf8] animate-bounce">
              ⚡
            </div>
          </div>
        </div>
      ),
    },
  ];

  // ================= NON-TECHNICAL EVENTS (7 Events) =================
  const nonTechnicalCards: FeaturedCardData[] = [
    {
      id: 'cultural-fest',
      title: 'Cultural Fest',
      tags: 'Dance | Music | Arts',
      trackType: 'non-technical',
      categoryFilter: 'cultural',
      prize: '₹60,000',
      date: '16 Mar · 05:30 PM',
      venue: 'Amphitheatre · Sona College',
      glowColor: 'rgba(249, 115, 22, 0.4)',
      borderColor: 'border-[#f97316]/60',
      svgIcon: (
        <div className="relative flex h-20 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-14 w-14 rounded-full bg-[#f97316]/20 blur-md" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#f97316] bg-[#070c24] shadow-[0_0_20px_rgba(249,115,22,0.5)]">
              <Sparkles className="h-7 w-7 text-[#fb923c]" />
            </div>
            <div className="absolute -top-1 -right-2 text-[#f97316] text-xs font-bold animate-pulse">
              ♫
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'gaming',
      title: 'Gaming',
      tags: 'Play | Compete | Win',
      trackType: 'non-technical',
      categoryFilter: 'gaming',
      prize: '₹35,000',
      date: '15 Mar · 12:00 PM',
      venue: 'Esports Arena · Sona College',
      glowColor: 'rgba(168, 85, 247, 0.45)',
      borderColor: 'border-[#a855f7]/60',
      svgIcon: (
        <div className="relative flex h-20 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-14 w-14 rounded-full bg-[#a855f7]/25 blur-md" />
            <div className="relative flex h-14 w-18 items-center justify-center rounded-2xl border-2 border-[#a855f7] bg-[#070c24] shadow-[0_0_20px_rgba(168,85,247,0.5)]">
              <Gamepad2 className="h-9 w-9 text-[#c084fc] drop-shadow-[0_0_10px_#a855f7]" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'singing-competition',
      title: 'Singing Competition',
      tags: 'Vocals | Melody | Pitch',
      trackType: 'non-technical',
      categoryFilter: 'cultural',
      prize: '₹20,000',
      date: '16 Mar · 11:00 AM',
      venue: 'Acoustic Hall · Sona College',
      glowColor: 'rgba(236, 72, 153, 0.4)',
      borderColor: 'border-[#ec4899]/60',
      svgIcon: (
        <div className="relative flex h-20 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-14 w-14 rounded-full bg-[#ec4899]/20 blur-md" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#ec4899] bg-[#070c24] shadow-[0_0_20px_rgba(236,72,153,0.5)]">
              <Mic className="h-8 w-8 text-[#f472b6] drop-shadow-[0_0_10px_#ec4899]" />
            </div>
            <div className="absolute -top-1 -right-2 text-xs font-bold text-[#f472b6]">
              🎙️
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'drawing-competition',
      title: 'Drawing Competition',
      tags: 'Sketch | Paint | Express',
      trackType: 'non-technical',
      categoryFilter: 'cultural',
      prize: '₹15,000',
      date: '16 Mar · 01:30 PM',
      venue: 'Media Studio · Sona College',
      glowColor: 'rgba(20, 184, 166, 0.4)',
      borderColor: 'border-[#14b8a6]/60',
      svgIcon: (
        <div className="relative flex h-20 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-14 w-14 rounded-full bg-[#14b8a6]/20 blur-md" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#14b8a6] bg-[#070c24] shadow-[0_0_20px_rgba(14,165,233,0.5)]">
              <Palette className="h-8 w-8 text-[#2dd4bf] drop-shadow-[0_0_10px_#14b8a6]" />
            </div>
            <div className="absolute -top-1 -right-2 text-xs">
              🎨
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'adzap',
      title: 'Adzap',
      tags: 'Pitch | Act | Persuade',
      trackType: 'non-technical',
      categoryFilter: 'management',
      prize: '₹20,000',
      date: '17 Mar · 10:00 AM',
      venue: 'Seminar Hall · Sona College',
      glowColor: 'rgba(234, 179, 8, 0.4)',
      borderColor: 'border-[#eab308]/60',
      svgIcon: (
        <div className="relative flex h-20 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-14 w-14 rounded-full bg-[#eab308]/20 blur-md" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#eab308] bg-[#070c24] shadow-[0_0_20px_rgba(234,179,8,0.5)]">
              <Megaphone className="h-8 w-8 text-[#facc15] drop-shadow-[0_0_10px_#eab308]" />
            </div>
            <div className="absolute -top-1 -right-2 text-xs font-bold text-white">
              📣
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'reel-making',
      title: 'Reel Making',
      tags: 'Shoot | Edit | Viral',
      trackType: 'non-technical',
      categoryFilter: 'cultural',
      prize: '₹15,000',
      date: '17 Mar · 11:30 AM',
      venue: 'Central Quad · Sona College',
      glowColor: 'rgba(239, 68, 68, 0.4)',
      borderColor: 'border-[#ef4444]/60',
      svgIcon: (
        <div className="relative flex h-20 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-14 w-14 rounded-full bg-[#ef4444]/20 blur-md" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#ef4444] bg-[#070c24] shadow-[0_0_20px_rgba(239,68,68,0.5)]">
              <Video className="h-8 w-8 text-[#f87171] drop-shadow-[0_0_10px_#ef4444]" />
            </div>
            <div className="absolute -top-1 -right-2 text-xs font-bold text-white animate-pulse">
              🔴
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'meme-creation',
      title: 'Meme Creation',
      tags: 'Humor | Relatable | Wit',
      trackType: 'non-technical',
      categoryFilter: 'cultural',
      prize: '₹10,000',
      date: '17 Mar · 01:30 PM',
      venue: 'Design Lab · Sona College',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      borderColor: 'border-[#3b82f6]/60',
      svgIcon: (
        <div className="relative flex h-20 w-full items-center justify-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-14 w-14 rounded-full bg-[#3b82f6]/20 blur-md" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#3b82f6] bg-[#070c24] shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              <Smile className="h-8 w-8 text-[#60a5fa] drop-shadow-[0_0_10px_#3b82f6]" />
            </div>
            <div className="absolute -top-1 -right-2 text-xs font-bold text-amber-300">
              😂
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const renderCard = (card: FeaturedCardData) => (
    <div
      key={card.id}
      className={`group flex flex-col justify-between rounded-2xl border ${card.borderColor} bg-[#0b102e]/90 p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_35px_${card.glowColor}] shadow-xl backdrop-blur-md`}
    >
      {/* Top Header Badge & Prize */}
      <div className="flex items-center justify-between text-xs pb-1">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
            card.trackType === 'technical'
              ? 'bg-[#0f1b40] text-[#38bdf8] border border-[#38bdf8]/40 shadow-[0_0_8px_rgba(56,189,248,0.3)]'
              : 'bg-[#21113b] text-[#c084fc] border border-[#c084fc]/40 shadow-[0_0_8px_rgba(192,132,252,0.3)]'
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
          {card.trackType === 'technical' ? 'Technical' : 'Non-Technical'}
        </span>

        <span className="flex items-center gap-1 font-bold text-[#bae6fd] text-[11px]">
          <Trophy className="h-3 w-3 text-[#facc15]" />
          <span>{card.prize}</span>
        </span>
      </div>

      {/* Visual Mascot */}
      <div
        onClick={() => {
          onSelectCategory(card.categoryFilter);
          onSelectEventByTitle(card.title);
        }}
        className="py-3 cursor-pointer group-hover:scale-105 transition-transform duration-300"
      >
        {card.svgIcon}
      </div>

      {/* Card Info with Pure White Bold Title */}
      <div className="text-center">
        <h4
          onClick={() => {
            onSelectCategory(card.categoryFilter);
            onSelectEventByTitle(card.title);
          }}
          className="text-base font-bold text-white transition-colors group-hover:text-[#38bdf8] sm:text-lg cursor-pointer"
        >
          {card.title}
        </h4>
        <div className="mt-1 text-[11px] font-medium text-slate-300">
          {card.tags}
        </div>

        {/* Schedule & Venue Quick Snippet */}
        <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-slate-400 border-t border-[#1b234d] pt-2">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-[#38bdf8]" />
            <span>{card.date}</span>
          </span>
          <span className="text-slate-600">·</span>
          <span className="flex items-center gap-1 truncate max-w-[130px]">
            <MapPin className="h-3 w-3 text-[#a78bfa]" />
            <span>{card.venue}</span>
          </span>
        </div>
      </div>

      {/* Action Buttons: View Details + Purple Register Button */}
      <div className="mt-4 flex items-center gap-2 border-t border-[#1b234d] pt-3">
        <button
          onClick={() => {
            onSelectCategory(card.categoryFilter);
            onSelectEventByTitle(card.title);
          }}
          className="flex-1 rounded-full border border-[#273260] bg-[#0c1236] py-2 px-2 text-xs font-semibold text-slate-200 transition hover:border-[#38bdf8] hover:text-white text-center"
        >
          View Details →
        </button>

        <button
          onClick={() => onRegisterByTitle(card.title)}
          className="flex-1 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] py-2 px-2 text-xs font-bold text-white shadow-[0_0_15px_rgba(124,58,237,0.5)] transition hover:from-[#8b5cf6] hover:to-[#7c3aed] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>Register</span>
          <ArrowRight className="h-3 w-3 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );

  return (
    <section id="featured-events-section" className="relative bg-[#050816] py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Top Header matching Screenshot: OUR EVENTS | Featured Events | Explore All Events → */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#1b2348] pb-5">
          <div>
            <div className="text-[11px] font-bold tracking-[0.25em] text-[#38bdf8] uppercase">
              OUR EVENTS
            </div>
            {/* Pure White Bold Heading */}
            <h2 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Featured Events
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Flagship technical tournaments and cultural stages at Sona College of Technology.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Track Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#0c1236] border border-[#273260] text-xs">
              <button
                onClick={() => setFilterTrack('all')}
                className={`rounded-full px-3.5 py-1.5 font-bold transition flex items-center gap-1.5 ${
                  filterTrack === 'all'
                    ? 'bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>All Tracks</span>
                <span className="rounded-full bg-black/40 px-1.5 py-0.2 text-[10px] font-mono">13</span>
              </button>
              <button
                onClick={() => setFilterTrack('technical')}
                className={`rounded-full px-3.5 py-1.5 font-bold transition flex items-center gap-1.5 ${
                  filterTrack === 'technical'
                    ? 'bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]'
                    : 'text-slate-400 hover:text-[#38bdf8]'
                }`}
              >
                <span>Technical</span>
                <span className="rounded-full bg-black/40 px-1.5 py-0.2 text-[10px] font-mono">6</span>
              </button>
              <button
                onClick={() => setFilterTrack('non-technical')}
                className={`rounded-full px-3.5 py-1.5 font-bold transition flex items-center gap-1.5 ${
                  filterTrack === 'non-technical'
                    ? 'bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]'
                    : 'text-slate-400 hover:text-[#c084fc]'
                }`}
              >
                <span>Non-Technical</span>
                <span className="rounded-full bg-black/40 px-1.5 py-0.2 text-[10px] font-mono">7</span>
              </button>
            </div>

            <button
              onClick={onExploreAll}
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#38bdf8] hover:underline"
            >
              <span>Explore All Events</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            SECTION 1: TECHNICAL EVENTS (Hackathon, Circuit Design, Paper Presentation, Debugging, Quiz, Workshop)
           ========================================================================= */}
        {(filterTrack === 'all' || filterTrack === 'technical') && (
          <div className="space-y-6 rounded-3xl border border-[#232c58] bg-[#090d28]/90 p-6 sm:p-8 shadow-[0_0_50px_rgba(56,189,248,0.1)] backdrop-blur-md">
            {/* Prominent Technical Title Bar */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-[#1b2348] pb-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#38bdf8]/50 bg-[#0c1a3a] px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#38bdf8]">
                  <span className="h-2 w-2 rounded-full bg-[#38bdf8] shadow-[0_0_10px_#38bdf8] animate-pulse" />
                  <span>TECHNICAL EVENTS</span>
                </div>
                {/* Pure White Bold Heading */}
                <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl flex items-center gap-3">
                  <span>Technical Competitions & Workshops</span>
                  <span className="text-sm font-semibold font-mono text-[#38bdf8] bg-[#0c1638] border border-[#38bdf8]/40 px-2.5 py-0.5 rounded-full">
                    6 Events
                  </span>
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-300 font-medium">
                  <strong>Featured in Technical:</strong> <span className="text-[#bae6fd]">Hackathon · Circuit Design · Paper Presentation · Debugging · Quiz Competition · Workshop</span>
                </p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full border border-[#273260] bg-[#0c1236] p-1 text-xs">
                  <button
                    onClick={() => setTechDisplayMode('slider')}
                    title="Carousel Slider View"
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition ${
                      techDisplayMode === 'slider'
                        ? 'bg-[#7c3aed] text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Slider</span>
                  </button>
                  <button
                    onClick={() => setTechDisplayMode('grid')}
                    title="Grid View (All 6)"
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition ${
                      techDisplayMode === 'grid'
                        ? 'bg-[#7c3aed] text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">All 6 Grid</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    onSelectCategory('technical');
                    onExploreAll();
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#38bdf8] hover:underline transition"
                >
                  <span>Catalog</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Content Display: Slider or Grid */}
            {techDisplayMode === 'slider' ? (
              <div className="relative">
                {/* Left Navigation Arrow */}
                <button
                  onClick={() => handleScroll(techScrollRef, 'left')}
                  aria-label="Scroll Technical Left"
                  className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#273260] bg-[#0c1236]/95 text-[#38bdf8] shadow-lg backdrop-blur-md transition hover:border-[#38bdf8] hover:bg-[#151f50] hover:scale-105 active:scale-95"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  onClick={() => handleScroll(techScrollRef, 'right')}
                  aria-label="Scroll Technical Right"
                  className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#273260] bg-[#0c1236]/95 text-[#38bdf8] shadow-lg backdrop-blur-md transition hover:border-[#38bdf8] hover:bg-[#151f50] hover:scale-105 active:scale-95"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Horizontal Scroll Row */}
                <div
                  ref={techScrollRef}
                  className="flex items-stretch gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth no-scrollbar"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {technicalCards.map((card) => (
                    <div key={card.id} className="min-w-[250px] max-w-[285px] flex-1">
                      {renderCard(card)}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
                {technicalCards.map((card) => renderCard(card))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            SECTION 2: NON-TECHNICAL EVENTS
            (Cultural Fest, Gaming, Singing Competition, Drawing Competition, Adzap, Reel Making, Meme Creation)
           ========================================================================= */}
        {(filterTrack === 'all' || filterTrack === 'non-technical') && (
          <div className="space-y-6 rounded-3xl border border-[#2c2358] bg-[#0d0928]/90 p-6 sm:p-8 shadow-[0_0_50px_rgba(168,85,247,0.1)] backdrop-blur-md">
            {/* Prominent Non-Technical Title Bar */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-[#1b2348] pb-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#c084fc]/50 bg-[#22103d] px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#c084fc]">
                  <span className="h-2 w-2 rounded-full bg-[#c084fc] shadow-[0_0_10px_#c084fc] animate-pulse" />
                  <span>NON-TECHNICAL EVENTS</span>
                </div>
                {/* Pure White Bold Heading */}
                <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl flex items-center gap-3">
                  <span>Cultural, Gaming & Creative Arts</span>
                  <span className="text-sm font-semibold font-mono text-[#c084fc] bg-[#1a0e33] border border-[#c084fc]/40 px-2.5 py-0.5 rounded-full">
                    7 Events
                  </span>
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-300 font-medium">
                  <strong>Featured in Non-Technical:</strong> <span className="text-[#e9d5ff]">Cultural Fest · Gaming · Singing Competition · Drawing Competition · Adzap · Reel Making · Meme Creation</span>
                </p>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full border border-[#273260] bg-[#0c1236] p-1 text-xs">
                  <button
                    onClick={() => setNonTechDisplayMode('slider')}
                    title="Carousel Slider View"
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition ${
                      nonTechDisplayMode === 'slider'
                        ? 'bg-[#7c3aed] text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Slider</span>
                  </button>
                  <button
                    onClick={() => setNonTechDisplayMode('grid')}
                    title="Grid View (All 7)"
                    className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition ${
                      nonTechDisplayMode === 'grid'
                        ? 'bg-[#7c3aed] text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">All 7 Grid</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    onSelectCategory('cultural');
                    onExploreAll();
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#c084fc] hover:underline transition"
                >
                  <span>Catalog</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Content Display: Slider or Grid */}
            {nonTechDisplayMode === 'slider' ? (
              <div className="relative">
                {/* Left Navigation Arrow */}
                <button
                  onClick={() => handleScroll(nonTechScrollRef, 'left')}
                  aria-label="Scroll Non-Technical Left"
                  className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#273260] bg-[#0c1236]/95 text-[#c084fc] shadow-lg backdrop-blur-md transition hover:border-[#c084fc] hover:bg-[#151f50] hover:scale-105 active:scale-95"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Right Navigation Arrow */}
                <button
                  onClick={() => handleScroll(nonTechScrollRef, 'right')}
                  aria-label="Scroll Non-Technical Right"
                  className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#273260] bg-[#0c1236]/95 text-[#c084fc] shadow-lg backdrop-blur-md transition hover:border-[#c084fc] hover:bg-[#151f50] hover:scale-105 active:scale-95"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Horizontal Scroll Row */}
                <div
                  ref={nonTechScrollRef}
                  className="flex items-stretch gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth no-scrollbar"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {nonTechnicalCards.map((card) => (
                    <div key={card.id} className="min-w-[250px] max-w-[285px] flex-1">
                      {renderCard(card)}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
                {nonTechnicalCards.map((card) => renderCard(card))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
