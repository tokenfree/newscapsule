export interface NewsArticle {
  id: string;
  category: string;
  categoryColor: string;
  headline: string;
  summary: string;
  detail: string;
  commentary: string;
  significance: "critical" | "high" | "medium";
  date: string;
  source: string;
  readTime: number;
  tags: string[];
  impact: string;
}

export const weekOf = "April 7 – 13, 2026";

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    category: "Geopolitics",
    categoryColor: "#ef4444",
    headline: "Iran Agrees to Two-Week Ceasefire, Strait of Hormuz Reopened",
    summary:
      "After US and Israeli strikes killed Iran's Supreme Leader and 35 civilians, Iran has agreed to a two-week ceasefire brokered by Pakistan — with the Strait of Hormuz reopened to shipping.",
    detail:
      "The ceasefire, ratified by Iran's Supreme National Security Council on April 9, came after 38 days of open war that began when the US and Israel launched airstrikes on Iranian military targets on February 28, killing Supreme Leader Ali Khamenei. Iran had blocked the Strait of Hormuz since that date, launching 21 confirmed attacks on merchant ships. Pakistan's PM Shehbaz Sharif emerged as the key mediator, presenting the plan to Trump and then inviting delegations to Islamabad. Iran had initially rejected a US-proposed 45-day ceasefire, insisting on guarantees against future attacks before settling on two weeks.",
    commentary:
      "This ceasefire is extraordinarily fragile. Iran lost its Supreme Leader and accepted a deal it didn't want — that's a government under maximum internal pressure. The Strait reopening is the real win for global markets, but two weeks is barely enough time to establish a negotiating framework, let alone resolve the fundamental security guarantees Iran is demanding. Expect this to be extended, broken, or both.",
    significance: "critical",
    date: "April 9, 2026",
    source: "CNN / Reuters / Xinhua",
    readTime: 5,
    tags: ["Iran", "Ceasefire", "Strait of Hormuz", "Pakistan", "Middle East"],
    impact: "Global oil markets stabilizing; Strait of Hormuz reopened after 38-day blockade",
  },
  {
    id: "2",
    category: "Space",
    categoryColor: "#06b6d4",
    headline: "Artemis II Crew Splashes Down After Historic Lunar Flyby — Farthest Humans Have Traveled in 53 Years",
    summary:
      "Four astronauts aboard NASA's Orion spacecraft returned safely on April 10 after flying 252,760 miles from Earth — breaking the Apollo 13 distance record and completing humanity's first crewed lunar flyby since 1972.",
    detail:
      "Launched on April 1, the Artemis II crew completed a 10-day mission that included a close flyby of the Moon on April 6 at 1:56 p.m. EDT. Orion surpassed Apollo 13's 1970 record for farthest distance from Earth ever traveled by a human crew. The mission validated life-support systems, communications architecture, and the Orion spacecraft's heat shield at lunar return velocities. The crew, consisting of NASA astronauts Reid Wiseman, Victor Glover, Christina Koch, and Canadian astronaut Jeremy Hansen, were recovered in the Pacific Ocean. The next mission, Artemis III, aims for a crewed lunar landing.",
    commentary:
      "Apollo 17 was December 1972. That's 53 years without a human anywhere near the Moon. Artemis II is meaningful not for what it did — it's a flyby — but for what it proves: that the hardware works and the Orion capsule can bring people home from lunar distance. The real moment will be Artemis III on the surface. But this is the last rehearsal, and it passed.",
    significance: "critical",
    date: "April 10, 2026",
    source: "NASA / AP / The Verge",
    readTime: 4,
    tags: ["NASA", "Artemis", "Moon", "Space", "Orion"],
    impact: "Clears path for first crewed lunar landing since Apollo 17 in 1972",
  },
  {
    id: "3",
    category: "Technology",
    categoryColor: "#3b82f6",
    headline: "Meta Launches 'Muse Spark' — Its Most Powerful AI Model Yet",
    summary:
      "Meta debuted Muse Spark on April 8, the first model from its new Superintelligence Labs under Scale AI founder Alexandr Wang — directly challenging OpenAI and Google in the frontier model race.",
    detail:
      "Originally code-named Avocado, Muse Spark is the first in Meta's new Muse series — described by the company as 'a deliberate and scientific approach to model scaling where each generation validates and builds on the last.' The model now powers Meta's digital assistant across its standalone Meta AI app and desktop platform, with integration into WhatsApp, Instagram, and Facebook coming in subsequent weeks. The launch marks Meta's most significant AI infrastructure investment since CEO Mark Zuckerberg authorized billions to hire Alexandr Wang from Scale AI to lead the new lab.",
    commentary:
      "Meta has been behind in the frontier model race for two years, relying on Llama for open-source credibility while losing ground on commercial AI products. Muse Spark changes that dynamic — if the benchmarks hold up in independent evaluation. The real test is whether Meta can sustain the pace. They have the compute and the capital; what's been missing is the talent density. Wang's hire was the signal they were serious. Muse Spark is the proof.",
    significance: "high",
    date: "April 8, 2026",
    source: "Reuters / The Verge / Meta Newsroom",
    readTime: 4,
    tags: ["Meta", "AI", "LLM", "Muse Spark", "Superintelligence"],
    impact: "Intensifies competition in frontier AI; Meta re-enters commercial AI race",
  },
  {
    id: "4",
    category: "Economy",
    categoryColor: "#f59e0b",
    headline: "One Year After 'Liberation Day' Tariffs, US Economy Shows Recession Signals",
    summary:
      "Twelve months after Trump's sweeping tariff announcement, a Supreme Court ruling, a GDP slowdown to 0.7%, and 92,000 February job losses are redefining the US economic outlook for 2026.",
    detail:
      "On April 2, 2025, Trump's 'Liberation Day' tariffs imposed 34% on China, 20% on the EU, and 46% on Vietnam. On February 20, 2026, the Supreme Court ruled 6-3 that IEEPA does not authorize the President to impose tariffs — declaring them invalid. The administration quickly invoked alternative statutes to maintain duties. Meanwhile, Q4 2025 GDP came in at 0.7% annualized — well below the expected 2.5% — as US employers shed 92,000 jobs in February when economists had forecast a gain of 50,000. Markets remain volatile with recession risk elevated.",
    commentary:
      "The SCOTUS ruling should have been the off-ramp. Instead, the administration immediately invoked different statutes, signaling that the trade war is strategic doctrine, not emergency policy. The GDP and jobs numbers tell the real story — the tariff regime is extracting measurable economic pain from American consumers and businesses, and the political calculus is whether that pain is politically survivable heading into midterms.",
    significance: "critical",
    date: "April 7, 2026",
    source: "Bloomberg / St. Louis Fed / Reuters",
    readTime: 4,
    tags: ["Tariffs", "Economy", "GDP", "Recession", "Trade War"],
    impact: "Elevated recession probability; consumer spending and hiring under pressure",
  },
  {
    id: "5",
    category: "Climate",
    categoryColor: "#22c55e",
    headline: "Glaciers Lost Record 408 Gigatons of Mass in 2025, New Study Finds",
    summary:
      "A Nature Reviews study published this week found glaciers lost more mass in 2025 than any prior year on record — equivalent to 1.1 mm of global sea-level rise — with six of the worst years occurring in the last seven.",
    detail:
      "The study, published in Nature Reviews Earth & Environment, found that since 1975 glaciers have lost a cumulative 9,583 ± 1,211 Gt of mass — equivalent to 26.4 mm of global sea-level rise. The 2025 loss of 408 ± 132 Gt was particularly severe in Iceland and North America. The UN World Meteorological Organization confirmed the figures, noting that five of the top mass-loss years on record have occurred since 2020. Arctic sea ice thickness remains at historically thin levels, exacerbating melt feedback loops.",
    commentary:
      "Six of the worst seven years on record. There's no statistical interpretation of that which doesn't indicate an accelerating trend. The cumulative loss figure — 26 millimeters of sea-level rise from glaciers alone since 1975 — is the number that matters for coastal infrastructure planning. We are no longer arguing about whether this is happening; we are now in the phase of managing irreversible changes.",
    significance: "high",
    date: "April 7, 2026",
    source: "Nature Reviews Earth & Environment / WMO",
    readTime: 3,
    tags: ["Glaciers", "Climate", "Sea Level", "Arctic", "WMO"],
    impact: "Accelerates coastal flood timelines; water security risk for glacier-fed regions",
  },
  {
    id: "6",
    category: "Politics",
    categoryColor: "#ec4899",
    headline: "Reform UK Leads British Polls for First Time at 24%, Labour Collapses to 16%",
    summary:
      "A new YouGov poll shows Nigel Farage's Reform UK leading all parties at 24% — ahead of Conservatives at 19% and a dramatically weakened Labour at just 16%.",
    detail:
      "The YouGov poll for The Times and Sky News marks the first time Reform UK has held a polling lead in Britain. Labour's collapse from a landslide general election majority just two years ago to third place reflects growing discontent over immigration, public services, and economic management. The poll also captures the emergence of new parties: Rupert Lowe's Restore Britain and a new party called Your Party have both drawn significant media attention, with 'some other party' rising notably. Greens fell three points from previous polling.",
    commentary:
      "British politics has entered a genuine multi-party era. Labour winning a landslide in 2024 and polling at 16% by April 2026 is one of the most dramatic collapses in modern political history. Reform's 24% is real — not a protest vote artifact. The question is whether the UK electoral system can produce a parliament that reflects this fragmentation, or whether first-past-the-post will distort results the same way it did in 2024 when Reform won 14% of votes but far fewer seats.",
    significance: "high",
    date: "April 10, 2026",
    source: "YouGov / The Times / Sky News",
    readTime: 3,
    tags: ["UK Politics", "Reform UK", "Labour", "Polls", "Farage"],
    impact: "Signals potential realignment of British politics ahead of next general election",
  },
  {
    id: "7",
    category: "Health",
    categoryColor: "#14b8a6",
    headline: "Measles Outbreaks Spread Across US States; H5N1 Continues in Farm Workers",
    summary:
      "Active measles transmission is confirmed in Texas, South Carolina, and multiple other states, while H5N1 avian flu continues to be detected in US farm workers — with WHO monitoring both outbreaks.",
    detail:
      "US health officials have confirmed ongoing measles transmission hotspots, particularly in Texas and South Carolina, where vaccine exemption rates are among the highest in the nation. The CDC has issued alerts for 11 states. Separately, sporadic H5N1 bird flu cases continue to emerge in agricultural workers with close contact with infected poultry and cattle — a pattern that has persisted since late 2024. While no human-to-human transmission of H5N1 has been confirmed, WHO is maintaining active surveillance protocols. A WHO cholera response webinar is also scheduled for April 15.",
    commentary:
      "Measles was declared eliminated in the US in 2000. Its return in 2026 is entirely attributable to declining vaccination coverage — a preventable, well-understood public health failure. H5N1 is a different risk category: the virus is evolving, the exposure vector is agricultural, and the consequence of a spillover event capable of sustained human transmission would be catastrophic. Both situations are warnings of what happens when public health infrastructure is neglected.",
    significance: "high",
    date: "April 10, 2026",
    source: "CDC / WHO / AP",
    readTime: 3,
    tags: ["Measles", "H5N1", "Bird Flu", "CDC", "WHO"],
    impact: "Public health alerts in 11 US states; global surveillance elevated for H5N1",
  },
  {
    id: "8",
    category: "Technology",
    categoryColor: "#8b5cf6",
    headline: "Scientists Identify Protein Linked to Brain Aging and Memory Decline",
    summary:
      "Neuroscientists have discovered that elevated levels of a protein called FTL1 in aging mice weaken brain cell connections and drive memory decline — a potential therapeutic target for Alzheimer's.",
    detail:
      "The study, conducted across multiple research institutions and published this week, identified FTL1 as a key driver of synaptic degradation in the aging brain. In experiments, mice with artificially suppressed FTL1 showed significantly better memory retention compared to controls. A separate study also found that Vitamin D levels in midlife correlate strongly with long-term Alzheimer's risk, adding to a growing body of evidence that metabolic factors in middle age shape neurodegeneration decades later. Researchers caution that human trials are still years away.",
    commentary:
      "Every week there's a new Alzheimer's protein study. What makes FTL1 different is the mechanism clarity — it's not just a biomarker, it's an apparent causal driver of the synaptic weakening that underlies memory loss. The Vitamin D finding is useful too, because it's actionable today. But the pattern remains: we keep finding the pieces. The integrated treatment is still missing.",
    significance: "medium",
    date: "April 9, 2026",
    source: "ScienceDaily / Nature Neuroscience",
    readTime: 3,
    tags: ["Neuroscience", "Alzheimer's", "FTL1", "Brain Aging", "Medicine"],
    impact: "Opens new avenue for Alzheimer's drug development; human trials pending",
  },
];

export const featuredArticle = newsArticles[0];
export const topStories = newsArticles.filter((_, i) => i !== 0);
