import React from 'react';

export default function ScheduleTable({ data }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Train Schedules</h3>

      {data.length === 0 ? (
        <p className="text-gray-500">No train data available.</p>
      ) : (
        data.map((train, index) => (
          <div key={index} className="mb-8">
            <h4 className="text-md font-semibold text-blue-600 mb-2">
              🚆 Train ID: {train.trainId}
            </h4>
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2">Station</th>
                  <th className="border px-3 py-2">Arrival</th>
                  <th className="border px-3 py-2">Departure</th>
                  <th className="border px-3 py-2">Delay</th>
                  <th className="border px-3 py-2">Platform</th>
                  <th className="border px-3 py-2">Passengers Waiting</th>
                  <th className="border px-3 py-2">Passengers Arriving</th>
                </tr>
              </thead>
              <tbody>
                {train.route.map((station, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{station.name}</td>
                    <td className="border px-3 py-2">{station.arrivalTime}</td>
                    <td className="border px-3 py-2">{station.departureTime}</td>
                    <td className="border px-3 py-2">{station.delay}</td>
                    <td className="border px-3 py-2">{station.platformNumber}</td>
                    <td className="border px-3 py-2">{station.passengersWaiting}</td>
                    <td className="border px-3 py-2">{station.passengersArriving}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}
