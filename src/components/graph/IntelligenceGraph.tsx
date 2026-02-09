import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  PersonNode,
  InfoNode,
  InterestNode,
  SimilarNode,
  CompanyNode,
  CommStyleNode,
} from "./CustomNodes";
import { generateGraphData } from "./graphUtils";
import { GenerateResponse } from "@/types/outreach";
import { Network, Loader2 } from "lucide-react";

const nodeTypes = {
  personNode: PersonNode,
  infoNode: InfoNode,
  interestNode: InterestNode,
  similarNode: SimilarNode,
  companyNode: CompanyNode,
  commStyleNode: CommStyleNode,
};

interface Props {
  result: GenerateResponse | null;
  isLoading: boolean;
  onNodeSelect: (nodeId: string | null) => void;
  selectedNodeId: string | null;
}

const IntelligenceGraphInner = ({
  result,
  isLoading,
  onNodeSelect,
  selectedNodeId,
}: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();
  const revealTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!result) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const { nodes: allNodes, edges: allEdges } = generateGraphData(
      result.persona,
      result.similar_profiles
    );

    let i = 0;
    setNodes([]);
    setEdges([]);

    revealTimerRef.current = setInterval(() => {
      if (i >= allNodes.length) {
        if (revealTimerRef.current) clearInterval(revealTimerRef.current);
        setTimeout(() => fitView({ padding: 0.35, duration: 800 }), 150);
        return;
      }

      const node = allNodes[i];
      setNodes((prev) => [...prev, node]);

      const relatedEdges = allEdges.filter(
        (e) => e.target === node.id || e.source === node.id
      );
      setEdges((prev) => {
        const existingIds = new Set(prev.map((e) => e.id));
        const newEdges = relatedEdges.filter((e) => !existingIds.has(e.id));
        return [...prev, ...newEdges];
      });

      i++;
    }, 280);

    return () => {
      if (revealTimerRef.current) clearInterval(revealTimerRef.current);
    };
  }, [result, fitView, setNodes, setEdges]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      onNodeSelect(node.id);
    },
    [onNodeSelect]
  );

  const onPaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  const styledNodes = useMemo(
    () =>
      nodes.map((n) => ({
        ...n,
        className: n.id === selectedNodeId ? "selected-graph-node" : "",
      })),
    [nodes, selectedNodeId]
  );

  if (!result && !isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-5">
        <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-muted-foreground/15 flex items-center justify-center">
          <Network className="w-10 h-10 text-muted-foreground/20" />
        </div>
        <div className="text-center space-y-1.5">
          <p className="text-sm text-muted-foreground/40 font-medium">
            Intelligence Graph
          </p>
          <p className="text-xs text-muted-foreground/25">
            Paste a profile and generate to build the relationship map
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-6">
        <div className="relative w-24 h-24 rounded-full border-2 border-foreground/10 bg-muted flex items-center justify-center">
          <Loader2
            className="w-8 h-8 text-foreground animate-spin"
            style={{ animationDuration: "2s" }}
          />
        </div>
        <div className="space-y-2 text-center">
          {[
            "Detecting persona…",
            "Detecting company…",
            "Mapping interests…",
            "Generating messages…",
            "Adding similar personas…",
          ].map((text, i) => (
            <p
              key={i}
              className="text-xs font-mono text-muted-foreground/40 opacity-0 animate-fade-up"
              style={{
                animationDelay: `${i * 600}ms`,
                animationFillMode: "forwards",
              }}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ReactFlow
      nodes={styledNodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.35 }}
      proOptions={{ hideAttribution: true }}
      className="intelligence-graph"
      minZoom={0.3}
      maxZoom={1.5}
    >
      <Background
        variant={BackgroundVariant.Dots}
        color="hsl(0 0% 30% / 0.15)"
        gap={30}
        size={1.2}
      />
      <Controls
        showInteractive={false}
        className="!bg-card/80 !border-border !rounded-lg !shadow-lg [&>button]:!bg-muted/40 [&>button]:!border-border [&>button]:!text-muted-foreground [&>button:hover]:!bg-muted [&>button:hover]:!text-foreground [&>button]:!w-7 [&>button]:!h-7"
      />
    </ReactFlow>
  );
};

const IntelligenceGraph = (props: Props) => (
  <ReactFlowProvider>
    <IntelligenceGraphInner {...props} />
  </ReactFlowProvider>
);

export default IntelligenceGraph;
