function TyreStatus({ frontTyreStatus, rearTyreStatus }) {
  // console.log(frontTyreStatus,rearTyreStatus);
  
  const TyreCard = ({ title, data, icon }) => (
    
    <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-600">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">{title}</h4>
            <p className="text-gray-400 text-sm">Tyre monitoring</p>
          </div>
        </div>
      </div>

      {/* Tyre Visual */}
      <div className="flex justify-center mb-4">
        <svg className="w-24 h-24" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#374151" strokeWidth="8" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#6b7280" strokeWidth="4" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="10 5" className="animate-spin" style={{ animationDuration: "8s" }} />
          <circle cx="50" cy="50" r="3" fill="#ffffff" />
        </svg>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {data?.psi}
          </div>
          <div className="text-xs text-gray-400">PSI</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {data?.temperature/100}°C
          </div>
          <div className="text-xs text-gray-400">Temperature</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Tyre Monitoring</h3>
            <p className="text-gray-400 text-sm">Pressure & temperature sensors</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TyreCard
          title="Front Tyre"
          data={frontTyreStatus}
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          }
        />
        <TyreCard
          title="Rear Tyre"
          data={rearTyreStatus}
          icon={
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Footer (optional) */}
      {/* <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
        <span className="text-sm text-gray-400">Real-time monitoring</span>
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

export default TyreStatus;
