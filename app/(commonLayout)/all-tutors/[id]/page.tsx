import Image from 'next/image';
import Link from 'next/link';
import SessionCard from '@/components/pageComponents/SessionCard';

type Props = {
  params: {
    id: string;
  };
};
const SingleTeacherSessionPage = async ({ params }: Props) => {
  const { id } = await params;
  
  

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/getsessions/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  
  const data = await res.json();
  // data structure mapping
  const teacher = data?.data[0]; 
  const sessions = data?.data[0]?.teachingsessions || [];



  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Back Button Container */}
      <div className="mb-8">
        <Link 
          href="/all-tutors" // Apnar iccha moto path change korun
          className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors group"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Teachers
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left Side: Teacher Details (w-1/4) */}
        <aside className="w-full md:w-1/4">
          <div className="sticky top-6 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-36 h-36 mb-5">
                <Image
                  priority
                  src={teacher?.image || "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"}
                  alt={teacher?.name || "Teacher"}
                  quality={100}
                  fill
                  className="rounded-full object-cover ring-4 ring-indigo-50 shadow-inner"
                />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{teacher?.name || "Teacher Name"}</h2>
              <p className="text-sm text-indigo-600 font-medium mb-6">{teacher?.email}</p>
              
              <div className="w-full pt-5 border-t border-gray-50 mt-2 space-y-4 text-left">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Status</p>
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-full border border-green-100">
                    Active Mentor
                  </span>
                </div>
                
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Member Since</p>
                  <p className="text-sm font-semibold text-gray-700">
                    {teacher?.createdAt ? new Date(teacher.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Side: Session Cards (w-3/4) */}
        <main className="w-full md:w-3/4">
          <div className="flex items-center justify-between mb-8 px-2">
            <h1 className="text-3xl font-black text-gray-900">Teaching Sessions</h1>
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
              {sessions.length} Available
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {
              sessions.map((session: typeof sessions[number])  => <SessionCard
                 key={session.id}
                  session={session}
                  teacherEmail={teacher?.email}
                  ></SessionCard> )
            }
          </div>

          {sessions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <p className="text-gray-500 font-medium tracking-tight">No active sessions found for this teacher.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SingleTeacherSessionPage;