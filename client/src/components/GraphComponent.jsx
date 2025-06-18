import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';

const nodeWidth = 120;
const nodeHeight = 50;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes, edges, direction = 'LR') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
  });

  return { nodes, edges };
};

export default function GraphComponent({ data }) {
  const { nodes, edges } = useMemo(() => {
    const nodes = [];
    const edges = [];
    const stationMap = new Map();
    let stationIdCounter = 0;

    data.forEach((train) => {
      const route = train.route;

      for (let i = 0; i < route.length; i++) {
        const current = route[i];
        const name = current.station;

        if (!stationMap.has(name)) {
          const id = `station-${stationIdCounter++}`;
          stationMap.set(name, id);
          nodes.push({
            id,
            data: { label: name },
            position: { x: 0, y: 0 }, // will be set by dagre
          });
        }

        if (i < route.length - 1) {
          const next = route[i + 1];
          const fromId = stationMap.get(current.station);
          const toId = stationMap.get(next.station);
          const delay = next.delay || 0;

          edges.push({
            id: `edge-${train.trainNumber}-${i}`,
            source: fromId,
            target: toId,
            label: `Delay: ${delay} min`,
            animated: delay > 0,
            style: { stroke: delay > 0 ? 'red' : 'green' },
          });
        }
      }
    });

    return getLayoutedElements(nodes, edges, 'TB'); // TB = top-bottom layout
  }, [data]);

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <h3 className="text-xl font-bold mb-4">Train Network Graph</h3>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
