import { Copy, Check, Tag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SubjectLinesProps {
  subjects: string[];
}

const SubjectLines = ({ subjects }: SubjectLinesProps) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    toast.success("Subject line copied");
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="glass-card p-4 space-y-3 opacity-0 animate-fade-in-scale" style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
      <div className="flex items-center gap-2">
        <Tag className="w-4 h-4 text-accent" />
        <h4 className="text-sm font-semibold text-foreground">Subject Line Suggestions</h4>
      </div>
      <div className="space-y-2">
        {subjects.map((subj, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 px-3 py-2 rounded-md bg-muted/20 border border-glass-border hover:border-accent/20 transition-colors group"
          >
            <span className="text-sm text-foreground/80">{subj}</span>
            <button
              onClick={() => handleCopy(subj, i)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-muted/50"
            >
              {copiedIdx === i ? (
                <Check className="w-3.5 h-3.5 text-accent" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectLines;
