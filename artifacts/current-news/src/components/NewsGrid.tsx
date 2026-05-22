import { useState, useEffect, useCallback } from "react";
import { useGetNews } from "@workspace/api-client-react";
import { FeaturedCard } from "./FeaturedCard";
import { NewsCard } from "./NewsCard";
import { CategoryFilter } from "./CategoryFilter";
import { trimSummary } from "@/lib/utils";
import type { NewsArticle } from "@workspace/api-client-react";

interface NewsGridProps {
  focusModeActive: boolean;
  onCloseFocus: () => void;
}

function SkeletonCard({ featured = false }: { featured?: boolean }) {
  return (
    <div className={`glass rounded-3xl overflow-hidden ${featured ? "md:col-span-2" : ""}`}>
      <div className="p-6 sm:p-9 space-y-5">
        <div className="flex gap-2">
          <div className="h-7 w-24 bg-white/5 animate-pulse rounded-full" />
          <div className="h-7 w-16 bg-white/5 animate-pulse rounded-full" />
        </div>
        <div className="space-y-3">
          <div className={`bg-white/5 animate-pulse rounded-lg ${featured ? "h-9" : "h-6"}`} />
          <div className={`w-4/5 bg-white/5 animate-pulse rounded-lg ${featured ? "h-9" : "h-6"}`} />
        </div>
        <div className="space-y-2 pt-1">
          <div className="h-4 bg-white/[0.03] animate-pulse rounded" />
          <div className="h-4 w-5/6 bg-white/[0.03] animate-pulse rounded" />
          <div className="h-4 w-3/4 bg-white/[0.03] animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}

function FocusOverlay({
  articles,
  onClose,
}: {
  articles: NewsArticle[];
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);

  const prev = useCallback(() => setIndex((i) => (i - 1 + articles.length) % articles.length), [articles.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % articles.length), [articles.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   prev();
      if (e.key === "ArrowRight")  next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  const article = articles[index];
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      style={{
        background: "oklch(0 0 0 / 0.72)",
        backdropFilter: "blur(22px) saturate(160%)",
        WebkitBackdropFilter: "blur(22px) saturate(160%)",
      }}
      onClick={onClose}
    >
      {/* Card + arrows container */}
      <div
        className="flex items-stretch glass rounded-3xl overflow-hidden"
        style={{ width: "min(700px, 92vw)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ← arrow */}
        <button
          onClick={prev}
          aria-label="Previous story"
          className="flex items-center justify-center w-14 flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors duration-150 border-r border-white/[0.09]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Article content */}
        <div className="flex-1 p-8 space-y-6 min-w-0">
          {/* Category badge */}
          <div className="flex items-center gap-2.5">
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
            <span className="text-[11px] font-mono text-muted-foreground/40">
              {index + 1} / {articles.length}
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-display text-[1.9rem] sm:text-[2.2rem] italic leading-tight text-foreground tracking-tight">
            {article.headline}
          </h2>

          {/* Summary */}
          <p className="text-[16px] text-muted-foreground leading-relaxed">
            {trimSummary(article.summary)}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-5 border-t border-white/[0.07]">
            <span className="text-[13px] font-semibold" style={{ color: "#ef4444" }}>
              {article.source}
            </span>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[13px] font-semibold text-foreground/40 hover:text-foreground transition-colors duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              Read
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* → arrow */}
        <button
          onClick={next}
          aria-label="Next story"
          className="flex items-center justify-center w-14 flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors duration-150 border-l border-white/[0.09]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ESC hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-mono text-muted-foreground/30 tracking-widest uppercase select-none">
        Esc to close · ← → to navigate
      </div>
    </div>
  );
}

export function NewsGrid({ focusModeActive, onCloseFocus }: NewsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data, isLoading, isError, refetch, dataUpdatedAt } = useGetNews(
    { pageSize: 20 },
    { query: { staleTime: 30 * 60 * 1000, retry: 2 } }
  );

  const articles: NewsArticle[] = data?.articles ?? [];
  const featuredArticle = articles[0] ?? null;
  const otherArticles   = articles.slice(1);
  const categories      = Array.from(new Set(articles.map((a) => a.category)));

  const filteredOthers = selectedCategory
    ? otherArticles.filter((a) => a.category === selectedCategory)
    : otherArticles;

  const showFeatured =
    !selectedCategory ||
    (featuredArticle && selectedCategory === featuredArticle.category);

  const lastFetched = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    : null;

  return (
    <>
      {/* Focus mode overlay */}
      {focusModeActive && articles.length > 0 && (
        <FocusOverlay articles={articles} onClose={onCloseFocus} />
      )}

      <div className="noise min-h-screen">
        {isError && (
          <div className="flex flex-col items-center justify-center py-10 gap-4 border-b border-white/[0.07]">
            <p className="text-sm text-muted-foreground font-medium">
              Could not fetch live news. Check your API key or try again.
            </p>
            <button
              onClick={() => refetch()}
              className="px-5 py-2 text-xs font-semibold glass rounded-full text-foreground/60 hover:text-foreground transition-all"
            >
              Retry
            </button>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <h2 className="text-display text-3xl italic text-foreground tracking-tight">
                  Live Briefing
                </h2>
                {isLoading && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30 pulse-dot" />
                    Fetching…
                  </div>
                )}
                {!isLoading && lastFetched && (
                  <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                    {lastFetched}
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground font-mono tracking-wide">
                {isLoading
                  ? "Loading headlines…"
                  : `${filteredOthers.length + (showFeatured && featuredArticle ? 1 : 0)} stories · ${selectedCategory || "All categories"}`}
              </p>
            </div>

            {categories.length > 0 && (
              <CategoryFilter
                articles={articles}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            )}
          </div>

          {isLoading && (
            <>
              <SkeletonCard featured />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            </>
          )}

          {!isLoading && articles.length > 0 && (
            <>
              {showFeatured && featuredArticle && (
                <FeaturedCard article={featuredArticle} />
              )}
              {filteredOthers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filteredOthers.map((article, index) => (
                    <NewsCard key={article.id} article={article} index={index} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-muted-foreground space-y-3">
                  <div className="w-11 h-11 rounded-full glass flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-sm">No stories in this category.</p>
                </div>
              )}
            </>
          )}

          <div className="flex items-center gap-4 pt-6 pb-4">
            <div className="h-px flex-1 bg-white/[0.07]" />
            <span className="text-display text-[13px] italic text-muted-foreground/40">
              News Capsule · Live via NewsAPI
            </span>
            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>
        </div>
      </div>
    </>
  );
}
