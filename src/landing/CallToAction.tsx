import { motion } from 'framer-motion';
import { LoginWithPayPalButton } from './LoginWithPayPalButton';

export function CallToAction() {
  return (
    <section className="py-28 bg-[#002991]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: '-60px' }}
        className="max-w-[1400px] mx-auto px-6 md:px-12"
      >
        <div className="max-w-[640px]">
          <h2 className="font-display text-4xl md:text-5xl tracking-tight text-white mb-6 leading-tight">
            Every message deserves
            <br />
            to be remembered.
          </h2>
          <p className="text-[#60CDFF] text-lg leading-relaxed mb-10 max-w-[44ch]">
            Connect your account in seconds and create a keepsake book for any occasion — wedding,
            birthday, or new arrival.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <LoginWithPayPalButton size="lg" label="Create your memory book" />
          </div>
          <p className="mt-6 text-sm text-[#60CDFF]/60">
            For PayPal internal demo use. Activity API access required for real data.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
