"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function GeoFenceMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const circleRef = useRef(null);
  const [radius, setRadius] = useState(500);
  const center = { lat: 13.069361, lng: 77.617028 };

  const initMap = () => {
    if (!mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 13,
      });
    }

    if (circleRef.current) {
      circleRef.current.setMap(null);
    }

    circleRef.current = new window.google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map: mapInstance.current,
      center: center,
      radius: parseInt(radius, 10),
    });
  };

  useEffect(() => {
    if (window.google && window.google.maps) {
      initMap();
    }
  }, [radius]);

  return (
    <div>
      {/* Load Google Maps script */}
      <Script
        src={`https://maps.gomaps.pro/maps/api/js?key=AlzaSy2PiDMlNFYTjNZHo__4YhjoWCRozlDGtqS&libraries=geometry`}
        strategy="lazyOnload"
        onLoad={() => initMap()}
      />

      <input
        type="number"
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
        className="border p-2 rounded my-2"
        placeholder="Enter radius in meters"
      />

      <div ref={mapRef} style={{ height: "500px", width: "100%" }} />
    </div>
  );
}
