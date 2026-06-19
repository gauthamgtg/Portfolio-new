'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';

const SECONDARY = [
  { label: 'Services',    href: '#services' },
  { label: 'Stylists',    href: '#team'     },
  { label: 'Gallery',     href: '#gallery'  },
  { label: 'Pricing',     href: '#pricing'  },
  { label: 'Book Now',    href: '#booking'  },
];

export default function Footer() {
  const [email,     setEmail]     = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setSubmitted(true); setEmail(''); }
  };

  return (
    <footer id="contact" className="bg-[#150D06] text-salon-bone">

      {/* Main grid */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14">

          {/* Brand */}
          <div className="md:col-span-4">
            <div className="mb-5">
              <span className="font-fraunces text-[26px] font-light">Maison</span>
              <span className="font-fraunces text-[26px] italic font-light text-salon-terracotta ml-1">Atelier</span>
            </div>
            <p className="text-[13px] font-dm text-salon-bone/45 leading-relaxed max-w-xs mb-8">
              Brooklyn's most considered hair studio. Art applied to hair, one client at a time.
            </p>
            {/* Social */}
            <div className="flex gap-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-salon-bone/40 hover:text-salon-terracotta transition-colors duration-300"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-salon-bone/40 hover:text-salon-terracotta transition-colors duration-300"
              >
                <Youtube size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Hours */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] tracking-[0.28em] uppercase font-dm text-salon-terracotta mb-7">
              Hours
            </h3>
            <div className="space-y-2 text-[13px] font-dm font-light text-salon-bone/60">
              {[
                ['Mon – Fri', '9am – 8pm'],
                ['Saturday',  '9am – 6pm'],
                ['Sunday',    '10am – 5pm'],
              ].map(([day, hrs]) => (
                <div key={day} className="flex justify-between gap-6">
                  <span>{day}</span>
                  <span className="text-salon-bone/40">{hrs}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visit */}
          <div className="md:col-span-3">
            <h3 className="text-[10px] tracking-[0.28em] uppercase font-dm text-salon-terracotta mb-7">
              Visit
            </h3>
            <address className="not-italic text-[13px] font-dm font-light text-salon-bone/60 space-y-1 mb-5">
              <p>142 Atlantic Avenue</p>
              <p>Brooklyn, NY 11201</p>
            </address>
            <a
              href="tel:+17183555555"
              className="block text-[13px] font-dm text-salon-bone/60 hover:text-salon-bone
                         transition-colors duration-300 mb-1"
            >
              (718) 355-5555
            </a>
            <a
              href="mailto:hello@maisonatelier.com"
              className="block text-[13px] font-dm text-salon-bone/60 hover:text-salon-bone
                         transition-colors duration-300"
            >
              hello@maisonatelier.com
            </a>

            {/* Map placeholder */}
            <a
              href="https://maps.google.com/?q=142+Atlantic+Avenue+Brooklyn+NY+11201"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center w-full h-[80px] border
                         border-salon-bone/10 hover:border-salon-terracotta/50
                         text-[10px] tracking-[0.25em] uppercase font-dm text-salon-bone/30
                         hover:text-salon-terracotta transition-all duration-400"
            >
              Open in Maps →
            </a>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <h3 className="text-[10px] tracking-[0.28em] uppercase font-dm text-salon-terracotta mb-7">
              Stay Informed
            </h3>
            <p className="text-[13px] font-dm font-light text-salon-bone/45 mb-6 leading-relaxed">
              Seasonal color notes, stylist features, and first access to limited appointment slots.
            </p>

            {submitted ? (
              <p className="text-[13px] font-dm text-salon-terracotta">
                Thank you. You're on the list.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  aria-label="Email address"
                  className="bg-transparent border border-salon-bone/15 px-4 py-3 text-[13px]
                             font-dm text-salon-bone placeholder:text-salon-bone/25
                             focus:outline-none focus:border-salon-terracotta transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-salon-terracotta text-salon-bone
                             text-[10px] tracking-[0.22em] uppercase font-dm
                             hover:bg-salon-bone hover:text-salon-espresso transition-all duration-500"
                >
                  Subscribe
                </button>
              </form>
            )}

            {/* Nav links */}
            <nav className="mt-10 flex flex-wrap gap-x-5 gap-y-3" aria-label="Footer navigation">
              {SECONDARY.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[11px] tracking-[0.15em] uppercase font-dm
                             text-salon-bone/30 hover:text-salon-bone/70 transition-colors duration-300"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-salon-bone/[0.07]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-6
                        flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.15em] uppercase font-dm text-salon-bone/25">
            © 2024 Maison Atelier LLC. All rights reserved.
          </p>
          <div className="flex gap-7">
            {['Privacy Policy', 'Booking Policy'].map(l => (
              <a key={l} href="#"
                 className="text-[10px] tracking-[0.15em] uppercase font-dm
                            text-salon-bone/25 hover:text-salon-bone/55 transition-colors duration-300">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
