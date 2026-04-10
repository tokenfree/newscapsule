import type { NewsArticle } from "@workspace/api-client-react";

interface FeaturedCardProps {
  article: NewsArticle;
}

export function FeaturedCard({ article }: FeaturedCardProps) {
  return (
    <article className="news-card glass-card news-card-sharp relative overflow-hidden stagger-1">
      <div className="h-[4px] w-full flex-shrink-0" style={{ background: article.categoryColor }} />

      <div className="p-9 sm:p-12 space-y-7">
        {/* Top row */}
        <div className="flex items-center gap-2.5">
          <span
            className="text-[13px] font-semibold tracking-wide uppercase px-3 py-1.5"
            style={{ color: article.categoryColor, background: `${article.categoryColor}18`, border: `1px solid ${article.categoryColor}35` }}
          >
            {article.category}
          </span>
          {article.significance === "critical" && (
            <span className="text-[13px] font-semibold tracking-wide uppercase px-3 py-1.5 bg-red-500/10 text-red-500 dark:text-red-400">
              Critical
            </span>
          )}
          {article.significance === "high" && (
            <span className="text-[13px] font-semibold tracking-wide uppercase px-3 py-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400">
              High Impact
            </span>
          )}
        </div>

        {/* Headline */}
        <h2 className="text-[2rem] sm:text-[2.4rem] font-bold leading-tight text-foreground tracking-[-0.02em]">
          {article.headline}
        </h2>

        {/* Summary */}
        <p className="text-[17px] text-muted-foreground leading-relaxed max-w-3xl">
          {article.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t-2 border-border/40 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-[4px] h-6" style={{ background: article.categoryColor }} />
            <div>
              <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-muted-foreground">Source</div>
              <div className="text-[15px] font-semibold text-foreground mt-0.5">{article.source}</div>
            </div>
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 glass-card text-[13px] font-semibold text-foreground hover:opacity-75 active:scale-95 transition-all duration-150"
          >
            Full Story
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}
