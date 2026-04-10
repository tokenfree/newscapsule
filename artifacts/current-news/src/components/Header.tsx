import { ThemeToggle } from "./ThemeToggle";
import { weekOf } from "@/data/newsData";

interface HeaderProps {
  onShowNews: () => void;
  newsVisible: boolean;
}

export function Header({ onShowNews, newsVisible }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-[52px] header-glass">
      {/* Left — live indicator */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-card">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400" />
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">Live</span>
        </div>
        <span className="hidden sm:block text-[11px] text-muted-foreground font-mono opacity-60">{weekOf}</span>
      </div>

      {/* Center — wordmark */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <span className="text-[13px] font-bold tracking-[0.22em] uppercase text-foreground">Dispatch</span>
      </div>

      {/* Right — controls */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={onShowNews}
          className="px-4 py-1.5 rounded-full glass-card text-xs font-semibold tracking-wide text-foreground transition-all duration-150 hover:opacity-80 active:scale-95"
        >
          {newsVisible ? "Home" : "News"}
        </button>
      </div>
    </header>
  );
}
