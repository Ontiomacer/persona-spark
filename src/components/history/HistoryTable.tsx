import { HistoryEntry } from "@/types/outreach";
import { Mail, Linkedin, MessageSquare, ArrowUpRight } from "lucide-react";

interface HistoryTableProps {
  entries: HistoryEntry[];
  selectedId: string | null;
  onSelect: (entry: HistoryEntry) => void;
}

const channelIcon: Record<string, React.FC<{ className?: string }>> = {
  Email: Mail,
  LinkedIn: Linkedin,
  WhatsApp: MessageSquare,
};

const statusColors: Record<string, string> = {
  replied: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  sent: "bg-secondary/15 text-secondary border-secondary/25",
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  bounced: "bg-destructive/15 text-destructive border-destructive/25",
};

const HistoryTable = ({ entries, selectedId, onSelect }: HistoryTableProps) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground">Outreach History</h2>
        <p className="text-xs text-muted-foreground mt-1">
          {entries.length} campaigns tracked
        </p>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-glass-border">
              {["Name", "Role", "Company", "Channel", "Score", "Status", "Date", ""].map(
                (header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-[10px] text-muted-foreground uppercase tracking-wider font-medium"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const ChannelIcon = channelIcon[entry.channel] || Mail;
              const isSelected = entry.id === selectedId;
              return (
                <tr
                  key={entry.id}
                  onClick={() => onSelect(entry)}
                  className={`border-b border-glass-border/50 cursor-pointer transition-colors hover:bg-muted/30 ${
                    isSelected ? "bg-primary/5" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-foreground">
                      {entry.persona.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {entry.persona.role}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {entry.persona.company}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <ChannelIcon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{entry.channel}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono text-primary font-medium">
                      {entry.scores[0]}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize ${
                        statusColors[entry.status]
                      }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono">
                    {entry.date}
                  </td>
                  <td className="px-4 py-3">
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/40" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
