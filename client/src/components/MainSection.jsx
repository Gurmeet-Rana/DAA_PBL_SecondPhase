export default function MainSection({ selectedOption }) {
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">🚆 Train Scheduler System</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Selected: {selectedOption}</h2>

        {/* Placeholder for future functionality */}
        <div className="mt-4 text-gray-700">
          {selectedOption === "View Graph" && <p>Render the route graph here.</p>}
          {selectedOption === "Reschedule Platforms" && (
            <p>Run greedy platform conflict resolution algorithm.</p>
          )}
          {selectedOption === "Propagate Delays" && (
            <p>Apply cumulative delay propagation to trains.</p>
          )}
          {selectedOption === "Show Train Schedules" && (
            <p>Display formatted schedule for each train.</p>
          )}
          {selectedOption === "Reset System" && <p>Reset to initial state.</p>}
          {selectedOption === "Welcome" && (
            <p>Select an action from the sidebar to get started.</p>
          )}
        </div>
      </div>
    </div>
  );
}
