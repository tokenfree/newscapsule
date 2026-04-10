interface LandingHeroProps {
  onShowNews: () => void;
}

export function LandingHero({ onShowNews }: LandingHeroProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-background">
      <div className="relative z-10 text-center max-w-2xl space-y-12">

        {/* Live pill */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3 px-5 py-2.5 glass-card">
            <div className="w-2 h-2 bg-green-500 dark:bg-green-400 pulse-dot" />
            <span className="text-[12px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Intelligence Brief · Live
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-1">
          <h1 className="text-[72px] sm:text-[100px] font-bold tracking-[-0.04em] text-foreground leading-[0.88]">
            What's
          </h1>
          <h1 className="text-[72px] sm:text-[100px] font-bold tracking-[-0.04em] leading-[0.88] text-foreground/20">
            happening
          </h1>
        </div>

        <p className="text-[17px] sm:text-[19px] text-muted-foreground leading-relaxed max-w-sm mx-auto">
          The world's most significant events, summarized and delivered in real time.
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-4">
          {[
            { label: "Live Stories", value: "Top 20" },
            { label: "Categories",   value: "7+"     },
            { label: "Updated",      value: "Hourly" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card px-6 py-5 text-center min-w-[100px]">
              <div className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</div>
              <div className="text-[11px] text-muted-foreground font-semibold tracking-[0.15em] uppercase mt-1.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onShowNews}
          className="group inline-flex items-center gap-3.5 px-8 py-4 glass-card font-semibold text-[16px] text-foreground tracking-tight transition-all duration-200 hover:opacity-80 active:scale-[0.98]"
        >
          <div className="w-2 h-2 bg-green-500 dark:bg-green-400 pulse-dot" />
          Current News
          <svg className="w-4.5 h-4.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
