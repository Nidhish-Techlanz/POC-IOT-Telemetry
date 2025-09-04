"use client";

import { useRouter } from "next/navigation";

function Obd2DataCardRoute() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/obd2-data")}
      className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6 
                 hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 13l2-2m0 0l7-7 7 7M13 5v6h6"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">OBD2 Data</h3>
            <p className="text-gray-400 text-sm">Click to view OBD2 sensor data</p>
          </div>
        </div>
        <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
      </div>

      {/* Status */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold mb-2 text-blue-400">CONNECTED</div>
        <div className="text-sm text-gray-400">Monitoring vehicle diagnostics</div>
      </div>

      {/* Visual */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-blue-500 flex items-center justify-center bg-gray-900">
            <svg
              className="w-12 h-12 text-blue-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M9 17v-2h6v2H9zM5 10h14v4H5v-4z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 p-3 bg-gray-900/50 rounded-lg text-center text-sm text-gray-400">
        Tap to explore OBD2 data →
      </div>
    </div>
  );
}

export default Obd2DataCardRoute;
