interface HeaderProps {
  onShowNews: () => void;
  newsVisible: boolean;
}

export function Header({ onShowNews, newsVisible }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-[52px] header-glass">
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass">
        <div className="w-1.5 h-1.5 rounded-full bg-white/60 pulse-dot" />
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">Live</span>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <span className="text-display text-[18px] italic text-foreground/90 tracking-tight">
          News Capsule
        </span>
      </div>

      <button
        onClick={onShowNews}
        className="glass flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-medium text-muted-foreground transition hover:text-foreground hover:bg-white/10"
      >
        {newsVisible ? "Home" : "Briefing"}
      </button>
    </header>
  );
}
