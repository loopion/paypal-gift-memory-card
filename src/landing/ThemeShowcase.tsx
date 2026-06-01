import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const themes = [
  {
    id: 'wedding',
    label: 'Wedding',
    bg: 'linear-gradient(145deg, #FAF6F0 0%, #F5EDD9 100%)',
    accent: '#C9A84C',
    textColor: '#6B4C20',
    font: 'Playfair Display, Georgia, serif',
    subtitle: 'Sophie & Maxime',
    span: 'col-span-2 row-span-2',
    size: 'large',
  },
  {
    id: 'birthday',
    label: 'Birthday',
    bg: 'linear-gradient(145deg, #FFF0F5 0%, #FFE0EC 100%)',
    accent: '#E95B8E',
    textColor: '#8B1A4A',
    font: 'Nunito, sans-serif',
    subtitle: 'Happy Birthday Léa',
    span: 'col-span-1 row-span-1',
    size: 'small',
  },
  {
    id: 'baby',
    label: 'Baby Born',
    bg: 'linear-gradient(145deg, #EFF8FF 0%, #DBEEFF 100%)',
    accent: '#4BA3D4',
    textColor: '#1A527A',
    font: 'Baloo 2, sans-serif',
    subtitle: 'Welcome Baby Elliot',
    span: 'col-span-1 row-span-1',
    size: 'small',
  },
];

function CoverCard({
  theme,
  delay = 0,
}: {
  theme: (typeof themes)[0];
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={`${theme.span} rounded-2xl overflow-hidden border border-white/60
        shadow-[0_12px_40px_-8px_rgba(0,0,0,0.10)]`}
      style={{ background: theme.bg }}
    >
      <div className="h-full min-h-[180px] p-6 flex flex-col">
        {/* Theme label tag */}
        <div className="self-start mb-auto">
          <span
            className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded"
            style={{ color: theme.accent, backgroundColor: `${theme.accent}18` }}
          >
            {theme.label}
          </span>
        </div>

        {/* Cover content */}
        <div className="flex flex-col items-center text-center py-4">
          <div
            className="w-10 h-px mb-4"
            style={{ backgroundColor: `${theme.accent}80` }}
          />
          <p
            className={`font-semibold leading-snug mb-1 ${theme.size === 'large' ? 'text-xl' : 'text-sm'}`}
            style={{ fontFamily: theme.font, color: theme.textColor }}
          >
            {theme.subtitle}
          </p>
          <p
            className={`${theme.size === 'large' ? 'text-xs' : 'text-[10px]'} tracking-widest uppercase mt-1`}
            style={{ color: theme.accent }}
          >
            Gift Memory Book
          </p>
          <div
            className="w-10 h-px mt-4"
            style={{ backgroundColor: `${theme.accent}80` }}
          />
        </div>

        {/* Sample card snippet for large tile only */}
        {theme.size === 'large' && (
          <div
            className="mt-4 rounded-xl p-4 border"
            style={{ borderColor: `${theme.accent}30`, backgroundColor: `${theme.accent}08` }}
          >
            <p className="text-xs font-semibold mb-1" style={{ color: theme.textColor }}>
              Marie & Pierre Dupont
            </p>
            <p className="text-xs leading-relaxed" style={{ color: `${theme.textColor}99` }}>
              Toutes nos félicitations ! Que votre amour soit aussi fort que votre bonheur...
            </p>
            <p className="text-[10px] mt-2" style={{ color: theme.accent }}>15 avril 2026</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function ThemeShowcase() {
  return (
    <section id="showcase" className="py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#008CFF]">Visual themes</span>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-[#09090B] mt-3">
              A design for every moment
            </h2>
          </div>
          <p className="text-[#696969] text-base max-w-[38ch] md:text-right">
            Each theme is crafted with its own typography, palette, and layout — printed once, kept forever.
          </p>
        </div>

        {/* Bento grid — asymmetric 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-auto md:h-[440px]">
          {themes.map((theme, i) => (
            <CoverCard key={theme.id} theme={theme} delay={i * 0.08} />
          ))}
        </div>

        <p className="mt-6 text-xs text-[#949494] text-right">
          Bilingual EN/FR PDF output — amounts never shown per sender.
        </p>
      </div>
    </section>
  );
}
