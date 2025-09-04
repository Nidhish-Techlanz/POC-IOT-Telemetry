"use client";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Circle, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Sidebar from "../../components/Sidebar";

export default function GeoFenceMap() {
  const [shape, setShape] = useState("circle");
  const [open, setOpen] = useState(false); 

  // Live inputs (before pressing Enter)
  const [inputLat, setInputLat] = useState(13.069361);
  const [inputLng, setInputLng] = useState(77.617028);
  const [inputRadius, setInputRadius] = useState();
  const [inputSide, setInputSide] = useState();
  const [inputPolygon, setInputPolygon] = useState(
    Array(6).fill(["", ""]) // 6 placeholders for polygon
  );

  // Store all zones
  const [zones, setZones] = useState([]);

  const ws = useRef(null);

useEffect(() => {
  ws.current = new WebSocket("ws://localhost:8000"); 

  ws.current.onopen = () => {
    console.log("✅ Connected to WebSocket server");
  };

  ws.current.onmessage = (event) => {
    console.log("📩 From server:", event.data);
  };

  return () => {
    ws.current.close();
  };
}, []);


  const applyChanges = () => {
    const newZone = { type: shape };

    if (shape === "circle") {
      newZone.data = { lat: inputLat, lng: inputLng, radius: inputRadius };
    } else if (shape === "square") {
      newZone.data = { lat: inputLat, lng: inputLng, side: inputSide };
    } else if (shape === "polygon") {
      newZone.data = { coords: inputPolygon.filter(c => c[0] && c[1]) }; // only keep filled coords
    }

    setZones([newZone]); // 🔹 replace old zone, not append

  // 🔹 Send to WebSocket server → then to MQTT
  if (ws.current && ws.current.readyState === WebSocket.OPEN) {
    ws.current.send(
      JSON.stringify({
        topic: "flespi/message/gw/devices/6755546", // ✅ your Flespi topic
        // topic: "flespi/message/ab/devices/6755545", // ✅ your Flespi topic
        // topic : "my/can/yash",
        payload: newZone,
      })
    );
    console.log("📤 Sent to WebSocket:", newZone);
  }


    // Reset inputs after adding
    if (shape === "circle") {
      setInputLat(13.069361);
      setInputLng(77.617028);
      setInputRadius();
    } else if (shape === "square") {
      setInputLat(13.069361);
      setInputLng(77.617028);
      setInputSide();
    } else if (shape === "polygon") {
      setInputPolygon(Array(6).fill(["", ""])); // reset polygon placeholders
    }
  };

  const makeSquareBounds = (lat, lng, sideMeters) => {
    const dLat = (sideMeters / 111320) / 2;
    const dLng = (sideMeters / (40075000 * Math.cos((lat * Math.PI) / 180) / 360)) / 2;
    return [
      [lat - dLat, lng - dLng],
      [lat - dLat, lng + dLng],
      [lat + dLat, lng + dLng],
      [lat + dLat, lng - dLng],
    ];
  };

  const shapeOptions = [
    { value: "circle", label: "Circle" },
    { value: "square", label: "Square" },
    { value: "polygon", label: "Polygon" },
  ];

  return (
    <div className="flex">
    <Sidebar/>
    <div className="min-h-screen flex-1 bg-gray-900 text-white">
      <div className="flex flex-col gap-4 p-4">
        
        {/* Shape Selector */}
        <div className="flex gap-2 items-center relative">
          <label className="font-semibold">Select Shape:</label>

          <div className="relative w-40">
            <button
              onClick={() => setOpen(!open)}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 flex justify-between items-center cursor-pointer"
            >
              {shapeOptions.find((s) => s.value === shape)?.label}
              <span className="ml-2">▾</span>
            </button>
            {open && (
              <ul className="absolute left-0 mt-1 w-full bg-gray-800 border border-gray-700 rounded shadow-lg z-50">
                {shapeOptions.map((opt) => (
                  <li
                    key={opt.value}
                    onClick={() => {
                      setShape(opt.value);
                      setOpen(false);
                      setZones([]); // 🔹 Clear map when switching shape
                      
                      if (opt.value === "circle" || opt.value === "square") {
                        setInputLat(13.069361);
                        setInputLng(77.617028);
                        setInputRadius();
                        setInputSide();
                      } else if (opt.value === "polygon") {
                        setInputPolygon(Array(6).fill(["", ""])); // reset polygon to placeholders
                      }
                    }}
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-700 ${
                      shape === opt.value ? "bg-gray-700" : ""
                    }`}
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Inputs */}
        {shape === "circle" && (
          <div className="flex gap-2">
            <input type="number" step="0.0001" value={inputLat}
              onChange={(e) => setInputLat(Number(e.target.value))} placeholder="Latitude" className="bg-gray-800 border border-gray-700 p-2 rounded" />
            <input type="number" step="0.0001" value={inputLng}
              onChange={(e) => setInputLng(Number(e.target.value))} placeholder="Longitude" className="bg-gray-800 border border-gray-700 p-2 rounded" />
            <input type="number" value={inputRadius || ""}
              onChange={(e) => setInputRadius(Number(e.target.value))} placeholder="Radius (m)" className="bg-gray-800 border border-gray-700 p-2 rounded" />
          </div>
        )}

        {shape === "square" && (
          <div className="flex gap-2">
            <input type="number" step="0.0001" value={inputLat}
              onChange={(e) => setInputLat(Number(e.target.value))} placeholder="Center Lat" className="bg-gray-800 border border-gray-700 p-2 rounded" />
            <input type="number" step="0.0001" value={inputLng}
              onChange={(e) => setInputLng(Number(e.target.value))} placeholder="Center Lng" className="bg-gray-800 border border-gray-700 p-2 rounded" />
            <input type="number" value={inputSide || ""}
              onChange={(e) => setInputSide(Number(e.target.value))} placeholder="Side length (m)" className="bg-gray-800 border border-gray-700 p-2 rounded" />
          </div>
        )}

        {shape === "polygon" && (
          <div className="flex flex-col gap-2">
            {inputPolygon.map((coord, i) => (
              <div key={i} className="flex gap-2">
                <input type="number" step="0.0001" value={coord[0]}
                  onChange={(e) => {
                    const updated = [...inputPolygon];
                    updated[i] = [Number(e.target.value), updated[i][1]];
                    setInputPolygon(updated);
                  }} placeholder="Lat" className="bg-gray-800 border border-gray-700 p-2 rounded" />
                <input type="number" step="0.0001" value={coord[1]}
                  onChange={(e) => {
                    const updated = [...inputPolygon];
                    updated[i] = [updated[i][0], Number(e.target.value)];
                    setInputPolygon(updated);
                  }} placeholder="Lng" className="bg-gray-800 border border-gray-700 p-2 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Apply Button */}
        <button onClick={applyChanges}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow cursor-pointer">
          Add Zone
        </button>

        {/* Map */}
        <div className="border rounded overflow-hidden" style={{ height: "500px" }}>
          <MapContainer
            center={[inputLat, inputLng]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {zones.map((zone, i) => {
              if (zone.type === "circle") {
                return (
                  <Circle key={i}
                    center={[zone.data.lat, zone.data.lng]}
                    radius={zone.data.radius}
                    pathOptions={{ color: "red" }}
                  />
                );
              }
              if (zone.type === "square") {
                return (
                  <Polygon key={i}
                    positions={makeSquareBounds(zone.data.lat, zone.data.lng, zone.data.side)}
                    pathOptions={{ color: "blue" }}
                  />
                );
              }
              if (zone.type === "polygon") {
                return (
                  <Polygon key={i}
                    positions={zone.data.coords}
                    pathOptions={{ color: "green" }}
                  />
                );
              }
              return null;
            })}
          </MapContainer>
        </div>
      </div>
    </div>
    </div>
  );
}
