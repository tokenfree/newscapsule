import type { NewsArticle } from "@workspace/api-client-react";
import { trimSummary } from "@/lib/utils";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

const SIGNIFICANCE_STYLES: Record<string, string> = {
  critical: "bg-red-500/10 text-red-500 dark:text-red-400",
  high:     "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  medium:   "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

const SIGNIFICANCE_LABELS: Record<string, string> = {
  critical: "Critical",
  high:     "High",
  medium:   "Medium",
};

export function NewsCard({ article, index }: NewsCardProps) {
  const staggerClass = `stagger-${Math.min(index + 1, 8)}`;

  return (
    <article className={`news-card glass-card news-card-sharp flex flex-col overflow-hidden ${staggerClass}`}>
      {/* Top color bar */}
      <div className="h-[4px] w-full flex-shrink-0" style={{ background: article.categoryColor }} />

      <div className="flex flex-col flex-1 p-7 gap-5">
        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[13px] font-semibold tracking-wide uppercase px-3 py-1.5"
            style={{ color: article.categoryColor, background: `${article.categoryColor}18`, border: `1px solid ${article.categoryColor}35` }}
          >
            {article.category}
          </span>
          <span
            className={`text-[13px] font-semibold tracking-wide uppercase px-3 py-1.5 ${
              SIGNIFICANCE_STYLES[article.significance] ?? SIGNIFICANCE_STYLES.medium
            }`}
          >
            {SIGNIFICANCE_LABELS[article.significance] ?? "Medium"}
          </span>
        </div>

        {/* Headline */}
        <h3 className="text-[19px] font-semibold italic leading-snug text-foreground tracking-[-0.01em]" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
          {article.headline}
        </h3>

        {/* Summary */}
        <p className="text-[16.5px] text-muted-foreground leading-relaxed flex-1">
          {trimSummary(article.summary)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-border/40 mt-auto">
          <span className="text-[13px] text-muted-foreground font-medium">{article.source}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[13px] font-semibold text-foreground/50 hover:text-foreground transition-colors duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            Read
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
