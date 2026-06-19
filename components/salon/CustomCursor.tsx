'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted]     = useState(false);
  const [isHover, setIsHover]     = useState(false);
  const [isClicking, setClicking] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const dotX  = useSpring(mx, { damping: 55, stiffness: 1400 });
  const dotY  = useSpring(my, { damping: 55, stiffness: 1400 });
  const ringX = useSpring(mx, { damping: 18, stiffness: 180 });
  const ringY = useSpring(my, { damping: 18, stiffness: 180 });

  useEffect(() => {
    setMounted(true);

    const onMove = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    const over = (e: MouseEvent) => {
      const el = (e.target as Element).closest('a, button, [data-hover]');
      setIsHover(!!el);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousemove', over);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousemove', over);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
    };
  }, [mx, my]);

  if (!mounted) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{ scale: isClicking ? 0.5 : isHover ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          className="w-[7px] h-[7px] rounded-full bg-salon-terracotta"
        />
      </motion.div>

      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale:   isHover ? 2.2 : isClicking ? 0.8 : 1,
            opacity: isHover ? 1   : 0.45,
            borderColor: isHover ? '#B8714E' : '#B8714E',
          }}
          transition={{ duration: 0.25 }}
          className="w-8 h-8 rounded-full border border-salon-terracotta"
        />
      </motion.div>
    </>
  );
}
