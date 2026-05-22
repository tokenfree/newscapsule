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
        className={`flex-shrink-0 text-[11px] font-semibold tracking-[0.16em] uppercase px-3.5 py-1.5 rounded-full transition-all duration-150 ${
          selected === null
            ? "glass text-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        All
      </button>
      {categories.map((cat) => {
        const isSelected = selected === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(isSelected ? null : cat)}
            className={`flex-shrink-0 text-[11px] font-semibold tracking-[0.16em] uppercase px-3.5 py-1.5 rounded-full transition-all duration-150 ${
              isSelected
                ? "glass text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
