import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { LandingHero } from "@/components/LandingHero";
import { NewsGrid } from "@/components/NewsGrid";

const queryClient = new QueryClient();

function AppContent() {
  const [newsVisible, setNewsVisible] = useState(false);

  const handleShowNews = () => {
    setNewsVisible(true);
    setTimeout(() => {
      document.getElementById("news-section")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <Header onShowNews={handleShowNews} newsVisible={newsVisible} />
      <main>
        {!newsVisible ? (
          <LandingHero onShowNews={handleShowNews} />
        ) : (
          <div id="news-section" className="pt-[57px]">
            <NewsGrid />
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
