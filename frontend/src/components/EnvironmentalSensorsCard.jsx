"use client"

export default function EnvironmentalSensorsCard({ sensorData,uplotRef }) {
  // console.log(sensorData);
  
  const noise = (sensorData.noise.toFixed(2))
  const co2 = Math.round(sensorData.co2);
  const temperature = (sensorData.temperature.toFixed(2));


  return (
    <div className="bg-gray-800/70 backdrop-blur-md border py-6 border-gray-700 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Environmental</h3>
            <p className="text-gray-400 text-sm">Noise, CO₂, Temperature</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
      
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
      
      {/* <div className="h-32 bg-gray-900/50 rounded-lg flex items-center justify-center"> */}
      <div className="h-[500px] py-12  bg-gray-900/50 rounded-lg flex items-center justify-center">
        {/* Graph will be here  */}
          <div ref={uplotRef} />
      </div>
      
      {/* <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
        <span className="text-sm text-gray-400">Last updated: 2 seconds ago</span>
        <div className="flex items-center space-x-2 text-blue-400 text-sm font-medium group-hover:text-cyan-400 transition-colors">
          <span>View Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div> */}
    </div>
  );
}