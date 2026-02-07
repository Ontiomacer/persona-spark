import { Copy, Check, TrendingUp, Cpu } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface MessageCardProps {
  variant: string;
  message: string;
  score: number;
  delay: number;
}

const MessageCard = ({ variant, message, score, delay }: MessageCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    toast.success("Message copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const confidence = score > 80 ? "High" : score > 60 ? "Medium" : "Low";
  const confidenceColor =
    score > 80 ? "text-emerald-400" : score > 60 ? "text-amber-400" : "text-red-400";

  return (
    <div
      className="glass-card p-4 space-y-3 opacity-0 animate-fade-in-scale hover:border-primary/30 transition-colors duration-300"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-primary font-mono">Variant {variant}</span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-mono">
            <Cpu className="w-3 h-3 text-muted-foreground" />
            <span className={confidenceColor}>{confidence}</span>
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-secondary/10 border border-secondary/20">
            <TrendingUp className="w-3 h-3 text-secondary" />
            <span className="text-xs font-mono text-secondary">{score}%</span>
          </span>
        </div>
      </div>
      <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line font-light">
        {message}
      </p>
      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all duration-200 border border-transparent hover:border-glass-border"
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default MessageCard;
