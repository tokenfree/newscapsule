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
    <div className="flex items-center gap-5 px-6 py-3.5 border-b-2 border-border/40 header-glass">
      <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground flex-shrink-0">
        Signal
      </span>
      <div className="flex-1 flex items-center gap-px h-[3px] overflow-hidden bg-border/50">
        {critical > 0 && (
          <div className="h-full bg-red-500 transition-all duration-700" style={{ width: `${(critical / total) * 100}%` }} />
        )}
        {high > 0 && (
          <div className="h-full bg-amber-500 transition-all duration-700" style={{ width: `${(high / total) * 100}%` }} />
        )}
        {medium > 0 && (
          <div className="h-full bg-blue-400 transition-all duration-700" style={{ width: `${(medium / total) * 100}%` }} />
        )}
      </div>
      <div className="flex items-center gap-5 flex-shrink-0">
        {critical > 0 && (
          <span className="flex items-center gap-2 text-[12px] text-red-500 dark:text-red-400 font-semibold">
            <span className="w-2 h-2 bg-red-500" />{critical} Critical
          </span>
        )}
        {high > 0 && (
          <span className="flex items-center gap-2 text-[12px] text-amber-600 dark:text-amber-400 font-semibold">
            <span className="w-2 h-2 bg-amber-500" />{high} High
          </span>
        )}
        {medium > 0 && (
          <span className="hidden sm:flex items-center gap-2 text-[12px] text-blue-600 dark:text-blue-400 font-medium">
            <span className="w-2 h-2 bg-blue-400" />{medium} Medium
          </span>
        )}
      </div>
    </div>
  );
}
