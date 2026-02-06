import { ArrowRight, Star, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TeacherCardProps = {
  tutor: {
    id?: string;
    name?: string;
    image?: string | null;
    subjects?: string[]; // Added for a more modern feel
    rating?: number;    // Added for visual interest
  };
};

const TeacherCard = ({ tutor }: TeacherCardProps) => {
  return (
    <div className="group relative w-full max-w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
      {/* Decorative background element */}
      <div className="absolute -right-4 -top-4 size-24 rounded-full bg-sky-50 transition-colors group-hover:bg-sky-100" />

      {/* Header Info */}
      <div className="relative mb-5 flex flex-col items-center">
        {/* Avatar with Ring Effect */}
        <div className="relative z-10 size-28 rounded-full ring-4 ring-white shadow-sm ring-offset-2 ring-offset-slate-50 overflow-hidden">
          <Image
            src={tutor?.image || "/avatar-placeholder.png"}
            alt={tutor?.name || "Tutor Avatar"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority
          />
        </div>
        
        {/* Verified Badge */}
        <div className="absolute bottom-0 right-1/2 translate-x-12 z-20 rounded-full bg-white p-1 shadow-sm">
          <BadgeCheck className="size-5 text-sky-500 fill-sky-50" />
        </div>
      </div>

      {/* Content */}
      <div className="relative text-center">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          {tutor?.name || "Unknown Tutor"}
        </h2>
        
        {/* Sub-text / Rating */}
        <div className="mt-1 flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
           <span className="flex items-center gap-1 text-amber-500">
             <Star className="size-3 fill-current" /> 4.9
           </span>
           <span className="text-slate-300">•</span>
           <span>Professional Tutor</span>
        </div>

        {/* Subjects / Skills Tags */}
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
           <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase text-slate-600">Math</span>
           <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase text-slate-600">Physics</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <Link 
          href={`/all-tutors/${tutor.id}`} 
          className="group/btn flex items-center justify-center gap-2 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-600 active:scale-[0.98]"
        >
          View Full Profile
          <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default TeacherCard;