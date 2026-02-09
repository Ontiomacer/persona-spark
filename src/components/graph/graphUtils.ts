import type { Node, Edge } from "@xyflow/react";
import { PersonaData } from "@/types/outreach";

const edgeColor = "hsl(0, 0%, 45%)";
const edgeColorLight = "hsl(0, 0%, 35%)";

export function generateGraphData(
  persona: PersonaData,
  similarProfiles: string[]
): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  nodes.push({
    id: "person",
    type: "personNode",
    position: { x: -56, y: -56 },
    data: { name: persona.name, role: persona.role },
  });

  nodes.push({
    id: "company",
    type: "companyNode",
    position: { x: -340, y: -200 },
    data: {
      name: persona.company,
      industry: persona.industry,
      size: "50-200 employees",
    },
  });
  edges.push({
    id: "e-person-company",
    source: "person",
    target: "company",
    animated: true,
    style: { stroke: edgeColor, strokeWidth: 2 },
  });

  const infoNodes = [
    { id: "role", category: "Role", value: persona.role, icon: "briefcase" },
    { id: "industry", category: "Industry", value: persona.industry, icon: "globe" },
  ];

  const infoPositions = [
    { x: 180, y: -260 },
    { x: 300, y: 40 },
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
      style: { stroke: edgeColor, strokeWidth: 2 },
    });
  });

  nodes.push({
    id: "commstyle",
    type: "commStyleNode",
    position: { x: -320, y: 60 },
    data: {
      tone: persona.tone,
      likelihood: persona.responseLikelihood,
      emoji: persona.emojiUsage,
    },
  });
  edges.push({
    id: "e-person-commstyle",
    source: "person",
    target: "commstyle",
    animated: true,
    style: { stroke: edgeColor, strokeWidth: 2 },
  });

  const interestPositions = [
    { x: -380, y: 220 },
    { x: -160, y: 300 },
    { x: 60, y: 300 },
    { x: 260, y: 220 },
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
      style: { stroke: edgeColor, strokeWidth: 1.5 },
    });
  });

  const similarPositions = [
    { x: -460, y: -60 },
    { x: -40, y: -400 },
    { x: 420, y: -100 },
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
      style: { stroke: edgeColor, strokeWidth: 1, opacity: 0.5 },
    });
  });

  return { nodes, edges };
}
