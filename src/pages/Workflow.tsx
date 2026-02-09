import TopNav from "@/components/TopNav";
import WorkflowCanvas from "@/components/workflow/WorkflowCanvas";
import { GitBranch } from "lucide-react";

const Workflow = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex flex-col">
      <TopNav />
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Page header */}
        <div className="px-6 py-4 border-b border-glass-border bg-card/40 backdrop-blur-sm flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-base font-bold text-foreground">Outreach Workflow Builder</h1>
              <p className="text-xs text-muted-foreground">Drag nodes to build your outreach automation pipeline</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <WorkflowCanvas />
        </div>
      </div>
    </div>
  );
};

export default Workflow;
