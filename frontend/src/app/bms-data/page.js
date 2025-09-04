"use client";

import { useEffect, useState } from "react";

function BmsData() {
  const [sensorValues, setSensorValues] = useState({});
  const [loading, setLoading] = useState(false);

  // Mapping table from your Excel
  const mapping = {
    BattVolt: { key: "manual.can.15", factor: 0.1, offset: 0, unit: "V" },
    BattCurr: { key: "manual.can.16", factor: 0.1, offset: -400, unit: "A" },
    SOC: { key: "manual.can.17", factor: 1, offset: 0, unit: "%" },
    MaxCellVolt: { key: "manual.can.18", factor: 1, offset: 0, unit: "mV" },
    MaxCvNO: { key: "manual.can.19", factor: 1, offset: 1, unit: "#" },
    MinCellVolt: { key: "manual.can.20", factor: 1, offset: 0, unit: "mV" },
    MinCvNO: { key: "manual.can.21", factor: 1, offset: 1, unit: "#" },
    MaxCellTemp: { key: "manual.can.22", factor: 1, offset: -50, unit: "°C" },
    MaxCtNO: { key: "manual.can.23", factor: 1, offset: 1, unit: "#" },
    MinCellTemp: { key: "manual.can.24", factor: 1, offset: -50, unit: "°C" },
    MinCtNO: { key: "manual.can.25", factor: 1, offset: 1, unit: "#" },
    AvrgCellTemp: { key: "manual.can.26", factor: 1, offset: -50, unit: "°C" },
    CapRemain: { key: "manual.can.27", factor: 0.1, offset: 0, unit: "Ah" },
    FulChargeCap: { key: "manual.can.28", factor: 0.1, offset: 0, unit: "Ah" },
    CycleCap: { key: "manual.can.29", factor: 0.1, offset: 0, unit: "Ah" },
    CycleCount: { key: "manual.can.30", factor: 1, offset: 0, unit: "#" },
    CellTemp1: { key: "manual.can.32", factor: 1, offset: -50, unit: "°C" },
    CellTemp2: { key: "manual.can.33", factor: 1, offset: -50, unit: "°C" },
    CellTemp3: { key: "manual.can.34", factor: 1, offset: -50, unit: "°C" },
    CellTemp4: { key: "manual.can.35", factor: 1, offset: -50, unit: "°C" },
    CellTemp5: { key: "manual.can.36", factor: 1, offset: -50, unit: "°C" },
    BMSRunTime: { key: "manual.can.37", factor: 1, offset: 0, unit: "s" },
    HeatCur: { key: "manual.can.38", factor: 1, offset: 0, unit: "A" },
    SOH: { key: "manual.can.39", factor: 1, offset: 0, unit: "%" },
    CellVoltage1: { key: "manual.can.46", factor: 1, offset: 0, unit: "mV" },
    CellVoltage2: { key: "manual.can.47", factor: 1, offset: 0, unit: "mV" },
    CellVoltage3: { key: "manual.can.48", factor: 1, offset: 0, unit: "mV" },
    CellVoltage4: { key: "manual.can.49", factor: 1, offset: 0, unit: "mV" },
    ChgVol: { key: "manual.can.54", factor: 0.1, offset: 0, unit: "V" },
    ChgCur: { key: "manual.can.55", factor: 0.1, offset: 0, unit: "A" },
  };

  useEffect(() => {
    setLoading(true);

    // Fallback dummy payload
    const dummyPayload = {
      "manual.can.15": 480,   // BattVolt raw -> 48.0 V
      "manual.can.16": 4050,  // BattCurr raw -> 5.0 A (4050*0.1-400)
      "manual.can.17": 72,    // SOC -> 72 %
      "manual.can.18": 4200,  // MaxCellVolt -> 4200 mV
      "manual.can.19": 6,     // MaxCvNO -> 7
      "manual.can.20": 3600,  // MinCellVolt -> 3600 mV
      "manual.can.21": 2,     // MinCvNO -> 3
      "manual.can.22": 85,    // MaxCellTemp -> 35 °C (85-50)
      "manual.can.23": 5,     // MaxCtNO -> 6
      "manual.can.24": 70,    // MinCellTemp -> 20 °C (70-50)
      "manual.can.25": 1,     // MinCtNO -> 2
      "manual.can.26": 75,    // AvrgCellTemp -> 25 °C
      "manual.can.27": 320,   // CapRemain -> 32 Ah
      "manual.can.28": 500,   // FulChargeCap -> 50 Ah
      "manual.can.29": 450,   // CycleCap -> 45 Ah
      "manual.can.30": 120,   // CycleCount
      "manual.can.32": 72,    // CellTemp1 -> 22 °C
      "manual.can.33": 74,    // CellTemp2 -> 24 °C
      "manual.can.34": 76,    // CellTemp3 -> 26 °C
      "manual.can.35": 78,    // CellTemp4 -> 28 °C
      "manual.can.36": 80,    // CellTemp5 -> 30 °C
      "manual.can.37": 3600,  // BMSRunTime -> 3600 s
      "manual.can.38": 2,     // HeatCur -> 2 A
      "manual.can.39": 95,    // SOH -> 95 %
      "manual.can.46": 4100,  // CellVoltage1
      "manual.can.47": 4150,  // CellVoltage2
      "manual.can.48": 4180,  // CellVoltage3
      "manual.can.49": 4190,  // CellVoltage4
      "manual.can.54": 520,   // ChgVol -> 52.0 V
      "manual.can.55": 150,   // ChgCur -> 15.0 A
    };

    try {
      const calculated = {};
      Object.entries(mapping).forEach(([name, cfg]) => {
        const raw = dummyPayload[cfg.key];
        if (raw !== undefined) {
          calculated[name] = (raw * cfg.factor + cfg.offset).toFixed(2);
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
      <h1 className="text-2xl font-bold mb-4">BMS Data</h1>
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

export default BmsData;
