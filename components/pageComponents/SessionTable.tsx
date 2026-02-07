"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

interface Session {
  id: string;
  name: string;
  category: string;
  date: string;
  teacherEmail: string;
  maxStudent: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  image: string;
}

const SessionTable = ({ initialSessions }: { initialSessions: Session[] }) => {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("");

  const filteredSessions = useMemo(() => {
    return initialSessions.filter((session) => {
      const matchesStatus = statusFilter === "ALL" || session.status === statusFilter;
      
      const sessionDate = new Date(session.date).toISOString().split("T")[0];
      const matchesDate = !dateFilter || sessionDate === dateFilter;

      return matchesStatus && matchesDate;
    });
  }, [statusFilter, dateFilter, initialSessions]);

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Filter by Date</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button 
          onClick={() => { setStatusFilter("ALL"); setDateFilter(""); }}
          className="mt-auto text-sm text-blue-600 hover:underline pb-2"
        >
          Reset Filters
        </button>
      </div>


      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Session Date</th>
              <th className="px-4 py-3">Teacher Email</th>
              <th className="px-4 py-3 text-center">Max Students</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((session) => (
              <tr key={session.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <Image 
                    src={session.image} 
                    alt={session.name}
                    width={48} 
                    height={48} 
                    className="w-12 h-12 object-cover rounded-md border"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{session.name}</td>
                <td className="px-4 py-3">{session.category}</td>
                <td className="px-4 py-3">{new Date(session.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">{session.teacherEmail}</td>
                <td className="px-4 py-3 text-center">{session.maxStudent}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    session.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {session.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredSessions.length === 0 && (
          <div className="text-center py-10 bg-white text-gray-500">
            No sessions match your filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionTable;