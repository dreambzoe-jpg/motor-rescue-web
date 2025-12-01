import React from "react";
import { openInGoogleMaps } from "../utils/openInMaps";

interface Garage {
  id: string;
  name: string;
  images?: string[];
  brand_specialty?: string[];
  description: string;
  latitude: number;
  longitude: number;
  phone: string;
}

interface GarageCardProps {
  garage: Garage;
}

export default function GarageCard({ garage }: GarageCardProps) {
  return (
    <div className="garage-card">
      <img
        src={garage.images?.[0] || "/placeholder.jpg"}
        alt={garage.name}
        className="garage-image"
      />

      <h3>{garage.name}</h3>
      <p>Specialty: {garage.brand_specialty?.join(", ")}</p>
      <p>{garage.description}</p>

      <button
        className="btn"
        onClick={() => openInGoogleMaps(garage.latitude, garage.longitude)}
      >
        Open in Google Maps
      </button>

      <button className="btn-secondary">
        Call: {garage.phone}
      </button>
    </div>
  );
}
