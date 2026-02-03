"use client";

import { CalendarCheck, Users, BookOpen } from "lucide-react";

const TeacherDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-4 md:p-10 flex flex-col gap-8">
      {/* Hero / Welcome Section */}
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-sky-700">
            Welcome back, John Doe 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Your dashboard is ready. Check your sessions, student connections, and plan your upcoming lessons.
          </p>
        </div>
        <div className="bg-sky-100 w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center">
          <BookOpen className="size-12 text-sky-500" />
        </div>
      </div>

      {/* Info / Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start gap-2 hover:scale-105 transition">
          <CalendarCheck className="size-6 text-sky-500" />
          <h3 className="text-lg font-semibold text-sky-700">Upcoming Sessions</h3>
          <p className="text-gray-600 text-sm">5 sessions scheduled for this week.</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start gap-2 hover:scale-105 transition">
          <Users className="size-6 text-indigo-500" />
          <h3 className="text-lg font-semibold text-sky-700">Total Students</h3>
          <p className="text-gray-600 text-sm">120 students connected to your sessions.</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-start gap-2 hover:scale-105 transition">
          <BookOpen className="size-6 text-purple-500" />
          <h3 className="text-lg font-semibold text-sky-700">Completed Sessions</h3>
          <p className="text-gray-600 text-sm">32 sessions completed successfully.</p>
        </div>
      </div>

      {/* Motivational / Footer Section */}
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow p-6 text-center">
        <p className="text-gray-700 font-semibold text-lg">
          Keep inspiring your students! 🌟
        </p>
        <p className="text-gray-500 mt-1 text-sm">
          Check your sidebar for quick actions to manage sessions or view analytics.
        </p>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
