import React from 'react';

export default function ResetButton() {
  const handleReset = () => {
    // Optionally confirm reset
    if (window.confirm("Are you sure you want to reset the system?")) {
      window.location.reload(); // Simply reloads the page to reset all state
    }
  };

  return (
    <button
      onClick={handleReset}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
    >
      🔄 Reset System
    </button>
  );
}
