import type { NewsArticle } from "@workspace/api-client-react";

interface CategoryFilterProps {
  articles: NewsArticle[];
  selected: string | null;
  onSelect: (cat: string | null) => void;
}

export function CategoryFilter({ articles, selected, onSelect }: CategoryFilterProps) {
  const categories = Array.from(new Set(articles.map((a) => a.category)));

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-0.5 flex-wrap">
      <button
        onClick={() => onSelect(null)}
        className={`flex-shrink-0 text-[12px] font-semibold tracking-wide uppercase px-4 py-2 transition-all duration-150 ${
          selected === null
            ? "glass-card text-foreground"
            : "text-muted-foreground hover:text-foreground"
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
            className="flex-shrink-0 flex items-center gap-2 text-[12px] font-semibold tracking-wide uppercase px-4 py-2 transition-all duration-150"
            style={
              isSelected
                ? { background: `${article.categoryColor}18`, color: article.categoryColor, border: `2px solid ${article.categoryColor}50` }
                : { color: "hsl(var(--muted-foreground))" }
            }
          >
            <span className="w-2 h-2 flex-shrink-0" style={{ background: article.categoryColor }} />
            {cat}
          </button>
        );
      })}
    </div>
  );
}
