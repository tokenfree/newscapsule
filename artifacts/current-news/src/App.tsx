import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { LandingHero } from "@/components/LandingHero";
import { NewsGrid } from "@/components/NewsGrid";

const queryClient = new QueryClient();

function AppContent() {
  const [newsVisible, setNewsVisible] = useState(false);
  const [focusModeActive, setFocusModeActive] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const handleToggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  const handleShowNews = () => {
    setNewsVisible(true);
    setTimeout(() => {
      document.getElementById("news-section")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleToggleFocus = () => setFocusModeActive((v) => !v);
  const handleCloseFocus  = () => setFocusModeActive(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        onShowNews={handleShowNews}
        newsVisible={newsVisible}
        focusModeActive={focusModeActive}
        onToggleFocus={handleToggleFocus}
        settingsOpen={settingsOpen}
        onToggleSettings={() => setSettingsOpen((v) => !v)}
        onCloseSettings={() => setSettingsOpen(false)}
        isDark={isDark}
        onToggleDark={handleToggleDark}
      />
      <main>
        {!newsVisible ? (
          <LandingHero onShowNews={handleShowNews} />
        ) : (
          <div id="news-section" className="pt-[62px]">
            <NewsGrid
              focusModeActive={focusModeActive}
              onCloseFocus={handleCloseFocus}
            />
          </div>
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
