interface ProfileInputProps {
  value: string;
  onChange: (value: string) => void;
}

const ProfileInput = ({ value, onChange }: ProfileInputProps) => {
  const maxChars = 2000;
  const charCount = value.length;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Target Profile</label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxChars))}
          placeholder="Paste LinkedIn profile, bio, or notes about the person…"
          className="w-full h-32 px-4 py-3 bg-input/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring/50 focus:border-ring/50 transition-all duration-200"
        />
        <div className="absolute bottom-2 right-3 text-xs text-muted-foreground font-mono">
          {charCount}/{maxChars}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Only public info. No scraping required.
      </p>
    </div>
  );
};

export default ProfileInput;
