import React, { useEffect, useState } from "react";
import { resolvePlatformConflicts } from "../utils/trainUtils";

export default function PlatformScheduler({ data }) {
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    const deepCopy = JSON.parse(JSON.stringify(data)); // Avoid mutating props
    resolvePlatformConflicts(deepCopy);
    setUpdatedData(deepCopy);
  }, [data]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">📊 Platform Scheduler</h2>
      {updatedData.map((train, i) => (
        <div key={i} className="mb-4 p-3 bg-gray-100 rounded">
          <h3 className="font-bold">Train {train.trainId}</h3>
          <table className="table-auto w-full text-sm mt-2">
            <thead>
              <tr>
                <th>Station</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>Delay</th>
                <th>Platform</th>
              </tr>
            </thead>
            <tbody>
              {train.route.map((station, j) => (
                <tr key={j}>
                  <td>{station.name}</td>
                  <td>{station.arrivalTime}</td>
                  <td>{station.departureTime}</td>
                  <td>{station.delay}</td>
                  <td>{station.platformNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
