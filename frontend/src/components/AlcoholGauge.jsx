export default function AlcoholGauge({ value, max = 1, label = "Alcohol", unit = "ppm" }) {
  // console.log(value);
  
  const percentage = value * 100
  const angle = (percentage / 100) * 90; // Half circle gauge
  const rotation = angle - 125; 

  const getColor = (percent) => {
    if (percent <= 30) return "text-green-500";
    if (percent <= 70) return "text-yellow-500";
    return "text-red-500";
  };

  const getStrokeColor = (percent) => {
    if (percent <= 30) return "#10b981";
    if (percent <= 70) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{label} Sensor</h3>
          <p className="text-gray-400 text-sm">Current reading</p>
        </div>
        <div className={`w-3 h-3 rounded-full animate-pulse ${percentage > 70 ? 'bg-red-500' : percentage > 30 ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
      </div>

      <div className="relative flex items-center justify-center">
        <svg className="w-48 h-24" viewBox="0 0 200 100">
          <path
            d="M 20 80 A 80 80 0 0 1 180 80"
            fill="none"
            stroke="#374151"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 20 80 A 80 80 0 0 1 180 80"
            fill="none"
            stroke={getStrokeColor(percentage)}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(percentage / 100) * 251.33} 251.33`}
            className="transition-all duration-500"
          />
          {/* <g transform={`translate(100, 80) rotate(${rotation})`}>
            <line
              x1="0"
              y1="0"
              x2="60"
              y2="0"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="0" cy="0" r="4" fill="#ffffff" />
          </g> */}
        </svg>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
          <div className={`text-3xl font-bold ${getColor(percentage)}`}>
            {value}
            {/* {typeof value === "number" && !isNaN(value) ? value.toFixed(2) : "--"} */}
          </div>
          <div className="text-xs text-gray-400">{unit}</div>
        </div>
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>0</span>
        <span>{(max * 0.25).toFixed(2)/10}</span>
        <span>{(max * 0.5).toFixed(2)/10}</span>
        <span>{(max * 0.75).toFixed(2)/10}</span>
        <span>{max.toFixed(2)/10}</span>
      </div>

      <div className="mt-4 p-3 bg-gray-900/50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Status:</span>
          <span className={`text-sm font-medium ${getColor(percentage)}`}>
            {percentage <= 30 ? "Safe" : percentage <= 70 ? "Caution" : "Warning"}
          </span>
        </div>
      </div>
    </div>
  );
}
