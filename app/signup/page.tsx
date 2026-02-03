"use client";

import { useState } from "react";
import Link from "next/link";
import { User, BookOpen } from "lucide-react";

const Signuppage = () => {
  const [selected, setSelected] = useState<"student" | "teacher" | null>(null);

  return (
    <div className="bg-sky-50 flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
      {/* Back Button */}
      <div className="self-start mb-6">
        <Link
          href="/"
          className="text-gray-600 font-medium hover:text-sky-600 transition"
        >
          &larr; Back
        </Link>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-sky-700 mb-10">
        Register As
      </h1>

      {/* Selection Boxes */}
      <div className="flex flex-col sm:flex-row gap-8 mb-8 w-full max-w-lg">
        {/* Student Box */}
        <div
          onClick={() => setSelected("student")}
          className={`flex-1 cursor-pointer p-10 rounded-2xl border-2 transition-transform duration-200 ${
            selected === "student"
              ? "border-sky-600 shadow-xl scale-105"
              : "border-gray-300 hover:shadow-lg hover:scale-105"
          } bg-white flex flex-col items-center justify-center gap-4`}
        >
          <BookOpen className="size-12 text-sky-500" />
          <h2 className="text-2xl font-semibold text-gray-700">Student</h2>
          <p className="text-gray-500 text-center">
            Learn from the best tutors and join sessions easily.
          </p>
        </div>

        <div
          onClick={() => setSelected("teacher")}
          className={`flex-1 cursor-pointer p-10 rounded-2xl border-2 transition-transform duration-200 ${
            selected === "teacher"
              ? "border-sky-600 shadow-xl scale-105"
              : "border-gray-300 hover:shadow-lg hover:scale-105"
          } bg-white flex flex-col items-center justify-center gap-4`}
        >
          <User className="size-12 text-sky-500" />
          <h2 className="text-2xl font-semibold text-gray-700">Teacher</h2>
          <p className="text-gray-500 text-center">
            Share your knowledge and manage your sessions efficiently.
          </p>
        </div>
      </div>

      <div className="w-full max-w-lg">
        {selected && (
<Link
  href={`/signup/create-account?role=${selected}`}
  className="block text-center bg-sky-600 text-white font-semibold py-4 rounded-2xl shadow-lg hover:bg-sky-700 transition text-md"
>
  {selected === "teacher" ? "Register as Teacher" : "Register as Student"}
</Link>
        )}
      </div>
    </div>
  );
};

export default Signuppage;
