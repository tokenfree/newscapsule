interface LandingHeroProps {
  onShowNews: () => void;
}

export function LandingHero({ onShowNews }: LandingHeroProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-transparent">
      <div className="relative z-10 text-center max-w-2xl space-y-10">

        {/* Live pill */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full glass-card">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Intelligence Brief · Live
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-1">
          <h1 className="text-[72px] sm:text-[100px] font-bold tracking-[-0.04em] text-foreground leading-[0.88]">
            What's
          </h1>
          <h1 className="text-[72px] sm:text-[100px] font-bold tracking-[-0.04em] leading-[0.88] text-red-500">
            happening
          </h1>
        </div>

        <p className="text-base sm:text-[17px] text-muted-foreground leading-relaxed max-w-sm mx-auto">
          The world's most significant events, summarized and delivered in real time.
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-3">
          {[
            { label: "Live Stories", value: "Top 20" },
            { label: "Categories",   value: "7+"     },
            { label: "Updated",      value: "Hourly" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card px-5 py-4 rounded-2xl text-center min-w-[88px]">
              <div className="text-xl font-bold text-foreground tracking-tight">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground font-semibold tracking-[0.15em] uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onShowNews}
          className="group inline-flex items-center gap-3 px-7 py-3.5 glass-card rounded-2xl font-semibold text-[15px] text-foreground tracking-tight transition-all duration-200 hover:opacity-80 active:scale-[0.98]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400" />
          Current News
          <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
