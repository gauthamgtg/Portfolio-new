'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const WORDS = ['Art.', 'Applied', 'To', 'Hair.'];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.9 } },
};

const word = {
  hidden: { opacity: 0, y: 72, skewY: 4 },
  show:   { opacity: 1, y: 0,  skewY: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative flex items-center h-screen min-h-[680px] overflow-hidden bg-salon-espresso noise"
    >
      {/* Background image — slow Ken Burns zoom */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.12 }}
        transition={{ duration: 24, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        className="absolute inset-0"
      >
        <Image
          src="https://picsum.photos/seed/maison-hero-v3/1920/1080"
          alt="Editorial salon photography"
          fill
          priority
          className="object-cover opacity-35"
          sizes="100vw"
        />
      </motion.div>

      {/* Directional gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-salon-espresso/95 via-salon-espresso/65 to-salon-espresso/25 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-salon-espresso/60 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-24">

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="salon-label text-salon-terracotta mb-10"
        >
          Brooklyn, New York — Est. 2012
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-fraunces font-light text-salon-bone leading-[0.88]
                     text-[clamp(3.5rem,10vw,9.5rem)]"
          aria-label="Art. Applied To Hair."
        >
          {WORDS.map((w, i) => (
            <motion.span
              key={w}
              variants={word}
              className={`inline-block mr-[0.18em] ${
                i === WORDS.length - 1
                  ? 'italic text-salon-terracotta'
                  : ''
              }`}
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.75, duration: 1.1 }}
          className="mt-9 max-w-md text-salon-bone/55 text-[15px] font-dm font-light leading-[1.8]"
        >
          Where precision meets expression. Maison Atelier is Brooklyn's most
          considered hair studio — for those who know the difference.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.8 }}
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          <a
            href="#booking"
            className="inline-flex items-center gap-3 px-9 py-[15px] bg-salon-terracotta
                       text-salon-bone text-[11px] tracking-[0.22em] uppercase font-dm font-medium
                       hover:bg-salon-bone hover:text-salon-espresso transition-all duration-500"
          >
            Book an Appointment
          </a>
          <a
            href="#services"
            className="flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase
                       font-dm text-salon-bone/55 hover:text-salon-bone transition-colors duration-300"
          >
            Explore Services
            <span className="text-salon-terracotta" aria-hidden>→</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-[9px] tracking-[0.35em] uppercase font-dm text-salon-bone/30">
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-14 bg-gradient-to-b from-salon-bone/40 to-transparent origin-top"
        />
      </motion.div>
    </section>
  );
}
