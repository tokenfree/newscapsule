import type { NewsArticle } from "@workspace/api-client-react";
import { trimSummary } from "@/lib/utils";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

const SIGNIFICANCE_LABELS: Record<string, string> = {
  critical: "Critical",
  high:     "High",
  medium:   "Medium",
};

export function NewsCard({ article, index }: NewsCardProps) {
  const staggerClass = `stagger-${Math.min(index + 1, 8)}`;

  return (
    <article className={`news-card glass rounded-3xl flex flex-col overflow-hidden ${staggerClass}`}>
      <div className="flex flex-col flex-1 p-7 gap-5">

        {/* Meta row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[11px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
            style={{
              color: article.categoryColor,
              background: `${article.categoryColor}18`,
              border: `1px solid ${article.categoryColor}35`,
            }}
          >
            {article.category}
          </span>
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase px-3 py-1.5 rounded-full glass text-muted-foreground/60">
            {SIGNIFICANCE_LABELS[article.significance] ?? "Medium"}
          </span>
        </div>

        {/* Headline */}
        <h3 className="text-display text-[20px] italic leading-snug text-foreground tracking-tight flex-1">
          {article.headline}
        </h3>

        {/* Summary */}
        <p className="text-[14.5px] text-muted-foreground leading-relaxed">
          {trimSummary(article.summary)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.07] mt-auto">
          <span className="text-[12px] font-semibold" style={{ color: "#ef4444" }}>{article.source}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[12px] font-semibold text-foreground/40 hover:text-foreground transition-colors duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            Read
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
