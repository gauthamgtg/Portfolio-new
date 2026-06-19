'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ROWS = [
  { svc: "Women's Cut & Blow-Dry",         jr: '$95',  sr: '$145', dir: '$195' },
  { svc: "Men's Cut",                       jr: '$65',  sr: '$95',  dir: '$135' },
  { svc: "Children's Cut (12 & under)",     jr: '$55',  sr: '$70',  dir: '–'    },
  { svc: 'Single Process Color',            jr: '$145', sr: '$185', dir: '$245' },
  { svc: 'Full Highlights',                 jr: '$225', sr: '$285', dir: '$365' },
  { svc: 'Partial Highlights',              jr: '$165', sr: '$210', dir: '$275' },
  { svc: 'Balayage',                        jr: '$275', sr: '$345', dir: '$425' },
  { svc: 'Gloss / Toner',                   jr: '$75',  sr: '$95',  dir: '$120' },
  { svc: 'Keratin Smoothing Treatment',     jr: '$225', sr: '$275', dir: '$325' },
  { svc: 'Bond Restore Treatment',          jr: '$85',  sr: '$110', dir: '$140' },
  { svc: 'Extensions — Tape-In (Full Set)', jr: '$550', sr: '$650', dir: '$750' },
  { svc: 'Bridal Package',                  jr: '$450', sr: '$575', dir: '$695' },
];

const TIERS = [
  {
    name: 'Junior',
    desc: 'Associate stylists with 2–4 years of hands-on training under senior mentors.',
  },
  {
    name: 'Senior',
    desc: '5–10 years of specialty expertise. Our most requested tier.',
  },
  {
    name: 'Director',
    desc: 'Isabel Voss and Marcus Chen. Our most advanced creative talent.',
  },
];

export default function Pricing() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="pricing" className="bg-salon-cream py-28 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <p className="salon-label mb-4">Investment</p>
          <h2 className="salon-h2 mb-6">Pricing</h2>
          <p className="max-w-xl text-[13.5px] font-dm font-light text-salon-taupe leading-relaxed">
            Pricing reflects stylist level, not service quality. Every client receives the same
            Maison Atelier standard of care.
          </p>
        </motion.div>

        {/* Tier descriptors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="border-t border-salon-sand pt-6"
            >
              <h3 className="font-fraunces text-xl font-light text-salon-espresso mb-2">
                {tier.name}
              </h3>
              <p className="text-[13px] font-dm font-light text-salon-taupe leading-relaxed">
                {tier.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Price table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[580px]" aria-label="Salon pricing">
            <thead>
              <tr className="border-b border-salon-espresso/80">
                <th className="text-left py-4 text-[10px] tracking-[0.25em] uppercase font-dm
                               font-medium text-salon-espresso pr-8">
                  Service
                </th>
                <th className="text-right py-4 text-[10px] tracking-[0.25em] uppercase font-dm
                               font-medium text-salon-espresso px-5">
                  Junior
                </th>
                <th className="text-right py-4 text-[10px] tracking-[0.25em] uppercase font-dm
                               font-medium text-salon-espresso px-5">
                  Senior
                </th>
                <th className="text-right py-4 text-[10px] tracking-[0.25em] uppercase font-dm
                               font-medium text-salon-terracotta pl-5">
                  Director
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <motion.tr
                  key={row.svc}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.04, duration: 0.5 }}
                  className="border-b border-salon-sand/60 hover:bg-salon-bone/50
                             transition-colors duration-300"
                >
                  <td className="py-4 text-[13.5px] font-dm font-light text-salon-espresso pr-8">
                    {row.svc}
                  </td>
                  <td className="py-4 text-right text-[13.5px] font-dm text-salon-taupe px-5">
                    {row.jr}
                  </td>
                  <td className="py-4 text-right text-[13.5px] font-dm text-salon-taupe px-5">
                    {row.sr}
                  </td>
                  <td className="py-4 text-right text-[13.5px] font-dm font-medium
                                 text-salon-terracotta pl-5">
                    {row.dir}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-8 text-[11px] font-dm text-salon-taupe/60 leading-relaxed"
        >
          * Pricing may vary based on hair length, density, and service complexity.
          A complimentary consultation is included with every new client visit.
        </motion.p>
      </div>
    </section>
  );
}
