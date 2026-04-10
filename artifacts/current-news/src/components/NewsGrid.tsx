import { useState } from "react";
import { useGetNews } from "@workspace/api-client-react";
import { FeaturedCard } from "./FeaturedCard";
import { NewsCard } from "./NewsCard";
import { SignificanceBar } from "./SignificanceBar";
import { CategoryFilter } from "./CategoryFilter";
import type { NewsArticle } from "@workspace/api-client-react";

function SkeletonCard({ featured = false }: { featured?: boolean }) {
  return (
    <div className={`glass-card news-card-sharp overflow-hidden ${featured ? "md:col-span-2" : ""}`}>
      <div className="h-[4px] w-full bg-muted animate-pulse" />
      <div className="p-6 sm:p-9 space-y-4">
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-muted animate-pulse" />
          <div className="h-6 w-14 bg-muted animate-pulse" />
        </div>
        <div className="space-y-3">
          <div className={`bg-muted animate-pulse ${featured ? "h-9" : "h-6"}`} />
          <div className={`w-4/5 bg-muted animate-pulse ${featured ? "h-9" : "h-6"}`} />
        </div>
        <div className="space-y-2 pt-1">
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
        <div className="flex flex-col items-center justify-center py-10 gap-4 border-b border-border/40">
          <p className="text-sm text-destructive font-medium">
            Could not fetch live news. Check your API key or try again.
          </p>
          <button
            onClick={() => refetch()}
            className="px-5 py-2 text-xs font-semibold glass-card rounded-full text-destructive hover:opacity-75 transition-all"
          >
            Retry
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-7">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">
                Live Briefing
              </h2>
              {isLoading && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground/30 animate-pulse" />
                  Fetching…
                </div>
              )}
              {!isLoading && lastFetched && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 pulse-dot" />
                  {lastFetched}
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground font-mono">
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
              <div className="flex flex-col items-center justify-center py-24 text-muted-foreground space-y-3">
                <div className="w-11 h-11 rounded-full glass-card flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-sm">No stories in this category</p>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="flex items-center gap-4 pt-6 pb-4">
          <div className="h-px flex-1 bg-border/50" />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
            Dispatch · Live via NewsAPI
          </span>
          <div className="h-px flex-1 bg-border/50" />
        </div>
      </div>
    </div>
  );
}
