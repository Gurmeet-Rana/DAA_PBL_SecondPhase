export default function ScheduleTable({ data }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4 text-white">Train Schedules</h3>

      {data.length === 0 ? (
        <p className="text-gray-400">No train data available.</p>
      ) : (
        data.map((train, index) => (
          <div key={index} className="mb-8">
            <h4 className="text-md font-semibold text-blue-400 mb-2">
              🚆 Train ID: {train.trainNumber}
            </h4>
            <table className="min-w-full border border-gray-700 text-sm text-white">
              <thead className="bg-[#2a2a3b] text-gray-300">
                <tr>
                  <th className="border border-gray-600 px-3 py-2">Station</th>
                  <th className="border border-gray-600 px-3 py-2">Arrival</th>
                  <th className="border border-gray-600 px-3 py-2">Departure</th>
                  <th className="border border-gray-600 px-3 py-2">Delay</th>
                  <th className="border border-gray-600 px-3 py-2">Platform</th>
                  <th className="border border-gray-600 px-3 py-2">Passengers Waiting</th>
                  <th className="border border-gray-600 px-3 py-2">Passengers Arriving</th>
                </tr>
              </thead>
              <tbody>
                {train.route.map((station, idx) => (
                  <tr key={idx} className="hover:bg-[#353545]">
                    <td className="border border-gray-700 px-3 py-2">{station.station}</td>
                    <td className="border border-gray-700 px-3 py-2">{station.arrival}</td>
                    <td className="border border-gray-700 px-3 py-2">{station.departure}</td>
                    <td className="border border-gray-700 px-3 py-2">{station.delay}</td>
                    <td className="border border-gray-700 px-3 py-2">{station.platform}</td>
                    <td className="border border-gray-700 px-3 py-2">{station.passengersWaiting}</td>
                    <td className="border border-gray-700 px-3 py-2">{station.passengersArriving}</td>
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
