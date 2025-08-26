"use client";

import { useEffect, useRef, useState } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";

export default function Temperature() {
  const plotRef = useRef(null);
  const plotInstance = useRef(null);
  const [data, setData] = useState([[], []]); // [timestamps, temperatureValues]

  // Initialize temperature plot
  useEffect(() => {
    if (!plotRef.current || plotInstance.current) return;

    const now = Math.floor(Date.now() / 1000);
    const initialData = [
      Array.from({ length: 10 }, (_, i) => now - 10 + i), // timestamps
      Array.from({ length: 10 }, () => 20 + Math.random() * 5), // °C values
    ];
    setData(initialData);

    const opts = {
      width: plotRef.current.offsetWidth,
      height: 400,
      title: "Real-time Temperature (°C)",
      series: [
        {},
        {
          label: "Temperature",
          stroke: "#ff7f50", // Coral color for heat
          width: 2,
        },
      ],
      axes: [
        {
          stroke: "white",
          font: "12px sans-serif",
          values: (u, ticks) =>
            ticks.map((t) =>
              new Date(t * 1000)
                .toLocaleTimeString()
                .split(":")
                .slice(0, 2)
                .join(":")
            ),
        },
        {
          stroke: "white",
          font: "12px sans-serif",
          label: "°C",
        },
      ],
    };

    const uplot = new uPlot(opts, initialData, plotRef.current);
    plotInstance.current = uplot;

    // Handle resize
    const handleResize = () => {
      uplot.setSize({
        width: plotRef.current.offsetWidth,
        height: 400,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      uplot.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Simulate real-time temperature updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const newTemp = 20 + Math.random() * 5; // random variation

      setData((prev) => {
        const newTimestamps = [...prev[0], now];
        const newValues = [...prev[1], newTemp];

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
    <div className="h-[500px] py-12 bg-gray-900/50 rounded-lg flex items-center justify-center">
      <div ref={plotRef} className="w-full h-full" />
    </div>
  );
}
