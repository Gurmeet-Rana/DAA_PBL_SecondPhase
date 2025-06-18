import { useState, useEffect } from 'react';
import GraphComponent from './GraphComponent';
import PlatformScheduler from './PlatformScheduler';
import DelayPropagator from './DelayPropagator';
import ScheduleTable from './ScheduleTable';
import ResetButton from './ResetButton';

export default function MainSection({ selectedOption }) {
  const [trainData, setTrainData] = useState([]);

  useEffect(() => {
    fetch('trains_Data.json')
      .then(res => res.json())
      .then(data => setTrainData(data)) // FIXED: should be `data`, not `trainData`
      .catch(err => console.error('Error while loading trains Data.', err)); // optional: log error
  }, []);

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">🚆 Train Scheduler System</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Selected: {selectedOption}</h2>

        <div className="mt-4 text-gray-700">
          {selectedOption === "View Graph" && <GraphComponent data={trainData} />}
          {selectedOption === "Reschedule Platforms" && <PlatformScheduler data={trainData} />}
          {selectedOption === "Propagate Delays" && <DelayPropagator data={trainData} />}
          {selectedOption === "Show Train Schedules" && <ScheduleTable data={trainData} />}
          {selectedOption === "Reset System" && <ResetButton />}
          {selectedOption === "Welcome" && (
            <p>Select an action from the sidebar to get started.</p>
          )}
        </div>
      </div>
    </div>
  );
}
