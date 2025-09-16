export default function EmergencySensorsCard({ sensorData }) {
  const emergency7 = Math.round(sensorData.emergencyMicrograms);
  const emergency8 = (sensorData.emergencyPpm / 100).toFixed(2);
  const emergency11 = sensorData.emergencyBinary;

  return (
    <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6  transition-all duration-300  group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Emergency Sensors</h3>
            <p className="text-gray-400 text-sm">Sensors 7, 8, 11</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-500">
            {emergency7}
          </div>
          <div className="text-xs text-gray-400">µg/m³</div>
          <div className="text-xs text-gray-500">Sensor 7</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {emergency8}
          </div>
          <div className="text-xs text-gray-400">ppm</div>
          <div className="text-xs text-gray-500">Sensor 8</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-500">
            {emergency11}
          </div>
          <div className="text-xs text-gray-400">Binary</div>
          <div className="text-xs text-gray-500">Sensor 11</div>
        </div>
      </div>
      
      <div className="h-32 bg-gray-900/50 rounded-lg flex items-center justify-center">
        4 cards since each card will 
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
        <span className="text-sm text-gray-400">Last updated: 3 seconds ago</span>
        <div className="flex items-center space-x-2 text-blue-400 text-sm font-medium group-hover:text-cyan-400 transition-colors">
          <span>View Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}