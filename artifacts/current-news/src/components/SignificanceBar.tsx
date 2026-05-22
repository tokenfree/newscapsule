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
    </div>
  );
}
