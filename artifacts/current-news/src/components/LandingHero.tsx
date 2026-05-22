interface LandingHeroProps {
  onShowNews: () => void;
}

export function LandingHero({ onShowNews }: LandingHeroProps) {
  return (
    <div className="noise relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="relative z-10 text-center max-w-2xl space-y-10">

        <div className="space-y-1">
          <h1 className="text-display text-[91px] sm:text-[130px] text-foreground leading-[0.88] tracking-[-0.03em]">
            What's
          </h1>
          <h1 className="text-display text-[91px] sm:text-[130px] italic leading-[0.88] tracking-[-0.03em]" style={{ color: "#ef4444" }}>
            happening.
          </h1>
        </div>

        <p className="text-[19px] text-muted-foreground leading-relaxed max-w-sm mx-auto font-light">
          The world's many news, summarized and delivered.
        </p>

        <div className="flex items-center justify-center gap-3">
          {[
            { label: "Live Stories", value: "Top 20" },
            { label: "Categories",   value: "7+"     },
            { label: "Updated",      value: "Hourly" },
          ].map((stat) => (
            <div key={stat.label} className="glass px-5 py-4 rounded-2xl text-center min-w-[108px]">
              <div className="text-display text-xl text-foreground">{stat.value}</div>
              <div className="text-[12px] text-muted-foreground font-semibold tracking-[0.18em] uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onShowNews}
          className="group inline-flex items-center gap-3 px-7 py-3.5 glass rounded-2xl text-[18px] font-medium tracking-tight transition-all duration-200 hover:opacity-75 active:scale-[0.98]"
          style={{ color: "#ef4444" }}
        >
          News Capsule
          <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
