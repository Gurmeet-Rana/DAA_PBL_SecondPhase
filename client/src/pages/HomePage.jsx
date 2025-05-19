import React from "react";
import { Train } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-[url('/train-tracking.jpg')] bg-cover bg-center">
            {/* Overlay for contrast */}
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 flex flex-col items-start justify-start min-h-screen p-8 md:p-20">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 shadow-xl border border-white/20">
                    <Train className="w-12 h-12 text-blue-300 mb-4 drop-shadow" />
                    <h1 className="text-4xl font-bold mb-2 text-white drop-shadow">Welcome to TrackRail</h1>
                    <p className="text-lg text-gray-100 mb-8">Track train schedules and delays in real time.</p>
                    <button
                        className="px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-400 text-white rounded-xl shadow-lg hover:from-blue-800 hover:to-blue-500 focus:ring-4 focus:ring-blue-300 transition font-semibold text-lg"
                        onClick={() => navigate("/schedule")}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HomePage;