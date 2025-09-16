export default function ManualSwitchesCard({ manualSwitches }) {
  const onCount = manualSwitches.filter(s => s.isOn).length;
  const offCount = manualSwitches.length - onCount;

  return (
    <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6  transition-all duration-300  group">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Manual Switches</h3>
            <p className="text-gray-400 text-sm">{manualSwitches.length} Control switches</p>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          <span className="text-green-500">{onCount} ON</span> • <span className="text-red-500">{offCount} OFF</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        {manualSwitches.map((manualSwitch) => (
          <div 
            key={manualSwitch.id} 
            className="flex flex-col items-center p-3 bg-gray-700 rounded-lg border border-gray-600"
          >
            <div className={`w-10 h-10 ${manualSwitch.isOn ? 'bg-green-500' : 'bg-red-500'} rounded-full flex items-center justify-center mb-2`}>
              {manualSwitch.isOn ? (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <span className="text-xs text-gray-400 font-medium">
              Switch {manualSwitch.switchNumber}
            </span>
            <span className={`text-xs ${manualSwitch.isOn ? 'text-green-500' : 'text-red-500'}`}>
              {manualSwitch.isOn ? 'ON' : 'OFF'}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
        <span className="text-sm text-gray-400">Last updated: 5 seconds ago</span>
        <div className="flex items-center space-x-2 text-blue-400 text-sm font-medium group-hover:text-cyan-400 transition-colors">
          <span>Control Panel</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}