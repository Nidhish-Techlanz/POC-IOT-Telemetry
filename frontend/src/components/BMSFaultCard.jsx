"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default function BMSFaultCard({ fault }) {
  const [bmsFaults, setBmsFaults] = useState([]);
  const [connected, setConnected] = useState(false);

  function decodeBmsFaults(rawValue) {
    const rules = [
      { name: "Single Cell Overvoltage", mask: 3, divisor: 1 },
      { name: "Single Cell Undervoltage", mask: 12, divisor: 4 },
      { name: "High Cell Voltage Difference", mask: 768, divisor: 256 },
      { name: "Discharge Overcurrent", mask: 3072, divisor: 1024 },
      { name: "Charge Overcurrent", mask: 12288, divisor: 4096 },
      { name: "Over Temperature", mask: 49152, divisor: 16384 },
      { name: "Under Temperature", mask: 196608, divisor: 65536 },
      { name: "Low SOC", mask: 3145728, divisor: 1048576 },
      { name: "Internal Comm Fault", mask: 805306368, divisor: 268435456 },
    ];

    let active = [];
    rules.forEach((rule) => {
      const level = (rawValue & rule.mask) / rule.divisor;
      if (level > 0) {
        active.push({ name: rule.name, level });
      }
    });

    return active;
  }

  useEffect(() => {
    if (fault !== undefined && fault !== null && !isNaN(fault)) {
      setConnected(true);
      setBmsFaults(decodeBmsFaults(Number(fault)));
    } else {
      setConnected(false);
      setBmsFaults([]);
    }
  }, [fault]);

  return (
    <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
          <span>BMS Faults</span>
        </h3>

        <div
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            connected
              ? "bg-green-500/20 text-green-400"
              : "bg-gray-600/30 text-gray-400"
          }`}
        >
          {connected ? "CONNECTED" : "DISCONNECTED"}
        </div>
      </div>

      {/* Body */}
      {connected ? (
        bmsFaults.length > 0 ? (
          <div className="space-y-2">
            {bmsFaults.map((fault, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-red-500/10 border border-red-500/30 
                           text-red-400 px-3 py-2 rounded-lg text-sm"
              >
                <span>{fault.name}</span>
                <span className="text-xs font-semibold">Level {fault.level}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center text-green-400 text-sm bg-green-500/10 border border-green-500/30 rounded-lg py-3">
            <CheckCircle className="w-5 h-5 mr-2" />
            ✅ No Active Faults
          </div>
        )
      ) : (
        <p className="text-sm text-gray-400 text-center">No data available</p>
      )}
    </div>
  );
}
