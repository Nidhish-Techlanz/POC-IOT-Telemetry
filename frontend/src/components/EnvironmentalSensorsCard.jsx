"use client";

export default function EnvironmentalSensorsCard({ sensorData, uplotRef }) {
  const isConnected =
    sensorData &&
    sensorData.noise != null &&
    sensorData.co2 != null &&
    sensorData.temperature != null;

  const noise = isConnected ? sensorData.noise.toFixed(2) : "--";
  const co2 = isConnected ? Math.round(sensorData.co2) : "--";
  const temperature = isConnected ? sensorData.temperature.toFixed(2) : "--";

  return (
    <div className="bg-gray-800/70 backdrop-blur-md border py-6 border-gray-700 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
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
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Environmental</h3>
            <p className="text-gray-400 text-sm">Noise, CO₂, Temperature</p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </>
          ) : (
              <div className="px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-400">
            Disconnected
          </div>
          )}
        </div>
      </div>

      {/* Sensor values */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {noise}
          </div>
          <div className="text-xs text-gray-400">dB</div>
          <div className="text-xs text-gray-500">Noise</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {co2}
          </div>
          <div className="text-xs text-gray-400">ppm</div>
          <div className="text-xs text-gray-500">CO₂</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {temperature}
          </div>
          <div className="text-xs text-gray-400">°C</div>
          <div className="text-xs text-gray-500">Temp</div>
        </div>
      </div>

      {/* Graph */}
      <div className="h-[500px] py-12 bg-gray-900/50 rounded-lg flex items-center justify-center">
          {!isConnected ? (
            <span className="text-gray-400 text-sm">No data available</span>
          ) : 
          <div ref={uplotRef}/>
          }
      </div>
    </div>
  );
}
