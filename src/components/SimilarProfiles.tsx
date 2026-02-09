import { Users, Cpu } from "lucide-react";

interface SimilarProfilesProps {
  profiles: string[];
}

const SimilarProfiles = ({ profiles }: SimilarProfilesProps) => {
  return (
    <div className="glass-card p-4 space-y-3 opacity-0 animate-fade-in-scale" style={{ animationDelay: "700ms", animationFillMode: "forwards" }}>
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-muted-foreground" />
        <h4 className="text-sm font-semibold text-foreground">Similar Profiles Contacted</h4>
        <Cpu className="w-3 h-3 text-muted-foreground ml-auto" />
      </div>
      <div className="space-y-2">
        {profiles.map((profile, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/15 border border-border text-sm text-muted-foreground"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 shrink-0" />
            {profile}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProfiles;
