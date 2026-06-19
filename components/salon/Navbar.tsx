'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Stylists', href: '#team' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-salon-bone/96 backdrop-blur-md border-b border-salon-sand/40 shadow-[0_1px_0_0_rgba(30,18,10,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 h-[72px] flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-[3px]">
            <span className="font-fraunces text-[22px] font-light tracking-tight text-salon-espresso">
              Maison
            </span>
            <span className="font-fraunces text-[22px] italic font-light tracking-tight text-salon-terracotta">
              Atelier
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-9" aria-label="Primary">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[11px] tracking-[0.22em] uppercase font-dm font-medium
                           text-salon-taupe hover:text-salon-espresso transition-colors duration-300"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Book CTA */}
          <a
            href="#booking"
            className="hidden md:inline-flex items-center px-6 py-[11px] bg-salon-espresso
                       text-salon-bone text-[11px] tracking-[0.2em] uppercase font-dm font-medium
                       hover:bg-salon-terracotta transition-colors duration-500"
          >
            Book Now
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col gap-[5px] p-1"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 9 : 0 }}
              className="block w-6 h-px bg-salon-espresso"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
              className="block w-6 h-px bg-salon-espresso"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -9 : 0 }}
              className="block w-6 h-px bg-salon-espresso"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[72px] z-40 bg-salon-bone border-b border-salon-sand/60 md:hidden"
          >
            <div className="flex flex-col px-8 py-10 gap-7">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="font-fraunces text-3xl font-light text-salon-espresso
                             hover:text-salon-terracotta transition-colors duration-300"
                >
                  {label}
                </motion.a>
              ))}
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="mt-4 inline-flex items-center justify-center px-8 py-4
                           bg-salon-espresso text-salon-bone text-xs tracking-[0.22em] uppercase font-dm"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
