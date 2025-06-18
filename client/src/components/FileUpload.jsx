import React from 'react';
import axios from 'axios';

const FileUpload = ({ setGraph, setSchedules }) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData);
      setGraph(res.data.graph);
      setSchedules(res.data.trains);
    } catch (err) {
      alert("Failed to upload: " + err.message);
    }
  };

  return (
    <div className="mb-4">
      <input type="file" onChange={handleFileChange} className="p-2 border rounded" />
    </div>
  );
};

export default FileUpload;
