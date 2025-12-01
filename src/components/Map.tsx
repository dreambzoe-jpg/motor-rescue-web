"use client"

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useMemo } from 'react'

type Props = {
  center: { lat: number; lng: number }
  markers?: { id: string; lat: number; lng: number; title?: string }[]
  zoom?: number
  onMarkerClick?: (id: string) => void
}

export default function Map({ center, markers = [], zoom = 13, onMarkerClick }: Props) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  const { isLoaded } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: apiKey })

  if (!isLoaded) return <div>Loading map…</div>

  return (
    <div className="h-96 w-full">
      <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={center} zoom={zoom}>
        {markers.map((m) => (
          <Marker key={m.id} position={{ lat: m.lat, lng: m.lng }} title={m.title} onClick={() => onMarkerClick?.(m.id)} />
        ))}
      </GoogleMap>
    </div>
  )
}
