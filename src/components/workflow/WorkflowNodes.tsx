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
  Check,
} from "lucide-react";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  input: User,
  persona: Brain,
  message: MessageSquare,
  email: Mail,
  linkedin: Linkedin,
  send: Send,
  delay: Clock,
  condition: GitBranch,
};

export const WorkflowNode = memo(({ data }: any) => {
  const Icon = iconMap[data.nodeType] || User;
  const isRunning = data.running;
  const isDone = data.done;

  return (
    <div
      className={`glass-card px-4 py-3 min-w-[160px] cursor-pointer transition-all duration-200 ${
        isRunning ? "ring-2 ring-foreground/30 animate-pulse" : ""
      } ${isDone ? "ring-2 ring-foreground/20" : ""}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
          {isRunning ? (
            <Zap className="w-4 h-4 text-foreground animate-pulse" />
          ) : (
            <Icon className="w-4 h-4 text-foreground" />
          )}
        </div>
        <div>
          <div className="text-xs font-semibold text-foreground leading-tight">{data.label}</div>
          <div className="text-[9px] text-muted-foreground capitalize">{data.nodeType} node</div>
        </div>
      </div>
      {isDone && (
        <div className="mt-2 text-[9px] text-muted-foreground font-mono flex items-center gap-1">
          <Check className="w-3 h-3" /> Complete
        </div>
      )}
      <Handle type="target" position={Position.Left} className="!w-2 !h-2 !bg-foreground/40 !border-foreground/20" />
      <Handle type="source" position={Position.Right} className="!w-2 !h-2 !bg-foreground/40 !border-foreground/20" />
    </div>
  );
});
WorkflowNode.displayName = "WorkflowNode";
