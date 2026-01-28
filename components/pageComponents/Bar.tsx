import ZigZagLine from "../../assets/zigzag-line.svg";
import Image, { StaticImageData } from "next/image";
import img1 from "../../assets/Placeholder-7.png";
import img2 from "../../assets/Placeholder-2-1.png";
import img3 from "../../assets/Placeholder-3-1.png";
import img4 from "../../assets/Placeholder-4-1.png";
import img5 from "../../assets/Placeholder-5-1.png";
import img6 from "../../assets/Placeholder-3-1.png";

import Link from "next/link";

type BarContentType = {
  id: string;
  title: string;
  subtitle: string;
  image: StaticImageData;
};

const BarContents: BarContentType[] = [
  {
    id: "01",
    title: "Offering All types of Courses",
    subtitle: "Aeccusamus et iustome odio digniste simos ducimus blanditiis",
    image: img1,
  },
  {
    id: "02",
    title: "Online consultation for all",
    subtitle: "Aeccusamus et iustome odio digniste simos ducimus blanditiis",
    image: img2,
  },
  {
    id: "03",
    title: "A great investment for future",
    subtitle: "Aeccusamus et iustome odio digniste simos ducimus blanditiis",
    image: img3,
  },
  {
    id: "04",
    title: "Best results guaranteed",
    subtitle: "Aeccusamus et iustome odio digniste simos ducimus blanditiis",
    image: img4,
  },
  {
    id: "05",
    title: "Easy to connect with anyone",
    subtitle: "Aeccusamus et iustome odio digniste simos ducimus blanditiis",
    image: img5,
  },
  {
    id: "06",
    title: "All verified tutors for you",
    subtitle: "Aeccusamus et iustome odio digniste simos ducimus blanditiis",
    image: img6,
  },
];

const BottomHeroBar = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-5 text-center space-y-4">
        <Image src={ZigZagLine} alt="zigzag-line" className="mx-auto" />
        <p className="text-sm text-gray-500">
          Better Learning. Better Results
        </p>
        <h1 className="font-semibold text-2xl md:text-3xl">
          Online education platform for all
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Accusamus et iusidio dignissimos ducimus blanditiis praesentium
          voluptatum deleniti atque corrupti quos dolores.
        </p>
      </div>

      {/* CARDS */}
      <div className="container px-12  mt-12 grid grid-cols-1  lg:grid-cols-2 2xl:grid-cols-3 gap-5 justify-items-center">
        {BarContents.map((content) => (
          <BarCard
            key={content.id}
            title={content.title}
            subtitle={content.subtitle}
            image={content.image}
          />
        ))}
      </div>

      <div className="w-full mt-5 flex justify-center items-center">
            <Link href={"/"} className="px-12 py-3 rounded text-white font-bold text-sm hover:cursor-pointer hover:bg-black bg-gray-700">Join Community</Link>
      </div>
    </section>
  );
};

export default BottomHeroBar;

/* ---------------- CARD COMPONENT ---------------- */

type BarCardProps = {
  title: string;
  subtitle: string;
  image: StaticImageData;
};

const BarCard = ({ title, subtitle, image }: BarCardProps) => {
  return (
    <div className="flex gap-4 p-5 w-full h-fit border rounded-sm hover:shadow-md transition-all">
      <Image
        src={image}
        alt="category-image"
        className="w-14 h-14 object-contain"
      />

      <div className="text-left">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
    </div>
  );
};