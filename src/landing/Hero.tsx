import { motion } from 'framer-motion';
import { LoginWithPayPalButton } from './LoginWithPayPalButton';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export function Hero() {
  return (
    <section className="min-h-[100dvh] relative overflow-hidden bg-white flex items-center">
      {/* Subtle background mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(0,140,255,0.07) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(0,41,145,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* Left: copy + CTA */}
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="max-w-[540px]"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#008CFF] mb-6">
                <span className="w-4 h-px bg-[#008CFF]" />
                PayPal Gift Memory Book
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-6xl xl:text-7xl tracking-tight leading-[1.05] text-[#09090B] mb-6"
            >
              Turn every gift
              <br />
              into a lasting
              <br />
              <span className="text-[#002991]">memory.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-[#696969] leading-relaxed max-w-[42ch] mb-10"
            >
              Collect the heartfelt messages behind your PayPal gifts — for a wedding, a birthday,
              or a new arrival — and transform them into a beautiful keepsake book in seconds.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-4">
              <LoginWithPayPalButton size="lg" />
              <a
                href="#showcase"
                className="inline-flex items-center gap-2 px-7 py-4 text-base font-medium text-[#09090B]
                  border border-[#E6E7E8] rounded-xl hover:border-[#BFBFBF] transition-colors duration-200"
              >
                See the themes
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex items-center gap-4 text-sm text-[#949494]"
            >
              <div className="flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M7.5 1L9.3 5.2L14 5.7L10.5 9L11.5 13.8L7.5 11.4L3.5 13.8L4.5 9L1 5.7L5.7 5.2L7.5 1Z" fill="#008CFF"/>
                </svg>
                Works on any PayPal account
              </div>
              <span className="w-px h-4 bg-[#E6E7E8]" />
              <div className="flex items-center gap-1.5">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                  <path d="M12 4L6 10L3 7" stroke="#008CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Amounts stay private
              </div>
            </motion.div>
          </motion.div>

          {/* Right: floating PDF mockup */}
          <div className="hidden lg:flex justify-center items-center">
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [0, 0.5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Shadow under the card */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-8 bg-[#002991]/10 blur-2xl rounded-full" />

              {/* Wedding theme cover mockup */}
              <div
                className="w-72 xl:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_32px_80px_-16px_rgba(0,41,145,0.2)] border border-white/60"
                style={{
                  background: 'linear-gradient(145deg, #FAF6F0 0%, #F5EDD9 100%)',
                }}
              >
                {/* Gold border frame */}
                <div className="h-full m-4 border-2 border-[#C9A84C]/40 rounded-xl p-8 flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-px bg-[#C9A84C]/60" />
                  <div className="text-center">
                    <p className="font-display text-[#6B4C20] text-xl tracking-wide leading-snug mb-1">
                      Sophie & Maxime
                    </p>
                    <p className="text-[#C9A84C] text-xs tracking-widest uppercase">
                      Gift Memory Book
                    </p>
                  </div>
                  <div className="w-16 h-px bg-[#C9A84C]/60" />
                  <div className="text-center mt-2">
                    <p className="text-[#8B6D3F] text-xs">15 avril — 8 mai 2026</p>
                    <p className="text-[#8B6D3F] text-xs mt-1">14 messages</p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: 'spring', stiffness: 300 }}
                className="absolute -right-6 top-16 bg-white rounded-xl px-4 py-3
                  shadow-[0_8px_32px_-4px_rgba(0,0,0,0.12)] border border-[#EDF0F2]"
              >
                <p className="text-xs font-semibold text-[#09090B]">14 heartfelt messages</p>
                <p className="text-xs text-[#949494]">Ready to download</p>
              </motion.div>

              {/* Theme dots indicator */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -left-8 bottom-24 bg-white rounded-xl px-4 py-3
                  shadow-[0_8px_32px_-4px_rgba(0,0,0,0.10)] border border-[#EDF0F2]
                  flex items-center gap-2"
              >
                <span className="w-3 h-3 rounded-full bg-[#C9A84C]" />
                <span className="w-3 h-3 rounded-full bg-[#E95B8E]" />
                <span className="w-3 h-3 rounded-full bg-[#4BA3D4]" />
                <span className="text-xs text-[#696969] ml-1">3 themes</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
