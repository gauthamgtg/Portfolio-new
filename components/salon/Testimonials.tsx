'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const QUOTES = [
  {
    quote:  'Walking out of Maison Atelier feels like leaving a gallery opening — except your hair is the art.',
    author: 'Vivienne L.',
    role:   'Interior Designer',
  },
  {
    quote:  'The color Isabel created has more complexity than anything I\'ve seen in London or Paris. Worth every dollar.',
    author: 'Daniel H.',
    role:   'Creative Director',
  },
  {
    quote:  'They understood immediately what I wanted, and delivered something even better. First time I\'ve actually loved a haircut.',
    author: 'Priya K.',
    role:   'Architect',
  },
  {
    quote:  'The atmosphere, the expertise, the results — Maison sets the bar impossibly high and then clears it effortlessly.',
    author: 'Sofia R.',
    role:   'Fashion Editor',
  },
];

export default function Testimonials() {
  const [idx, setIdx]   = useState(0);
  const [dir, setDir]   = useState(1);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  const go = (next: number) => {
    setDir(next > idx ? 1 : -1);
    setIdx(next);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setIdx(prev => (prev + 1) % QUOTES.length);
      setDir(1);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-salon-espresso py-28 md:py-40 overflow-hidden noise">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <p className="salon-label mb-16 text-salon-terracotta">Client Voices</p>

          <div className="relative min-h-[220px] md:min-h-[180px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={idx}
                custom={dir}
                initial={{ opacity: 0, x: dir * 56 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{   opacity: 0, x: dir * -56 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <blockquote className="font-fraunces italic font-light text-salon-bone
                                       text-2xl md:text-4xl lg:text-[2.8rem] leading-[1.2] max-w-4xl mb-10">
                  &ldquo;{QUOTES[idx].quote}&rdquo;
                </blockquote>
                <footer>
                  <p className="font-dm font-medium text-salon-bone text-sm">
                    {QUOTES[idx].author}
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-dm text-salon-taupe mt-1">
                    {QUOTES[idx].role}
                  </p>
                </footer>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-3 mt-14">
            {QUOTES.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Quote ${i + 1}`}
                className={`h-px transition-all duration-400 ${
                  i === idx
                    ? 'w-10 bg-salon-terracotta'
                    : 'w-5 bg-salon-bone/20 hover:bg-salon-bone/40'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
