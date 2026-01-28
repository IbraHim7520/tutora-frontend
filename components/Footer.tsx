import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo-removebg-preview.png"

const Footer = () => {
  return (
    <footer className="w-full bg-sky-50 pt-16">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND */}
        <div className="space-y-4">
          <Image src={Logo} alt="logo" className="w-18" />
          <p className="text-gray-600 text-sm max-w-xs">
            A modern online education platform connecting students with
            verified tutors for a brighter future.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><Link href="#">Home</Link></li>
            <li><Link href="#">Find Tutor</Link></li>
            <li><Link href="#">Courses</Link></li>
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><Link href="#">Blog</Link></li>
            <li><Link href="#">FAQs</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>Email: support@education.com</li>
            <li>Phone: +880 1234 567 890</li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="mt-12 border-t border-sky-100">
        <div className="container mx-auto px-5 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Education Platform. All rights reserved.
          </p>

          <div className="flex gap-4 text-gray-500 text-sm">
            <Link href="#">Facebook</Link>
            <Link href="#">Twitter</Link>
            <Link href="#">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;