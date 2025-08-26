"use client"

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

    const script = document.createElement("script");
    script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSy2PiDMlNFYTjNZHo__4YhjoWCRozlDGtqS`;
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);

    document.body.appendChild(script);
  }, []);

  // Initialize map once script is ready
  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    const location = { lat: latitude, lng: longitude };

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

  // Update marker + center whenever lat/lng changes
  useEffect(() => {
    if (!mapInstance.current || !markerInstance.current) return;

    const location = { lat: latitude, lng: longitude };

    mapInstance.current.setCenter(location);
    markerInstance.current.setPosition(location);
  }, [latitude, longitude]);

  return (
    <div className="min-h-screen text-white">
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
      </div>
    </div>
  );
}

export default Map;
