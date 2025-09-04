export default function AlcoholGauge({
  value,
  max = 1,
  label = "Alcohol",
  unit = "ppm",
}) {
  const isConnected = value != null;

  const val = isConnected ? value / 100 : null;
  const percentage = isConnected ? val * 100 : 0;

  const getColor = (percent) => {
    if (percent == null) return "text-gray-500"; // match dot color
    if (percent <= 30) return "text-green-500";
    if (percent <= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getStrokeColor = (percent) => {
    if (percent == null) return "#374151"; // gray when disconnected
    if (percent <= 30) return "#10b981";
    if (percent <= 70) return "#f59e0b";
    return "#ef4444";
  };

  const getStatus = (percent) => {
    if (percent == null) return "Disconnected";
    if (percent <= 30) return "Safe";
    if (percent <= 70) return "Caution";
    return "Warning";
  };

  return (
    <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{label} Sensor</h3>
          <p className="text-gray-400 text-sm">Current reading</p>
        </div>
        <div
          className={`w-3 h-3 rounded-full ${
            isConnected
              ? percentage > 70
                ? "bg-red-500"
                : percentage > 30
                ? "bg-yellow-500"
                : "bg-green-500"
              : "bg-gray-500"
          } ${isConnected ? "animate-pulse" : ""}`}
        />
      </div>

      {/* Gauge */}
      <div className="relative flex items-center justify-center">
        <svg className="w-48 h-24" viewBox="0 0 200 100">
          {/* Background arc */}
          <path
            d="M 20 80 A 80 80 0 0 1 180 80"
            fill="none"
            stroke="#374151"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Active arc (only if connected) */}
          {isConnected && (
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke={getStrokeColor(percentage)}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 251.33} 251.33`}
              className="transition-all duration-500"
            />
          )}
        </svg>

        {/* Value */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
          <div className={`text-3xl font-bold ${getColor(isConnected ? percentage : null)}`}>
            {isConnected ? val.toFixed(2) : "--"}
          </div>
          <div className="text-xs text-gray-400">{unit}</div>
        </div>
      </div>

      {/* Scale */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>0</span>
        <span>{(max * 0.25).toFixed(2)}</span>
        <span>{(max * 0.5).toFixed(2)}</span>
        <span>{(max * 0.75).toFixed(2)}</span>
        <span>{max.toFixed(2)}</span>
      </div>

      {/* Status */}
      <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Status:</span>
          <span className={`text-sm font-medium ${getColor(isConnected ? percentage : null)}`}>
            {getStatus(isConnected ? percentage : null)}
          </span>
        </div>
      </div>
    </div>
  );
}
