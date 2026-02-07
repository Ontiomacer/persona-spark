import { Sparkles, ArrowRight } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-6 text-center px-8">
      <div className="relative">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 border border-glass-border flex items-center justify-center animate-float">
          <Sparkles className="w-10 h-10 text-primary/60" />
        </div>
      </div>
      <div className="space-y-2 max-w-sm">
        <h3 className="text-lg font-semibold text-foreground/80">Ready to Generate</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Paste a target profile on the left and click{" "}
          <span className="text-primary font-medium">Generate Outreach</span>{" "}
          to create hyper-personalized messages.
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
        <span>Paste profile</span>
        <ArrowRight className="w-3 h-3" />
        <span>Configure</span>
        <ArrowRight className="w-3 h-3" />
        <span>Generate</span>
      </div>
    </div>
  );
};

export default EmptyState;
