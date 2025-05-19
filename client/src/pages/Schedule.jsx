import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Schedule = () => {

  const location = useLocation();
  const { trainName, trainNumber } = location.state || {};
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/trains')
      .then(res => res.json())
      .then(data => setTrains(data.trains||[]));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 text-center drop-shadow">
          Train Schedule
        </h1>
        <div className="overflow-x-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trains.map((train, idx) => (
              <div
                key={idx}
                className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col gap-2 border border-blue-200 hover:scale-105 transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-blue-700">{train["Train Name"]}</span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full ml-auto">
                    #{train["Train Number"]}
                  </span>
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">Current Station:</span> {train["Current Station"]}
                </div>
                <div className="text-sm">
                  <span className="font-semibold">Delay:</span>{" "}
                  <span className={train["Total Delay (mins)"] > 0 ? "text-red-600 font-bold" : "text-green-700 font-bold"}>
                    {train["Total Delay (mins)"]} mins
                  </span>
                </div>
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">Final Destination:</span> {train["Final Destination"]}
                </div>
                {/* Previous Stations */}
                {train["Previous Stations"] && train["Previous Stations"].length > 0 && (
                  <div className="text-xs text-gray-600 mt-2">
                    <span className="font-semibold text-blue-700">Previous Stations:</span>
                    <ul className="flex flex-wrap gap-2 mt-1">
                      {train["Previous Stations"].map((station, i) => (
                        <li key={i} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                          {typeof station === "object" && station !== null
                            ? <>
                                {station.Station}
                                {station["Distance from Source (km)"] !== undefined && (
                                  <span className="ml-2 text-blue-700">
                                    ({station["Distance from Source (km)"]} km)
                                  </span>
                                )}
                              </>
                            : station}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Next Stations */}
                {train["Next Stations"] && train["Next Stations"].length > 0 && (
                  <div className="text-xs text-gray-600 mt-2">
                    <span className="font-semibold text-blue-700">Next Stations:</span>
                    <ul className="flex flex-wrap gap-2 mt-1">
                      {train["Next Stations"].map((station, i) => (
                        <li key={i} className="bg-blue-200 text-blue-900 px-2 py-1 rounded-full">
                          {typeof station === "object" && station !== null
                            ? <>
                                {station.Station}
                                {station["Distance from Current (km)"] !== undefined && (
                                  <span className="ml-2 text-blue-900">
                                    ({station["Distance from Current (km)"]} km)
                                  </span>
                                )}
                              </>
                            : station}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Reschedule Button after grid */}
        <div className="flex justify-center mt-10">
          <button
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-2xl shadow-xl hover:from-blue-700 hover:to-blue-500 focus:ring-4 focus:ring-blue-300 transition font-bold text-lg"
          >
            Reschedule
          </button>
        </div>
        {/* Optionally show the train just submitted */}
        {(trainName || trainNumber) && (
          <div className="mt-8 text-center text-blue-900">
            <span className="font-semibold">Last submitted:</span>{" "}
            {trainName && <span>Train Name: <span className="font-bold">{trainName}</span></span>}{" "}
            {trainNumber && <span>Train Number: <span className="font-bold">{trainNumber}</span></span>}
          </div>
        )}
      </div>
      {/* Fade-in animation */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.8s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default Schedule;