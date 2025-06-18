import React from 'react';

export default function DelayPropagator({ data }) {
  const propagateDelays = (route) => {
    let cumulativeDelay = 0;

    return route.map((station) => {
      const delayNow = station.delay || 0;
      cumulativeDelay += delayNow;

      return {
        ...station,
        cumulativeArrival: station.arrival + cumulativeDelay,
        cumulativeDeparture: station.departure + cumulativeDelay,
        cumulativeDelay,
      };
    });
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4 text-white">🚨 Delay Propagation View</h3>

      {data.length === 0 ? (
        <p className="text-gray-400">No train data available.</p>
      ) : (
        data.map((train, idx) => {
          const updatedRoute = propagateDelays(train.route);

          return (
            <div key={idx} className="mb-8">
              <h4 className="text-md font-semibold text-red-400 mb-2">
                Train ID: {train.trainId || train.trainNumber}
              </h4>
              <table className="min-w-full border border-gray-500 text-sm text-white">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="border px-3 py-2">Station</th>
                    <th className="border px-3 py-2">Original Arr</th>
                    <th className="border px-3 py-2">Original Dep</th>
                    <th className="border px-3 py-2">Delay</th>
                    <th className="border px-3 py-2">Cumulative Arr</th>
                    <th className="border px-3 py-2">Cumulative Dep</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedRoute.map((st, i) => (
                    <tr key={i} className="hover:bg-gray-800">
                      <td className="border px-3 py-2">{st.station}</td>
                      <td className="border px-3 py-2">{st.arrival}</td>
                      <td className="border px-3 py-2">{st.departure}</td>
                      <td className="border px-3 py-2">{st.delay}</td>
                      <td className="border px-3 py-2">{st.cumulativeArrival}</td>
                      <td className="border px-3 py-2">{st.cumulativeDeparture}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })
      )}
    </div>
  );
}
