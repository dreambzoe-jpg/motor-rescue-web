import React from 'react'
import { notFound } from 'next/navigation'
import ReviewForm from '../../../components/ReviewForm'
import { openInGoogleMaps } from '../../../utils/openInMaps'

interface PageProps {
  params: { id: string }
}

const GaragePage: React.FC<PageProps> = ({ params }) => {
  const { id } = params

  // In a real app, fetch garage data based on id
  const garage = {
    id,
    name: `Garage ${id}`,
    location: 'Sample Location',
    rating: 4.5,
    description: 'A great garage for your car needs.',
    is_verified: true,
    emergency_services: true,
    maps_url: 'https://maps.google.com/?q=-3.745,-38.523'
  }

  // Mock reviews data
  const reviews = [
    { id: 1, comment: 'Great service!', rating: 5 },
    { id: 2, comment: 'Good work.', rating: 4 }
  ]

  if (!garage) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {garage.name}
        {garage.is_verified && (
          <span className="verified-badge">✔ Verified</span>
        )}
      </h1>
      <p className="text-gray-600 mb-2">{garage.location}</p>
      <p className="text-yellow-500 mb-4">Rating: {garage.rating}/5</p>
      <p>{garage.description}</p>

      {garage.emergency_services && (
        <button
          className="btn-emergency"
          onClick={() => window.open(garage.maps_url, "_blank")}
        >
          Emergency: Navigate Immediately
        </button>
      )}

      <div className="reviews-section">
        <ReviewForm garageId={garage.id} />

        <h3>Customer Reviews</h3>
        {reviews.map(r => (
          <div key={r.id} className="review-card">
            <p>{r.comment}</p>
            <span>{r.rating}⭐</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GaragePage
