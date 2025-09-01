"use client";

import { useEffect, useState } from "react";

function Misc() {
  const [sensorValues, setSensorValues] = useState({});
  const [loading,setLoading] = useState(false)
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
    setLoading(true)
    const ws = new WebSocket("ws://localhost:8000");

    ws.onmessage = function (event) {
      try {
        const data = JSON.parse(event.data);
        let payload = data.message;

        if (typeof payload === "string") {
          payload = JSON.parse(payload);
        }

        // console.log(payload);
        

        // Calculate values from mapping
        const calculated = {};
        Object.entries(mapping).forEach(([name, cfg]) => {
          const raw = payload[cfg.key];
          if (raw !== undefined) {
            calculated[name] = raw * cfg.factor + cfg.offset;
          }
        });

        setSensorValues(calculated);
        setLoading(false)
      } catch (error) {
        // console.error("WebSocket parse error:", error);
      }
    };

    ws.onerror = (err) => {
      // console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      // console.warn("WebSocket closed");
    };

    return () => {
      ws.close();
    };
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

export default Misc;
