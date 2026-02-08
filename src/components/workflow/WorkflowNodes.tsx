import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  User,
  Brain,
  MessageSquare,
  Mail,
  Linkedin,
  Send,
  Clock,
  GitBranch,
  Zap,
} from "lucide-react";

const nodeStyles: Record<string, { bg: string; border: string; icon: React.FC<{ className?: string }> }> = {
  input: { bg: "bg-primary/15", border: "border-primary/30", icon: User },
  persona: { bg: "bg-accent/15", border: "border-accent/30", icon: Brain },
  message: { bg: "bg-secondary/15", border: "border-secondary/30", icon: MessageSquare },
  email: { bg: "bg-primary/15", border: "border-primary/30", icon: Mail },
  linkedin: { bg: "bg-secondary/15", border: "border-secondary/30", icon: Linkedin },
  send: { bg: "bg-emerald-500/15", border: "border-emerald-500/30", icon: Send },
  delay: { bg: "bg-amber-500/15", border: "border-amber-500/30", icon: Clock },
  condition: { bg: "bg-accent/15", border: "border-accent/30", icon: GitBranch },
};

const iconColorMap: Record<string, string> = {
  input: "text-primary",
  persona: "text-accent",
  message: "text-secondary",
  email: "text-primary",
  linkedin: "text-secondary",
  send: "text-emerald-400",
  delay: "text-amber-400",
  condition: "text-accent",
};

export const WorkflowNode = memo(({ data }: any) => {
  const style = nodeStyles[data.nodeType] || nodeStyles.input;
  const Icon = style.icon;
  const iconColor = iconColorMap[data.nodeType] || "text-primary";
  const isRunning = data.running;
  const isDone = data.done;

  return (
    <div
      className={`glass-card px-4 py-3 min-w-[160px] cursor-pointer transition-all duration-300 ${
        isRunning ? "ring-2 ring-primary/50 animate-pulse" : ""
      } ${isDone ? "ring-2 ring-emerald-500/40" : ""}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg ${style.bg} flex items-center justify-center shrink-0`}>
          {isRunning ? (
            <Zap className={`w-4 h-4 ${iconColor} animate-pulse`} />
          ) : (
            <Icon className={`w-4 h-4 ${iconColor}`} />
          )}
        </div>
        <div>
          <div className="text-xs font-semibold text-foreground leading-tight">{data.label}</div>
          <div className="text-[9px] text-muted-foreground capitalize">{data.nodeType} node</div>
        </div>
      </div>
      {isDone && (
        <div className="mt-2 text-[9px] text-emerald-400 font-mono">✓ Complete</div>
      )}
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-primary/60 !border-primary/40" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-primary/60 !border-primary/40" />
    </div>
  );
});
WorkflowNode.displayName = "WorkflowNode";
