"use client";

import { useRouter } from "next/navigation";

function BmsDataCardRoute() {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/bms-data")}
      className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6 
                 hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-yellow-500 to-yellow-600">
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
                d="M11 3H7a2 2 0 00-2 2v14a2 2 0 002 2h4m10-10h-6m0 0l3-3m-3 3l3 3"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">BMS Data</h3>
            <p className="text-gray-400 text-sm">Click to view BMS sensor data</p>
          </div>
        </div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
      </div>

      {/* Status */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold mb-2 text-yellow-400">ACTIVE</div>
        <div className="text-sm text-gray-400">Monitoring BMS status</div>
      </div>

      {/* Visual */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-yellow-500 flex items-center justify-center bg-gray-900">
            <div className="w-8 h-14 bg-yellow-500 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 p-3 bg-gray-900/50 rounded-lg text-center text-sm text-gray-400">
        Tap to explore BMS data →
      </div>
    </div>
  );
}

export default BmsDataCardRoute;
