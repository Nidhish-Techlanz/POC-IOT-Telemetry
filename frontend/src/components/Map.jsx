"use client";

import { useEffect, useRef, useState } from "react";

function Map({ latitude, longitude }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const isValid = latitude != null && longitude!=null
  const lat = Number(latitude);
  const lng = Number(longitude);

  

  // Load Google Maps script once (only if valid coords)
  useEffect(() => {
    if (!isValid) return;

    if (window.google && window.google.maps) {
      setLoaded(true);
      return;
    }

    if (!document.querySelector("#google-maps-script")) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.gomaps.pro/maps/api/js?key=${process.env.NEXT_PUBLIC_GOMAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = () => setLoaded(true);

      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, [isValid]);

  // Initialize map (only if valid coords)
  useEffect(() => {
    if (!loaded || !mapRef.current || !isValid) return;

    const location = { lat, lng };

    mapInstance.current = new window.google.maps.Map(mapRef.current, {
      center: location,
      zoom: 16,
    });

    markerInstance.current = new window.google.maps.Marker({
      position: location,
      map: mapInstance.current,
      title: "Current Position",
    });
  }, [loaded, isValid]);

  // Update marker when lat/lng changes
  useEffect(() => {
    if (!mapInstance.current || !markerInstance.current || !isValid) return;

    const location = { lat, lng };
    mapInstance.current.setCenter(location);
    markerInstance.current.setPosition(location);
  }, [lat, lng, isValid]);

  return (
    <div className="min-h-screen my-12 text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Geolocation Sensor</h1>

        {!isValid && (
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-400">
            Disconnected
          </div>
        )}
      </div>

      <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6">
        {/* Map or Fallback */}
        {isValid ? (
          <div
            ref={mapRef}
            style={{
              width: "100%",
              height: "500px",
              margin: "0 auto",
              borderRadius: "12px",
            }}
          />
        ) : (
          <div className="h-[300px] flex items-center justify-center bg-gray-900/50 rounded-lg">
            <p className="text-gray-400 text-sm">No data available</p>
          </div>
        )}

        {/* Coordinates Card */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700">
            <p className="text-sm text-gray-400">Latitude</p>
            <p className="text-xl font-bold text-[#51cf66]">
              {isValid ? lat.toFixed(6) : "--"}
            </p>
          </div>
          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700">
            <p className="text-sm text-gray-400">Longitude</p>
            <p className="text-xl font-bold text-[#339af0]">
              {isValid ? lng.toFixed(6) : "--"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
