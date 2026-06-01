import { motion } from 'framer-motion';
import { LoginWithPayPalButton } from './LoginWithPayPalButton';

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#EDF0F2]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#008CFF] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M10 2.5C10 4.7 8.4 6.5 6.5 6.5H4.5L3.5 11H1.5L3.5 2H7C8.7 2 10 2.5 10 2.5Z" fill="white" opacity="0.6"/>
              <path d="M12 4C12 6.2 10.4 8 8.5 8H6.5L5.5 12.5H3.5L5.5 3.5H9.5C11.2 3.5 12 4 12 4Z" fill="white"/>
            </svg>
          </div>
          <span className="font-semibold text-[#09090B] text-sm tracking-tight">Gift Memory Book</span>
        </div>

        <div className="flex items-center gap-4">
          <a href="#showcase" className="hidden sm:block text-sm text-[#696969] hover:text-[#09090B] transition-colors">
            Themes
          </a>
          <LoginWithPayPalButton size="md" label="Log in" />
        </div>
      </div>
    </motion.nav>
  );
}
