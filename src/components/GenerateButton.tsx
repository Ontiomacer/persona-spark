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
        w-full py-3 rounded-xl font-semibold text-sm
        flex items-center justify-center gap-2
        transition-all duration-300
        ${isLoading
          ? "bg-primary/25 text-primary border border-primary/30 animate-pulse-glow cursor-wait"
          : "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 hover:scale-[1.02] active:scale-[0.98]"
        }
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none
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
          <span>Generate Intelligence</span>
        </>
      )}
    </button>
  );
};

export default GenerateButton;
