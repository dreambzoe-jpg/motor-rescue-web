"use client"

import React, { useState } from 'react'
import supabase from '../../services/supabase'

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    phone: '',
    maps_url: '',
    brand_specialty: '',
    imageFile: null as File | null,
    is_verified: false,
    emergency_services: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let imageUrl = '/placeholder.jpg'

    if (formData.imageFile) {
      const fileExt = formData.imageFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('garage-images')
        .upload(fileName, formData.imageFile)

      if (uploadError) {
        alert('Error uploading image: ' + uploadError.message)
        return
      }

      const { data: urlData } = supabase.storage
        .from('garage-images')
        .getPublicUrl(fileName)

      imageUrl = urlData.publicUrl
    }

    const garageData = {
      name: formData.name,
      location: formData.location,
      description: formData.description,
      phone: formData.phone,
      maps_url: formData.maps_url,
      brand_specialty: formData.brand_specialty.split(',').map((s: string) => s.trim()),
      images: [imageUrl],
      is_verified: formData.is_verified,
      emergency_services: formData.emergency_services
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
        maps_url: '',
        brand_specialty: '',
        imageFile: null,
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

        <div>
          <label className="block text-sm font-medium mb-1">Google Maps Link</label>
          <input
            type="url"
            name="maps_url"
            value={formData.maps_url || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="https://maps.google.com/?q=..."
            required
          />
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
          <label className="block text-sm font-medium mb-1">Garage Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData(prev => ({ ...prev, imageFile: e.target.files?.[0] || null }))}
            className="w-full p-2 border rounded"
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
