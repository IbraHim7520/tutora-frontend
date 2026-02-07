"use client";

import { useState } from "react";

type SessionStatus = "PENDING" | "APPROVED" | "REJECT" | "COMPLETED";

export interface ISession {
  id: string;
  name: string;
  category: "Mobile App" | "Web Development" | "Software Engineering" | string;
  description: string;
  image: string;
  maxStudent: number;
  rating: number;
  status: SessionStatus;

  teacherId: string;
  teacherEmail: string;

  date: string;
  fromTime: string;
  toTime: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminSessionTablesProps {
  initialData: ISession[];
}

const AdminSessionTables = ({ initialData }: AdminSessionTablesProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const filteredSessions = initialData.filter((session: ISession) => {
    const matchesSearch = session.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "All" || session.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    ...new Set(initialData.map((s: ISession) => s.category)),
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Filters Row */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by session name..."
          className="border p-2 rounded w-full md:w-1/2 focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full md:w-1/4"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          {categories.map((cat: string) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3 text-sm font-semibold text-gray-700">
                Session Name
              </th>
              <th className="p-3 text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="p-3 text-sm font-semibold text-gray-700">
                Schedule
              </th>
              <th className="p-3 text-sm font-semibold text-gray-700">
                Students
              </th>
              <th className="p-3 text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredSessions.map((session: ISession) => (
              <tr
                key={session.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{session.name}</td>

                <td className="p-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {session.category}
                  </span>
                </td>

                <td className="p-3 text-sm text-gray-600">
                  {new Date(session.date).toLocaleDateString()} <br />
                  <span className="text-xs text-gray-400">
                    {new Date(session.fromTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(session.toTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </td>

                <td className="p-3 text-sm">{session.maxStudent}</td>

                <td className="p-3">
                  <span
                    className={`text-xs font-bold ${
                      session.status === "PENDING"
                        ? "text-amber-500"
                        : session.status === "APPROVED"
                        ? "text-green-500"
                        : session.status === "REJECT"
                        ? "text-red-500"
                        : "text-blue-500"
                    }`}
                  >
                    {session.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredSessions.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No sessions found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSessionTables;
