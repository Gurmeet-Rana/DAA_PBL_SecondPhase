import { useState, useEffect } from 'react';

import PlatformScheduler from './PlatformScheduler';
import DelayPropagator from './DelayPropagator';
import ScheduleTable from './ScheduleTable';
import ResetButton from './ResetButton';

export default function MainSection({ selectedOption }) {
  const [trainData, setTrainData] = useState([]);

  useEffect(() => {
    fetch('trains_Data.json')
      .then(res => res.json())
      .then(data => setTrainData(data))
      .catch(err => console.error('Error while loading trains Data.', err));
  }, []);

  return (
    <div className="flex-1 items-center p-8 overflow-y-auto bg-[#12121a] text-white">
      <h1 className="text-3xl font-bold mt-30 mb-6 text-green-300">🚆 Train Scheduler System</h1>

      <div className="bg-[#1e1e2f] rounded-xl shadow-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">
          Selected: <span className="text-green-400">{selectedOption}</span>
        </h2>

        <div className="mt-4 text-gray-300">
          {selectedOption === "Reschedule Platforms" && <PlatformScheduler data={trainData} />}
          {selectedOption === "Propagate Delays" && <DelayPropagator data={trainData} />}
          {selectedOption === "Show Train Schedules" && <ScheduleTable data={trainData} />}
          {selectedOption === "Reset System" && <ResetButton />}
          {selectedOption === "Welcome" && (
            <p className="italic text-gray-400">Select an action from the sidebar to get started.</p>
          )}
        </div>
      </div>
    </div>
  );
}
