export default function NoiseGauge({
  value,
  label = "Noise Level",
  unit = "dB",
}) {
  const min = 20
  const max = 120
  const isConnected = value != null;

  const clampedValue = isConnected
    ? Math.max(min, Math.min(value, max))
    : null;

  const percentage = isConnected
    ? ((clampedValue - min) / (max - min)) * 100
    : 0;

  const getColor = (val) => {
    if (val == null) return "text-gray-400";
    if (val <= 50) return "text-green-500";
    if (val <= 85) return "text-yellow-500";
    return "text-red-500";
  };

  const getStrokeColor = (val) => {
    if (val == null) return "#374151"; // gray
    if (val <= 50) return "#10b981";
    if (val <= 85) return "#f59e0b";
    return "#ef4444";
  };

  const getStatus = (val) => {
    if (val == null) return "Disconnected";
    if (val <= 50) return "Quiet";
    if (val <= 70) return "Moderate";
    if (val <= 85) return "Loud";
    return "Harmful";
  };

  return (
    <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{label}</h3>
          <p className="text-gray-400 text-sm">Sound intensity</p>
        </div>
        <div
          className={`w-3 h-3 rounded-full ${
            isConnected
              ? clampedValue > 85
                ? "bg-red-500"
                : clampedValue > 50
                ? "bg-yellow-500"
                : "bg-green-500"
              : "bg-gray-500"
          } ${isConnected ? "animate-pulse" : ""}`}
        />
      </div>

      {/* Gauge */}
      <div className="relative flex items-center justify-center">
        <svg className="w-48 h-24" viewBox="0 0 200 100">
          {/* Background Arc */}
          <path
            d="M 20 80 A 80 80 0 0 1 180 80"
            fill="none"
            stroke="#374151"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Active Arc (only if connected) */}
          {isConnected && (
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke={getStrokeColor(clampedValue)}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(percentage / 100) * 251.33} 251.33`}
              className="transition-all duration-500"
            />
          )}
        </svg>

        {/* Center Value */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
          <div className={`text-3xl font-bold ${getColor(clampedValue)}`}>
            {isConnected ? clampedValue.toFixed(1) : "--"}
          </div>
          <div className="text-xs text-gray-400">{unit}</div>
        </div>
      </div>

      {/* Scale Labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{min}</span>
        <span>{Math.round((min + max) / 4)}</span>
        <span>{Math.round((min + max) / 2)}</span>
        <span>{Math.round(((min + max) * 3) / 4)}</span>
        <span>{max}</span>
      </div>

      {/* Status */}
      <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Status:</span>
          <span className={`text-sm font-medium ${getColor(clampedValue)}`}>
            {getStatus(clampedValue)}
          </span>
        </div>
      </div>
    </div>
  );
}
