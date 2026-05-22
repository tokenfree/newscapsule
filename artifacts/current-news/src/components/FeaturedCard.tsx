import type { NewsArticle } from "@workspace/api-client-react";
import { trimSummary } from "@/lib/utils";

interface FeaturedCardProps {
  article: NewsArticle;
}

export function FeaturedCard({ article }: FeaturedCardProps) {
  return (
    <article className="news-card glass rounded-3xl overflow-hidden stagger-1">
      <div className="p-9 sm:p-12 space-y-7">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-full glass text-muted-foreground">
            {article.category}
          </span>
          {(article.significance === "critical" || article.significance === "high") && (
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-full glass text-muted-foreground/60">
              {article.significance === "critical" ? "Critical" : "High Impact"}
            </span>
          )}
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase px-3.5 py-1.5 rounded-full glass-strong text-foreground/30">
            Featured
          </span>
        </div>

        <h2 className="text-display text-[2.2rem] sm:text-[2.8rem] italic leading-tight text-foreground tracking-tight">
          {article.headline}
        </h2>

        <p className="text-[17px] text-muted-foreground leading-relaxed max-w-3xl font-light">
          {trimSummary(article.summary)}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-white/[0.07] flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-px h-6 bg-white/20" />
            <div>
              <div className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/60">Source</div>
              <div className="text-[14px] font-medium text-foreground mt-0.5">{article.source}</div>
            </div>
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium text-foreground hover:opacity-75 active:scale-95 transition-all duration-150"
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
