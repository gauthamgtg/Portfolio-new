'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const TEAM = [
  {
    name:      'Isabel Voss',
    title:     'Creative Director & Master Colorist',
    specialty: 'Lived-in color · Texture transformation · Editorial cuts',
    bio:       'With 15 years shaping color theory at studios in London and New York, Isabel founded Maison Atelier to bring European precision to Brooklyn. Her work has appeared in Vogue and New York Magazine.',
    instagram: '@isabelatelier',
    img:       'https://picsum.photos/seed/isabel-voss-stylist/600/750',
    offset:    false,
  },
  {
    name:      'Marcus Chen',
    title:     'Senior Stylist & Texture Specialist',
    specialty: "Precision cuts · Curly texture · Men's grooming",
    bio:       'Marcus trained under Sassoon-lineage masters in Tokyo before joining Maison. His understanding of structure and movement is singular. He holds advanced certification in textured hair.',
    instagram: '@marcuschen.hair',
    img:       'https://picsum.photos/seed/marcus-chen-stylist/600/750',
    offset:    true,
  },
  {
    name:      'Lyra Santos',
    title:     'Stylist & Balayage Artist',
    specialty: 'Sun-kissed balayage · Color correction · Extensions',
    bio:       "Lyra’s balayage has been featured in three national publications. She approaches each client as a study in light, shadow, and movement — painting tone rather than applying it.",
    instagram: '@lyra.creates',
    img:       'https://picsum.photos/seed/lyra-santos-stylist/600/750',
    offset:    false,
  },
];

function TeamCard({ member, index }: { member: typeof TEAM[0]; index: number }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 56 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.18, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      style={{ marginTop: member.offset ? '5rem' : 0 }}
    >
      {/* Photo */}
      <div className="relative overflow-hidden aspect-[4/5] mb-7">
        <Image
          src={member.img}
          alt={`Portrait of ${member.name}`}
          fill
          className="object-cover grayscale group-hover:grayscale-0
                     scale-100 group-hover:scale-[1.04]
                     transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          sizes="(max-width: 768px) 90vw, 33vw"
        />
        <div className="absolute inset-0 bg-salon-espresso/12
                        group-hover:bg-transparent transition-colors duration-700" />
        <a
          href={`https://instagram.com/${member.instagram.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 bg-salon-bone/90 text-salon-espresso
                     text-[10px] tracking-[0.22em] uppercase px-4 py-[9px] font-dm
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500
                     hover:bg-salon-terracotta hover:text-salon-bone"
        >
          {member.instagram}
        </a>
      </div>

      <h3 className="font-fraunces text-[1.55rem] font-light text-salon-espresso mb-1">
        {member.name}
      </h3>
      <p className="salon-label mb-4">{member.title}</p>
      <p className="text-[13px] font-dm font-light text-salon-taupe leading-relaxed mb-4 max-w-[300px]">
        {member.bio}
      </p>
      <p className="text-[10px] tracking-[0.18em] uppercase font-dm text-salon-sand">
        {member.specialty}
      </p>
    </motion.div>
  );
}

export default function Team() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="team" className="bg-salon-cream py-28 md:py-40">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="salon-label mb-4">The People</p>
          <h2 className="salon-h2">Meet the Team</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          {TEAM.map((m, i) => <TeamCard key={m.name} member={m} index={i} />)}
        </div>
      </div>
    </section>
  );
}
