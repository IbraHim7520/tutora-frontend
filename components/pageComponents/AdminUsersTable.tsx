"use client";

import Image from "next/image";
import { useState } from "react";

export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
  role: "admin" | "teacher" | "student" | string;
  emailVerified: boolean;
  createdAt: string;
}

interface UsersTableProps {
  initialUsers: IUser[];
}

const UsersTable = ({ initialUsers }: UsersTableProps) => {
  const [search, setSearch] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("All");

  const filteredUsers = initialUsers.filter((user: IUser) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "All" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const roles: string[] = ["All", ...new Set(initialUsers.map((u: IUser) => u.role))];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Filters Section */}
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 bg-white">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-semibold">
            <tr>
              <th className="px-6 py-4">User Details</th>
              <th className="px-6 py-4">Verification</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user: IUser) => (
              <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full border-2 border-white shadow-sm overflow-hidden shrink-0">
                    <Image
                      src={user.image || `https://ui-avatars.com/api/?name=${user.name}`}
                      width={48}
                      height={48}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {user.emailVerified ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      Unverified
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-bold uppercase ${
                      user.role === "admin"
                        ? "bg-purple-50 text-purple-600 ring-1 ring-purple-500/20"
                        : "bg-orange-50 text-orange-600 ring-1 ring-orange-500/20"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            No users found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersTable;
