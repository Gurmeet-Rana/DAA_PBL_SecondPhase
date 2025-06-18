import React from 'react';

const TrainSchedule = ({ schedules }) => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-xl font-semibold mb-2">Train Schedules</h2>
    {schedules.map((train, idx) => (
      <div key={idx} className="mb-4">
        <h3 className="font-bold">Train {train.trainId}</h3>
        <ul className="ml-4 list-disc">
          {train.route.map((st, i) => (
            <li key={i}>
              {st.name} | Arr: {st.arrivalTime} | Dep: {st.departureTime} | Delay: {st.delay} | Platform: {st.platformNumber}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default TrainSchedule;
