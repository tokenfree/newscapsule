interface HeaderProps {
  onShowNews: () => void;
  newsVisible: boolean;
  focusModeActive: boolean;
  onToggleFocus: () => void;
}

export function Header({ onShowNews, newsVisible, focusModeActive, onToggleFocus }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-[62px] header-glass">
      <div className="flex items-center gap-2">
        {/* Live pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass">
          <span className="text-[12px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">Live</span>
        </div>

        {/* Focus Mode button */}
        <button
          onClick={onToggleFocus}
          aria-label="Toggle focus mode"
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 ${
            focusModeActive
              ? "glass text-foreground"
              : "glass text-muted-foreground hover:text-foreground"
          }`}
        >
          <svg
            className="w-[11px] h-[11px]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.2}
          >
            {focusModeActive ? (
              /* minimize / exit icon */
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4 4m0 0h5m-5 0v5M15 9l5-5m0 0h-5m5 0v5M9 15l-5 5m0 0h5m-5 0v-5M15 15l5 5m0 0h-5m5 0v-5" />
            ) : (
              /* expand / focus icon */
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5M20 8V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M20 16v4m0 0h-4m4 0l-5-5" />
            )}
          </svg>
          <span className="text-[12px] font-semibold tracking-[0.2em] uppercase">Focus</span>
        </button>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <span className="text-display text-[22px] italic tracking-tight" style={{ color: "#ef4444" }}>
          News Capsule
        </span>
      </div>

      <div className="w-[72px]" />
    </header>
  );
}
