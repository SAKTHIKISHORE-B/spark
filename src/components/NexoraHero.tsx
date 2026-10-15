import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  Phone,
  Mail,
  Sparkles,
} from 'lucide-react';

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
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      kicker: 'IDEAS   |   TALENT   |   CULTURE   |   TOGETHER',
      title: 'NEXORA',
      year: '·  2  0  2  6  ·',
      scriptTag: 'Beyond Limits',
      subtitle: 'A NATIONAL LEVEL TECHNO - CULTURAL FEST',
      dates: '15 - 17 March 2026',
      venue: 'Sona College of Technology',
      sideTagline: 'MORE EVENTS MORE FUN',
      badge: 'Grand Inauguration & Tech Expo',
    },
    {
      kicker: 'HACKATHONS   |   WORKSHOPS   |   CIRCUITS   |   QUIZ',
      title: 'TECH CLASH',
      year: '·  2  0  2  6  ·',
      scriptTag: 'Hack The Code',
      subtitle: 'FLAGSHIP INTER-COLLEGIATE TECHNICAL TOURNAMENTS',
      dates: '15 - 16 March 2026',
      venue: 'Sona Advanced Computing & Robotics Labs',
      sideTagline: '₹100,000 CASH PRIZES',
      badge: 'Championship Battles & Hands-on Workshops',
    },
    {
      kicker: 'BATTLE OF BANDS   |   GAMING   |   SINGING   |   REELS',
      title: 'CYBER CARNIVAL',
      year: '·  2  0  2  6  ·',
      scriptTag: 'Electric Nights',
      subtitle: 'LIVE CELEBRITY CONCERT, ESPORTS & CREATIVE CLASH',
      dates: '16 - 17 March 2026',
      venue: 'Sona Open Air Amphitheatre',
      sideTagline: 'LIVE ARENA SHOWS',
      badge: 'Celebrity Night & Esports Tournament',
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
    <section className="relative overflow-hidden bg-[#050816] pb-12 pt-6 sm:pt-10">
      {/* Background ambient lighting glows in Violet, Indigo & Electric Cyan matching screenshot */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-[480px] w-[480px] rounded-full bg-[#7c3aed]/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-10 h-[500px] w-[500px] rounded-full bg-[#38bdf8]/15 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-10 left-1/2 h-80 w-[900px] -translate-x-1/2 rounded-full bg-[#6366f1]/15 blur-[120px]" />

      {/* Hero Container with side navigation arrows */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Left Arrow Button matching circular button in image */}
        <button
          onClick={handlePrev}
          aria-label="Previous Hero Slide"
          className="absolute -left-2 top-1/2 z-20 hidden -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border border-[#273260] bg-[#0c1236]/80 text-white backdrop-blur-md transition hover:border-[#38bdf8] hover:bg-[#151f50] hover:text-[#38bdf8] md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Right Arrow Button matching circular button in image */}
        <button
          onClick={handleNext}
          aria-label="Next Hero Slide"
          className="absolute -right-2 top-1/2 z-20 hidden -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border border-[#273260] bg-[#0c1236]/80 text-white backdrop-blur-md transition hover:border-[#38bdf8] hover:bg-[#151f50] hover:text-[#38bdf8] md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Hero Content Grid */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Typography, Details, and CTA */}
          <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left z-10">
            {/* Top Tagline from Screenshot: IDEAS | TALENT | CULTURE | TOGETHER */}
            <div className="text-[11px] font-bold tracking-[0.3em] text-[#bae6fd] uppercase drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]">
              {slide.kicker}
            </div>

            {/* Giant 3D Metallic Chrome Headline: NEXORA 2 0 2 6 Beyond Limits */}
            <div className="mt-2 flex flex-col items-center lg:items-start">
              <h1 className="font-rajdhani text-6xl font-black tracking-widest sm:text-7xl lg:text-8xl leading-none text-chrome-nexora drop-shadow-[0_0_35px_rgba(56,189,248,0.5)]">
                {slide.title}
              </h1>
              <div className="font-rajdhani -mt-1 text-2xl font-bold tracking-[0.55em] text-[#38bdf8] sm:text-4xl drop-shadow-[0_0_15px_rgba(56,189,248,0.8)]">
                {slide.year}
              </div>
            </div>

            {/* Script Cursive "Beyond Limits" in Ice Blue/White */}
            <div className="font-script -mt-3 text-4xl sm:text-6xl text-[#ffffff] drop-shadow-[0_0_20px_rgba(56,189,248,0.9)]">
              {slide.scriptTag}
            </div>

            {/* Subtitle from Screenshot */}
            <p className="mt-3 text-xs sm:text-sm font-bold tracking-[0.15em] text-slate-200 uppercase">
              {slide.subtitle}
            </p>

            {/* Dates & Campus Location Badges with Sona College of Technology */}
            <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-[#273260] bg-[#0c1236]/90 px-3.5 py-1.5 text-xs font-semibold text-slate-200 shadow-sm backdrop-blur-md">
                <Calendar className="h-4 w-4 text-[#38bdf8]" />
                <span className="text-white font-bold">{slide.dates}</span>
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-[#273260] bg-[#0c1236]/90 px-3.5 py-1.5 text-xs font-semibold text-slate-200 shadow-sm backdrop-blur-md">
                <MapPin className="h-4 w-4 text-[#a78bfa]" />
                <span className="text-[#e0e7ff] font-bold">{slide.venue}</span>
              </div>
            </div>

            {/* Official Contact Hotline Pill */}
            <div className="mt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs">
              <div className="flex items-center gap-1.5 rounded-md border border-[#232c52] bg-[#090e2b] px-3 py-1 font-mono text-slate-300">
                <Phone className="h-3 w-3 text-[#38bdf8]" />
                <span className="text-slate-400">Call:</span>
                <strong className="text-[#7dd3fc]">0000000XXX</strong>
              </div>
              <div className="flex items-center gap-1.5 rounded-md border border-[#232c52] bg-[#090e2b] px-3 py-1 font-mono text-slate-300">
                <Mail className="h-3 w-3 text-[#38bdf8]" />
                <span className="text-slate-400">Email:</span>
                <strong className="text-[#7dd3fc]">xyz@gmail.com</strong>
              </div>
            </div>

            {/* Action Buttons: Royal Purple Pill Button + Explore Button */}
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onRegisterClick}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] px-8 py-3.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:from-[#8b5cf6] hover:to-[#7c3aed] hover:shadow-[0_0_40px_rgba(139,92,246,0.8)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Register Now</span>
                <ArrowRight className="h-4 w-4 stroke-[3]" />
              </button>

              <button
                onClick={onExploreEvents}
                className="inline-flex items-center gap-2 rounded-full border border-[#38bdf8]/40 bg-[#0c1236]/90 px-6 py-3.5 text-sm font-bold text-[#7dd3fc] backdrop-blur-md transition hover:border-[#38bdf8] hover:bg-[#151f50] hover:text-white"
              >
                <span>Explore Events</span>
              </button>
            </div>

            {/* Live Search Bar */}
            <div className="mt-6 w-full max-w-md">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#38bdf8]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Quick search events, workshops, hackathons, gaming..."
                  className="w-full rounded-full border border-[#273260] bg-[#0c1236]/95 py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-400 backdrop-blur-md focus:border-[#38bdf8] focus:outline-none focus:ring-1 focus:ring-[#38bdf8] shadow-inner"
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

          {/* Right Column: 3D Holographic Cyber Cube Stage Visual from Screenshot */}
          <div className="relative flex items-center justify-center lg:col-span-6">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Outer Glowing Stage Frame */}
              <div className="relative overflow-hidden rounded-2xl border border-[#2e3b72] bg-[#0c1236] p-1.5 shadow-[0_0_60px_rgba(124,58,237,0.35)]">
                <img
                  src="/src/assets/images/nexora_cyber_cube_hero_1792045499815.jpg"
                  alt="NEXORA 2026 3D Holographic Cyber Stage with neon code symbols, music and game controllers"
                  className="h-80 w-full rounded-xl object-cover sm:h-96 lg:h-[430px]"
                  referrerPolicy="no-referrer"
                />

                {/* Midnight space gradient blend */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
              </div>

              {/* Right Vertical Tagline: MORE EVENTS MORE FUN from Screenshot */}
              <div className="absolute -right-3 top-6 hidden xl:flex flex-col items-center justify-center rounded-lg border border-[#273260] bg-[#0c1236]/95 p-2 text-right backdrop-blur-md text-slate-300 shadow-lg">
                <span className="text-[10px] font-black tracking-widest text-[#38bdf8] leading-tight">MORE</span>
                <span className="text-[10px] font-black tracking-widest text-white leading-tight">EVENTS</span>
                <span className="text-[10px] font-black tracking-widest text-[#a78bfa] leading-tight">MORE</span>
                <span className="text-[10px] font-black tracking-widest text-[#38bdf8] leading-tight">FUN</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Slide Pagination Indicators */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all rounded-full ${
                idx === currentSlide
                  ? 'w-7 bg-[#7c3aed] shadow-[0_0_10px_#8b5cf6]'
                  : 'w-2 bg-[#273260] hover:bg-[#3d4c88]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
