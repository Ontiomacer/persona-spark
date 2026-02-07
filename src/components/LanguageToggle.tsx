interface LanguageToggleProps {
  value: string;
  onChange: (value: string) => void;
}

const options = ["English", "Hinglish"];

const LanguageToggle = ({ value, onChange }: LanguageToggleProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Language Style</label>
      <div className="flex rounded-lg border border-glass-border overflow-hidden">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`flex-1 py-2 text-sm font-medium transition-all duration-200 ${
              value === opt
                ? "bg-primary/20 text-primary border-primary/30"
                : "bg-input/30 text-muted-foreground hover:text-foreground hover:bg-input/50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageToggle;
