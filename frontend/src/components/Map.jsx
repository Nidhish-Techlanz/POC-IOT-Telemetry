"use client";

import { useEffect, useRef, useState } from "react";

function Map({ latitude, longitude }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Load Google Maps script once
  useEffect(() => {
    if (window.google && window.google.maps) {
      setLoaded(true);
      return;
    }

    if (!document.querySelector("#google-maps-script")) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSy2PiDMlNFYTjNZHo__4YhjoWCRozlDGtqS`;
      script.async = true;
      script.defer = true;
      script.onload = () => setLoaded(true);

      document.body.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  // Initialize map
  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    const lat = Number(latitude);
    const lng = Number(longitude);

    if (!isFinite(lat) || !isFinite(lng)) return; // guard

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
  }, [loaded]);

  // Update marker when lat/lng changes
  useEffect(() => {
    if (!mapInstance.current || !markerInstance.current) return;

    const lat = Number(latitude);
    const lng = Number(longitude);

    if (!isFinite(lat) || !isFinite(lng)) return; // guard

    const location = { lat, lng };
    mapInstance.current.setCenter(location);
    markerInstance.current.setPosition(location);
  }, [latitude, longitude]);

  

  return (
    <div className="min-h-screen my-12 text-white">
      <h1 className="text-3xl font-bold mb-6">Geolocation Sensor</h1>
      <div className="bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6">
        <div
          ref={mapRef}
          style={{
            width: "100%",
            height: "500px",
            margin: "0 auto",
            borderRadius: "12px",
          }}
        />

        {/* Coordinates Card */}
        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700">
            <p className="text-sm text-gray-400">Latitude</p>
            <p className="text-xl font-bold text-[#51cf66]">
              {isFinite(Number(latitude)) ? Number(latitude).toFixed(6) : "13.069361"}
            </p>
          </div>
          <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700">
            <p className="text-sm text-gray-400">Longitude</p>
            <p className="text-xl font-bold text-[#339af0]">
              {isFinite(Number(longitude)) ? Number(longitude).toFixed(6) : "77.617028"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Map;
