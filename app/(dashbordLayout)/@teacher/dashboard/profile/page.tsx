

import { Mail, Phone, MapPin, Calendar, Edit3 } from "lucide-react";

const TeacherProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-4 md:p-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white/80 backdrop-blur shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 to-blue-500 p-6 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-white">
              <img
                src="https://i.pravatar.cc/300"
                alt="Teacher"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-semibold">John Doe</h1>
              <p className="text-sky-100">Senior Web Development Instructor</p>
              <p className="text-sm text-sky-200 mt-1">Joined: Jan 2024</p>
            </div>
            <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition">
              <Edit3 className="size-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Info Card */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold text-sky-700 mb-4">
              Personal Information
            </h2>
            <div className="space-y-3 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <Mail className="size-4 text-sky-500" /> johndoe@email.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="size-4 text-sky-500" /> +880 1234-567890
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="size-4 text-sky-500" /> Dhaka, Bangladesh
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="size-4 text-sky-500" /> Available: Sun – Thu
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold text-sky-700 mb-4">
              About Me
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              I am a passionate web development instructor with over 5 years of
              experience teaching modern JavaScript frameworks, backend APIs,
              and scalable application design. I love helping students grow
              their skills and build real-world projects.
            </p>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold text-sky-700 mb-4">
              Teaching Stats
            </h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-sky-600">42</p>
                <p className="text-xs text-gray-500">Sessions</p>
              </div>
              <div>
                <p className="text-xl font-bold text-sky-600">320</p>
                <p className="text-xs text-gray-500">Students</p>
              </div>
              <div>
                <p className="text-xl font-bold text-sky-600">4.9⭐</p>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-3">
            <h2 className="text-lg font-semibold text-sky-700 mb-2">
              Quick Actions
            </h2>
            <button className="w-full px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700">
              Edit Profile
            </button>
            <button className="w-full px-4 py-2 rounded-lg border border-sky-300 text-sky-600 hover:bg-sky-50">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfilePage;
