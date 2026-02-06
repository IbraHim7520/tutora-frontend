"use client";
import useUserData from "@/hooks/useUserData";
import { Calendar, Clock, Users, Star, ArrowRight, Hourglass } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Spinner } from "../ui/spinner";

type Session = {
  id: string;
  image: string;
  name: string;
  description: string;
  date: string;
  fromTime: string;
  toTime: string;
  maxStudent: number;
  rating: number;
};

type SessionCardProps = {
  session: Session;
  teacherEmail: string;
};

const SessionCard = ({ session, teacherEmail }: SessionCardProps) => {
  const { user, authenticated } = useUserData();
  const [loading, setLoading] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const router = useRouter();



  const calculateDuration = () => {
    const [fromH, fromM] = session.fromTime.split(":").map(Number);
    const [toH, toM] = session.toTime.split(":").map(Number);

    const fromDate = new Date();
    fromDate.setHours(fromH, fromM, 0, 0);

    const toDate = new Date();
    toDate.setHours(toH, toM, 0, 0);

    let diff = (toDate.getTime() - fromDate.getTime()) / 60000;
    if (diff < 0) diff += 24 * 60;

    return diff;
  };

  const handleBooking = async () => {
    if (loading || isBooked) return;

    setLoading(true);

    if (!authenticated) {
      setLoading(false);
      return router.push("/login");
    }

    if (user?.email === teacherEmail) {
      setLoading(false);
      return toast.error("You're not allowed to book your own session");
    }

    try {
      const bookingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings/confirm-bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ sessionId: session.id }),
        }
      );

      const result = await bookingResponse.json();

      if (bookingResponse.ok) {
        toast.success("Session Successfully Confirmed.");
        setIsBooked(true);
      } else {
        toast.error(result?.message || "Booking failed");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative w-full max-w-95 overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 transition-all duration-300 hover:shadow-2xl hover:shadow-sky-100">
      {/* Banner */}
      <div className="relative h-52 w-full overflow-hidden rounded-[1.5rem]">
        <Image
          src={session.image || "/placeholder-session.jpg"}
          alt={session.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-slate-900 shadow-sm">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          {session.rating.toFixed(1)}
        </div>
      </div>

      {/* Content */}
      <div className="px-3 pt-5 pb-2">
        <h3 className="text-xl font-bold text-slate-800">{session.name}</h3>
        <p className="text-sm text-slate-500">{session.description}</p>

        <div className="grid grid-cols-2 gap-y-3 rounded-2xl bg-slate-50 p-4 mb-6">
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="size-4 text-sky-500" />
            <span className="text-xs font-medium">
              {session.date.split("T")[0]}
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="size-4 text-sky-500" />
            <span className="text-xs font-medium">{session.fromTime}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <Hourglass className="size-4 text-sky-500" />
            <span className="text-xs font-medium">
              {calculateDuration()} min
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <Users className="size-4 text-sky-500" />
            <span className="text-xs font-medium">
              {session.maxStudent} Seats
            </span>
          </div>
        </div>

        <button
          onClick={handleBooking}
          disabled={loading || isBooked}
          className={`w-full rounded-xl p-1 pl-5 transition-all 
            ${
              isBooked
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700"
            }
          `}
        >
          {loading ? (
            <Spinner />
          ) : isBooked ? (
            <span className="block text-sm font-bold text-white py-2">
              Booked ✔
            </span>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">Book Now</span>
              <div className="flex size-10 items-center justify-center rounded-lg bg-white/20">
                <ArrowRight className="size-5 text-white" />
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default SessionCard;
