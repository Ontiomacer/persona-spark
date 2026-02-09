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
        transition-all duration-200
        ${isLoading
          ? "bg-muted text-muted-foreground border border-border cursor-wait"
          : "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]"
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
          <span>Generate Intelligence</span>
        </>
      )}
    </button>
  );
};

export default GenerateButton;
