export default function NoiseGauge({ value, min = 20, max = 120, label = "Noise Level", unit = "dB" }) {
  const clampedValue = Math.max(min, Math.min(value, max));
  const percentage = ((clampedValue - min) / (max - min)) * 100;
  
  const angle = (percentage / 100) * 180;
  const rotation = angle - 90;

  const getColor = (val) => {
    if (val <= 50) return "text-green-500";
    if (val <= 85) return "text-yellow-500";
    return "text-red-500";
  };

  const getStrokeColor = (val) => {
    if (val <= 50) return "#10b981";
    if (val <= 85) return "#f59e0b";
    return "#ef4444";
  };

  const getStatus = (val) => {
    if (val <= 50) return "Quiet";
    if (val <= 70) return "Moderate";
    if (val <= 85) return "Loud";
    return "Harmful";
  };

  return (
    <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{label}</h3>
          <p className="text-gray-400 text-sm">Sound intensity</p>
        </div>
        <div
          className={`w-3 h-3 rounded-full animate-pulse ${
            clampedValue > 85 ? "bg-red-500" :
            clampedValue > 50 ? "bg-yellow-500" :
            "bg-green-500"
          }`}
        />
      </div>

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

          {/* Color Zones */}
          {/* <path d="M 20 80 A 80 80 0 0 1 95 25" fill="none" stroke="#10b981" strokeWidth="6" opacity="0.3" />
          <path d="M 95 25 A 80 80 0 0 1 140 15" fill="none" stroke="#f59e0b" strokeWidth="6" opacity="0.3" />
          <path d="M 140 15 A 80 80 0 0 1 180 80" fill="none" stroke="#ef4444" strokeWidth="6" opacity="0.3" /> */}

          {/* Active Arc */}
          <path
            d="M 20 80 A 80 80 0 0 1 180 80"
            fill="none"
            stroke={getStrokeColor(clampedValue)}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(percentage / 100) * 251.33} 251.33`}
            className="transition-all duration-500"
          />

          {/* Needle */}
          {/* <g transform={`translate(100, 80) rotate(${rotation})`}>
            <line x1="0" y1="0" x2="60" y2="0" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <circle cx="0" cy="0" r="5" fill="#ffffff" />
          </g> */}
        </svg>

        {/* Center Value Display */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
          <div className={`text-3xl font-bold ${getColor(clampedValue)}`}>
            {clampedValue.toFixed(1)}
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

      {/* Noise Level Zones */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-gray-400">Quiet (0–50)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
          <span className="text-gray-400">Loud (50–85)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full" />
          <span className="text-gray-400">Harmful (85+)</span>
        </div>
      </div>

      {/* Status Indicator */}
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
