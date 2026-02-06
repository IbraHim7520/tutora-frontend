import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import TeacherCard from "./TeacherCard";


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

const OurTeachersSection = async() => {
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
    <section className="py-16 px-6 lg:px-12 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Our Expert Teachers</h2>
            <p className="text-muted-foreground mt-2 max-w-md">
              Learn from industry leaders and certified professional tutors dedicated to your success.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex">
            <Link href="/all-tutors">
              View All Tutors <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        {/* Grid Layout: 2 rows of 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.data?.map((tutor: Itutor) => (
          <TeacherCard key={tutor.id} tutor={tutor} />
        ))}
        </div>

        {/* Mobile View More Button */}
        <div className="mt-10 flex justify-center md:hidden">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/all-tutors">See More Tutors</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OurTeachersSection;