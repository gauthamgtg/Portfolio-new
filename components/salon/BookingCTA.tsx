'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  { num: '12',  label: 'Years in Brooklyn'  },
  { num: '4.9', label: 'Average Rating'     },
  { num: '3K+', label: 'Happy Clients'      },
];

export default function BookingCTA() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="booking" className="bg-salon-bone py-28 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-end"
        >

          {/* Left — headline */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="salon-label mb-7"
            >
              Begin Here
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-fraunces font-light text-salon-espresso leading-[0.9]
                         text-[clamp(3rem,7vw,6.5rem)]"
            >
              Your next
              <br />
              <em className="italic text-salon-terracotta">chapter</em>
              <br />
              starts here.
            </motion.h2>
          </div>

          {/* Right — copy + CTAs */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[14px] font-dm font-light text-salon-taupe leading-[1.85] mb-10"
            >
              New clients begin with a complimentary 15-minute consultation. We'll
              talk about your hair history, goals, and lifestyle — then recommend
              the approach that's entirely right for you. No pressure, just clarity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="https://vagaro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="salon-btn justify-center gap-3"
              >
                Book an Appointment
                <span aria-hidden>→</span>
              </a>
              <a
                href="tel:+17183555555"
                className="salon-btn-outline justify-center"
              >
                Call Us Directly
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.75, duration: 0.8 }}
              className="mt-12 pt-10 border-t border-salon-sand grid grid-cols-3 gap-6"
            >
              {STATS.map(({ num, label }) => (
                <div key={label}>
                  <p className="font-fraunces text-4xl font-light text-salon-espresso mb-1">
                    {num}
                  </p>
                  <p className="text-[10px] tracking-[0.18em] uppercase font-dm text-salon-taupe">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
