"use client";

export default function AirQualitySensorsCard({ sensorData, uplotRef }) {
  const voc = sensorData?.voc;
  const humidity = sensorData?.humidity;
  const pmTwoPointFive = sensorData?.pmTwoPointFive;
  const pm10 = sensorData?.pm10;

  const allNull =
    voc == null && humidity == null && pmTwoPointFive == null && pm10 == null;

  return (
    <div className="bg-gray-800/70 backdrop-blur-md border py-6 border-gray-700 rounded-2xl p-6 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
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
                d="M13 16h-1v-4h-1m1-4h.01M12 20.5a8.38 8.38 0 1 0 0-16.76 8.38 8.38 0 0 0 0 16.76z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Air Quality</h3>
            <p className="text-gray-400 text-sm">VOC, Humidity, PM₂.₅, PM₁₀</p>
          </div>
        </div>

        {/* Status */}
        {allNull && (
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-400">
            Disconnected
          </div>
        )}
      </div>

      {/* Sensor Values */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-300">
            {voc != null ? voc : "--"}
          </div>
          <div className="text-xs text-gray-400">ppm</div>
          <div className="text-xs text-gray-500">VOC</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-300">
            {humidity != null ? humidity.toFixed(2) : "--"}
          </div>
          <div className="text-xs text-gray-400">%RH</div>
          <div className="text-xs text-gray-500">Humidity</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-300">
            {pmTwoPointFive != null ? pmTwoPointFive : "--"}
          </div>
          <div className="text-xs text-gray-400">ppm</div>
          <div className="text-xs text-gray-500">PM 2.5</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-300">
            {pm10 != null ? pm10 : "--"}
          </div>
          <div className="text-xs text-gray-400">(µg/m³)</div>
          <div className="text-xs text-gray-500">PM 10</div>
        </div>
      </div>

      {/* Chart / No Data */}
      <div className="h-[500px] py-12 bg-gray-900/50 rounded-lg flex items-center justify-center">
        {allNull ? (
          <p className="text-gray-400 text-sm">No data available</p>
        ) : (
          <div ref={uplotRef} />
        )}
      </div>
    </div>
  );
}
