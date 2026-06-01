const points = [
  {
    title: 'Amounts stay private',
    body: 'Individual contribution amounts are never shown in the memory book. Each card shows the sender name, their message, and the date — nothing more.',
  },
  {
    title: 'Your data never leaves PayPal infrastructure',
    body: 'We access your activity through PayPal\'s own APIs. No third-party data brokers, no stored transaction history. The session is encrypted and expires in 7 days.',
  },
  {
    title: 'You control the output',
    body: 'The PDF is generated entirely in your browser and downloaded directly to your device. Nothing is saved on our servers after your session ends.',
  },
];

export function Privacy() {
  return (
    <section className="py-32 bg-[#F5F7FA]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 lg:gap-24 items-start">

          {/* Left: heading */}
          <div className="lg:sticky lg:top-20">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#008CFF]">Privacy first</span>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight text-[#09090B] mt-3 leading-tight">
              Built with discretion
              <br />
              at every layer.
            </h2>
            <p className="mt-6 text-[#696969] text-base leading-relaxed max-w-[38ch]">
              Gift giving is personal. This tool treats it that way.
            </p>
          </div>

          {/* Right: divider list */}
          <div>
            {points.map((point, i) => (
              <div
                key={i}
                className="py-8 border-t border-[#E6E7E8] first:border-t-0 first:pt-0"
              >
                <h3 className="font-display text-xl font-semibold text-[#09090B] mb-3 tracking-tight">
                  {point.title}
                </h3>
                <p className="text-[#696969] text-base leading-relaxed max-w-[52ch]">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
