import type { NewsArticle } from "@workspace/api-client-react";

interface CategoryFilterProps {
  articles: NewsArticle[];
  selected: string | null;
  onSelect: (cat: string | null) => void;
}

export function CategoryFilter({ articles, selected, onSelect }: CategoryFilterProps) {
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 flex-wrap">
      <button
        onClick={() => onSelect(null)}
        className={`flex-shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-lg border transition-all duration-150 ${
          selected === null
            ? "bg-foreground text-background border-foreground"
            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 bg-background/60"
        }`}
      >
        All
      </button>
      {categories.map((cat) => {
        const article = articles.find((a) => a.category === cat)!;
        const isSelected = selected === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(isSelected ? null : cat)}
            className={`flex-shrink-0 flex items-center gap-2 text-xs font-semibold px-3.5 py-1.5 rounded-lg border transition-all duration-150 ${
              isSelected
                ? "border-transparent"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 bg-background/60"
            }`}
            style={isSelected ? {
              background: `${article.categoryColor}15`,
              borderColor: `${article.categoryColor}40`,
              color: article.categoryColor,
            } : {}}
          >
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: article.categoryColor }} />
            {cat}
          </button>
        );
      })}
    </div>
  );
}
