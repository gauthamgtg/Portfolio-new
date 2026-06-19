const ITEMS = [
  'Color', 'Cut', 'Balayage', 'Extensions',
  'Bridal', 'Treatments', 'Styling', 'Color Correction',
];

export default function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className="bg-salon-espresso py-[13px] overflow-hidden"
      aria-hidden="true"
    >
      <div className="flex animate-marquee-salon whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-[10px] tracking-[0.32em] uppercase font-dm font-medium text-salon-bone/45 px-6">
              {item}
            </span>
            <span className="text-salon-terracotta/60 text-[8px]" aria-hidden>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
