import { User, Brain, MessageSquare, Mail, Linkedin, Send, Clock, GitBranch } from "lucide-react";

interface WorkflowConfigPanelProps {
  selectedNode: any | null;
}

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

const configFields: Record<string, { label: string; fields: { name: string; type: string; placeholder: string }[] }> = {
  input: {
    label: "Target Profile",
    fields: [
      { name: "profile_text", type: "textarea", placeholder: "Profile text…" },
      { name: "tone", type: "select", placeholder: "Casual / Formal / Balanced" },
      { name: "language", type: "select", placeholder: "English / Hinglish" },
    ],
  },
  persona: {
    label: "Persona Analysis",
    fields: [
      { name: "extract", type: "text", placeholder: "Auto-extract persona from input" },
    ],
  },
  message: {
    label: "Message Generator",
    fields: [
      { name: "channels", type: "text", placeholder: "email, linkedin, whatsapp" },
      { name: "tone_override", type: "text", placeholder: "Optional tone override" },
      { name: "variants", type: "text", placeholder: "3" },
    ],
  },
  email: { label: "Email Channel", fields: [{ name: "platform", type: "text", placeholder: "SMTP / Gmail API" }] },
  linkedin: { label: "LinkedIn Channel", fields: [{ name: "method", type: "text", placeholder: "Connection request / InMail" }] },
  send: { label: "Send Message", fields: [{ name: "mode", type: "text", placeholder: "Simulate / Live" }] },
  delay: { label: "Delay", fields: [{ name: "duration", type: "text", placeholder: "e.g. 2 hours, 1 day" }] },
  condition: { label: "Condition", fields: [{ name: "expression", type: "text", placeholder: "if reply_score > 70" }] },
};

const WorkflowConfigPanel = ({ selectedNode }: WorkflowConfigPanelProps) => {
  if (!selectedNode) {
    return (
      <div className="w-[280px] shrink-0 h-full border-l border-glass-border bg-surface/80 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-10 h-10 rounded-full border border-dashed border-muted-foreground/15 flex items-center justify-center mx-auto mb-3">
            <GitBranch className="w-5 h-5 text-muted-foreground/20" />
          </div>
          <p className="text-xs text-muted-foreground/40">Select a node to configure</p>
        </div>
      </div>
    );
  }

  const nodeType = selectedNode.data?.nodeType || "input";
  const config = configFields[nodeType] || configFields.input;
  const Icon = iconMap[nodeType] || User;

  return (
    <div className="w-[280px] shrink-0 h-full border-l border-glass-border bg-surface/80 backdrop-blur-sm overflow-y-auto">
      <div className="p-4 border-b border-glass-border">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">{config.label}</h3>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">Node ID: {selectedNode.id}</p>
      </div>
      <div className="p-4 space-y-3">
        {config.fields.map((field) => (
          <div key={field.name}>
            <label className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium block mb-1">
              {field.name.replace(/_/g, " ")}
            </label>
            {field.type === "textarea" ? (
              <textarea
                className="w-full bg-muted/40 border border-glass-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 resize-none h-20"
                placeholder={field.placeholder}
                readOnly
              />
            ) : (
              <input
                type="text"
                className="w-full bg-muted/40 border border-glass-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40"
                placeholder={field.placeholder}
                readOnly
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkflowConfigPanel;
