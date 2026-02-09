import { NavLink } from "@/components/NavLink";
import { Network, GitBranch, History, Radio, Search, Bell } from "lucide-react";

const TopNav = () => {
  return (
    <nav className="h-14 shrink-0 border-b border-glass-border bg-card/95 backdrop-blur-md flex items-center px-6 z-50 relative">
      {/* Brand — Left */}
      <div className="flex items-center gap-2.5 mr-8">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
          <Radio className="w-4.5 h-4.5 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground tracking-tight leading-tight">
            Outreach<span className="text-primary">Engine</span>
          </span>
          <span className="text-[9px] text-muted-foreground leading-tight">Intelligence Platform</span>
        </div>
      </div>

      {/* Search bar — Center */}
      <div className="flex-1 max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search profiles, campaigns, workflows…"
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-muted/50 border border-glass-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary/40 transition-all"
          />
        </div>
      </div>

      {/* Nav tabs — Right */}
      <div className="flex items-center gap-1 ml-8">
        <NavLink
          to="/"
          end
          className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors min-w-[72px]"
          activeClassName="text-primary bg-primary/10 hover:text-primary"
        >
          <Network className="w-5 h-5" />
          <span className="text-[10px] font-medium">Intelligence</span>
        </NavLink>
        <NavLink
          to="/workflow"
          className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors min-w-[72px]"
          activeClassName="text-primary bg-primary/10 hover:text-primary"
        >
          <GitBranch className="w-5 h-5" />
          <span className="text-[10px] font-medium">Workflow</span>
        </NavLink>
        <NavLink
          to="/history"
          className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors min-w-[72px]"
          activeClassName="text-primary bg-primary/10 hover:text-primary"
        >
          <History className="w-5 h-5" />
          <span className="text-[10px] font-medium">History</span>
        </NavLink>
      </div>

      {/* Right actions */}
      <div className="ml-6 flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-lg bg-muted/40 border border-glass-border flex items-center justify-center hover:bg-muted/60 transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
        </button>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border" style={{ backgroundColor: "hsl(142 76% 36% / 0.08)", borderColor: "hsl(142 76% 36% / 0.2)" }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "hsl(142 71% 45%)" }} />
          <span className="text-[10px] font-medium" style={{ color: "hsl(142 71% 45%)" }}>Local</span>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
