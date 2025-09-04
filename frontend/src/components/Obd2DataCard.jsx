"use client";
import { useEffect, useState } from "react";

function Obd2DataCard({ obd }) {
  const [sensorValues, setSensorValues] = useState({});

  // Mapping table from Excel
  const mapping = {
    EngineSpeed: { key: "manual.can.15", factor: 0.125, offset: 0, unit: "rpm" },
    VehicleSpeed: { key: "manual.can.16", factor: 1 / 256, offset: 0, unit: "km/h" },
    AcceleratorPedalPos1: { key: "manual.can.17", factor: 0.4, offset: 0, unit: "%" },
    EngineTorque: { key: "manual.can.18", factor: 1, offset: -125, unit: "%" },
    CoolantTemp: { key: "manual.can.19", factor: 1, offset: -40, unit: "°C" },
    OilPressure: { key: "manual.can.20", factor: 4, offset: 0, unit: "kPa" },
    FuelLevel: { key: "manual.can.21", factor: 0.4, offset: 0, unit: "%" },
    VehicleDistance: { key: "manual.can.22", factor: 0.125, offset: 0, unit: "m" },
    EngineHours: { key: "manual.can.23", factor: 0.05, offset: 0, unit: "h" },
  };

  useEffect(() => {
    if (!obd) {
      setSensorValues({});
      return;
    }

    try {
      const calculated = {};
      Object.entries(mapping).forEach(([name, cfg]) => {
        const raw = obd[cfg.key];
        if (raw !== undefined && cfg.factor !== null) {
          calculated[name] = (raw * cfg.factor + cfg.offset).toFixed(2);
        } else {
          calculated[name] = raw ?? "-";
        }
      });
      setSensorValues(calculated);
    } catch (err) {
      console.error("OBD2 calculation error:", err);
    }
  }, [obd]);

  return (
    <div
      className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6 
                 hover:scale-[1.01] transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 13l2-2m0 0l7-7 7 7M13 5v6h6"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">OBD2 Data</h3>
            <p className="text-gray-400 text-xs">Live vehicle diagnostics</p>
          </div>
        </div>
        {obd ? (
          <div className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 font-medium">
            CONNECTED
          </div>
        ) : (
          <div className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400 font-medium">
            DISCONNECTED
          </div>
        )}
      </div>

      {/* Body */}
      {obd ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(sensorValues).map(([name, value]) => (
            <div
              key={name}
              className="bg-gray-900/60 p-3 rounded-lg flex flex-col items-center text-center"
            >
              <span className="text-xs text-gray-400 mb-1">
                {name} ({mapping[name].unit})
              </span>
              <span className="text-base font-semibold text-blue-300">{value}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400 text-center">No data available</p>
      )}
    </div>
  );
}

export default Obd2DataCard;
