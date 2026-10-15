import React, { useState } from 'react';
import {
  Calendar,
  ArrowRight,
  Trophy,
  Users,
  Star,
  Heart,
  Image as ImageIcon,
  X,
} from 'lucide-react';

interface NexoraBottomHighlightsProps {
  onViewSchedule: () => void;
  onViewAllGallery?: () => void;
}

export function NexoraBottomHighlights({
  onViewSchedule,
  onViewAllGallery,
}: NexoraBottomHighlightsProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const scheduleDays = [
    {
      num: '01',
      badgeClass: 'bg-blue-600 text-white',
      title: 'Day 1 15 Mar 2026',
      desc: 'Hackathon, Technical Events',
    },
    {
      num: '02',
      badgeClass: 'bg-purple-600 text-white',
      title: 'Day 2 16 Mar 2026',
      desc: 'Cultural Events, Gaming',
    },
    {
      num: '03',
      badgeClass: 'bg-pink-600 text-white',
      title: 'Day 3 17 Mar 2026',
      desc: 'Fun Events, Valedictory',
    },
  ];

  const whyAttendItems = [
    {
      icon: <Trophy className="h-5 w-5 text-amber-400" />,
      label: 'Win',
      sub: 'Exciting Prizes',
    },
    {
      icon: <Users className="h-5 w-5 text-cyan-400" />,
      label: 'Meet',
      sub: 'New People',
    },
    {
      icon: <Star className="h-5 w-5 text-purple-400" />,
      label: 'Showcase',
      sub: 'Your Talent',
    },
    {
      icon: <Heart className="h-5 w-5 text-pink-400" />,
      label: 'Create',
      sub: 'Lasting Memories',
    },
  ];

  const galleryImages = [
    {
      src: '/src/assets/images/hero_college_fest_stage_1792043266159.jpg',
      alt: 'Nexora main stage crowd at sunset',
    },
    {
      src: '/src/assets/images/event_cultural_fest_1792043266161.jpg',
      alt: 'Live collegiate band performance',
    },
    {
      src: '/src/assets/images/event_hackathon_coding_1792043266261.jpg',
      alt: 'Hackathon coding sprint',
    },
    {
      src: '/src/assets/images/event_robotics_workshop_1792043266457.jpg',
      alt: 'Robotics combat engineering pit',
    },
    {
      src: '/src/assets/images/nexora_cyber_cube_hero_1792045499815.jpg',
      alt: 'Cyber cube neon stage arena',
    },
    {
      src: '/src/assets/images/hero_college_fest_stage_1792043266159.jpg',
      alt: 'Grand finale amphitheatre awards',
    },
  ];

  return (
    <section className="relative bg-[#060814] py-12 border-t border-purple-900/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Column 1: Event Schedule */}
          <div className="flex flex-col justify-between rounded-2xl border border-purple-500/20 bg-gradient-to-b from-[#0b0e27]/90 to-[#070919]/90 p-6 shadow-xl lg:col-span-4">
            <div>
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/30 text-cyan-400 border border-cyan-400/30">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">Event Schedule</h3>
                </div>

                <button
                  onClick={onViewSchedule}
                  className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:underline"
                >
                  <span>View Full Schedule</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* Day items */}
              <div className="mt-5 space-y-4">
                {scheduleDays.map((d) => (
                  <div
                    key={d.num}
                    onClick={onViewSchedule}
                    className="flex items-center gap-3.5 rounded-xl border border-white/5 bg-slate-900/40 p-3 transition hover:border-purple-500/30 hover:bg-slate-900/70 cursor-pointer"
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${d.badgeClass} shadow-md`}
                    >
                      {d.num}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white">{d.title}</div>
                      <div className="text-[11px] text-slate-400">{d.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Why Attend? */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-b from-[#0c0f2a]/95 to-[#070919]/95 p-6 shadow-xl lg:col-span-4">
            {/* Ambient concert crowd backdrop pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

            <div className="relative z-10 text-center">
              <h3 className="text-lg font-bold text-white">Why Attend?</h3>
              <p className="mt-1 text-xs text-slate-400">
                Experience 3 days of unstoppable campus energy and tech competition.
              </p>

              {/* 4 Glowing outline circle icons */}
              <div className="mt-8 grid grid-cols-4 gap-2">
                {whyAttendItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-500/40 bg-purple-950/40 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition hover:scale-110">
                      {item.icon}
                    </div>
                    <span className="mt-2 text-xs font-bold text-white">{item.label}</span>
                    <span className="text-[10px] text-slate-400 leading-tight">
                      {item.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Gallery */}
          <div
            id="gallery-section"
            className="flex flex-col justify-between rounded-2xl border border-purple-500/20 bg-gradient-to-b from-[#0b0e27]/90 to-[#070919]/90 p-6 shadow-xl lg:col-span-4"
          >
            <div>
              <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-600/30 text-pink-400 border border-pink-400/30">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">Gallery</h3>
                </div>

                <button
                  onClick={onViewAllGallery}
                  className="flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:underline"
                >
                  <span>View All</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* 3x2 Thumbnail Grid */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImage(img.src)}
                    className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-slate-900 cursor-pointer"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-purple-900/0 transition-colors group-hover:bg-purple-900/30" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        >
          <div className="relative max-w-4xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-cyan-400"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-h-[85vh] w-auto rounded-xl border border-purple-500/40 shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </section>
  );
}
