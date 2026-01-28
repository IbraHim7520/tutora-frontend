"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HeroImage from "../../assets/logo.png";
import Hero_SearchBar from "../Hero_SearchBar";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[calc(100vh-220px)] overflow-hidden flex items-center">
      
      {/* Decorative background blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6 justify-items-start flex flex-col items-center text-center p-5 md:p-0 md:items-start md:text-start"
        >
          <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight text-gray-900">
            A good{" "}
            <span className="text-amber-500">#education</span> is always the
            base of a bright future
          </h1>

          <p className="text-gray-600 text-base sm:text-lg 2xl:text-xl max-w-xl">
            Find verified tutors, hire instantly, and manage learning with
            confidence — all in one place.
          </p>

          <Hero_SearchBar />

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">10K+</p>
              <p className="text-sm text-gray-500">Tutors</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">25K+</p>
              <p className="text-sm text-gray-500">Students</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">100+</p>
              <p className="text-sm text-gray-500">Subjects</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE + FLOATING CARDS */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          {/* Image */}
          <div className="relative w-full  aspect-square rounded-3xl bg-white shadow-xl overflow-hidden">
            <Image
              src={HeroImage}
              alt="Hero Image"
              fill
              priority
              className="object-contain p-6"
            />
          </div>

          {/* Floating Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="hidden lg:block absolute -left-10 top-20 bg-white shadow-lg rounded-xl px-4 py-3"
          >
            <p className="text-sm font-semibold text-gray-800">
              ✔ Verified Tutors
            </p>
            <p className="text-xs text-gray-500">Background checked</p>
          </motion.div>

          {/* Floating Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="hidden lg:block absolute -right-12 bottom-20 bg-white shadow-lg rounded-xl px-4 py-3"
          >
            <p className="text-sm font-semibold text-gray-800">
              ⭐ Top Rated
            </p>
            <p className="text-xs text-gray-500">Trusted by students</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;