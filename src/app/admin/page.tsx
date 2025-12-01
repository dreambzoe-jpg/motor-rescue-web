"use client"

import React, { useState } from 'react'
import supabase from '../../services/supabase'

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    phone: '',
    latitude: '',
    longitude: '',
    brand_specialty: '',
    images: '',
    is_verified: false,
    emergency_services: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const garageData = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      brand_specialty: formData.brand_specialty.split(',').map(s => s.trim()),
      images: formData.images.split(',').map(s => s.trim())
    }

    const { error } = await supabase.from('garages').insert(garageData)
    if (error) {
      alert('Error adding garage: ' + error.message)
    } else {
      alert('Garage added successfully!')
      setFormData({
        name: '',
        location: '',
        description: '',
        phone: '',
        latitude: '',
        longitude: '',
        brand_specialty: '',
        images: '',
        is_verified: false,
        emergency_services: false
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Add New Car Service</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Latitude</label>
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Longitude</label>
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Brand Specialty (comma separated)</label>
          <input
            type="text"
            name="brand_specialty"
            value={formData.brand_specialty}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Toyota, Honda, Ford"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Images (comma separated URLs)</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="/image1.jpg, /image2.jpg"
          />
        </div>

        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="is_verified"
              checked={formData.is_verified}
              onChange={handleChange}
              className="mr-2"
            />
            Verified
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="emergency_services"
              checked={formData.emergency_services}
              onChange={handleChange}
              className="mr-2"
            />
            Emergency Services
          </label>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Add Garage
        </button>
      </form>
    </div>
  )
}
