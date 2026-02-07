import { Mail, Linkedin, MessageCircle } from "lucide-react";

interface ChannelSelectionProps {
  selected: string[];
  onChange: (channels: string[]) => void;
}

const channels = [
  { id: "email", label: "Cold Email", icon: Mail },
  { id: "linkedin", label: "LinkedIn DM", icon: Linkedin },
  { id: "whatsapp", label: "WhatsApp/SMS", icon: MessageCircle },
];

const ChannelSelection = ({ selected, onChange }: ChannelSelectionProps) => {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((c) => c !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">Channels</label>
      <div className="space-y-2">
        {channels.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => toggle(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
              selected.includes(id)
                ? "bg-primary/10 border-primary/30 text-foreground"
                : "bg-input/30 border-glass-border text-muted-foreground hover:border-primary/20 hover:text-foreground"
            }`}
          >
            <div
              className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                selected.includes(id)
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/40"
              }`}
            >
              {selected.includes(id) && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground" />
                </svg>
              )}
            </div>
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChannelSelection;
