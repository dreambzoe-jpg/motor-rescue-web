import React from 'react'

const DashboardSidebar: React.FC = () => {
  return (
    <aside className="bg-gray-100 w-64 p-4">
      <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
      <ul>
        <li className="mb-2">
          <a href="#" className="text-blue-600 hover:text-blue-800">My Bookings</a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-blue-600 hover:text-blue-800">My Reviews</a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-blue-600 hover:text-blue-800">Profile</a>
        </li>
        <li className="mb-2">
          <a href="#" className="text-blue-600 hover:text-blue-800">Settings</a>
        </li>
      </ul>
    </aside>
  )
}

export default DashboardSidebar
