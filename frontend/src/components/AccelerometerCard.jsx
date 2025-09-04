"use client";

import { useEffect, useState } from "react";

export default function AccelerometerCard({ accel }) {
  const [x, setX] = useState("--");
  const [y, setY] = useState("--");
  const [z, setZ] = useState("--");

  const isConnected = accel !== null;

  useEffect(() => {
    if (accel && typeof accel === "object") {
      setX(accel.x !== undefined ? accel.x + "g" : "--");
      setY(accel.y !== undefined ? accel.y + "g" : "--");
      setZ(accel.z !== undefined ? accel.z + "g" : "--");
    }
  }, [accel]);

  return (
    <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">📡 Accelerometer</h3>
        {isConnected ? (
          <div className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 font-medium">
            CONNECTED
          </div>
        ) : (
          <div className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400 font-medium">
            DISCONNECTED
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700">
          <p className="text-sm text-gray-400">X-Axis</p>
          <p className="text-2xl font-bold text-[#ff6b6b]">{x}</p>
        </div>
        <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700">
          <p className="text-sm text-gray-400">Y-Axis</p>
          <p className="text-2xl font-bold text-[#51cf66]">{y}</p>
        </div>
        <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700">
          <p className="text-sm text-gray-400">Z-Axis</p>
          <p className="text-2xl font-bold text-[#339af0]">{z}</p>
        </div>
      </div>
    </div>
  );
}
