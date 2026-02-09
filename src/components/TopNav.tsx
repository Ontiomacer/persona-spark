import { NavLink } from "@/components/NavLink";
import { Network, GitBranch, History, Search, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const TopNav = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="h-14 shrink-0 border-b border-border bg-background/95 backdrop-blur-md flex items-center px-6 z-50 relative transition-colors duration-200">
      {/* Brand */}
      <div className="flex items-center gap-2.5 mr-8">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Network className="w-4.5 h-4.5 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground tracking-tight leading-tight">
            OutreachEngine
          </span>
          <span className="text-[9px] text-muted-foreground leading-tight">Intelligence Platform</span>
        </div>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search profiles, campaigns, workflows…"
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring transition-all"
          />
        </div>
      </div>

      {/* Nav tabs */}
      <div className="flex items-center gap-1 ml-8">
        <NavLink
          to="/"
          end
          className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors min-w-[72px]"
          activeClassName="text-foreground font-semibold bg-muted/50"
        >
          <Network className="w-5 h-5" />
          <span className="text-[10px] font-medium">Intelligence</span>
        </NavLink>
        <NavLink
          to="/workflow"
          className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors min-w-[72px]"
          activeClassName="text-foreground font-semibold bg-muted/50"
        >
          <GitBranch className="w-5 h-5" />
          <span className="text-[10px] font-medium">Workflow</span>
        </NavLink>
        <NavLink
          to="/history"
          className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors min-w-[72px]"
          activeClassName="text-foreground font-semibold bg-muted/50"
        >
          <History className="w-5 h-5" />
          <span className="text-[10px] font-medium">History</span>
        </NavLink>
      </div>

      {/* Right actions */}
      <div className="ml-6 flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg bg-muted/40 border border-border flex items-center justify-center hover:bg-muted/60 transition-colors"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-muted-foreground" />
          ) : (
            <Moon className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-muted/30">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-pulse" />
          <span className="text-[10px] font-medium text-muted-foreground">Local</span>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
