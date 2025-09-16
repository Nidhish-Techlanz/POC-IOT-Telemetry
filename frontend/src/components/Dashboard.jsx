"use client"
import AirQualitySensorsCard from "./AirQualityCard";
import AlcoholGauge from "./AlcoholGauge";
import DashboardHeader from "./DashboardHeader";
import EmergencyAlert from "./EmergencyAlert";
// import EmergencySensorsCard from "./EmergencySensorsCard";
import EnvironmentalSensorsCard from "./EnvironmentalSensorsCard";
import BMSFaultCard from "./BMSFaultCard"
import CarCrashDetector from "./CarCrashDetector"
import BmsDataCardRoute from "./BmsDataCardRoute"
// import ManualSwitchesCard from "./ManualSwitchesCard";
import Obd2DataCard from "../components/Obd2DataCard"
import { useEffect, useRef, useState } from "react";
import uPlot from "uplot";
import "uplot/dist/uPlot.min.css";
import NoiseGauge from "./NoiseGauge";
import TyreStatus from "./TyreStatus";
import SmokeDetector from "./SmokeDetector";
import Map from "./Map";
import AccelerometerCard from "./AccelerometerCard"
import Sidebar from "./Sidebar"

export default function Dashboard() {


//   const manualSwitches = [
//     { id: 1, switchNumber: 1, isOn: true },
//     { id: 2, switchNumber: 2, isOn: false },
//     { id: 3, switchNumber: 3, isOn: true },
//     { id: 4, switchNumber: 4, isOn: false },
//     { id: 5, switchNumber: 5, isOn: true },
//     { id: 6, switchNumber: 6, isOn: false },
//     { id: 7, switchNumber: 7, isOn: true },
//     { id: 8, switchNumber: 8, isOn: false },
//     { id: 9, switchNumber: 9, isOn: true }
//   ];
const [emergencySwitches,setEmergencySwitches] = useState([
    // { id: 1, switchNumber: 1, status: "" },
    // { id: 2, switchNumber: 2, status: "" },
    // { id: 3, switchNumber: 3, status: "" },
    { id: 4, switchNumber: 4, status: "" }
  ])

  const SENSOR_INFO = [
    { label: "Noise", unit: "dB",scale: (v) => v/10 },  
    { label: "CO₂", unit: "ppm", scale: (v) => v },
    { label: "Temperature", unit: "°C", scale: (v) => v / 10 },
    { label: "VOC", unit: "ppm", scale: (v) => v },
    { label: "Humidity", unit: "%RH", scale: (v) => v / 10 },
    { label: "PM 2.5(ppm)", unit: "ppm", scale: (v) => v },
    { label: "PM 10(µg/m³)", unit: "µg/m³", scale: (v) => v },
  ];
  const SENSOR_COUNT = SENSOR_INFO.length;


    // Graph 1
//   const plotRef = useRef(null);
  const plotRef1 = useRef(null); // for Graph 1 (Noise, CO2, Temp)
const plotRef2 = useRef(null); // for Graph 2 (VOC, Humidity, Emergency)
const [alcohol, setAlcohol] = useState(null); // ppm
// const [loading,setLoading] = useState(false)
  const uplotInstance = useRef(null);
  const [frontTyreStatus,setFrontTyreStatus] = useState(null)
  const [rearTyreStatus,setRearTyreStatus] = useState(null)
  const [isSmokeDetected,setIsSmokeDetected] = useState(null)
  const [isCrash,setIsCrash] = useState(null)
 const [latitude,setLatitude] = useState(13.069361)
  const [longitude,setLongitude] = useState(77.617028)
  const [accel,setAccel] = useState(null)
   const [isClient, setIsClient] = useState(false);
  const [currentData, setCurrentData] = useState(() => {
    const time = [];
    const series = Array.from({ length: SENSOR_COUNT }, () => []);
    return [time, ...series];
  });
  const [latestValues, setLatestValues] = useState(Array(SENSOR_COUNT).fill(0));
    const sensorData = {
 noise: latestValues[0],
  co2: latestValues[1],
  temperature: latestValues[2],
  voc: latestValues[3],
  humidity: latestValues[4],
   pmTwoPointFive : latestValues[5],
   pm10 : latestValues[6]
  };
  const [fault,setFault] = useState(null)
  const [noise,setNoise] = useState(null)
const [obd,setObd] = useState(null)
 // Init uPlot for Graph 1
useEffect(() => {
  if (!plotRef1.current) return;

  const container = plotRef1.current.parentElement;
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  const u = new uPlot(
    {
      width,
      height,
     stroke: "#ffffff", 
      ticks: { stroke: "#ffffff" },
      cursor: { drag: { x: true, y: true }, focus: { prox: 30 } },
      scales: { x: { time: true }, y: { auto: true } },
     axes: [
  {
    stroke: "#ffffff", // X-axis tick label color
    values: (u, ticks) =>
      ticks.map((val) => {
        const d = new Date(val * 1000);
        // return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
         return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`;
      }),
  },
  {
    stroke: "#ffffff", // Y-axis tick label color
  },
],

      series: [
        {},
        ...SENSOR_INFO.slice(0, 3).map((sensor, idx) => ({
          label: `${sensor.label} (${sensor.unit})`,
          stroke: ["#007bff", "#28a745", "#dc3545"][idx],
          width: 1.5,
          fill: "transparent",
        })),
      ],
    },
    [[], [], [], []],
    plotRef1.current
  );

  uplotInstance.current = { ...uplotInstance.current, graph1: u };

  window.addEventListener("resize", () => u.setSize({ width: container.offsetWidth, height: container.offsetHeight }));

  return () => u.destroy();
}, []);


useEffect(() => {
  if (!plotRef2.current) return;

  const container = plotRef2.current.parentElement;
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  const u = new uPlot(
    {
      width,
      height,
     stroke: "#ffffff", 
      ticks: { stroke: "#ffffff" },
      cursor: { drag: { x: true, y: true }, focus: { prox: 30 } },
      scales: { x: { time: true }, y: { auto: true } },
      axes: [
        {
    stroke: "#ffffff", // X-axis tick label color
          values: (u, ticks) =>
            ticks.map((val) => {
              const d = new Date(val * 1000);
              // return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
              return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}`;
            }),
        },
   {
    stroke: "#ffffff", // Y-axis tick label color
  },
      ],
      series: [
        {},
        ...SENSOR_INFO.slice(3).map((sensor, idx) => ({
          label: `${sensor.label} (${sensor.unit})`,
          stroke: ["#ffc107", "#17a2b8", "#6f42c1","#00bcd4"][idx],
          width: 1.5,
          fill: "transparent",
        })),
      ],
    },
    [[], [], [], [],[]],
    plotRef2.current
  );

  uplotInstance.current = { ...uplotInstance.current, graph2: u };

  window.addEventListener("resize", () => u.setSize({ width: container.offsetWidth, height: container.offsetHeight }));

  return () => u.destroy();
}, []);

  


useEffect(() => {
  const ws = new WebSocket("ws://localhost:8000");
  // setLoading(true)
  ws.onmessage = function (event) {
    try {
      const data = JSON.parse(event.data);
      let payload = data.message;
      
      if (typeof payload === "string") {
        payload = JSON.parse(payload);
      }

      // console.log(payload);
      setObd(payload);
      const ts = payload["server.timestamp"] || payload["timestamp"] || Date.now() / 1000;
      const newT = ts;
     setEmergencySwitches([
  // { id: 1, switchNumber: 1, status: payload["din"] ? "ON" : "OFF" },
  // { id: 2, switchNumber: 2, status: payload["din.1"] ? "ON" : "OFF" },
  // { id: 3, switchNumber: 3, status: payload["din.2"] ? "ON" : "OFF" },
  { id: 4, switchNumber: 4, status: payload["din.4"] ? "ON" : "OFF" },
]);


      // Extract values using correct key names from your payload
      const rawVals = [
        payload["manual.can.0"],          // Sensor 1
        payload["manual.can.6"],            // Sensor 2
        payload["manual.can.4"],    // Sensor 4
        payload["manual.can.3"],       // Sensor 3
        payload["manual.can.5"],            // Sensor 5
        payload["manual.can.1"],         // Sensor 6 (note key with underscore)
        payload["manual.can.2"] //  sensor 7
      ];
      
      // console.log(payload["manual.can.10"]);
      setIsSmokeDetected(payload["din.1"])
      setIsCrash(payload["manual.can.14"] == 0 ? false : true)
      setFrontTyreStatus((prev)=>({...prev,psi : payload["manual.can.8"],temperature : payload["manual.can.9"]}))
      setRearTyreStatus((prev)=>({...prev,psi : payload["manual.can.10"],temperature : payload["manual.can.11"]}))

      const newVals = rawVals.map((val, i) =>
        SENSOR_INFO[i]?.scale ? SENSOR_INFO[i].scale(val) : val
      );

      setAlcohol(payload["manual.can.7"]);
      // console.log(payload);
      
      setFault(payload["manual.can.63"])
        
      setLatitude(payload["position.latitude"])
      setLongitude(payload["position.longitude"])
      setAccel((prev) => ({
  ...prev,
  x: payload["x.acceleration"],
  y: payload["y.acceleration"],
  z: payload["z.acceleration"],
}));
      setCurrentData((prevData) => {
        const prevTimes = prevData[0];
        const prevSeries = prevData.slice(1);

        const updatedTimes = [...prevTimes, newT].slice(-300);
        const updatedSeries = prevSeries.map((seriesArr, i) =>
          [...seriesArr, newVals[i]].slice(-300)
        );

        const updatedData = [updatedTimes, ...updatedSeries];

        // Update graph 1 (Sensors 1–3)
        if (uplotInstance.current?.graph1) {
          const dataGraph1 = [updatedTimes, ...updatedSeries.slice(0, 3)];
          uplotInstance.current.graph1.setData(dataGraph1);
        }

        // Update graph 2 (Sensors 4–6)
        if (uplotInstance.current?.graph2) {
          const dataGraph2 = [updatedTimes, ...updatedSeries.slice(3)];
          uplotInstance.current.graph2.setData(dataGraph2);
        }

        return updatedData;
      });
      setNoise(newVals[0])
      setLatestValues(newVals);
      // setLoading(false)
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




  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // if (!isClient) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
  //       <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-white"></div>
  //       <span className="ml-4">Loading dashboard...</span>
  //     </div>
  //   );
  // }

// if(loading) return <div></div>



  return (
       <div className="min-h-screen pl-64 bg-gray-900 flex-1 text-white">
    <Sidebar/>
    <div className="min-h-screen bg-gray-900 flex-1 text-white">
      <DashboardHeader sensorData={sensorData} />
      
      <div className="max-w-7xl mx-auto px-6">
        <EmergencyAlert emergencySwitches={emergencySwitches} />
        
        <main className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <EnvironmentalSensorsCard sensorData={sensorData} uplotRef={plotRef1} />
<AirQualitySensorsCard sensorData={sensorData} uplotRef={plotRef2} />
            {/* <EmergencySensorsCard sensorData={sensorData} /> */}
            {/* <ManualSwitchesCard manualSwitches={manualSwitches} /> */}
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
      <AlcoholGauge 
        value={alcohol} 
        max={100} 
        label="Alcohol Detector" 
        unit="ppm" 
      />
      <NoiseGauge 
        value={noise} 
        label="Sound Monitor" 
        unit="dB" 
      />
    </div>
    <div className="">
      <TyreStatus
      frontTyreStatus={frontTyreStatus}
      rearTyreStatus={rearTyreStatus}
      />
    </div>
    <div className="my-12">
      <AccelerometerCard accel={accel}/>
    </div>
    <div className="my-12">
    <SmokeDetector isSmokeDetected={isSmokeDetected}/>
    </div>
    <CarCrashDetector isCrashed={isCrash}/>
    {/* <div className="my-12">
      <BMSFaultCard fault={fault}/>
    </div> */}
    {/* <div>
      <BmsDataCardRoute/>
    </div> */}
    {/* <Map latitude={latitude} longitude={longitude}/> */}
     <div className="my-12">
      <Obd2DataCard obd={obd}/>
    </div>
        </main>
      </div>
    </div>
    </div>
  );
}