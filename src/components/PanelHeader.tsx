import { Zap } from "lucide-react";

const PanelHeader = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
          <Zap className="w-5 h-5 text-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground tracking-tight">
            Offline Outreach Engine
          </h1>
          <p className="text-xs text-muted-foreground leading-tight">
            Hyper-personalized cold messages powered by a local LLM
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/30 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground/40"></span>
        </span>
        <span className="text-xs text-muted-foreground font-medium font-mono">Running locally</span>
      </div>
    </div>
  );
};

export default PanelHeader;
