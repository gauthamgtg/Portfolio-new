'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SERVICES = [
  {
    id:    '01',
    name:  'Cut & Style',
    price: 'From $95',
    desc:  'A precision cut shaped to your face, texture, and how you actually live your life.',
    tags:  'Consultation · Wash · Cut · Finish',
  },
  {
    id:    '02',
    name:  'Color',
    price: 'From $145',
    desc:  'Multi-dimensional, lived-in color with an artisan finish that only improves over time.',
    tags:  'Single Process · Retouch · Gloss',
  },
  {
    id:    '03',
    name:  'Balayage',
    price: 'From $195',
    desc:  'Hand-painted tones placed to catch the light exactly as nature intended.',
    tags:  'Full · Partial · Toning',
  },
  {
    id:    '04',
    name:  'Extensions',
    price: 'From $550',
    desc:  'Seamlessly integrated for effortless length and density. Undetectable, unmistakable.',
    tags:  'Tape-In · Hand-Tied · Consultation',
  },
  {
    id:    '05',
    name:  'Treatments',
    price: 'From $75',
    desc:  'Targeted care that restores strength, smoothness, and luminosity to compromised hair.',
    tags:  'Bond Restore · Smoothing · Scalp',
  },
  {
    id:    '06',
    name:  'Bridal',
    price: 'From $450',
    desc:  'A serene, unhurried experience for the most considered day of your life.',
    tags:  'Trial · Day-of Styling · Wedding Party',
  },
];

function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.09, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group border-t border-salon-sand pt-8 pb-6 cursor-default
                 hover:border-salon-terracotta/60 transition-colors duration-500"
    >
      <div className="flex items-start justify-between mb-5">
        <span className="text-[10px] tracking-[0.28em] font-dm text-salon-sand">{svc.id}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-sm font-dm font-medium text-salon-terracotta opacity-0
                     group-hover:opacity-100 transition-opacity duration-500"
        >
          {svc.price}
        </motion.span>
      </div>

      <h3 className="font-fraunces text-[1.5rem] font-light text-salon-espresso mb-3
                     group-hover:italic transition-[font-style] duration-500">
        {svc.name}
      </h3>

      <p className="text-[13.5px] font-dm font-light text-salon-taupe leading-relaxed mb-5 max-w-[280px]">
        {svc.desc}
      </p>

      <p className="text-[10px] tracking-[0.2em] uppercase font-dm text-salon-sand/80">
        {svc.tags}
      </p>
    </motion.article>
  );
}

export default function Services() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="services" className="bg-salon-bone py-28 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-20"
        >
          <div>
            <p className="salon-label mb-4">What We Do</p>
            <h2 className="salon-h2">Services</h2>
          </div>
          <p className="mt-6 md:mt-0 max-w-sm text-[13.5px] font-dm font-light
                        text-salon-taupe leading-relaxed">
            Every appointment is a collaboration. We listen first, then create
            something entirely yours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
