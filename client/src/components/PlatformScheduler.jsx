import React, { useEffect, useState } from "react";

// Enhanced conflict resolution with netPlatform tracking
function resolvePlatformConflicts(trains) {
  const stationSchedule = {};

  for (const train of trains) {
    for (const station of train.route) {
      const name = station.station;
      const time = station.arrival;

      // Detect original platform from `platform` or `platformNumber`
      const originalPlatform = station.platform ?? station.platformNumber;

      station.originalPlatform = originalPlatform;
      station.reassigned = false;
      station.netPlatform = originalPlatform;

      if (!stationSchedule[name]) stationSchedule[name] = {};
      if (!stationSchedule[name][time]) stationSchedule[name][time] = {};

      if (stationSchedule[name][time][originalPlatform]) {
        const total = station.totalPlatforms || 10;
        let reassigned = false;

        for (let newPlat = 1; newPlat <= total; newPlat++) {
          if (!stationSchedule[name][time][newPlat]) {
            station.netPlatform = newPlat;
            station.reassigned = true;
            stationSchedule[name][time][newPlat] = train.trainNumber;
            reassigned = true;
            break;
          }
        }

        if (!reassigned) {
          console.warn(
            `No available platform at ${name} ${time} for Train ${train.trainNumber}`
          );
        }
      } else {
        stationSchedule[name][time][originalPlatform] = train.trainNumber;
      }
    }
  }
}
export default function PlatformScheduler({ data }) {
  const [updatedData, setUpdatedData] = useState([]);

  useEffect(() => {
    const deepCopy = JSON.parse(JSON.stringify(data));
    resolvePlatformConflicts(deepCopy);
    setUpdatedData(deepCopy);
  }, [data]);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-white">📊 Platform Scheduler</h2>
      {updatedData.map((train, i) => (
        <div
          key={i}
          className="mb-6 p-4 bg-[#1e1e2f] rounded-xl border border-gray-700 shadow-md"
        >
          <h3 className="font-bold text-green-400 mb-2">Train {train.trainNumber}</h3>
          <table className="table-auto w-full text-sm text-white">
            <thead className="bg-[#2a2a3b] text-gray-300">
              <tr>
                <th className="border border-gray-600 px-3 py-2">Station</th>
                <th className="border border-gray-600 px-3 py-2">Arrival</th>
                <th className="border border-gray-600 px-3 py-2">Departure</th>
                <th className="border border-gray-600 px-3 py-2">Delay</th>
                <th className="border border-gray-600 px-3 py-2">Original Platform</th>
                <th className="border border-gray-600 px-3 py-2">Final Platform</th>
                <th className="border border-gray-600 px-3 py-2">Collision</th>
              </tr>
            </thead>
            <tbody>
              {train.route.map((station, j) => (
                <tr key={j} className="hover:bg-[#353545]">
                  <td className="border border-gray-700 px-3 py-2">{station.station}</td>
                  <td className="border border-gray-700 px-3 py-2">{station.arrival}</td>
                  <td className="border border-gray-700 px-3 py-2">{station.departure}</td>
                  <td className="border border-gray-700 px-3 py-2">{station.delay}</td>
                  <td className="border border-gray-700 px-3 py-2">{station.originalPlatform}</td>
                  <td className="border border-gray-700 px-3 py-2">{station.netPlatform}</td>
                  <td className="border border-gray-700 px-3 py-2">
                    {station.reassigned ? (
                      <span className="text-yellow-400 font-semibold">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
