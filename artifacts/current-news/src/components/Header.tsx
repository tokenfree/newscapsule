import { useEffect } from "react";

interface HeaderProps {
  onShowNews: () => void;
  newsVisible: boolean;
  focusModeActive: boolean;
  onToggleFocus: () => void;
  settingsOpen: boolean;
  onToggleSettings: () => void;
  onCloseSettings: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export function Header({
  onShowNews,
  newsVisible,
  focusModeActive,
  onToggleFocus,
  settingsOpen,
  onToggleSettings,
  onCloseSettings,
  isDark,
  onToggleDark,
}: HeaderProps) {

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && settingsOpen) onCloseSettings();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [settingsOpen, onCloseSettings]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-[62px] header-glass">
        {/* Left: Live + Focus */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass">
            <span className="text-[12px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">Live</span>
          </div>
          <button
            onClick={onToggleFocus}
            aria-label="Toggle focus mode"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all duration-200 ${
              focusModeActive
                ? "glass text-foreground"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            <svg className="w-[11px] h-[11px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
              {focusModeActive ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4 4m0 0h5m-5 0v5M15 9l5-5m0 0h-5m5 0v5M9 15l-5 5m0 0h5m-5 0v-5M15 15l5 5m0 0h-5m5 0v-5" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5M20 8V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M20 16v4m0 0h-4m4 0l-5-5" />
              )}
            </svg>
            <span className="text-[12px] font-semibold tracking-[0.2em] uppercase">Focus</span>
          </button>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <span className="text-display text-[22px] italic tracking-tight" style={{ color: "#ef4444" }}>
            News Capsule
          </span>
        </div>

        {/* Right: Settings button */}
        <button
          onClick={onToggleSettings}
          aria-label="Open settings"
          aria-expanded={settingsOpen}
          className="flex items-center justify-center w-[36px] h-[36px] rounded-full glass text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <svg className="w-[14px] h-[14px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </header>

      {/* Settings overlay */}
      <div
        className={`nc-settings-overlay${settingsOpen ? " active" : ""}`}
        onClick={onCloseSettings}
      />

      {/* Settings panel */}
      <div className={`nc-settings-panel${settingsOpen ? " active" : ""}`} role="dialog" aria-label="Settings">
        <div className="nc-settings-header">
          <span className="nc-settings-title">Settings</span>
          <button
            onClick={onCloseSettings}
            aria-label="Close settings"
            className="nc-settings-close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="nc-settings-content">
          <div className="nc-setting-item">
            <span className="nc-setting-label">Appearance</span>
            <button
              onClick={onToggleDark}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={isDark}
              className="nc-toggle-switch"
            >
              <div className="nc-switch-track">
                <div className="nc-switch-thumb">{isDark ? "D" : "L"}</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
