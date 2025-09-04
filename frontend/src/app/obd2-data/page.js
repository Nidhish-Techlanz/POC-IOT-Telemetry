"use client";

import { useEffect, useState } from "react";

function Obd2() {
  const [sensorValues, setSensorValues] = useState({});
  const [loading, setLoading] = useState(false);

  // Mapping table from your Excel
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
    ActiveDTCs: { key: "manual.can.24", factor: null, offset: null, unit: "message" },
  };

  useEffect(() => {
    setLoading(true);

    // Fallback dummy payload
    const dummyPayload = {
      "manual.can.15": 6400,   // EngineSpeed raw
      "manual.can.16": 512,    // VehicleSpeed raw
      "manual.can.17": 120,    // AcceleratorPedalPos1 raw
      "manual.can.18": 150,    // EngineTorque raw
      "manual.can.19": 90,     // CoolantTemp raw
      "manual.can.20": 25,     // OilPressure raw
      "manual.can.21": 100,    // FuelLevel raw
      "manual.can.22": 2000,   // VehicleDistance raw
      "manual.can.23": 400,    // EngineHours raw
      "manual.can.24": "No DTCs", // ActiveDTCs raw
    };

    try {
      // Calculate dummy values from mapping
      const calculated = {};
      Object.entries(mapping).forEach(([name, cfg]) => {
        const raw = dummyPayload[cfg.key];
        if (raw !== undefined && cfg.factor !== null) {
          calculated[name] = (raw * cfg.factor + cfg.offset).toFixed(2);
        } else {
          calculated[name] = raw; // for message values
        }
      });

      setSensorValues(calculated);
      setLoading(false);
    } catch (err) {
      console.error("Dummy data generation error:", err);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-white"></div>
        <span className="ml-4">Loading ...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">OBD2 Data</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(sensorValues).map(([name, value]) => (
          <div
            key={name}
            className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col items-center"
          >
            <span className="text-sm text-gray-400">
              {name} ({mapping[name].unit})
            </span>
            <span className="text-lg font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Obd2;
