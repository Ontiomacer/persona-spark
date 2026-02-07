import { Sparkles, Loader2 } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  loadingText: string;
  disabled: boolean;
}

const GenerateButton = ({ onClick, isLoading, loadingText, disabled }: GenerateButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        w-full py-3.5 rounded-lg font-semibold text-sm
        flex items-center justify-center gap-2
        transition-all duration-300
        ${isLoading
          ? "bg-primary/30 text-primary animate-pulse-glow cursor-wait"
          : "bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-primary-foreground hover:animate-gradient-shift glow-primary hover:scale-[1.02] active:scale-[0.98]"
        }
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4" />
          <span>Generate Outreach</span>
        </>
      )}
    </button>
  );
};

export default GenerateButton;
