import { Brain } from "lucide-react";
import { PersonaData } from "@/types/outreach";

interface PersonaAnalysisProps {
  persona: PersonaData;
}

const PersonaAnalysis = ({ persona }: PersonaAnalysisProps) => {
  const chips = [
    persona.name,
    persona.role,
    persona.industry,
    `${persona.tone} tone`,
    ...persona.interests,
  ];

  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Brain className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">AI Persona Analysis</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {chips.map((label, i) => (
          <span
            key={i}
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
          >
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted text-foreground transition-all">
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default PersonaAnalysis;
