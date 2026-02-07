import { Brain } from "lucide-react";
import { PersonaData } from "@/types/outreach";

interface PersonaAnalysisProps {
  persona: PersonaData;
}

const PersonaAnalysis = ({ persona }: PersonaAnalysisProps) => {
  const chips = [
    { label: persona.name, color: "primary" },
    { label: persona.role, color: "accent" },
    { label: persona.industry, color: "secondary" },
    { label: `${persona.tone} tone`, color: "primary" },
    ...persona.interests.map((i) => ({ label: i, color: "secondary" as const })),
  ];

  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Brain className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">AI Persona Analysis</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip, i) => (
          <span
            key={i}
            className="opacity-0 animate-fade-up"
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
          >
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                chip.color === "primary"
                  ? "bg-primary/10 text-primary border-primary/20"
                  : chip.color === "accent"
                  ? "bg-accent/10 text-accent border-accent/20"
                  : "bg-secondary/10 text-secondary border-secondary/20"
              }`}
            >
              {chip.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default PersonaAnalysis;
