"use client";

import { useEffect, useRef, useState } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";

export default function PMTen() {
  const plotRef = useRef(null);
  const plotInstance = useRef(null);
  const [data, setData] = useState([[], []]);

  useEffect(() => {
    if (!plotRef.current || plotInstance.current) return;

    const now = Math.floor(Date.now() / 1000);
    const initialData = [
      Array.from({ length: 10 }, (_, i) => now - 10 + i),
      Array.from({ length: 10 }, () => 15 + Math.random() * 20),
    ];
    setData(initialData);

    const opts = {
      width: plotRef.current.offsetWidth,
      height: 400,
      title: "PM 10 (µg/m³)",
      series: [
        {},
        { label: "PM 10", stroke: "#a78bfa", width: 2 }, // purple
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
        { stroke: "white", font: "12px sans-serif", label: "µg/m³" },
      ],
    };

    const uplot = new uPlot(opts, initialData, plotRef.current);
    plotInstance.current = uplot;

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

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const newValue = 15 + Math.random() * 20;
      setData((prev) => {
        const updated = [[...prev[0], now], [...prev[1], newValue]];
        plotInstance.current?.setData(updated);
        return updated;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-6 bg-black text-white">
      <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6">
      <div className="h-[500px] py-12 bg-gray-900/50 rounded-lg flex items-center justify-center">
      <div ref={plotRef} className="w-full h-full" />
    </div>
    </div>
    </div>
  );
}
