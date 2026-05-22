interface HeaderProps {
  onShowNews: () => void;
  newsVisible: boolean;
}

export function Header({ onShowNews, newsVisible }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-[52px] header-glass">
      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass">
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">Live</span>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <span className="text-display text-[18px] italic tracking-tight" style={{ color: "#ef4444" }}>
          News Capsule
        </span>
      </div>

      <div className="w-[72px]" />
    </header>
  );
}
