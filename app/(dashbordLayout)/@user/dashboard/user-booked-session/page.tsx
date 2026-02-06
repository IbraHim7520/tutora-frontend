"use client";

import useUserData from "@/hooks/useUserData";
import { CheckCircle, XCircle, Loader2, Inbox, Star } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface TeachingSession {
  id: string;
  name: string;
  teacherEmail: string;
  date: string;
  fromTime: string;
  category: string;
}

type BookingStatus = "BOOKED" | "COMPLETED" | "CANCELLED";

interface BookingData {
  status: BookingStatus;
  teachingsession: TeachingSession;
}

export default function UserBookedSessionPage() {
  const { user } = useUserData();
  const [bookingDatas, setBookingData] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal & Review States
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<TeachingSession | null>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [opinion, setOpinion] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    const getBookingData = async () => {
      setLoading(true);
      try {
        const bookingResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings/my-bookings/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const bookinData = await bookingResponse.json();
        setBookingData(bookinData?.data || []);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    getBookingData();
  }, [user?.id]);

  // Status Update Helper
  const updateLocalStatus = (sessionId: string, newStatus: BookingStatus) => {
    setBookingData((prev) =>
      prev.map((b) =>
        b.teachingsession.id === sessionId ? { ...b, status: newStatus } : b
      )
    );
  };

  // Complete Session
  const handleCompleteSession = async (sessionId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings/complete-session/${sessionId}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed");
      toast.success("Marked as Complete.");
      updateLocalStatus(sessionId, "COMPLETED");
    } catch (err) {
      console.error("Complete session error:", err);
      toast.error("Failed to mark session as completed");
    }
  };

  // Cancel Session
  const handleSessionCancel = async (sessionId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings/cancel-session/${sessionId}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed");

      toast.success("Session Canceled!");
      updateLocalStatus(sessionId, "CANCELLED");
    } catch (err) {
      console.error("Cancel session error:", err);
      toast.error("Failed to cancel session");
    }
  };

  // Review Submit Logic
  const handleReviewSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    //ekhan theke review data niye api baniye review add dibo taile userr er kaj ses
    const ratigData = {
      teachingsessionId: selectedSession?.id,
      rating,
      opinion
    }

    const reviewResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/reviews/new-reviews`,{
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-type" : "Application/json",
      },
      body:JSON.stringify(ratigData)
    })
    const result = await reviewResponse?.json();

    toast.success(result?.message);
    setIsReviewOpen(false);
    setRating(0);
    setOpinion("");
    console.log(result)
    

  };

  return (
    <div className="p-8 min-h-screen bg-slate-50">
      <h1 className="mb-6 text-2xl font-bold">📚 My Booked Sessions</h1>

      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3">Session Name</th>
              <th className="px-4 py-3">Taken By</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Complete</th>
              <th className="px-4 py-3 text-center">Cancel</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center">
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <Loader2 className="animate-spin" size={32} />
                    <p>Loading your sessions...</p>
                  </div>
                </td>
              </tr>
            ) : bookingDatas.length > 0 ? (
              bookingDatas.map((s, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {s.teachingsession.name}
                  </td>
                  <td className="px-4 py-3">
                    {s.teachingsession.teacherEmail}
                  </td>
                  <td className="px-4 py-3">
                    {s.teachingsession.date.split("T")[0]}
                  </td>
                  <td className="px-4 py-3">
                    {s.teachingsession.fromTime.split("T")[1]?.split(".")[0]}
                  </td>
                  <td className="px-4 py-3">
                    {s.teachingsession.category}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        s.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : s.status === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {s.status === "BOOKED" ? "Enrolled" : s.status}
                    </span>
                  </td>

                  {/* Complete / Review Button */}
                  <td className="px-4 py-3 text-center">
                    {s.status === "COMPLETED" ? (
                      <button
                        onClick={() => {
                          setSelectedSession(s.teachingsession);
                          setIsReviewOpen(true);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors"
                      >
                        <Star size={14} className="fill-white" />
                        Review
                      </button>
                    ) : (
                      <button
                        disabled={s.status !== "BOOKED"}
                        onClick={() => handleCompleteSession(s.teachingsession.id)}
                        className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-white ${
                          s.status !== "BOOKED"
                            ? "cursor-not-allowed bg-gray-400"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        <CheckCircle size={16} />
                        Complete
                      </button>
                    )}
                  </td>

                  {/* Cancel */}
                  <td className="px-4 py-3 text-center">
                    <button
                      disabled={s.status !== "BOOKED"}
                      onClick={() => handleSessionCancel(s.teachingsession.id)}
                      className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-white ${
                        s.status !== "BOOKED"
                          ? "cursor-not-allowed bg-gray-400"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      <XCircle size={16} />
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center">
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <Inbox size={48} strokeWidth={1} />
                    <p className="text-lg font-medium">No sessions booked yet.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {isReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold text-slate-800">Submit Review</h2>
            <p className="text-sm text-slate-500 mb-6">Review for: {selectedSession?.name}</p>

            <form onSubmit={handleReviewSubmit} className="space-y-5">
              {/* Star Rating UI */}
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform active:scale-90"
                  >
                    <Star
                      size={32}
                      className={`${
                        star <= (hoverRating || rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Feedback Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Your Opinion</label>
                <textarea
                  required
                  rows={4}
                  value={opinion}
                  onChange={(e) => setOpinion(e.target.value)}
                  placeholder="Tell us about the session..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewOpen(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={rating === 0}
                  className="flex-1 rounded-xl bg-sky-600 py-2.5 text-sm font-semibold text-white hover:bg-sky-700 disabled:bg-slate-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}