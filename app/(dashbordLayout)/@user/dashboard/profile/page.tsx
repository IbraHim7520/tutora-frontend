"use client"
import React, { useState } from "react"
import { FaCamera, FaSignOutAlt } from "react-icons/fa"

const dummyUser = {
  name: "Selina Akter",
  email: "selina.teacher@example.com",
  role: "Teacher",
  image:
    "https://images.unsplash.com/photo-1603415526960-f8f3c5b8e6f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBhdmF0YXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60",
  memberSince: "January 2023",
  stats: {
    active: 3,
    total: 12,
    completed: 8,
    uploaded: 5,
  },
}

const UserProfilePage = () => {
  const [avatar, setAvatar] = useState(dummyUser.image)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setAvatar(url)
    }
  }

  const handleLogout = () => {
    console.log("Logout clicked")
    // integrate Better-Auth logout here
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="w-full bg-indigo-100 py-12 flex flex-col items-center relative">
        {/* Avatar */}
        <div className="relative">
          <img
            src={avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
          {/* Upload icon */}
          <label className="absolute bottom-0 right-0 bg-white text-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-50 transition">
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            <FaCamera />
          </label>
        </div>

        {/* Name & Role */}
        <h1 className="mt-4 text-3xl font-bold text-gray-800">{dummyUser.name}</h1>
        <p className="text-indigo-600 font-medium">{dummyUser.role}</p>
        <p className="text-gray-500 text-sm mt-1">{`Member since ${dummyUser.memberSince}`}</p>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>

      {/* Stats Section */}
      <div className="w-full py-12 px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 bg-white shadow-md">
        {[
          { label: "Active Sessions", value: dummyUser.stats.active },
          { label: "Total Sessions", value: dummyUser.stats.total },
          { label: "Completed Sessions", value: dummyUser.stats.completed },
          { label: "Uploaded Sessions", value: dummyUser.stats.uploaded },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center bg-gray-100 rounded-xl py-6 shadow-sm"
          >
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Contact Info */}
      <div className="w-full bg-gray-50 py-6 px-6 text-center text-gray-600 text-sm">
        Email: {dummyUser.email}
      </div>
    </div>
  )
}

export default UserProfilePage
