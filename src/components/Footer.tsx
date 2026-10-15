import React from 'react';
import { NexoraBrand } from './NexoraLogo';
import { Instagram, Youtube, Twitter, Facebook, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'events' | 'schedule' | 'my-tickets' | 'organizer') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer id="footer-contact-section" className="border-t border-[#1b2348] bg-[#050816] py-10 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Info Strip: Phone, Email, & Sona College of Technology */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 border-b border-[#141b3a] pb-8">
          <div className="flex items-center gap-3.5 rounded-2xl border border-[#232c58] bg-[#090d28] p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0c163a] border border-[#38bdf8]/40 text-[#38bdf8]">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Festival Hotline</div>
              <a href="tel:0000000XXX" className="font-mono text-sm font-bold text-[#7dd3fc] hover:text-[#38bdf8] transition">
                0000000XXX
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-[#232c58] bg-[#090d28] p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0c163a] border border-[#38bdf8]/40 text-[#38bdf8]">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Official Inquiries</div>
              <a href="mailto:xyz@gmail.com" className="font-mono text-sm font-bold text-[#7dd3fc] hover:text-[#38bdf8] transition">
                xyz@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-[#232c58] bg-[#090d28] p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0c163a] border border-[#38bdf8]/40 text-[#38bdf8]">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Campus Venue</div>
              <div className="text-sm font-bold text-white">Sona College of Technology, Salem</div>
            </div>
          </div>
        </div>

        {/* Main Footer Bar matching Screenshot */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Left: Nexora Brand */}
          <NexoraBrand onClick={() => onNavigate('events')} />

          {/* Center: Script Cursive Tagline from Screenshot: More Than Just a Fest — It's an Experience! */}
          <div className="font-script text-xl sm:text-2xl text-[#bae6fd] tracking-wide drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">
            More Than Just a Fest — It&apos;s an Experience!
          </div>

          {/* Right: Follow Us with Social Icons */}
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
            <span className="font-bold text-white">Follow Us</span>
            <div className="flex items-center gap-3 text-slate-400">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="hover:text-[#38bdf8] transition"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="hover:text-red-400 transition"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#twitter"
                aria-label="X / Twitter"
                className="hover:text-[#38bdf8] transition"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="hover:text-[#38bdf8] transition"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Secondary row for portal links & copyright */}
        <div className="border-t border-[#131b3a] pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            © 2026 NEXORA College Fest · Sona College of Technology. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('events')}
              className="hover:text-[#38bdf8] transition"
            >
              All Events
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onNavigate('schedule')}
              className="hover:text-[#38bdf8] transition"
            >
              Master Schedule
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onNavigate('my-tickets')}
              className="hover:text-[#38bdf8] transition"
            >
              Delegate Passes
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onNavigate('organizer')}
              className="hover:text-[#38bdf8] transition"
            >
              Organizer Console
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
