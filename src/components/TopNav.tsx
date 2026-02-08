import { NavLink } from "@/components/NavLink";
import { Network, GitBranch, History, Radio } from "lucide-react";

const TopNav = () => {
  return (
    <nav className="h-12 shrink-0 border-b border-glass-border bg-surface/90 backdrop-blur-sm flex items-center px-4 gap-6 z-50 relative">
      {/* Brand */}
      <div className="flex items-center gap-2 mr-4">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Radio className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="text-sm font-bold text-foreground tracking-tight">
          Outreach<span className="text-primary">Engine</span>
        </span>
      </div>

      {/* Nav links */}
      <div className="flex items-center gap-1">
        <NavLink
          to="/"
          end
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          activeClassName="text-foreground bg-muted/60"
        >
          <Network className="w-3.5 h-3.5" />
          Intelligence
        </NavLink>
        <NavLink
          to="/workflow"
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          activeClassName="text-foreground bg-muted/60"
        >
          <GitBranch className="w-3.5 h-3.5" />
          Workflow
        </NavLink>
        <NavLink
          to="/history"
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          activeClassName="text-foreground bg-muted/60"
        >
          <History className="w-3.5 h-3.5" />
          History
        </NavLink>
      </div>

      {/* Status badge */}
      <div className="ml-auto flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full border" style={{ backgroundColor: "hsl(142 76% 36% / 0.1)", borderColor: "hsl(142 76% 36% / 0.2)" }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "hsl(142 71% 45%)" }} />
          <span className="text-[10px] font-medium" style={{ color: "hsl(142 71% 45%)" }}>Running locally</span>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
