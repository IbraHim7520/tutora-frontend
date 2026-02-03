"use client";

import { useState } from "react";
import { FiUpload } from "react-icons/fi";

export function TeacherSignupForm() {
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  return (
    <form className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Full Name</label>
        <input
          type="text"
          placeholder="John Doe"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-300 focus:outline-none"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input
          type="email"
          placeholder="john@example.com"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-300 focus:outline-none"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Password</label>
        <input
          type="password"
          placeholder="********"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-300 focus:outline-none"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
        <input
          type="password"
          placeholder="********"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-300 focus:outline-none"
        />
      </div>

      {/* Expertise / Category */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Expertise / Category</label>
        <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-300 focus:outline-none">
          <option value="">Select Category</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
          <option value="english">English</option>
          <option value="programming">Programming</option>
          <option value="design">Design</option>
        </select>
      </div>

      {/* Short Bio */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Short Bio</label>
        <textarea
          placeholder="Tell us about yourself..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-300 focus:outline-none resize-none"
          rows={3}
        />
      </div>

      {/* Profile Picture Upload */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Profile Picture</label>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-lg cursor-pointer hover:bg-sky-200 transition">
            <FiUpload />
            <span>{profileImage ? profileImage.name : "Upload Image"}</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <button
          type="submit"
          className="flex-1 bg-sky-600 text-white font-semibold py-2 rounded-lg hover:bg-sky-700 transition"
        >
          Register as Teacher
        </button>
        <button
          type="reset"
          className="flex-1 bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Clear
        </button>
      </div>
    </form>
  );
}
