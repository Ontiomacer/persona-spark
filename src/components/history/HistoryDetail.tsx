import { HistoryEntry } from "@/types/outreach";
import {
  X,
  User,
  Building2,
  Globe,
  MapPin,
  Shield,
  Clock,
  MessageSquare,
  Mail,
  Sparkles,
  BarChart3,
} from "lucide-react";

interface HistoryDetailProps {
  entry: HistoryEntry;
  onClose: () => void;
}

const HistoryDetail = ({ entry, onClose }: HistoryDetailProps) => {
  const { persona, messages, subjects, scores } = entry;

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground">{persona.name}</h3>
          <p className="text-xs text-muted-foreground">
            {persona.role} at {persona.company}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg bg-muted/40 flex items-center justify-center hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Profile snapshot */}
      <div className="glass-card p-4 space-y-3">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Persona Snapshot
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: User, label: "Name", value: persona.name },
            { icon: Building2, label: "Company", value: persona.company },
            { icon: Globe, label: "Industry", value: persona.industry },
            { icon: MapPin, label: "Location", value: persona.location },
            { icon: Shield, label: "Seniority", value: persona.seniority },
            { icon: Clock, label: "Last Active", value: persona.lastActivity },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-2 p-2 rounded-lg bg-muted/30">
              <item.icon className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
              <div>
                <div className="text-[9px] text-muted-foreground uppercase">{item.label}</div>
                <div className="text-xs text-foreground leading-tight">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="glass-card p-4">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
          Interests
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {persona.interests.map((interest) => (
            <span
              key={interest}
              className="px-2 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] border border-secondary/20 flex items-center gap-1"
            >
              <Sparkles className="w-2.5 h-2.5" />
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Analytics */}
      <div className="glass-card p-4 space-y-3">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5" />
          Analytics
        </h4>
        <div className="space-y-2">
          {[
            { label: "Reply Likelihood", value: persona.responseLikelihood, color: "bg-primary" },
            { label: "Personalization Score", value: scores[0] || 75, color: "bg-secondary" },
          ].map((metric) => (
            <div key={metric.label} className="flex items-center justify-between gap-3 text-xs">
              <span className="text-foreground/70 w-36">{metric.label}</span>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${metric.color} rounded-full`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
              <span className="text-muted-foreground w-8 text-right font-mono">
                {metric.value}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Messages */}
      <div className="glass-card p-4 space-y-3">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5" />
          Generated Messages
        </h4>
        {messages.email.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Mail className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-medium text-primary">Email</span>
            </div>
            {messages.email.slice(0, 1).map((msg, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/30 text-xs text-foreground/80 whitespace-pre-line leading-relaxed">
                {msg}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subjects */}
      {subjects.length > 0 && (
        <div className="glass-card p-4">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Subject Lines
          </h4>
          <div className="space-y-1.5">
            {subjects.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 text-xs text-foreground"
              >
                <span className="text-[9px] font-mono text-primary">#{i + 1}</span>
                {s}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryDetail;
