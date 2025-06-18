import React from 'react';

const TrainGraph = ({ graph }) => (
  <div className="bg-white p-4 rounded shadow mb-6">
    <h2 className="text-xl font-semibold mb-2">Train Route Graph</h2>
    {graph.map((node, idx) => (
      <div key={idx}>
        <strong>{node.from}</strong> → {node.edges.map(e => `${e.to} (${e.time})`).join(', ')}
      </div>
    ))}
  </div>
);

export default TrainGraph;
