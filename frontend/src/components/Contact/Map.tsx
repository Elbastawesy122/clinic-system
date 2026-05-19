"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map() {
  return (
    <MapContainer
      center={[31.0409, 31.3785] as const} // مثال: المنصورة
      zoom={13} 
      className="h-[300px] w-full rounded-2xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[31.0409, 31.3785]}>
        <Popup>Clinic Location</Popup>
      </Marker>
    </MapContainer>
  );
}