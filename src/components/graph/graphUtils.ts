import type { Node, Edge } from "@xyflow/react";
import { PersonaData } from "@/types/outreach";

export function generateGraphData(
  persona: PersonaData,
  similarProfiles: string[]
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Central person node
  nodes.push({
    id: "person",
    type: "personNode",
    position: { x: -56, y: -56 },
    data: { name: persona.name, role: persona.role },
  });

  // Info nodes arranged radially
  const infoNodes = [
    { id: "role", category: "Role", value: persona.role, icon: "briefcase" },
    { id: "industry", category: "Industry", value: persona.industry, icon: "globe" },
    { id: "tone", category: "Comm. Style", value: `${persona.tone} tone`, icon: "message" },
  ];

  const infoPositions = [
    { x: -280, y: -240 },
    { x: 160, y: -260 },
    { x: 300, y: 20 },
  ];

  infoNodes.forEach((node, i) => {
    nodes.push({
      id: node.id,
      type: "infoNode",
      position: infoPositions[i],
      data: { category: node.category, value: node.value, icon: node.icon },
    });
    edges.push({
      id: `e-person-${node.id}`,
      source: "person",
      target: node.id,
      animated: true,
      style: { stroke: "hsl(280, 80%, 60%)", strokeWidth: 2 },
    });
  });

  // Interest nodes spread across bottom
  const interestPositions = [
    { x: -360, y: 160 },
    { x: -140, y: 260 },
    { x: 80, y: 260 },
    { x: 280, y: 160 },
  ];

  persona.interests.forEach((interest, i) => {
    const id = `interest-${i}`;
    const pos = interestPositions[i % interestPositions.length];
    nodes.push({
      id,
      type: "interestNode",
      position: pos,
      data: { label: interest },
    });
    edges.push({
      id: `e-person-${id}`,
      source: "person",
      target: id,
      animated: true,
      style: { stroke: "hsl(220, 90%, 56%)", strokeWidth: 1.5 },
    });
  });

  // Similar profile nodes at outer ring
  const similarPositions = [
    { x: -420, y: -100 },
    { x: -50, y: -400 },
    { x: 380, y: -140 },
  ];

  similarProfiles.forEach((profile, i) => {
    const id = `similar-${i}`;
    const pos = similarPositions[i % similarPositions.length];
    nodes.push({
      id,
      type: "similarNode",
      position: pos,
      data: { label: profile },
    });
    edges.push({
      id: `e-person-${id}`,
      source: "person",
      target: id,
      animated: true,
      style: { stroke: "hsl(320, 75%, 55%)", strokeWidth: 1, opacity: 0.5 },
    });
  });

  return { nodes, edges };
}
