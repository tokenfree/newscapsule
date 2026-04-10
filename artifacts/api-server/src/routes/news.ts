import { Router, type IRouter } from "express";

const router: IRouter = Router();

interface CategoryDef {
  label: string;
  color: string;
  patterns: RegExp[];
}

const CATEGORY_MAP: CategoryDef[] = [
  {
    label: "Geopolitics",
    color: "#ef4444",
    patterns: [
      /\bwar\b/, /\bceasefire\b/, /\bairstrikes?\b/, /\bmissiles?\b/, /\bnuclear\b/,
      /\bsanctions\b/, /\binvasion\b/, /\btroops\b/, /\bmilitary\b/, /\bnato\b/,
      /\biran\b/, /\bisrael\b/, /\bukraine\b/, /\brussia\b/, /\bgaza\b/, /\btaiwan\b/,
      /\bhormuz\b/, /\bdiplomacy\b/, /\bpeace talks\b/, /\bconflict\b/,
    ],
  },
  {
    label: "Politics",
    color: "#ec4899",
    patterns: [
      /\btrump\b/, /\belection\b/, /\bcongress\b/, /\bsenate\b/, /\bparliament\b/,
      /\bpresident\b/, /\brepublican\b/, /\bdemocrat\b/, /\bwhite house\b/,
      /\bprime minister\b/, /\blegislation\b/, /\bsupreme court\b/, /\bgovernor\b/,
      /\bvote\b/, /\bpoll\b/, /\bballot\b/, /\bpolitical\b/,
    ],
  },
  {
    label: "Economy",
    color: "#f59e0b",
    patterns: [
      /\beconomy\b/, /\bmarkets?\b/, /\bgdp\b/, /\bfederal reserve\b/, /\binflation\b/,
      /\brecession\b/, /\btariff\b/, /\bwall street\b/, /\bnasdaq\b/, /\btreasury\b/,
      /\bjobs\b/, /\bunemployment\b/, /\binterest rate\b/, /\bfutures\b/, /\bstocks?\b/,
      /\bbanks?\b/, /\btrade war\b/, /\bexports?\b/, /\bimports?\b/, /\bdollar\b/,
    ],
  },
  {
    label: "Technology",
    color: "#3b82f6",
    patterns: [
      /\b(artificial intelligence|ai model|ai system)\b/,
      /\btechnology\b/, /\btech\b/, /\bapple\b/, /\bgoogle\b/,
      /\bmicrosoft\b/, /\bopenai\b/, /\btesla\b/, /\bnvidia\b/,
      /\bsoftware\b/, /\bcybersecurity\b/, /\bchipmaker\b/, /\bsemiconductor\b/,
      /\bstartup\b/, /\bsilicon valley\b/, /\biphone\b/, /\bandroid\b/, /\brobots?\b/,
    ],
  },
  {
    label: "Health",
    color: "#14b8a6",
    patterns: [
      /\bhealth\b/, /\bmedical\b/, /\bhospital\b/, /\bvaccine\b/, /\bfda\b/,
      /\bcancer\b/, /\bdisease\b/, /\bvirus\b/, /\boutbreak\b/, /\bpandemic\b/,
      /\bdrug\b/, /\btreatment\b/, /\bcdc\b/, /\bmedicine\b/, /\bclinical\b/,
      /\bsurgery\b/, /\bpatients?\b/, /\bmental health\b/, /\bbird flu\b/, /\bh5n1\b/,
    ],
  },
  {
    label: "Science",
    color: "#8b5cf6",
    patterns: [
      /\bnasa\b/, /\bclimate\b/, /\bscientists?\b/, /\bstudy finds\b/, /\bnew study\b/,
      /\bdiscovery\b/, /\bglacier\b/, /\barctic\b/, /\bspacecraft\b/, /\borbit\b/,
      /\bastronauts?\b/, /\bmoon\b/, /\bplanet\b/, /\bgalaxy\b/, /\bfossil\b/,
      /\bspecies\b/, /\beverest\b/, /\bocean\b/, /\bsatellite\b/,
    ],
  },
  {
    label: "Climate",
    color: "#22c55e",
    patterns: [
      /\bclimate change\b/, /\bglobal warming\b/, /\bemissions\b/, /\bcarbon\b/,
      /\brenewable energy\b/, /\bwildfire\b/, /\bhurricane\b/, /\bdrought\b/,
      /\bflooding\b/, /\bsea level\b/, /\bnet zero\b/, /\bsolar energy\b/,
      /\btemperature record\b/,
    ],
  },
];

function matchesCategory(text: string, patterns: RegExp[]): boolean {
  return patterns.some((re) => re.test(text));
}

const SIGNIFICANCE_CRITICAL = [
  "war", "killed", "dead", "attack", "nuclear", "crisis", "emergency",
  "invasion", "explosion", "catastrophe", "ceasefire", "pandemic",
  "outbreak", "breaking", "urgent", "collapse", "mass shooting",
  "earthquake", "hurricane", "tornado", "flood", "wildfire", "death toll",
];

const SIGNIFICANCE_HIGH = [
  "election", "government", "sanctions", "trade", "recession", "inflation",
  "supreme court", "court ruling", "breakthrough", "major", "historic",
  "record", "first ever", "landmark", "surge", "plunge", "ban", "arrested",
  "indicted", "convicted", "sentenced", "protest", "strike", "scandal",
];

function getSignificance(text: string): "critical" | "high" | "medium" {
  const lower = text.toLowerCase();
  if (SIGNIFICANCE_CRITICAL.some((k) => lower.includes(k))) return "critical";
  if (SIGNIFICANCE_HIGH.some((k) => lower.includes(k))) return "high";
  return "medium";
}

function categorize(title: string, description: string): { label: string; color: string } {
  const text = (title + " " + (description || "")).toLowerCase();
  for (const cat of CATEGORY_MAP) {
    if (matchesCategory(text, cat.patterns)) {
      return { label: cat.label, color: cat.color };
    }
  }
  return { label: "World", color: "#6b7280" };
}

function extractTags(title: string): string[] {
  const stopWords = new Set([
    "the", "a", "an", "in", "on", "at", "to", "for", "of", "and", "or",
    "is", "are", "was", "were", "be", "been", "being", "have", "has", "had",
    "do", "does", "did", "will", "would", "could", "should", "may", "might",
    "that", "this", "from", "with", "by", "as", "up", "out", "if", "than",
    "into", "over", "after", "new", "more", "its", "their", "his", "her",
    "says", "amid", "after", "about", "than", "what", "when", "where", "how",
    "who", "why", "but", "not", "he", "she", "they", "we", "it", "us",
  ]);
  const words = title.split(/[\s,;:'"!?()\-]+/);
  const tags: string[] = [];
  for (const word of words) {
    const clean = word.replace(/[^a-zA-Z]/g, "");
    if (
      clean.length > 3 &&
      !stopWords.has(clean.toLowerCase()) &&
      /^[A-Z]/.test(clean) &&
      !tags.includes(clean)
    ) {
      tags.push(clean);
    }
    if (tags.length >= 4) break;
  }
  return tags.length > 0 ? tags : ["News"];
}

function estimateReadTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 200));
}

function formatDate(isoString: string): string {
  try {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return isoString;
  }
}

interface RawArticle {
  title?: string;
  description?: string;
  content?: string;
  source?: { name?: string };
  url?: string;
  publishedAt?: string;
  urlToImage?: string;
}

let cache: { data: object; expiresAt: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

router.get("/news", async (req, res) => {
  try {
    if (cache && Date.now() < cache.expiresAt) {
      res.json(cache.data);
      return;
    }

    const apiKey = process.env.NEWSAPI_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "config_error", message: "NEWSAPI_KEY not configured" });
      return;
    }

    const pageSize = Number(req.query.pageSize) || 8;

    const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=40&apiKey=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      req.log.error({ status: response.status }, "NewsAPI request failed");
      res.status(500).json({ error: "upstream_error", message: "Failed to fetch from NewsAPI" });
      return;
    }

    const json = (await response.json()) as { articles: RawArticle[]; totalResults: number; status: string; message?: string };

    if (json.status !== "ok") {
      req.log.error({ message: json.message }, "NewsAPI returned error status");
      res.status(500).json({ error: "upstream_error", message: json.message || "NewsAPI error" });
      return;
    }

    const articles = (json.articles || [])
      .filter(
        (a) =>
          a.title &&
          a.title !== "[Removed]" &&
          a.description &&
          a.description !== "[Removed]" &&
          a.url
      )
      .slice(0, pageSize)
      .map((a, i) => {
        const title = a.title!;
        const summary = a.description!.replace(/\s*[…\.]{2,}$/, "").trim();
        const rawContent = a.content?.replace(/\s*[…\.]{1,3}\s*\[\+\d+ chars\]$/, "").replace(/[…\.]{2,}$/, "").trim() || summary;
        const detail = rawContent.length > summary.length ? rawContent : summary;
        const { label, color } = categorize(title, summary);
        const combinedText = title + " " + summary;

        return {
          id: String(i + 1),
          category: label,
          categoryColor: color,
          headline: title,
          summary,
          detail,
          source: a.source?.name || "Unknown",
          url: a.url!,
          publishedAt: formatDate(a.publishedAt || ""),
          significance: getSignificance(combinedText),
          tags: extractTags(title),
          readTime: estimateReadTime(summary + " " + detail),
          imageUrl: a.urlToImage || null,
        };
      });

    const result = {
      articles,
      totalResults: json.totalResults || articles.length,
      fetchedAt: new Date().toISOString(),
    };

    cache = { data: result, expiresAt: Date.now() + CACHE_TTL_MS };

    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Unexpected error in /news");
    res.status(500).json({ error: "internal_error", message: "Unexpected server error" });
  }
});

export default router;
