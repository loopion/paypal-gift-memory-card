export function Footer() {
  return (
    <footer className="py-8 bg-[#002991] border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* PayPal wordmark */}
          <svg width="72" height="18" viewBox="0 0 72 18" fill="none" aria-label="PayPal">
            <text x="0" y="14" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="600" fill="white">
              PayPal
            </text>
          </svg>
          <span className="text-xs text-[#60CDFF]/50">Gift Memory Book</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-[#60CDFF]/50">
          <a
            href="https://github.paypal.com/epays/paypal-gift-memory-card"
            className="hover:text-[#60CDFF] transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </a>
          <span>Internal demo — {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
