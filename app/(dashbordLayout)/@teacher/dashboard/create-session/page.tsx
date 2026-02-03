

import { UploadCloud, Calendar, Clock, BookOpen, User, Mail, Users } from "lucide-react";

const TeacherSessionPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-blue-100 p-4 md:p-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white/80 backdrop-blur shadow-xl p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-semibold text-sky-700 mb-6">
          Create New Teaching Session
        </h1>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Session Name */}
          <div>
            <label className="text-sm font-medium text-sky-700">Session Name</label>
            <div className="mt-1 relative">
              <BookOpen className="absolute left-3 top-3 size-4 text-sky-400" />
              <input
                placeholder="e.g. Advanced React Basics"
                className="w-full rounded-lg border border-sky-200 pl-10 pr-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-sky-700">Category</label>
            <select className="mt-1 w-full rounded-lg border border-sky-200 px-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none">
              <option>Select Category</option>
              <option>Web Development</option>
              <option>UI/UX Design</option>
              <option>Backend</option>
              <option>Mobile App</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="text-sm font-medium text-sky-700">Date</label>
            <div className="mt-1 relative">
              <Calendar className="absolute left-3 top-3 size-4 text-sky-400" />
              <input
                type="date"
                className="w-full rounded-lg border border-sky-200 pl-10 pr-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>
          </div>

          {/* From Time */}
          <div>
            <label className="text-sm font-medium text-sky-700">From Time</label>
            <div className="mt-1 relative">
              <Clock className="absolute left-3 top-3 size-4 text-sky-400" />
              <input
                type="time"
                className="w-full rounded-lg border border-sky-200 pl-10 pr-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>
          </div>

          {/* To Time */}
          <div>
            <label className="text-sm font-medium text-sky-700">To Time</label>
            <div className="mt-1 relative">
              <Clock className="absolute left-3 top-3 size-4 text-sky-400" />
              <input
                type="time"
                className="w-full rounded-lg border border-sky-200 pl-10 pr-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>
          </div>

          {/* Teacher Name */}
          <div>
            <label className="text-sm font-medium text-sky-700">Session Taken By</label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-3 size-4 text-sky-400" />
              <input
                placeholder="Teacher name"
                className="w-full rounded-lg border border-sky-200 pl-10 pr-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-sky-700">Email</label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-3 size-4 text-sky-400" />
              <input
                placeholder="teacher@email.com"
                className="w-full rounded-lg border border-sky-200 pl-10 pr-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>
          </div>

          {/* Max Students */}
          <div>
            <label className="text-sm font-medium text-sky-700">Max Students</label>
            <div className="mt-1 relative">
              <Users className="absolute left-3 top-3 size-4 text-sky-400" />
              <input
                type="number"
                placeholder="e.g. 30"
                className="w-full rounded-lg border border-sky-200 pl-10 pr-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none"
              />
            </div>
          </div>

          {/* Banner Upload */}
          <div>
            <label className="text-sm font-medium text-sky-700">Banner Image</label>
            <label className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-sky-300 rounded-lg p-4 cursor-pointer hover:bg-sky-50">
              <UploadCloud className="size-8 text-sky-400" />
              <span className="text-sm text-sky-500">Upload session banner</span>
              <input type="file" className="hidden" />
            </label>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-sky-700">Description</label>
            <textarea
              rows={4}
              placeholder="Describe what students will learn..."
              className="mt-1 w-full rounded-lg border border-sky-200 px-3 py-2 focus:ring-2 focus:ring-sky-400 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-3">
            <button
              type="reset"
              className="px-5 py-2 rounded-lg border border-sky-300 text-sky-600 hover:bg-sky-50"
            >
              Clear
            </button>
            <button
              type="button"
              className="px-6 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
            >
              Create Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherSessionPage;
