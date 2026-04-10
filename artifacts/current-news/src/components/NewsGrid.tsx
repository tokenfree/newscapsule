import { useState } from "react";
import { useGetNews } from "@workspace/api-client-react";
import { FeaturedCard } from "./FeaturedCard";
import { NewsCard } from "./NewsCard";
import { SignificanceBar } from "./SignificanceBar";
import { CategoryFilter } from "./CategoryFilter";
import type { NewsArticle } from "@workspace/api-client-react";

function SkeletonCard({ featured = false }: { featured?: boolean }) {
  return (
    <div className={`glass-card overflow-hidden ${featured ? "md:col-span-2" : ""}`}>
      <div className="h-[4px] w-full bg-muted animate-pulse" />
      <div className="p-8 sm:p-12 space-y-5">
        <div className="flex gap-2.5">
          <div className="h-7 w-24 bg-muted animate-pulse" />
          <div className="h-7 w-16 bg-muted animate-pulse" />
        </div>
        <div className="space-y-3">
          <div className={`bg-muted animate-pulse ${featured ? "h-10" : "h-7"}`} />
          <div className={`w-4/5 bg-muted animate-pulse ${featured ? "h-10" : "h-7"}`} />
        </div>
        <div className="space-y-2.5 pt-1">
          <div className="h-4 bg-muted animate-pulse" />
          <div className="h-4 w-5/6 bg-muted animate-pulse" />
          <div className="h-4 w-3/4 bg-muted animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function NewsGrid() {
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
    <div className="min-h-screen bg-background">
      {articles.length > 0 && <SignificanceBar articles={articles} />}

      {isError && (
        <div className="flex flex-col items-center justify-center py-12 gap-5 border-b-2 border-border/40">
          <p className="text-sm text-destructive font-medium">
            Could not fetch live news. Check your API key or try again.
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2.5 text-xs font-semibold glass-card text-destructive hover:opacity-75 transition-all"
          >
            Retry
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 space-y-9">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3.5">
              <h2 className="text-3xl font-bold text-foreground tracking-tight">
                Live Briefing
              </h2>
              {isLoading && (
                <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                  <div className="w-2 h-2 bg-foreground/30 animate-pulse" />
                  Fetching…
                </div>
              )}
              {!isLoading && lastFetched && (
                <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 dark:bg-green-400 pulse-dot" />
                  {lastFetched}
                </div>
              )}
            </div>
            <p className="text-[15px] text-muted-foreground font-mono">
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

        {/* Skeletons */}
        {isLoading && (
          <>
            <SkeletonCard featured />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </>
        )}

        {/* Content */}
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
              <div className="flex flex-col items-center justify-center py-28 text-muted-foreground space-y-4">
                <div className="w-14 h-14 glass-card flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-[15px]">No stories in this category</p>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="flex items-center gap-5 pt-8 pb-4">
          <div className="h-[2px] flex-1 bg-border/50" />
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
            Dispatch · Live via NewsAPI
          </span>
          <div className="h-[2px] flex-1 bg-border/50" />
        </div>
      </div>
    </div>
  );
}
