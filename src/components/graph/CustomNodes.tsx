import { Handle, Position } from "@xyflow/react";
import { User, Briefcase, Globe, MessageSquare, Sparkles, Users } from "lucide-react";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  briefcase: Briefcase,
  globe: Globe,
  message: MessageSquare,
};

export const PersonNode = ({ data }: any) => {
  return (
    <div className="relative group cursor-pointer">
      {/* Outer glow */}
      <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500 animate-pulse-glow" />
      {/* Inner ring */}
      <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary/90 via-accent/70 to-primary/80 p-[2px] shadow-lg shadow-primary/30">
        <div className="w-full h-full rounded-full bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center text-center">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center mb-1">
            <User className="w-5 h-5 text-primary" />
          </div>
          <span className="text-[11px] font-bold text-foreground leading-tight px-2 truncate max-w-[100px]">
            {data.name}
          </span>
          <span className="text-[9px] text-muted-foreground leading-tight px-2 truncate max-w-[100px]">
            {data.role}
          </span>
        </div>
      </div>
      <Handle type="source" position={Position.Top} id="top" className="!opacity-0 !w-1 !h-1" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!opacity-0 !w-1 !h-1" />
      <Handle type="source" position={Position.Left} id="left" className="!opacity-0 !w-1 !h-1" />
      <Handle type="source" position={Position.Right} id="right" className="!opacity-0 !w-1 !h-1" />
    </div>
  );
};

export const InfoNode = ({ data }: any) => {
  const Icon = iconMap[data.icon] || Globe;
  return (
    <div className="graph-info-node glass-card px-4 py-3 flex items-center gap-3 cursor-pointer hover:border-primary/40 transition-all duration-300 min-w-[140px] group">
      <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">
          {data.category}
        </div>
        <div className="text-sm font-semibold text-foreground leading-tight">{data.value}</div>
      </div>
      <Handle type="target" position={Position.Bottom} className="!opacity-0 !w-1 !h-1" />
      <Handle type="target" position={Position.Top} id="top-target" className="!opacity-0 !w-1 !h-1" />
      <Handle type="target" position={Position.Left} id="left-target" className="!opacity-0 !w-1 !h-1" />
      <Handle type="target" position={Position.Right} id="right-target" className="!opacity-0 !w-1 !h-1" />
    </div>
  );
};

export const InterestNode = ({ data }: any) => {
  return (
    <div className="graph-interest-node px-4 py-2 rounded-full bg-secondary/10 border border-secondary/25 text-xs font-medium text-secondary cursor-pointer hover:bg-secondary/20 hover:border-secondary/40 transition-all duration-300 flex items-center gap-1.5 shadow-sm shadow-secondary/10">
      <Sparkles className="w-3 h-3" />
      <span className="whitespace-nowrap">{data.label}</span>
      <Handle type="target" position={Position.Top} className="!opacity-0 !w-1 !h-1" />
      <Handle type="target" position={Position.Left} id="left-target" className="!opacity-0 !w-1 !h-1" />
      <Handle type="target" position={Position.Right} id="right-target" className="!opacity-0 !w-1 !h-1" />
    </div>
  );
};

export const SimilarNode = ({ data }: any) => {
  return (
    <div className="graph-similar-node glass-card px-3 py-2 flex items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-all duration-300 text-xs border-accent/15 hover:border-accent/30">
      <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
        <Users className="w-3 h-3 text-accent" />
      </div>
      <span className="text-muted-foreground whitespace-nowrap">{data.label}</span>
      <Handle type="target" position={Position.Bottom} className="!opacity-0 !w-1 !h-1" />
      <Handle type="target" position={Position.Top} id="top-target" className="!opacity-0 !w-1 !h-1" />
      <Handle type="target" position={Position.Left} id="left-target" className="!opacity-0 !w-1 !h-1" />
    </div>
  );
};
