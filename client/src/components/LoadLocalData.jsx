import React, { useEffect } from 'react';
import axios from 'axios';

const LoadLocalData = ({ setGraph, setSchedules }) => {
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch('/trainData.json');
      const trains = await res.json();

      // Send to backend for processing
      const result = await axios.post('http://localhost:5000/process', { trains });
      setGraph(result.data.graph);
      setSchedules(result.data.trains);
    };

    loadData();
  }, []);

  return (
    <div className="text-center mb-4 text-green-700 font-medium">
      🚆 Loading local train data and processing...
    </div>
  );
};

export default LoadLocalData;
