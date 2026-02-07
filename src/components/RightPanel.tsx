import {
  MousePointer2,
  Building2,
  MessageSquare,
  Brain,
  Sparkles,
  Users,
  Shield,
} from "lucide-react";
import PersonaAnalysis from "./PersonaAnalysis";
import MessageTabs from "./MessageTabs";
import SubjectLines from "./SubjectLines";
import SimilarProfiles from "./SimilarProfiles";
import { GenerateResponse } from "@/types/outreach";

interface RightPanelProps {
  result: GenerateResponse | null;
  selectedNodeId: string | null;
  isLoading: boolean;
}

const RightPanel = ({ result, selectedNodeId, isLoading }: RightPanelProps) => {
  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 px-6">
        <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center animate-pulse">
          <Brain className="w-6 h-6 text-primary" />
        </div>
        <div className="text-center">
          <p className="text-sm text-primary font-medium">
            Generating intelligence…
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Analyzing patterns and crafting messages
          </p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 px-6">
        <div className="w-12 h-12 rounded-full border border-dashed border-muted-foreground/15 flex items-center justify-center">
          <Shield className="w-6 h-6 text-muted-foreground/20" />
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground/40 font-medium">
            Message Intelligence
          </p>
          <p className="text-xs text-muted-foreground/25 mt-1">
            Generate outreach to see AI insights
          </p>
        </div>
      </div>
    );
  }

  if (!selectedNodeId) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-glass-border">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            Intelligence Panel
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Click a node on the graph to explore
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center space-y-3">
            <MousePointer2 className="w-7 h-7 text-muted-foreground/20 mx-auto" />
            <p className="text-xs text-muted-foreground/40">
              Select any node to view detailed analysis
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Person node — full message output
  if (selectedNodeId === "person") {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-4 border-b border-glass-border sticky top-0 bg-surface/95 backdrop-blur-sm z-10">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            Target Intelligence
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {result.persona.name} · {result.persona.role}
          </p>
        </div>
        <div className="p-4 space-y-4">
          <PersonaAnalysis persona={result.persona} />
          <MessageTabs data={result} />
          <SubjectLines subjects={result.subjects} />
          <SimilarProfiles profiles={result.similar_profiles} />
        </div>
      </div>
    );
  }

  // Role node
  if (selectedNodeId === "role") {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-4 border-b border-glass-border">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            Role Analysis
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="glass-card p-4 space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              {result.persona.role}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Decision maker in the {result.persona.industry} space. This role
              typically has authority over tool selection, partnerships, and
              strategic initiatives.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs border border-primary/20">
                High Authority
              </span>
              <span className="px-2 py-1 rounded-md bg-secondary/10 text-secondary text-xs border border-secondary/20">
                Budget Control
              </span>
            </div>
          </div>
          <div className="glass-card p-4">
            <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
              Recommended Approach
            </h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Lead with value proposition and ROI. Avoid hard sales. Focus on
              solving specific pain points for {result.persona.name}'s
              responsibilities.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Industry node
  if (selectedNodeId === "industry") {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-4 border-b border-glass-border">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Building2 className="w-4 h-4 text-secondary" />
            Industry Context
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="glass-card p-4 space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              {result.persona.industry}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The {result.persona.industry} industry is rapidly evolving with
              emphasis on AI-driven automation, personalization at scale, and
              cost efficiency.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 rounded-md bg-accent/10 text-accent text-xs border border-accent/20">
                High Growth
              </span>
              <span className="px-2 py-1 rounded-md bg-secondary/10 text-secondary text-xs border border-secondary/20">
                Tech-Forward
              </span>
              <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs border border-primary/20">
                Competitive
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tone node
  if (selectedNodeId === "tone") {
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-4 border-b border-glass-border">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-accent" />
            Tone Analysis
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="glass-card p-4 space-y-3">
            <span className="inline-flex px-3 py-1.5 rounded-lg bg-accent/15 text-accent text-sm font-medium border border-accent/25">
              {result.persona.tone} Style
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Based on communication patterns, a{" "}
              {result.persona.tone.toLowerCase()} tone is optimal. All generated
              messages have been calibrated to match.
            </p>
          </div>
          <div className="glass-card p-4 space-y-3">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Tone Signals
            </h4>
            <div className="space-y-2.5">
              {[
                {
                  label: "Formality",
                  value: result.persona.tone === "Casual" ? 30 : 70,
                  color: "bg-accent",
                },
                { label: "Directness", value: 75, color: "bg-primary" },
                { label: "Enthusiasm", value: 85, color: "bg-secondary" },
              ].map((signal) => (
                <div
                  key={signal.label}
                  className="flex items-center justify-between gap-3 text-xs"
                >
                  <span className="text-foreground/70 w-20">
                    {signal.label}
                  </span>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${signal.color} rounded-full transition-all duration-700`}
                      style={{ width: `${signal.value}%` }}
                    />
                  </div>
                  <span className="text-muted-foreground w-8 text-right">
                    {signal.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Interest nodes
  if (selectedNodeId.startsWith("interest-")) {
    const idx = parseInt(selectedNodeId.split("-")[1]);
    const interest = result.persona.interests[idx];
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-4 border-b border-glass-border">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-secondary" />
            Interest Signal
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="glass-card p-4 space-y-3">
            <h4 className="text-sm font-medium text-foreground">{interest}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This interest was identified from the target's profile. It can be
              leveraged as a conversation hook in outreach messages.
            </p>
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-secondary/10 text-secondary text-xs border border-secondary/20">
              High Relevance
            </span>
          </div>
          <div className="glass-card p-4">
            <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
              Hook Suggestion
            </h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Reference "{interest}" early in your message to establish relevance
              and demonstrate genuine research into the target's background.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Similar profile nodes
  if (selectedNodeId.startsWith("similar-")) {
    const idx = parseInt(selectedNodeId.split("-")[1]);
    const profile = result.similar_profiles[idx];
    return (
      <div className="h-full overflow-y-auto">
        <div className="p-4 border-b border-glass-border">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            Memory Match
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="glass-card p-4 space-y-3">
            <h4 className="text-sm font-medium text-foreground">{profile}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Similar profiles from past outreach campaigns have been
              identified. Patterns from these interactions were used to optimize
              current messages.
            </p>
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-accent/10 text-accent text-xs border border-accent/20">
              Pattern Applied
            </span>
          </div>
          <div className="glass-card p-4">
            <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
              Intelligence Note
            </h4>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Messages for this target incorporate learnings from previous
              outreach to similar personas, improving reply likelihood.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="h-full flex items-center justify-center px-6">
      <p className="text-xs text-muted-foreground/50">
        Select a node to see details
      </p>
    </div>
  );
};

export default RightPanel;
