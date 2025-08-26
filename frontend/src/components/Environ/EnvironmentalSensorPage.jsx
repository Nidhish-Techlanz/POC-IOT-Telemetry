"use client";

import { useEffect, useRef, useState } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import CarbonDioxide from "./CarbonDioxide";
import Temperature from "./Temperature"

export default function EnvironmentalSensorPage() {
  const uplotRef = useRef(null);
  const plotInstance = useRef(null);
  const [data, setData] = useState([[], []]); // [timestamps, noiseValues]

  // Simulated sensor stats
  const sensorData = {
    noise: 620,
    co2: 450,
    temperature: 235,
  };

  const noise = (sensorData.noise / 10).toFixed(1);
  const co2 = Math.round(sensorData.co2);
  const temperature = (sensorData.temperature / 10).toFixed(1);

  // Initialize uPlot once
  useEffect(() => { 
    if (!uplotRef.current || plotInstance.current) return;

    const now = Math.floor(Date.now() / 1000);
    const initialData = [
      Array.from({ length: 10 }, (_, i) => now - 10 + i), // 10s ago to now
      Array.from({ length: 10 }, () => 50 + Math.random() * 20),
    ];
    setData(initialData);

   const opts = {
  width: uplotRef.current.offsetWidth,
  height: 400,
  title: "Real-time Noise (dB)",
  series: [
    {},
    {
      label: "Noise",
      stroke: "cyan",
      width: 2,
    },
  ],
  axes: [
    {
      stroke: "white",
      font: "12px sans-serif",
      values: (u, ticks) =>
        ticks.map((t) =>
          new Date(t * 1000).toLocaleTimeString().split(":").slice(0, 2).join(":")
        ),
    },
    {
      stroke: "white",
      font: "12px sans-serif",
      label: "dB",
    },
  ],
};


    const uplot = new uPlot(opts, initialData, uplotRef.current);
    plotInstance.current = uplot;

    // Resize handler
    const handleResize = () => {
      uplot.setSize({
        width: uplotRef.current.offsetWidth,
        height: 400,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      uplot.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Append new data every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const newNoise = 50 + Math.random() * 20;

      setData((prev) => {
  const now = Math.floor(Date.now() / 1000);
  const newNoise = 50 + Math.random() * 20;

  const newTimestamps = [...prev[0], now];
  const newValues = [...prev[1], newNoise];

  const updated = [newTimestamps, newValues];

  if (plotInstance.current) {
    plotInstance.current.setData(updated);
  }

  return updated;
});

    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Environmental Sensor Overview</h1>

      <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
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
            <div className="text-xs text-gray-500">Temperature</div>
          </div>
        </div>

        <div className="h-[500px] mb-10 py-12 bg-gray-900/50 rounded-lg flex items-center justify-center">
          <div ref={uplotRef} className="w-full h-full" />
        </div>

        <CarbonDioxide/>
        <Temperature/>
        {/* <div className="h-[500px] py-12 bg-gray-900/50 rounded-lg flex items-center justify-center">
          <div ref={uplotRef} className="w-full h-full" />
        </div>
        <div className="h-[500px] py-12 bg-gray-900/50 rounded-lg flex items-center justify-center">
          <div ref={uplotRef} className="w-full h-full" />
        </div> */}
      </div>
    </div>
  );
}
