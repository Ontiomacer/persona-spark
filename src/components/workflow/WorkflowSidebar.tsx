import {
  User,
  Brain,
  MessageSquare,
  Mail,
  Linkedin,
  Send,
  Clock,
  GitBranch,
} from "lucide-react";

interface WorkflowSidebarProps {
  onDragStart: (event: React.DragEvent, nodeType: string, label: string) => void;
}

const nodeDefinitions = [
  { type: "input", label: "Target Profile", icon: User, desc: "Profile input", color: "text-primary" },
  { type: "persona", label: "Persona Analysis", icon: Brain, desc: "Extract persona", color: "text-accent" },
  { type: "message", label: "Message Generator", icon: MessageSquare, desc: "Generate messages", color: "text-secondary" },
  { type: "email", label: "Email Channel", icon: Mail, desc: "Email delivery", color: "text-primary" },
  { type: "linkedin", label: "LinkedIn Channel", icon: Linkedin, desc: "LinkedIn DM", color: "text-secondary" },
  { type: "send", label: "Send Message", icon: Send, desc: "Execute send", color: "text-emerald-400" },
  { type: "delay", label: "Delay", icon: Clock, desc: "Wait period", color: "text-amber-400" },
  { type: "condition", label: "Condition", icon: GitBranch, desc: "If/else logic", color: "text-accent" },
];

const WorkflowSidebar = ({ onDragStart }: WorkflowSidebarProps) => {
  return (
    <div className="w-[220px] shrink-0 h-full border-r border-glass-border bg-surface/80 backdrop-blur-sm overflow-y-auto">
      <div className="p-4">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
          Node Types
        </h3>
        <div className="space-y-2">
          {nodeDefinitions.map((node) => (
            <div
              key={node.type}
              draggable
              onDragStart={(e) => onDragStart(e, node.type, node.label)}
              className="glass-card px-3 py-2.5 flex items-center gap-3 cursor-grab active:cursor-grabbing hover:border-primary/30 transition-colors group"
            >
              <div className="w-7 h-7 rounded-lg bg-muted/50 flex items-center justify-center shrink-0 group-hover:bg-muted transition-colors">
                <node.icon className={`w-3.5 h-3.5 ${node.color}`} />
              </div>
              <div>
                <div className="text-xs font-medium text-foreground">{node.label}</div>
                <div className="text-[9px] text-muted-foreground">{node.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowSidebar;
