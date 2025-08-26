function SmokeDetector({isSmokeDetected}) {
  const isDetected = isSmokeDetected

  return (
    <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isDetected 
              ? "bg-gradient-to-br from-red-500 to-red-600" 
              : "bg-gradient-to-br from-green-500 to-emerald-600"
          }`}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Smoke Detector</h3>
            <p className="text-gray-400 text-sm">Fire safety monitoring</p>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${isDetected ? "animate-pulse bg-red-500" : "bg-green-500"}`}></div>
      </div>

      {/* Status */}
      <div className="text-center mb-6">
        <div className={`text-3xl font-bold mb-2 ${isDetected ? "text-red-500" : "text-green-500"}`}>
          {isDetected ? "SMOKE DETECTED" : "ALL CLEAR"}
        </div>
        <div className="text-sm text-gray-400">
          {isDetected ? "Emergency" : "Normal"}
        </div>
      </div>

      {/* Visual */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className={`w-24 h-24 rounded-full border-4 ${
            isDetected ? "border-red-500" : "border-green-500"
          } flex items-center justify-center bg-gray-900`}>
            <div className={`w-8 h-8 rounded-full ${
              isDetected ? "bg-red-500 animate-pulse" : "bg-green-500"
            }`}></div>
          </div>

          {isDetected && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <svg className="w-16 h-16 animate-bounce" viewBox="0 0 64 64">
                <path d="M32 48c-4 0-8-2-10-6-2-4-1-8 1-11 2-3 5-5 8-6 3-1 6 0 9 2 3 2 5 5 6 8 1 3 0 6-2 9-2 3-5 4-8 4z" fill="#6b7280" opacity="0.6" />
                <path d="M28 44c-3 0-6-1-8-4-2-3-2-6-1-9 1-3 3-5 6-6 3-1 5 0 7 1 2 1 4 3 5 6 1 2 0 5-1 7-1 2-3 4-6 5z" fill="#9ca3af" opacity="0.8" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* System Status */}
      <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-300">System Status:</span>
            <p className="text-xs text-gray-500 mt-1">Last check: 15 seconds ago</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isDetected ? "bg-red-500 animate-pulse" : "bg-green-500"}`}></div>
            <span className={`text-sm font-medium ${isDetected ? "text-red-500" : "text-green-500"}`}>
              {isDetected ? "ALERT" : "OPERATIONAL"}
            </span>
          </div>
        </div>
      </div>

      {/* Emergency Actions */}
      {isDetected && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-500 rounded-lg">
          <div className="flex items-center space-x-2 text-red-400 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="font-medium">Emergency protocols activated</span>
          </div>
        </div>
      )}

      {/* Footer */}
      {/* <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
        <span className="text-sm text-gray-400">Real-time monitoring</span>
        <div className="flex items-center space-x-2 text-blue-400 text-sm font-medium group-hover:text-cyan-400 transition-colors">
          <span>Test Alarm</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div> */}
    </div>
  );
}

export default SmokeDetector;
