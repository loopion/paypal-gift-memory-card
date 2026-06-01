import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Connect your PayPal account',
    description:
      'Sign in with your existing PayPal account. We only request read access to your activity — nothing else.',
    detail: 'Secure OAuth 2.0 login. No passwords stored.',
    align: 'left',
  },
  {
    number: '02',
    title: 'Choose your dates, theme, and recipient',
    description:
      'Pick the date range when gifts were received, select a visual theme — Wedding, Birthday, or Baby — and enter the recipient name.',
    detail: 'Three themes. Bilingual EN/FR output.',
    align: 'right',
  },
  {
    number: '03',
    title: 'Download your keepsake book',
    description:
      'A beautiful PDF is generated instantly — sender names, personal messages, and dates, without individual amounts. Ready to print or share.',
    detail: 'Privacy-first. Amounts never appear per card.',
    align: 'left',
  },
];

function Step({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isRight = step.align === 'right';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={`flex gap-12 lg:gap-20 items-center ${isRight ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Number + connector */}
      <div className="flex flex-col items-center flex-shrink-0 w-16">
        <div className="w-12 h-12 rounded-full border-2 border-[#008CFF] flex items-center justify-center
          text-sm font-bold text-[#008CFF] bg-white shadow-[0_0_0_4px_rgba(0,140,255,0.08)]">
          {step.number}
        </div>
        {index < steps.length - 1 && (
          <div className="w-px flex-1 mt-4 bg-gradient-to-b from-[#008CFF]/30 to-transparent min-h-[80px]" />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 pb-16 ${isRight ? 'text-right' : 'text-left'}`}>
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-[#09090B] mb-3 tracking-tight">
          {step.title}
        </h3>
        <p className="text-[#696969] text-base leading-relaxed max-w-[48ch] mb-3">
          {step.description}
        </p>
        <p className="text-xs font-semibold text-[#008CFF] tracking-wide">{step.detail}</p>
      </div>

      {/* Spacer on opposite side for zig-zag alignment */}
      <div className="hidden lg:block flex-1" />
    </motion.div>
  );
}

export function HowItWorks() {
  return (
    <section className="py-32 bg-[#F5F7FA]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="mb-20">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#008CFF]">How it works</span>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight text-[#09090B] mt-3 max-w-[14ch]">
            Three steps to a keepsake
          </h2>
        </div>

        <div className="max-w-2xl">
          {steps.map((step, i) => (
            <Step key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
