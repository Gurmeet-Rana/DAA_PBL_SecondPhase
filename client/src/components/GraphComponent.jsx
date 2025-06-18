// src/GraphComponent.jsx
import React, { useMemo } from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

export default function GraphComponent({ data }) {
  // Convert your trainData into nodes and edges
  const { nodes, edges } = useMemo(() => {
    const nodes = [];
    const edges = [];
    const stationMap = new Map();

    // Assign unique IDs to stations
    data.forEach((train, index) => {
      const { source, destination, arrivalTime, departureTime, delay } = train;

      if (!stationMap.has(source)) {
        stationMap.set(source, `station-${stationMap.size}`);
        nodes.push({
          id: stationMap.get(source),
          data: { label: `${source}` },
          position: { x: Math.random() * 500, y: Math.random() * 500 },
        });
      }

      if (!stationMap.has(destination)) {
        stationMap.set(destination, `station-${stationMap.size}`);
        nodes.push({
          id: stationMap.get(destination),
          data: { label: `${destination}` },
          position: { x: Math.random() * 500, y: Math.random() * 500 },
        });
      }

      edges.push({
        id: `edge-${index}`,
        source: stationMap.get(source),
        target: stationMap.get(destination),
        label: `Delay: ${delay || 0} min`,
        animated: delay > 0,
        style: { stroke: delay > 0 ? 'red' : 'green' },
      });
    });

    return { nodes, edges };
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
