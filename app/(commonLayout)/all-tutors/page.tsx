import TeacherCard from "@/components/pageComponents/TeacherCard";

interface Itutor {
id: string,
  name: string;
  email: string;
  image: string;
  role: string;
  teachingsessions: {
    id: string;
    name: string;
    category: string;
    fromDate: string;
    toDate: string;
    teacherEmail: string;
    image: string;
    status: string;
    description: string,
    teacherId: string
    createdAt: string
    updatedAt: string
  };
}

const Tutorspage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/get-all-teacher`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = await res.json();


  return (
    <div className="container mx-auto px-4 py-10">
      {/* 🔍 Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search tutors by name or email..."
          className="w-full max-w-md rounded-xl border border-sky-200 bg-white px-4 py-2 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center">
        {data?.data?.map((tutor: Itutor) => (
          <TeacherCard key={tutor.id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
};

export default Tutorspage;
