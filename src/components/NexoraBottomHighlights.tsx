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
      badgeClass: 'bg-[#2563eb] text-white shadow-[0_0_15px_rgba(37,99,235,0.6)]',
      title: 'Day 1 · 15 Mar 2026',
      desc: 'Hackathon, Technical Events & Workshops',
    },
    {
      num: '02',
      badgeClass: 'bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.6)]',
      title: 'Day 2 · 16 Mar 2026',
      desc: 'Cultural Events, Gaming & Live Battles',
    },
    {
      num: '03',
      badgeClass: 'bg-[#e11d48] text-white shadow-[0_0_15px_rgba(225,29,72,0.6)]',
      title: 'Day 3 · 17 Mar 2026',
      desc: 'Fun Events, Adzap, Valedictory Ceremony',
    },
  ];

  const whyAttendItems = [
    {
      icon: <Trophy className="h-5 w-5 text-[#38bdf8]" />,
      label: 'Win',
      sub: 'Exciting Prizes',
    },
    {
      icon: <Users className="h-5 w-5 text-[#a78bfa]" />,
      label: 'Meet',
      sub: 'New People',
    },
    {
      icon: <Star className="h-5 w-5 text-[#38bdf8]" />,
      label: 'Showcase',
      sub: 'Your Talent',
    },
    {
      icon: <Heart className="h-5 w-5 text-[#f43f5e]" />,
      label: 'Create',
      sub: 'Lasting Memories',
    },
  ];

  const galleryImages = [
    {
      src: '/src/assets/images/hero_college_fest_stage_1792043266159.jpg',
      alt: 'NEXORA main stage concert at Sona College of Technology',
    },
    {
      src: '/src/assets/images/event_cultural_fest_1792043266161.jpg',
      alt: 'Live collegiate band performance',
    },
    {
      src: '/src/assets/images/event_hackathon_coding_1792043266261.jpg',
      alt: 'Hackathon coding sprint and workshops',
    },
    {
      src: '/src/assets/images/event_robotics_workshop_1792043266457.jpg',
      alt: 'Robotics hands-on workshop engineering pit',
    },
    {
      src: '/src/assets/images/nexora_cyber_cube_hero_1792045499815.jpg',
      alt: 'Cyber cube neon stage arena',
    },
    {
      src: '/src/assets/images/hero_college_fest_stage_1792043266159.jpg',
      alt: 'Grand finale awards at Sona amphitheatre',
    },
  ];

  return (
    <section className="relative bg-[#050816] py-12 border-t border-[#1b2348]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Column 1: Event Schedule in Midnight Navy Glass Panel */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#232c58] bg-[#090d28]/90 p-6 shadow-xl lg:col-span-4 backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between border-b border-[#1b2348] pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0c163a] text-[#38bdf8] border border-[#38bdf8]/30">
                    <Calendar className="h-4 w-4" />
                  </div>
                  {/* Pure White Bold Heading */}
                  <h3 className="text-base font-bold text-white">Event Schedule</h3>
                </div>

                <button
                  onClick={onViewSchedule}
                  className="flex items-center gap-1 text-[11px] font-bold text-[#38bdf8] hover:underline"
                >
                  <span>View Full Schedule</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* Day items matching Screenshot 01, 02, 03 */}
              <div className="mt-5 space-y-3.5">
                {scheduleDays.map((d) => (
                  <div
                    key={d.num}
                    onClick={onViewSchedule}
                    className="flex items-center gap-3.5 rounded-2xl border border-[#1b234d] bg-[#0c1236] p-3 transition hover:border-[#38bdf8]/60 hover:bg-[#141b4a] cursor-pointer"
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-xs font-black ${d.badgeClass}`}
                    >
                      {d.num}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white">{d.title}</div>
                      <div className="text-[11px] text-slate-300 font-medium">{d.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Why Attend? in Midnight Navy Glass Panel */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#232c58] bg-[#090d28]/90 p-6 shadow-xl lg:col-span-4 backdrop-blur-md">
            <div className="relative z-10 text-center">
              {/* Pure White Bold Heading */}
              <h3 className="text-xl font-black text-white">Why Attend?</h3>
              <p className="mt-1 text-xs text-slate-300">
                Experience 3 days of unstoppable campus energy, battles & workshops at Sona.
              </p>

              {/* 4 Glowing outline circle icons matching screenshot */}
              <div className="mt-8 grid grid-cols-4 gap-2">
                {whyAttendItems.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#38bdf8]/40 bg-[#0c163a] shadow-[0_0_15px_rgba(56,189,248,0.25)] transition hover:scale-110">
                      {item.icon}
                    </div>
                    <span className="mt-2 text-xs font-bold text-white">{item.label}</span>
                    <span className="text-[10px] text-slate-300 leading-tight">
                      {item.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Gallery in Midnight Navy Glass Panel */}
          <div
            id="gallery-section"
            className="flex flex-col justify-between rounded-3xl border border-[#232c58] bg-[#090d28]/90 p-6 shadow-xl lg:col-span-4 backdrop-blur-md"
          >
            <div>
              <div className="flex items-center justify-between border-b border-[#1b2348] pb-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0c163a] text-[#38bdf8] border border-[#38bdf8]/30">
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  {/* Pure White Bold Heading */}
                  <h3 className="text-base font-bold text-white">Gallery</h3>
                </div>

                <button
                  onClick={onViewAllGallery}
                  className="flex items-center gap-1 text-[11px] font-bold text-[#38bdf8] hover:underline"
                >
                  <span>View All</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              {/* 3x2 Thumbnail Grid from Screenshot */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {galleryImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImage(img.src)}
                    className="group relative aspect-square overflow-hidden rounded-xl border border-[#232c58] bg-[#070b1e] cursor-pointer"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-[#7c3aed]/0 transition-colors group-hover:bg-[#7c3aed]/25" />
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
              className="absolute -top-10 right-0 text-white hover:text-[#38bdf8]"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-h-[85vh] w-auto rounded-xl border border-[#38bdf8]/50 shadow-[0_0_40px_rgba(56,189,248,0.4)]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </section>
  );
}
