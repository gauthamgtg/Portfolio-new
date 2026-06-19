'use client';
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';

const PHOTOS = [
  { src: 'https://picsum.photos/seed/look-01/500/700', w: 280, caption: 'Lived-In Blonde' },
  { src: 'https://picsum.photos/seed/look-02/700/500', w: 400, caption: 'Editorial Bob' },
  { src: 'https://picsum.photos/seed/look-03/500/600', w: 310, caption: 'Copper Balayage' },
  { src: 'https://picsum.photos/seed/look-04/500/700', w: 280, caption: 'Bridal Updo' },
  { src: 'https://picsum.photos/seed/look-05/700/500', w: 410, caption: 'Precision Cut' },
  { src: 'https://picsum.photos/seed/look-06/500/700', w: 290, caption: 'Extensions' },
  { src: 'https://picsum.photos/seed/look-07/600/600', w: 340, caption: 'Glossy Highlights' },
  { src: 'https://picsum.photos/seed/look-08/700/480', w: 390, caption: 'Smoothing Treatment' },
  { src: 'https://picsum.photos/seed/look-09/500/680', w: 275, caption: 'Rich Brunette' },
];

type Photo = typeof PHOTOS[0];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="gallery" className="bg-salon-bone py-28 md:py-40 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14"
        >
          <div>
            <p className="salon-label mb-4">The Work</p>
            <h2 className="salon-h2">Lookbook</h2>
          </div>
          <p className="mt-6 md:mt-0 max-w-xs text-[13.5px] font-dm font-light
                        text-salon-taupe leading-relaxed">
            A curated selection from the studio. Every piece crafted, not replicated.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll strip — no max-width, bleeds edge to edge */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-6 md:px-12 lg:px-16 pb-3">
        {PHOTOS.map((photo, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.07, duration: 0.7 }}
            onClick={() => setLightbox(photo)}
            className="group relative flex-shrink-0 overflow-hidden focus-visible:outline-2
                       focus-visible:outline-salon-terracotta"
            style={{ width: photo.w, height: 420 }}
            aria-label={`View ${photo.caption}`}
          >
            <Image
              src={photo.src}
              alt={photo.caption}
              fill
              className="object-cover group-hover:scale-[1.06]
                         transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              sizes="350px"
            />
            <div className="absolute inset-0 bg-salon-espresso/0
                            group-hover:bg-salon-espresso/18 transition-colors duration-500" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100
                            transition-opacity duration-500">
              <span className="text-[10px] tracking-[0.2em] uppercase font-dm
                               text-salon-bone bg-salon-espresso/80 px-3 py-[6px]">
                {photo.caption}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{   opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[200] bg-salon-espresso/96 flex items-center justify-center p-6"
            role="dialog"
            aria-label={lightbox.caption}
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{   scale: 0.88,  opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative w-full max-w-xl max-h-[80vh] aspect-[3/4]"
            >
              <Image
                src={lightbox.src}
                alt={lightbox.caption}
                fill
                className="object-cover"
                sizes="600px"
              />
              <div className="absolute inset-x-0 bottom-0 p-7
                              bg-gradient-to-t from-salon-espresso/70 to-transparent">
                <p className="font-fraunces text-xl font-light text-salon-bone">
                  {lightbox.caption}
                </p>
              </div>
            </motion.div>

            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-salon-bone/60 hover:text-salon-terracotta
                         transition-colors duration-300"
              aria-label="Close lightbox"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
