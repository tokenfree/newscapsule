import type { NewsArticle } from "@workspace/api-client-react";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

const SIGNIFICANCE_STYLES: Record<string, string> = {
  critical: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  high:     "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  medium:   "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
};

const SIGNIFICANCE_LABELS: Record<string, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
};

export function NewsCard({ article, index }: NewsCardProps) {
  const staggerClass = `stagger-${Math.min(index + 1, 8)}`;

  return (
    <article className={`news-card glass-card flex flex-col rounded-2xl overflow-hidden ${staggerClass}`}>
      {/* Category color bar — solid, flat */}
      <div className="h-[3px] w-full flex-shrink-0" style={{ background: article.categoryColor }} />

      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Meta row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md"
              style={{
                color: article.categoryColor,
                background: `${article.categoryColor}15`,
              }}
            >
              {article.category}
            </span>
            <span
              className={`text-xs font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md ${
                SIGNIFICANCE_STYLES[article.significance] ?? SIGNIFICANCE_STYLES.medium
              }`}
            >
              {SIGNIFICANCE_LABELS[article.significance] ?? "Medium"}
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-mono flex-shrink-0">
            {article.readTime}m
          </span>
        </div>

        {/* Headline */}
        <h3 className="text-[17px] font-semibold leading-snug text-foreground tracking-[-0.01em]">
          {article.headline}
        </h3>

        {/* Summary */}
        <p className="text-[15px] text-muted-foreground leading-relaxed flex-1">
          {article.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-border/50 mt-1">
          <span className="text-xs text-muted-foreground font-medium">{article.source}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-foreground/60 hover:text-foreground transition-colors duration-150"
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
