"use client";
import { useEffect, useRef } from "react";

export default function EmergencyAlert({ emergencySwitches }) {
  
  const audioRef = useRef(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "ON": return "bg-red-500";
      case "OFF": return "bg-green-500";
      default: return "bg-yellow-500";
    }
  };

  // Play sound if any switch is ON
  useEffect(() => {
    if (!emergencySwitches) return;

    const anyOn = emergencySwitches.some((sw) => sw.status === "ON");
    if (anyOn && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [emergencySwitches]);

  return (
    <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-l-4 mt-4 p-4 rounded-r-lg bg-gray-800/70 backdrop-blur-md border border-gray-700">
      {/* 🔔 Sound file (place alert.mp3 in /public folder) */}
      <audio ref={audioRef} src="/alert.mp3" preload="auto" />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-medium">Emergency Status Monitor</h3>
            <p className="text-gray-300 text-sm">
              {/* {emergencySwitches?.length} Emergency switches being monitored */}
            </p>
          </div>
        </div>
        {
          emergencySwitches[0].status == null ?  <div className="px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-400">
            Disconnected
          </div> : 
        <div className="flex space-x-2">
          {emergencySwitches?.map((emergencySwitch) => (
            <div key={emergencySwitch.id} className="flex flex-col items-center space-y-1">
              <div className={`w-12 h-12 ${getStatusColor(emergencySwitch.status)} rounded-full flex items-center justify-center text-md font-bold`}>
                {emergencySwitch.status}
              </div>
              <span className="text-xs text-gray-400">SW </span>
              {/* <span className="text-xs text-gray-400">SW{emergencySwitch.switchNumber}</span> */}
            </div>
          ))}
        </div>
        }
      </div>
    </div>
  );
}
