import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Trophy,
  Users,
  ArrowRight,
  Pause,
  Play,
  Sparkles,
} from 'lucide-react';
import { EventItem } from '../types';

interface SlideItem {
  id: string;
  eventId: string;
  title: string;
  tagline: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  venueCode: string;
  prizePool: string;
  teamSize: string;
  feeText: string;
  image: string;
  badge: string;
}

interface HeroSliderProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onRegisterEvent: (event: EventItem) => void;
}

export function HeroSlider({
  events,
  onSelectEvent,
  onRegisterEvent,
}: HeroSliderProps) {
  // Curate 4 marquee slides with high-fidelity images
  const slides: SlideItem[] = [
    {
      id: 'slide-hackathon',
      eventId: 'ev-hacknova-2026',
      title: 'HackNova 2026: 24-Hour National Hackathon',
      tagline: 'Code overnight, deploy real-world AI pipelines, and pitch to top tech mentors.',
      category: 'Technical & AI Sprint',
      date: 'Oct 24 - 25, 2026',
      time: '09:00 AM kickoff',
      venue: 'Turing Computing & AI Lab',
      venueCode: 'LAB-204',
      prizePool: '₹100,000 Pool',
      teamSize: 'Teams of 2-4',
      feeText: 'Free Entry',
      image: '/src/assets/images/event_hackathon_coding_1792043266261.jpg',
      badge: 'Flagship Tech Challenge',
    },
    {
      id: 'slide-bands',
      eventId: 'ev-rhapsody-bands',
      title: 'Rhapsody: Battle of the Campus Bands',
      tagline: 'Acoustic harmonies, raw indie guitar riffs, and heavy rock under concert line-arrays.',
      category: 'Live Cultural Stage',
      date: 'Oct 24, 2026',
      time: '05:30 PM - 09:30 PM',
      venue: 'Open Air Amphitheatre (OAT)',
      venueCode: 'OAT-01',
      prizePool: '₹60,000 Prize',
      teamSize: 'Bands of 3-8',
      feeText: '₹250 / band',
      image: '/src/assets/images/event_cultural_fest_1792043266161.jpg',
      badge: 'Main Stage Headliner',
    },
    {
      id: 'slide-robotics',
      eventId: 'ev-roboforge-combat',
      title: 'RoboForge: Combat Arena & Autonomous Line Wars',
      tagline: 'High-speed autonomous sensors and polycarbonate armor combat bot clashes.',
      category: 'Mechatronics & Robotics',
      date: 'Oct 25, 2026',
      time: '10:00 AM - 04:30 PM',
      venue: 'Advanced Robotics Studio',
      venueCode: 'ROBO-101',
      prizePool: '₹45,000 Prize',
      teamSize: 'Squads of 2-4',
      feeText: '₹150 / entry',
      image: '/src/assets/images/event_robotics_workshop_1792043266457.jpg',
      badge: 'Live Engineering Arena',
    },
    {
      id: 'slide-fest',
      eventId: 'ev-choreonite-dance',
      title: 'Choreonite: National Collegiate Dance Trophy',
      tagline: 'Synchronized hip-hop, contemporary storytelling, and electrifying choreography.',
      category: 'Grand Auditorium Showcase',
      date: 'Oct 25, 2026',
      time: '06:00 PM - 09:30 PM',
      venue: 'Dr. APJ Abdul Kalam Auditorium',
      venueCode: 'AUD-01',
      prizePool: '₹80,000 Prize',
      teamSize: 'Troupes 6-16',
      feeText: '₹300 / troupe',
      image: '/src/assets/images/hero_college_fest_stage_1792043266159.jpg',
      badge: 'Inter-Collegiate Trophy',
    },
  ];

  const [[currentIndex, direction], setCurrentIndex] = useState<[number, number]>([0, 0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const slideDuration = 5500; // 5.5 seconds per slide
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = slides[currentIndex];

  const paginate = (newDirection: number) => {
    let nextIndex = currentIndex + newDirection;
    if (nextIndex < 0) nextIndex = slides.length - 1;
    if (nextIndex >= slides.length) nextIndex = 0;
    setCurrentIndex([nextIndex, newDirection]);
    setProgress(0);
  };

  const jumpToSlide = (idx: number) => {
    const dir = idx > currentIndex ? 1 : -1;
    setCurrentIndex([idx, dir]);
    setProgress(0);
  };

  // Autoplay and progress bar ticker
  useEffect(() => {
    if (!isPlaying) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const intervalTime = 50;
    const step = (intervalTime / slideDuration) * 100;

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          paginate(1);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPlaying]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
      },
    }),
  };

  const matchingEvent = events.find((e) => e.id === currentSlide.eventId) || events[0];

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 text-white shadow-xl"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Slide Visual Viewport */}
      <div className="relative h-[440px] w-full overflow-hidden sm:h-[480px] lg:h-[520px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 h-full w-full"
          >
            {/* Background Image with layered scrims */}
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="h-full w-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Multi-directional gradient scrim for high contrast typography */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />

            {/* Slide Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12">
              <div className="max-w-2xl">
                {/* Unboxed Metadata Banner */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-300"
                >
                  <span className="rounded bg-amber-400/20 px-2 py-0.5 text-amber-300 border border-amber-300/30">
                    {currentSlide.badge}
                  </span>
                  <span aria-hidden="true" className="text-slate-400">·</span>
                  <span className="text-slate-200">{currentSlide.category}</span>
                  <span aria-hidden="true" className="text-slate-400">·</span>
                  <span className="text-emerald-400 font-bold">{currentSlide.feeText}</span>
                </motion.div>

                {/* Animated Headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.35 }}
                  className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-tight"
                  style={{ textWrap: 'balance' }}
                >
                  {currentSlide.title}
                </motion.h2>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.35 }}
                  className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-2"
                >
                  {currentSlide.tagline}
                </motion.p>

                {/* Logistics Key Points */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.35 }}
                  className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-300"
                >
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-amber-400" />
                    <span>{currentSlide.date} · {currentSlide.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-amber-400" />
                    <span>{currentSlide.venue} ({currentSlide.venueCode})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Trophy className="h-3.5 w-3.5 text-amber-400" />
                    <span className="font-semibold text-white">{currentSlide.prizePool}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-amber-400" />
                    <span>{currentSlide.teamSize}</span>
                  </div>
                </motion.div>

                {/* Interactive Action Controls */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.35 }}
                  className="mt-6 flex flex-wrap items-center gap-3"
                >
                  <button
                    onClick={() => {
                      if (matchingEvent) onRegisterEvent(matchingEvent);
                    }}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-500 whitespace-nowrap"
                  >
                    <span>Instant Registration</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (matchingEvent) onSelectEvent(matchingEvent);
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/20 whitespace-nowrap"
                  >
                    <span>View Rules & Schedule</span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Arrow Navigation */}
        <button
          onClick={() => paginate(-1)}
          aria-label="Previous Slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur-md transition hover:bg-slate-900/90 hover:scale-105 border border-white/10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => paginate(1)}
          aria-label="Next Slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/60 text-white backdrop-blur-md transition hover:bg-slate-900/90 hover:scale-105 border border-white/10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Top Right Play/Pause & Slide Counter */}
        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-lg bg-slate-950/70 px-3 py-1.5 text-xs font-mono text-slate-300 backdrop-blur-md border border-white/10">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause slideshow' : 'Resume slideshow'}
            className="hover:text-white"
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </button>
          <span className="tabular-nums">
            {currentIndex + 1} / {slides.length}
          </span>
        </div>
      </div>

      {/* Bottom Slide Selectors & Animated Progress Bar */}
      <div className="border-t border-white/10 bg-slate-950/95 px-4 py-3 sm:px-6">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => jumpToSlide(idx)}
                className={`relative flex flex-col items-start overflow-hidden rounded-lg p-2.5 text-left transition ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                {/* Individual slide animated progress line */}
                {isActive && (
                  <div className="absolute left-0 top-0 h-0.5 w-full bg-white/20">
                    <div
                      className="h-full bg-blue-500 transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}

                <span className="font-mono text-[10px] text-amber-400 tabular-nums">
                  0{idx + 1} · {slide.category.split(' ')[0]}
                </span>
                <span className="mt-0.5 truncate text-xs font-bold w-full">
                  {slide.title.split(':')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
