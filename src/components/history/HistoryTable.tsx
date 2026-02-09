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

const statusStyles: Record<string, string> = {
  replied: "bg-muted text-foreground border-border",
  sent: "bg-muted text-foreground border-border",
  pending: "bg-muted text-muted-foreground border-border",
  bounced: "bg-muted text-muted-foreground border-border",
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
            <tr className="border-b border-border">
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
                  className={`border-b border-border/50 cursor-pointer transition-colors hover:bg-muted/30 ${
                    isSelected ? "bg-muted/40" : ""
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-foreground">{entry.persona.name}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{entry.persona.role}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{entry.persona.company}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <ChannelIcon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{entry.channel}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-mono text-foreground font-medium">{entry.scores[0]}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize ${statusStyles[entry.status]}`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono">{entry.date}</td>
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
