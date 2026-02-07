import { cookies } from "next/headers";
import { Users, CheckCircle2, CalendarCheck, Star } from "lucide-react";
import Image from "next/image";

interface Session {
  id: string;
  name: string;
  date: string;
  status: string;
  maxStudent: number;
}

const TeacherAnalyticsPage = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  // 1. Fetch Analytics and Sessions in parallel
  const [analyticsRes, sessionsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/user-analytics`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    }),
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/session/all-sessions`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    }),
  ]);

  const analytics = await analyticsRes.json();
  const sessionsData = await sessionsRes.json();
  const allSessions = sessionsData.data || [];

  // 2. Logic to split sessions
  const now = new Date();
  const upcomingSessions = allSessions
    .filter((s: Session) => new Date(s.date) >= now && s.status === "APPROVED")
    .slice(0, 5); // Show top 5

  const completedSessions = allSessions
    .filter((s: Session) => new Date(s.date) < now && s.status === "APPROVED")
    .slice(0, 5);

  const stats = [
    { 
      title: "Approved Sessions", 
      value: analytics.approvedSessions, 
      icon: <CalendarCheck className="size-6 text-sky-500" /> 
    },
    { 
      title: "Pending Approval", 
      value: analytics.pendingSessions, 
      icon: <CheckCircle2 className="size-6 text-yellow-500" /> 
    },
    { 
      title: "Total Students", 
      value: analytics.totalEnrolledStudents, 
      icon: <Users className="size-6 text-indigo-500" /> 
    },
    { 
      title: "Avg. Rating", 
      value: analytics.averageRating, 
      icon: <Star className="size-6 text-orange-500" /> 
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-blue-100 p-4 md:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-sky-100">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-sky-800 tracking-tight">
              Welcome back, {analytics.name}!
            </h1>
            <p className="text-gray-500 text-sm">Member since {new Date(analytics.memberSince).toLocaleDateString()}</p>
          </div>
          <Image 
            src={analytics.image} 
            alt={analytics.name} 
            width={60} 
            height={60} 
            className="rounded-full border-2 border-sky-200"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md transition-all"
            >
              <div className="p-3 bg-sky-50 rounded-xl flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Sessions Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <h2 className="text-xl font-semibold text-sky-700">Upcoming Live Sessions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-sky-50/50">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Session Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Capacity</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {upcomingSessions.length > 0 ? upcomingSessions.map((session: Session) => (
                  <tr key={session.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">{session.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(session.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{session.maxStudent} max</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                        {session.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                    <tr><td colSpan={4} className="p-10 text-center text-gray-400">No upcoming sessions scheduled.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Completed Sessions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-sky-700 mb-4 border-b pb-2">Recently Completed</h2>
            <div className="space-y-4">
              {completedSessions.length > 0 ? completedSessions.map((session: Session) => (
                <div key={session.id} className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                  <span className="font-medium text-gray-700">{session.name}</span>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Past Session</span>
                </div>
              )) : (
                <p className="text-gray-400 text-center py-4">No completed sessions yet.</p>
              )}
            </div>
          </div>

          {/* Student Engagement Card */}
          <div className="bg-linear-to-br from-indigo-600 to-violet-700 rounded-2xl shadow-lg p-8 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Student Impact</h2>
              <p className="text-indigo-100 mb-6 opacity-90">
                You have inspired <span className="text-white font-bold text-xl">{analytics.totalEnrolledStudents}</span> students 
                across <span className="text-white font-bold text-xl">{analytics.totalOwnSessions}</span> educational sessions.
              </p>
              <div className="flex gap-2">
                 <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-sm">
                    Success Rate: {Math.round((analytics.approvedSessions / analytics.totalOwnSessions) * 100)}%
                 </div>
              </div>
            </div>
            {/* Simple decorative circle */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAnalyticsPage;