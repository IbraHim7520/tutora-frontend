"use client"
import Image from "next/image";
import placeholder1 from "../assets/Placeholder-4.png"
import placeholder2 from "../assets/Placeholder-4-1.png"
import placeholder3 from "../assets/Placeholder-5-1.png"
import placeholder4 from "../assets/Placeholder-3-1 (1).png"
import bgimage from "../assets/img-05.png"
const stats = [
  {
    id: 1,
    value: "560,616",
    label: "Courses available for verified and top tutors",
    icon: placeholder1, // replace later
  },
  {
    id: 2,
    value: "648,482",
    label: "Total tuition job posted on the platform till date",
    icon: placeholder2,
  },
  {
    id: 3,
    value: "20+ Hours",
    label: "User daily average time spent on the platform",
    icon: placeholder3,
  },
  {
    id: 4,
    value: "7+ Million",
    label: "Active instructors and students available",
    icon: placeholder4,
  },
];

const SuccessSection = () => {
  return (
    <section className="relative w-full bg-sky-50  py-20 overflow-hidden">
    
      <div className="container mx-auto px-5 relative z-10">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
            Stats that explain everything <br />
            about <span className="text-sky-500">#Our success</span>
          </h2>

          <button className="w-fit px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition">
            See how it works →
          </button>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition text-center"
            >
              {/* Icon */}
              <div className="w-20 h-20 mx-auto rounded-full bg-sky-50 flex items-center justify-center mb-6">
                <Image
                  src={item.icon}
                  alt="icon"
                  width={40}
                  height={40}
                />
              </div>

              {/* Number */}
              <h3 className="text-2xl font-bold mb-2">{item.value}</h3>

              {/* Text */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SuccessSection;