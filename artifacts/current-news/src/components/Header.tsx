import { ThemeToggle } from "./ThemeToggle";
import { weekOf } from "@/data/newsData";

interface HeaderProps {
  onShowNews: () => void;
  newsVisible: boolean;
}

export function Header({ onShowNews, newsVisible }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14 border-b border-border/60 bg-background/80 backdrop-blur-2xl">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 pulse-dot" />
          <span className="text-xs font-semibold text-muted-foreground tracking-widest uppercase">Live</span>
        </div>
        <div className="hidden sm:block w-px h-3.5 bg-border" />
        <span className="hidden sm:block text-xs text-muted-foreground font-mono">{weekOf}</span>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-[13px] font-bold tracking-[0.2em] uppercase text-foreground">Dispatch</h1>
      </div>

      <div className="flex items-center gap-2.5">
        <ThemeToggle />
        <button
          onClick={onShowNews}
          className="px-4 py-1.5 rounded-xl bg-foreground text-background text-xs font-semibold tracking-wide transition-all duration-150 hover:opacity-85 active:scale-95"
        >
          {newsVisible ? "Top Stories" : "Current News"}
        </button>
      </div>
    </header>
  );
}
