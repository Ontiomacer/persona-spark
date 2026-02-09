import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  type Node,
  type Edge,
  type Connection,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { WorkflowNode } from "./WorkflowNodes";
import WorkflowSidebar from "./WorkflowSidebar";
import WorkflowConfigPanel from "./WorkflowConfigPanel";
import { Play, Square } from "lucide-react";

const nodeTypes = { workflowNode: WorkflowNode };
const edgeColor = "hsl(0, 0%, 45%)";

let idCounter = 0;
const getId = () => `wf-node-${idCounter++}`;

const defaultNodes: Node[] = [
  { id: "wf-node-start", type: "workflowNode", position: { x: 50, y: 200 }, data: { label: "Target Profile", nodeType: "input" } },
  { id: "wf-node-persona", type: "workflowNode", position: { x: 300, y: 140 }, data: { label: "Persona Analysis", nodeType: "persona" } },
  { id: "wf-node-msg", type: "workflowNode", position: { x: 550, y: 140 }, data: { label: "Message Generator", nodeType: "message" } },
  { id: "wf-node-condition", type: "workflowNode", position: { x: 550, y: 300 }, data: { label: "Score Check", nodeType: "condition" } },
  { id: "wf-node-email", type: "workflowNode", position: { x: 800, y: 100 }, data: { label: "Email Channel", nodeType: "email" } },
  { id: "wf-node-linkedin", type: "workflowNode", position: { x: 800, y: 260 }, data: { label: "LinkedIn Channel", nodeType: "linkedin" } },
  { id: "wf-node-send", type: "workflowNode", position: { x: 1050, y: 180 }, data: { label: "Send Message", nodeType: "send" } },
];

const defaultEdges: Edge[] = [
  { id: "e-start-persona", source: "wf-node-start", target: "wf-node-persona", animated: true, style: { stroke: edgeColor, strokeWidth: 2 } },
  { id: "e-persona-msg", source: "wf-node-persona", target: "wf-node-msg", animated: true, style: { stroke: edgeColor, strokeWidth: 2 } },
  { id: "e-msg-condition", source: "wf-node-msg", target: "wf-node-condition", animated: true, style: { stroke: edgeColor, strokeWidth: 1.5 } },
  { id: "e-msg-email", source: "wf-node-msg", target: "wf-node-email", animated: true, style: { stroke: edgeColor, strokeWidth: 1.5 } },
  { id: "e-condition-linkedin", source: "wf-node-condition", target: "wf-node-linkedin", animated: true, style: { stroke: edgeColor, strokeWidth: 1.5 } },
  { id: "e-email-send", source: "wf-node-email", target: "wf-node-send", animated: true, style: { stroke: edgeColor, strokeWidth: 1.5 } },
  { id: "e-linkedin-send", source: "wf-node-linkedin", target: "wf-node-send", animated: true, style: { stroke: edgeColor, strokeWidth: 1.5 } },
];

const WorkflowCanvasInner = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const { screenToFlowPosition } = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: edgeColor, strokeWidth: 2 } }, eds)
      );
    },
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onDragStart = useCallback(
    (event: React.DragEvent, nodeType: string, label: string) => {
      event.dataTransfer.setData("application/reactflow-type", nodeType);
      event.dataTransfer.setData("application/reactflow-label", label);
      event.dataTransfer.effectAllowed = "move";
    },
    []
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow-type");
      const label = event.dataTransfer.getData("application/reactflow-label");
      if (!type) return;

      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const newNode: Node = { id: getId(), type: "workflowNode", position, data: { label, nodeType: type } };
      setNodes((nds) => [...nds, newNode]);
    },
    [screenToFlowPosition, setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const runWorkflow = useCallback(async () => {
    setIsRunning(true);
    const nodeOrder = ["wf-node-start", "wf-node-persona", "wf-node-msg", "wf-node-condition", "wf-node-email", "wf-node-linkedin", "wf-node-send"];

    for (const nodeId of nodeOrder) {
      setNodes((nds) => nds.map((n) => n.id === nodeId ? { ...n, data: { ...n.data, running: true, done: false } } : n));
      await new Promise((r) => setTimeout(r, 800));
      setNodes((nds) => nds.map((n) => n.id === nodeId ? { ...n, data: { ...n.data, running: false, done: true } } : n));
    }
    setIsRunning(false);
  }, [setNodes]);

  const resetWorkflow = useCallback(() => {
    setNodes((nds) => nds.map((n) => ({ ...n, data: { ...n.data, running: false, done: false } })));
  }, [setNodes]);

  return (
    <div className="h-full flex">
      <WorkflowSidebar onDragStart={onDragStart} />
      <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <button
            onClick={isRunning ? resetWorkflow : runWorkflow}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all border ${
              isRunning
                ? "bg-muted text-foreground border-border hover:bg-accent"
                : "bg-primary text-primary-foreground border-primary hover:opacity-90"
            }`}
          >
            {isRunning ? (
              <><Square className="w-3.5 h-3.5" /> Stop</>
            ) : (
              <><Play className="w-3.5 h-3.5" /> Run Workflow</>
            )}
          </button>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          proOptions={{ hideAttribution: true }}
          className="intelligence-graph"
          minZoom={0.3}
          maxZoom={1.5}
        >
          <Background variant={BackgroundVariant.Dots} color="hsl(0 0% 30% / 0.1)" gap={25} size={1} />
          <Controls
            showInteractive={false}
            className="!bg-card/80 !border-border !rounded-lg !shadow-lg [&>button]:!bg-muted/40 [&>button]:!border-border [&>button]:!text-muted-foreground [&>button:hover]:!bg-muted [&>button:hover]:!text-foreground [&>button]:!w-7 [&>button]:!h-7"
          />
        </ReactFlow>
      </div>
      <WorkflowConfigPanel selectedNode={selectedNode} />
    </div>
  );
};

const WorkflowCanvas = () => (
  <ReactFlowProvider>
    <WorkflowCanvasInner />
  </ReactFlowProvider>
);

export default WorkflowCanvas;
