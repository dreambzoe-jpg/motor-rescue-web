import React, { useState } from 'react'

const RoadsideForm: React.FC = () => {
  const [location, setLocation] = useState('')
  const [issue, setIssue] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({ location, issue, phone })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Request Roadside Assistance</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
          placeholder="Current location"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Issue:</label>
        <textarea
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
          rows={3}
          placeholder="Describe the problem"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Phone Number:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md"
        />
      </div>
      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Request Help</button>
    </form>
  )
}

export default RoadsideForm
