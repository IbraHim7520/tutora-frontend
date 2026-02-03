

import { Users, BookOpen, CheckCircle2, CalendarCheck } from "lucide-react";

const TeacherAnalyticsPage = () => {
  // Dummy data (for design only)
  const stats = [
    { title: "Upcoming Sessions", value: 8, icon: <CalendarCheck className="size-6 text-sky-500" /> },
    { title: "Completed Sessions", value: 35, icon: <CheckCircle2 className="size-6 text-green-500" /> },
    { title: "Total Students", value: 120, icon: <Users className="size-6 text-indigo-500" /> },
    { title: "New Connections", value: 24, icon: <BookOpen className="size-6 text-purple-500" /> },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-blue-100 p-4 md:p-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-sky-700">
          Teacher Dashboard Analytics
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-2xl shadow p-6 flex items-center gap-4 hover:scale-105 transition transform"
            >
              <div className="p-3 bg-sky-100 rounded-xl flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-sky-700">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Sessions Table */}
        <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold text-sky-700 mb-4">
            Upcoming Sessions
          </h2>
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-sky-50">
                <th className="px-4 py-2 text-sm text-gray-600">Session Name</th>
                <th className="px-4 py-2 text-sm text-gray-600">Date</th>
                <th className="px-4 py-2 text-sm text-gray-600">Time</th>
                <th className="px-4 py-2 text-sm text-gray-600">Booked Students</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-sky-50 transition">
                <td className="px-4 py-2">Advanced React Basics</td>
                <td className="px-4 py-2">2026-02-05</td>
                <td className="px-4 py-2">10:00 AM - 12:00 PM</td>
                <td className="px-4 py-2">15</td>
              </tr>
              <tr className="border-b hover:bg-sky-50 transition">
                <td className="px-4 py-2">UI/UX Design Patterns</td>
                <td className="px-4 py-2">2026-02-07</td>
                <td className="px-4 py-2">2:00 PM - 4:00 PM</td>
                <td className="px-4 py-2">12</td>
              </tr>
              <tr className="border-b hover:bg-sky-50 transition">
                <td className="px-4 py-2">Node.js Backend</td>
                <td className="px-4 py-2">2026-02-10</td>
                <td className="px-4 py-2">9:00 AM - 11:00 AM</td>
                <td className="px-4 py-2">10</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Completed Sessions Card List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-sky-700 mb-4">Recently Completed Sessions</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex justify-between">
                <span>React Hooks Deep Dive</span>
                <span className="font-semibold text-gray-800">25 Students</span>
              </li>
              <li className="flex justify-between">
                <span>Modern CSS & Tailwind</span>
                <span className="font-semibold text-gray-800">18 Students</span>
              </li>
              <li className="flex justify-between">
                <span>Express & MongoDB APIs</span>
                <span className="font-semibold text-gray-800">20 Students</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold text-sky-700 mb-4">Total Students Connected</h2>
            <p className="text-gray-600">Throughout all sessions, 120 students have connected and attended your sessions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAnalyticsPage;
