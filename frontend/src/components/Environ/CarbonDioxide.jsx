"use client";

import { useEffect, useRef, useState } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";

export default function CarbonDioxide() {
  const co2PlotRef = useRef(null);
  const co2PlotInstance = useRef(null);
  const [co2Data, setCo2Data] = useState([[], []]); // [timestamps, co2Values]

  useEffect(() => {
    if (!co2PlotRef.current || co2PlotInstance.current) return;

    const now = Math.floor(Date.now() / 1000);
    const timestamps = Array.from({ length: 10 }, (_, i) => now - 10 + i);
    const values = Array.from({ length: 10 }, () => 400 + Math.random() * 100);

    const initialData = [timestamps, values];
    setCo2Data(initialData);

    const opts = {
      width: co2PlotRef.current.offsetWidth || 400,
      height: 400,
      title: "Real-time CO₂ (ppm)",
      series: [
        {},
        {
          label: "CO₂",
          stroke: "orange",
          width: 2,
        },
      ],
      axes: [
        {
          stroke: "white",
          font: "12px sans-serif",
          values: (u, ticks) =>
            ticks.map((t) =>
              new Date(t * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                // second: "2-digit", 
              })
            ),
        },
        {
          stroke: "white",
          font: "12px sans-serif",
          label: "ppm",
        },
      ],
      cursor: {
        drag: {
          x: true,
          y: false,
        },
      },
    };

    const plot = new uPlot(opts, initialData, co2PlotRef.current);
    co2PlotInstance.current = plot;

    const handleResize = () => {
      plot.setSize({
        width: co2PlotRef.current.offsetWidth || 400,
        height: 400,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      plot.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const newCo2 = 400 + Math.random() * 100;

      setCo2Data((prev) => {
        const newTimestamps = [...prev[0], now];
        const newValues = [...prev[1], newCo2];
        const updated = [newTimestamps, newValues];

        if (
          co2PlotInstance.current &&
          newTimestamps.length === newValues.length
        ) {
          co2PlotInstance.current.setData(updated);
        }

        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">CO₂ Sensor Live Data</h2>
      <div className="h-[500px] py-12 bg-gray-900/50 rounded-lg flex items-center justify-center">
        <div ref={co2PlotRef} className="w-full h-full" />
      </div>
    </>
  );
}
