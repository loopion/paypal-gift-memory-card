import { motion } from 'framer-motion';

interface Props {
  size?: 'md' | 'lg';
  label?: string;
}

export function LoginWithPayPalButton({ size = 'lg', label = 'Log in with PayPal' }: Props) {
  return (
    <motion.a
      href="/api/auth/login"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97, y: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`inline-flex items-center gap-3 bg-[#008CFF] text-white font-semibold rounded-xl
        ${size === 'lg' ? 'px-7 py-4 text-base' : 'px-5 py-3 text-sm'}
        shadow-[0_4px_24px_-4px_rgba(0,140,255,0.4)] hover:bg-[#0080eb]
        transition-colors duration-200 no-underline`}
    >
      {/* PayPal dual-P logo */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M19.5 6.5C19.5 9.8 17.1 12.5 14 12.5H11.5L10.5 18H7L9.5 5H14.5C17.3 5 19.5 6.5 19.5 6.5Z"
          fill="white"
          opacity="0.6"
        />
        <path
          d="M17 9C17 12.3 14.6 15 11.5 15H9L8 20.5H4.5L7 7H12C14.8 7 17 9 17 9Z"
          fill="white"
        />
      </svg>
      {label}
    </motion.a>
  );
}
