import { ThemeToggle } from "./ThemeToggle";
import { weekOf } from "@/data/newsData";

interface HeaderProps {
  onShowNews: () => void;
  newsVisible: boolean;
}

export function Header({ onShowNews, newsVisible }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-[62px] header-glass">
      {/* Left — live indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 px-4 py-2 glass-card">
          <div className="w-2 h-2 bg-green-500 dark:bg-green-400 pulse-dot" />
          <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-muted-foreground">Live</span>
        </div>
        <span className="hidden sm:block text-[12px] text-muted-foreground font-mono opacity-60">{weekOf}</span>
      </div>

      {/* Center — wordmark */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <span className="text-[15px] font-bold tracking-[0.22em] uppercase text-foreground">Dispatch</span>
      </div>

      {/* Right — controls */}
      <div className="flex items-center gap-2.5">
        <ThemeToggle />
        <button
          onClick={onShowNews}
          className="px-5 py-2 glass-card text-[13px] font-semibold tracking-wide text-foreground transition-all duration-150 hover:opacity-80 active:scale-95"
        >
          {newsVisible ? "Home" : "News"}
        </button>
      </div>
    </header>
  );
}
