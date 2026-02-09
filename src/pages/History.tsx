import { useState } from "react";
import TopNav from "@/components/TopNav";
import HistoryTable from "@/components/history/HistoryTable";
import HistoryDetail from "@/components/history/HistoryDetail";
import { MOCK_HISTORY, HistoryEntry } from "@/types/outreach";
import { History as HistoryIcon, Search } from "lucide-react";

const History = () => {
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEntries = MOCK_HISTORY.filter(
    (e) =>
      e.persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.persona.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.persona.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex flex-col">
      <TopNav />
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Page header */}
        <div className="px-6 py-4 border-b border-glass-border bg-card/40 backdrop-blur-sm flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
              <HistoryIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground">Outreach History</h1>
              <p className="text-xs text-muted-foreground">{filteredEntries.length} campaigns tracked</p>
            </div>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name, company…"
              className="w-full h-8 pl-8 pr-3 rounded-lg bg-muted/50 border border-glass-border text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-hidden flex">
          <div className={`${selectedEntry ? "w-[55%]" : "w-full"} h-full overflow-y-auto transition-all duration-300`}>
            <HistoryTable
              entries={filteredEntries}
              selectedId={selectedEntry?.id ?? null}
              onSelect={setSelectedEntry}
            />
          </div>
          {selectedEntry && (
            <div className="w-[45%] h-full border-l border-glass-border overflow-y-auto bg-card/40 backdrop-blur-sm animate-slide-in-right">
              <HistoryDetail entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
