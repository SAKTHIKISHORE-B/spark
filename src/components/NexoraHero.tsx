import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
} from 'lucide-react';
import { EventItem } from '../types';

interface NexoraHeroProps {
  onRegisterClick: () => void;
  onExploreEvents: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function NexoraHero({
  onRegisterClick,
  onExploreEvents,
  searchQuery,
  onSearchChange,
}: NexoraHeroProps) {
  // Interactive slide states for the 3 slides in the hero
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      kicker: 'IDEAS | TALENT | CULTURE | TOGETHER',
      title: 'NEXORA',
      year: '2 0 2 6',
      scriptTag: 'Beyond Limits',
      subtitle: 'A NATIONAL LEVEL TECHNO - CULTURAL FEST',
      dates: '15 - 17 March 2026',
      venue: 'ABC College Campus',
      sideTagline: 'MORE EVENTS MORE FUN',
      badge: 'Grand Inauguration & Mega Expo',
    },
    {
      kicker: 'CODE | COMPETE | HACK | INNOVATE',
      title: 'HACKNOVA',
      year: '2 0 2 6',
      scriptTag: '24H Code Odyssey',
      subtitle: 'NATIONAL 24-HOUR INTER-COLLEGE HACKATHON',
      dates: '15 - 16 March 2026',
      venue: 'Turing Advanced AI Lab',
      sideTagline: '₹100,000 CASH PRIZES',
      badge: 'Flagship Tech Challenge',
    },
    {
      kicker: 'MUSIC | DANCE | STAGE | PASSION',
      title: 'RHAPSODY',
      year: '2 0 2 6',
      scriptTag: 'Electric Beats',
      subtitle: 'BATTLE OF THE BANDS & CELEBRITY PRO-NITE',
      dates: '16 - 17 March 2026',
      venue: 'Open Air Amphitheatre',
      sideTagline: 'LIVE ARENA CONCERT',
      badge: 'Star Celebrity Night',
    },
  ];

  const slide = heroSlides[currentSlide];

  // Auto-advance hero slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <section className="relative overflow-hidden bg-[#060814] pb-12 pt-6 sm:pt-10">
      {/* Background ambient lighting glows */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 left-1/2 h-80 w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />

      {/* Hero Container with side navigation arrows */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Hero Slide"
          className="absolute -left-2 top-1/2 z-20 hidden -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border border-purple-500/30 bg-[#0c102a]/80 text-white backdrop-blur-md transition hover:border-purple-400 hover:bg-purple-900/40 md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next Hero Slide"
          className="absolute -right-2 top-1/2 z-20 hidden -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border border-purple-500/30 bg-[#0c102a]/80 text-white backdrop-blur-md transition hover:border-purple-400 hover:bg-purple-900/40 md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Hero Content Grid */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Typography, Details, and CTA */}
          <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left z-10">
            {/* Top Tagline */}
            <div className="text-[11px] font-bold tracking-[0.25em] text-cyan-300 uppercase drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
              {slide.kicker}
            </div>

            {/* Giant Title: NEXORA 2 0 2 6 */}
            <div className="mt-2 flex flex-col items-center lg:items-start">
              <h1 className="font-rajdhani text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-indigo-300 drop-shadow-[0_0_25px_rgba(168,85,247,0.7)] sm:text-7xl lg:text-8xl leading-none">
                {slide.title}
              </h1>
              <div className="font-rajdhani -mt-1 text-2xl font-bold tracking-[0.45em] text-cyan-400 sm:text-4xl drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]">
                {slide.year}
              </div>
            </div>

            {/* Script "Beyond Limits" */}
            <div className="font-script -mt-3 text-3xl sm:text-5xl text-purple-200 drop-shadow-[0_0_15px_rgba(192,132,252,0.8)]">
              {slide.scriptTag}
            </div>

            {/* Subtitle */}
            <p className="mt-3 text-xs sm:text-sm font-semibold tracking-wider text-slate-300 uppercase">
              {slide.subtitle}
            </p>

            {/* Dates & Campus Location Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-[#121636]/90 px-3.5 py-1.5 text-xs font-semibold text-slate-200 shadow-sm backdrop-blur-md">
                <Calendar className="h-4 w-4 text-cyan-400" />
                <span>{slide.dates}</span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-[#121636]/90 px-3.5 py-1.5 text-xs font-semibold text-slate-200 shadow-sm backdrop-blur-md">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span>{slide.venue}</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onRegisterClick}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 px-7 py-3 text-sm font-bold text-white shadow-xl glow-button hover:from-purple-500 hover:to-indigo-500 transition-all hover:scale-105 active:scale-95"
              >
                <span>Register Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onExploreEvents}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-[#0d1330]/80 px-6 py-3 text-sm font-semibold text-cyan-200 backdrop-blur-md transition hover:border-cyan-400 hover:bg-cyan-950/40"
              >
                <span>Explore Events</span>
              </button>
            </div>

            {/* Quick Live Search Bar */}
            <div className="mt-6 w-full max-w-md">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Quick search competitions, hackathons, clubs, venues..."
                  className="w-full rounded-full border border-purple-500/30 bg-[#0b0f28]/90 py-2.5 pl-10 pr-4 text-xs text-slate-100 placeholder-slate-400 backdrop-blur-md focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: 3D Holographic Cube Stage Visual matching uploaded image */}
          <div className="relative flex items-center justify-center lg:col-span-6">
            {/* Visual Container */}
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Outer circular glowing podium background */}
              <div className="relative overflow-hidden rounded-2xl border border-purple-500/40 bg-gradient-to-b from-[#111638]/90 to-[#070918]/90 p-1.5 shadow-[0_0_50px_rgba(139,92,246,0.3)]">
                <img
                  src="/src/assets/images/nexora_cyber_cube_hero_1792045499815.jpg"
                  alt="Nexora 2026 3D Holographic Cube Stage with neon code symbols, music and game controllers"
                  className="h-80 w-full rounded-xl object-cover sm:h-96 lg:h-[420px]"
                  referrerPolicy="no-referrer"
                />

                {/* Cybernetic neon rim gradient */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-[#060814] via-transparent to-transparent" />
              </div>

              {/* Right Vertical Tagline matching uploaded image: "MORE EVENTS MORE FUN" */}
              <div className="absolute -right-3 top-6 hidden xl:flex flex-col items-center justify-center rounded-lg border border-purple-500/20 bg-[#0b0e27]/80 p-2 text-right backdrop-blur-md text-slate-300">
                <span className="text-[10px] font-black tracking-widest text-cyan-300 leading-tight">MORE</span>
                <span className="text-[10px] font-black tracking-widest text-purple-300 leading-tight">EVENTS</span>
                <span className="text-[10px] font-black tracking-widest text-cyan-300 leading-tight">MORE</span>
                <span className="text-[10px] font-black tracking-widest text-pink-300 leading-tight">FUN</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Slide Pagination Indicators matching uploaded image: — • • */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all rounded-full ${
                idx === currentSlide
                  ? 'w-7 bg-cyan-400 shadow-[0_0_10px_#38bdf8]'
                  : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
