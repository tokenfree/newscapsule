import type { NewsArticle } from "@workspace/api-client-react";

interface SignificanceBarProps {
  articles: NewsArticle[];
}

export function SignificanceBar({ articles }: SignificanceBarProps) {
  const critical = articles.filter((a) => a.significance === "critical").length;
  const high = articles.filter((a) => a.significance === "high").length;
  const medium = articles.filter((a) => a.significance === "medium").length;
  const total = articles.length;

  return (
    <div className="flex items-center gap-4 px-6 py-2.5 border-b border-border/50 bg-background/60 backdrop-blur-xl">
      <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground flex-shrink-0">
        Signal
      </span>
      <div className="flex-1 flex items-center gap-px h-1.5 overflow-hidden rounded-full bg-border/60">
        {critical > 0 && (
          <div
            className="h-full bg-red-500 transition-all duration-700"
            style={{ width: `${(critical / total) * 100}%` }}
          />
        )}
        {high > 0 && (
          <div
            className="h-full bg-amber-500 transition-all duration-700"
            style={{ width: `${(high / total) * 100}%` }}
          />
        )}
        {medium > 0 && (
          <div
            className="h-full bg-blue-400 transition-all duration-700"
            style={{ width: `${(medium / total) * 100}%` }}
          />
        )}
      </div>
      <div className="flex items-center gap-4 flex-shrink-0">
        {critical > 0 && (
          <span className="flex items-center gap-1.5 text-[11px] text-red-600 dark:text-red-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            {critical} Critical
          </span>
        )}
        {high > 0 && (
          <span className="flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            {high} High
          </span>
        )}
        {medium > 0 && (
          <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-blue-600 dark:text-blue-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            {medium} Medium
          </span>
        )}
      </div>
    </div>
  );
}
