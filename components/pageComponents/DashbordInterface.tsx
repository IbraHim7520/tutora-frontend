import {  Users, BookOpen, GraduationCap, Trophy, Target } from "lucide-react";

const DashbordInterface = () => {
  // Static dummy data for the UI
  const stats = [
    { 
      label: "Active Courses", 
      value: "12", 
      icon: GraduationCap, 
      color: "text-blue-600", 
      bg: "bg-blue-100" 
    },
    { 
      label: "Community Members", 
      value: "1,248", 
      icon: Users, 
      color: "text-indigo-600", 
      bg: "bg-indigo-100" 
    },
    { 
      label: "Hours Learned", 
      value: "450", 
      icon: Trophy, 
      color: "text-amber-600", 
      bg: "bg-amber-100" 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 flex flex-col gap-10">
      
      {/* --- Elegant Hero Section --- */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 md:p-16 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-sky-500/20 text-sky-400 rounded-full border border-sky-500/30">
            Platform Overview
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Knowledge is the <span className="text-sky-400">new currency.</span>
          </h1>
          <p className="mt-6 text-slate-400 text-lg md:text-xl leading-relaxed">
            Welcome to your unified dashboard. Whether you are here to teach, learn, or manage, 
            this space is designed to help you navigate your journey with ease. Explore your 
            statistics, upcoming milestones, and community updates below.
          </p>
        </div>
        
        {/* Subtle Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      {/* --- Grid Stats Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex items-center gap-6">
            <div className={`${item.bg} ${item.color} p-4 rounded-2xl`}>
              <item.icon size={28} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-medium">{item.label}</p>
              <h3 className="text-3xl font-bold text-slate-800">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* --- Content / Info Sections --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Vision Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-rose-500" />
            <h2 className="text-xl font-bold text-slate-800">Mission & Vision</h2>
          </div>
          <p className="text-slate-600 leading-relaxed mb-4">
            Our platform aims to bridge the gap between passion and professional expertise. 
            By providing a seamless interface for both mentors and learners, we foster a 
            global environment of continuous growth.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Real-time collaboration across 15+ timezones.</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Verified resources curated by industry experts.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Community Card */}
        <div className="bg-sky-50 rounded-3xl p-8 border border-sky-100 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-sky-900 mb-4">Community Updates</h2>
            <p className="text-sky-700/80 leading-relaxed">
              We recently hit a milestone of 10,000 successful sessions! Thank you for 
              being a vital part of our growing ecosystem. Stay tuned for new 
              analytical tools coming to your sidebar soon.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-sky-200 flex items-center justify-between text-sky-800 font-medium italic">
            <span>Education is the most powerful weapon.</span>
            <BookOpen size={20} className="opacity-50" />
          </div>
        </div>
      </div>

      {/* --- Bottom Quote --- */}
      <div className="py-10 text-center">
        <p className="text-slate-400 text-sm tracking-widest uppercase">
          &copy; 2026 Learning Management Systems • All Roles Dashboard
        </p>
      </div>
    </div>
  );
};

export default DashbordInterface;