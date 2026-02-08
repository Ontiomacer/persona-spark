import { useState } from "react";
import TopNav from "@/components/TopNav";
import HistoryTable from "@/components/history/HistoryTable";
import HistoryDetail from "@/components/history/HistoryDetail";
import { MOCK_HISTORY, HistoryEntry } from "@/types/outreach";

const History = () => {
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);

  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex flex-col">
      <TopNav />
      <div className="flex-1 overflow-hidden flex">
        <div className={`${selectedEntry ? "w-[55%]" : "w-full"} h-full overflow-y-auto transition-all duration-300`}>
          <HistoryTable
            entries={MOCK_HISTORY}
            selectedId={selectedEntry?.id ?? null}
            onSelect={setSelectedEntry}
          />
        </div>
        {selectedEntry && (
          <div className="w-[45%] h-full border-l border-glass-border overflow-y-auto bg-surface/80 backdrop-blur-sm animate-slide-in-right">
            <HistoryDetail entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
