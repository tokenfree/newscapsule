import type { NewsArticle } from "@workspace/api-client-react";

interface FeaturedCardProps {
  article: NewsArticle;
}

export function FeaturedCard({ article }: FeaturedCardProps) {
  return (
    <article className="news-card glass-card relative rounded-2xl overflow-hidden stagger-1">
      {/* Solid color bar */}
      <div className="h-[3px] w-full flex-shrink-0" style={{ background: article.categoryColor }} />

      <div className="p-8 sm:p-10 space-y-5">
        {/* Top row */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
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
            {article.significance === "critical" && (
              <span className="text-xs font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400">
                Critical
              </span>
            )}
            {article.significance === "high" && (
              <span className="text-xs font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                High Impact
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 border border-border/50">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 pulse-dot" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
              Top Story
            </span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-[2rem] font-bold leading-tight text-foreground tracking-[-0.02em]">
          {article.headline}
        </h2>

        {/* Summary */}
        <p className="text-[17px] text-muted-foreground leading-relaxed max-w-3xl">
          {article.summary}
        </p>

        {/* Source row */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-[3px] h-6 rounded-full" style={{ background: article.categoryColor }} />
            <div>
              <div className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">Source</div>
              <div className="text-[15px] font-semibold text-foreground mt-0.5">{article.source}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="font-mono">{article.publishedAt}</span>
            <span className="opacity-30">·</span>
            <span>{article.readTime} min read</span>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 ml-2 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-85 active:scale-95 transition-all duration-150"
            >
              Full Story
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
