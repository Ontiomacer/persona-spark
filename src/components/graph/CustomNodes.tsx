import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  User,
  Briefcase,
  Globe,
  MessageSquare,
  Sparkles,
  Users,
  Building2,
  Radio,
} from "lucide-react";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  briefcase: Briefcase,
  globe: Globe,
  message: MessageSquare,
  building: Building2,
  radio: Radio,
};

export const PersonNode = memo(({ data }: any) => (
  <div className="relative group cursor-pointer">
    <div className="relative w-28 h-28 rounded-full border-2 border-foreground/20 bg-background p-[2px] shadow-lg shadow-foreground/5 group-hover:border-foreground/40 transition-colors duration-200">
      <div className="w-full h-full rounded-full bg-card flex flex-col items-center justify-center text-center">
        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center mb-1">
          <User className="w-5 h-5 text-foreground" />
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
));
PersonNode.displayName = "PersonNode";

export const InfoNode = memo(({ data }: any) => {
  const Icon = iconMap[data.icon] || Globe;
  return (
    <div className="glass-card px-4 py-3 flex items-center gap-3 cursor-pointer hover:border-foreground/20 transition-colors duration-200 min-w-[140px] group">
      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-muted/80 transition-colors">
        <Icon className="w-4 h-4 text-foreground" />
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
});
InfoNode.displayName = "InfoNode";

export const CompanyNode = memo(({ data }: any) => (
  <div className="glass-card px-4 py-3 cursor-pointer hover:border-foreground/20 transition-colors duration-200 min-w-[160px] group">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-muted/80 transition-colors">
        <Building2 className="w-4 h-4 text-foreground" />
      </div>
      <div>
        <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">Company</div>
        <div className="text-sm font-semibold text-foreground leading-tight">{data.name}</div>
      </div>
    </div>
    <div className="flex flex-wrap gap-1.5 mt-1">
      <span className="px-1.5 py-0.5 rounded text-[9px] bg-muted text-muted-foreground border border-border">
        {data.industry}
      </span>
      <span className="px-1.5 py-0.5 rounded text-[9px] bg-muted text-muted-foreground border border-border">
        {data.size}
      </span>
    </div>
    <Handle type="target" position={Position.Bottom} className="!opacity-0 !w-1 !h-1" />
    <Handle type="target" position={Position.Top} id="top-target" className="!opacity-0 !w-1 !h-1" />
    <Handle type="target" position={Position.Left} id="left-target" className="!opacity-0 !w-1 !h-1" />
    <Handle type="target" position={Position.Right} id="right-target" className="!opacity-0 !w-1 !h-1" />
  </div>
));
CompanyNode.displayName = "CompanyNode";

export const CommStyleNode = memo(({ data }: any) => (
  <div className="glass-card px-4 py-3 cursor-pointer hover:border-foreground/20 transition-colors duration-200 min-w-[150px] group">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-muted/80 transition-colors">
        <Radio className="w-4 h-4 text-foreground" />
      </div>
      <div>
        <div className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">Comm Style</div>
        <div className="text-sm font-semibold text-foreground leading-tight">{data.tone} Tone</div>
      </div>
    </div>
    <div className="space-y-1">
      <div className="flex justify-between text-[9px] text-muted-foreground">
        <span>Response Likelihood</span>
        <span className="text-foreground">{data.likelihood}%</span>
      </div>
      <div className="h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-foreground/40 rounded-full" style={{ width: `${data.likelihood}%` }} />
      </div>
    </div>
    <Handle type="target" position={Position.Bottom} className="!opacity-0 !w-1 !h-1" />
    <Handle type="target" position={Position.Top} id="top-target" className="!opacity-0 !w-1 !h-1" />
    <Handle type="target" position={Position.Left} id="left-target" className="!opacity-0 !w-1 !h-1" />
    <Handle type="target" position={Position.Right} id="right-target" className="!opacity-0 !w-1 !h-1" />
  </div>
));
CommStyleNode.displayName = "CommStyleNode";

export const InterestNode = memo(({ data }: any) => (
  <div className="px-4 py-2 rounded-full bg-muted border border-border text-xs font-medium text-foreground cursor-pointer hover:bg-accent hover:border-foreground/20 transition-colors duration-200 flex items-center gap-1.5 shadow-sm">
    <Sparkles className="w-3 h-3 text-muted-foreground" />
    <span className="whitespace-nowrap">{data.label}</span>
    <Handle type="target" position={Position.Top} className="!opacity-0 !w-1 !h-1" />
    <Handle type="target" position={Position.Left} id="left-target" className="!opacity-0 !w-1 !h-1" />
    <Handle type="target" position={Position.Right} id="right-target" className="!opacity-0 !w-1 !h-1" />
  </div>
));
InterestNode.displayName = "InterestNode";

export const SimilarNode = memo(({ data }: any) => (
  <div className="glass-card px-3 py-2 flex items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-200 text-xs hover:border-foreground/20">
    <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0">
      <Users className="w-3 h-3 text-muted-foreground" />
    </div>
    <span className="text-muted-foreground whitespace-nowrap">{data.label}</span>
    <Handle type="target" position={Position.Bottom} className="!opacity-0 !w-1 !h-1" />
    <Handle type="target" position={Position.Top} id="top-target" className="!opacity-0 !w-1 !h-1" />
    <Handle type="target" position={Position.Left} id="left-target" className="!opacity-0 !w-1 !h-1" />
  </div>
));
SimilarNode.displayName = "SimilarNode";
