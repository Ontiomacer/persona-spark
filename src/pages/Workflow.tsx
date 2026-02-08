import TopNav from "@/components/TopNav";
import WorkflowCanvas from "@/components/workflow/WorkflowCanvas";

const Workflow = () => {
  return (
    <div className="h-screen w-screen overflow-hidden bg-background flex flex-col">
      <TopNav />
      <div className="flex-1 overflow-hidden">
        <WorkflowCanvas />
      </div>
    </div>
  );
};

export default Workflow;
