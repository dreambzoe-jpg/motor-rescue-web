import React from "react";
import { openInGoogleMaps } from "../utils/openInMaps";

interface Garage {
  name: string;
  images?: string[];
  description: string;
  brand_specialty?: string[];
  phone: string;
  latitude: number;
  longitude: number;
}

interface GarageProfileProps {
  garage: Garage;
}

export default function GarageProfile({ garage }: GarageProfileProps) {
  return (
    <div className="garage-profile">
      <h1>{garage.name}</h1>

      <div className="gallery">
        {garage.images?.map((img, i) => (
          <img key={i} src={img} alt={garage.name} />
        ))}
      </div>

      <p><strong>About:</strong> {garage.description}</p>
      <p><strong>Specialty:</strong> {garage.brand_specialty?.join(", ")}</p>
      <p><strong>Phone:</strong> {garage.phone}</p>

      <button
        className="btn-primary"
        onClick={() => openInGoogleMaps(garage.latitude, garage.longitude)}
      >
        Get Directions (Google Maps)
      </button>
    </div>
  );
}
