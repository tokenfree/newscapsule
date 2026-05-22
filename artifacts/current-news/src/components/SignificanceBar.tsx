import type { NewsArticle } from "@workspace/api-client-react";

interface SignificanceBarProps {
  articles: NewsArticle[];
}

export function SignificanceBar({ articles }: SignificanceBarProps) {
  const critical = articles.filter((a) => a.significance === "critical").length;
  const high     = articles.filter((a) => a.significance === "high").length;
  const medium   = articles.filter((a) => a.significance === "medium").length;
  const total    = articles.length;

  return (
    <div className="flex items-center gap-5 px-6 py-2.5 border-b border-white/[0.07] header-glass">
      <span className="text-[10px] font-semibold tracking-[0.22em] uppercase text-muted-foreground/50 flex-shrink-0">
        Signal
      </span>

      {/* Bar */}
      <div className="flex-1 flex items-center gap-px h-px overflow-hidden bg-white/10">
        {critical > 0 && (
          <div className="h-full bg-white/70 transition-all duration-700" style={{ width: `${(critical / total) * 100}%` }} />
        )}
        {high > 0 && (
          <div className="h-full bg-white/40 transition-all duration-700" style={{ width: `${(high / total) * 100}%` }} />
        )}
        {medium > 0 && (
          <div className="h-full bg-white/15 transition-all duration-700" style={{ width: `${(medium / total) * 100}%` }} />
        )}
      </div>

      {/* Labels */}
      <div className="flex items-center gap-4 flex-shrink-0">
        {critical > 0 && (
          <span className="flex items-center gap-1.5 text-[10px] text-foreground/70 font-semibold tracking-wide">
            <span className="w-1 h-1 rounded-full bg-white/70" />{critical} Critical
          </span>
        )}
        {high > 0 && (
          <span className="flex items-center gap-1.5 text-[10px] text-foreground/40 font-semibold tracking-wide">
            <span className="w-1 h-1 rounded-full bg-white/40" />{high} High
          </span>
        )}
        {medium > 0 && (
          <span className="hidden sm:flex items-center gap-1.5 text-[10px] text-foreground/25 font-medium tracking-wide">
            <span className="w-1 h-1 rounded-full bg-white/20" />{medium} Medium
          </span>
        )}
      </div>
    </div>
  );
}
