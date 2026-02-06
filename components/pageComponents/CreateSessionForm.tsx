"use client";
import { UploadCloud, Calendar, Clock, BookOpen, Users, Info, ChevronDown } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Spinner } from "../ui/spinner";

interface SessionFormData {
  SessionName: string;
  Category: string;
  Date: Date;
  FromTime: string;
  ToTime: string;
  MaxStudents: number;
  Image: string;
  Description: string;
}

const CreateSessionForm = () => {
  const { register, handleSubmit, reset, watch } = useForm<SessionFormData>();
  const [loading, setLoading] = useState(false);
  const selectedImage = watch("Image");

  const onSubmit: SubmitHandler<SessionFormData> = async (data) => {
    setLoading(true);
    if (!data) {
      setLoading(false);
      return toast.error("Invalid Session info");
    }

    const fromData = new FormData();
    fromData.append("file", data.Image[0]);
    fromData.append("upload_preset", "tutora");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL!}`, {
        method: "POST",
        body: fromData,
      });
      const result = await res.json();
      const imageURL: string = result.secure_url as string;

      data.Image = imageURL;

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/session/session-post`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "Application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setLoading(false);
        toast.success("Session is Submitted.");
        reset();
      } else {
        setLoading(false);
        toast.error("Failed to create session");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred");
      console.log(error)
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-200">
        {/* Header Decor */}
        <div className="bg-sky-600 px-8 py-10 text-white">
          <h1 className="text-3xl font-bold">Create Session</h1>
          <p className="mt-2 text-sky-100">Fill in the details below to schedule your new teaching session.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-10">
          <div className="space-y-8">
            {/* Section 1: Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Session Title</label>
                <div className="mt-2 relative group">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                  <input
                    {...register("SessionName")}
                    placeholder="e.g. Masterclass in System Design"
                    className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 pl-12 pr-4 py-3 focus:border-sky-500 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 ml-1">Category</label>
                <div className="mt-2 relative">
                  <select 
                    {...register("Category")} 
                    className="w-full appearance-none rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-4 py-3 focus:border-sky-500 focus:bg-white outline-none transition-all cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    <option>Web Development</option>
                    <option>UI/UX Design</option>
                    <option>Backend</option>
                    <option>Mobile App</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 ml-1">Maximum Seats</label>
                <div className="mt-2 relative group">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                  <input
                    {...register("MaxStudents")}
                    type="number"
                    placeholder="30"
                    className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 pl-12 pr-4 py-3 focus:border-sky-500 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Section 2: Scheduling */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-semibold text-slate-700 ml-1">Date</label>
                <div className="mt-2 relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                  <input
                    {...register("Date")}
                    type="date"
                    className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 pl-12 pr-4 py-3 focus:border-sky-500 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 ml-1">Start Time</label>
                <div className="mt-2 relative group">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                  <input
                    {...register("FromTime")}
                    type="time"
                    className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 pl-12 pr-4 py-3 focus:border-sky-500 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 ml-1">End Time</label>
                <div className="mt-2 relative group">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                  <input
                    {...register("ToTime")}
                    type="time"
                    className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50/50 pl-12 pr-4 py-3 focus:border-sky-500 focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Section 3: Media & Details */}
            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-slate-700 ml-1">Session Banner</label>
                <label className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl p-8 cursor-pointer hover:border-sky-500 hover:bg-sky-50 transition-all group">
                  <div className="p-4 rounded-full bg-sky-50 group-hover:bg-sky-100 transition-colors">
                    <UploadCloud className="size-8 text-sky-600" />
                  </div>
                  <span className="mt-3 text-sm font-medium text-slate-600">
                    {selectedImage?.[0]?.name ? selectedImage[0].name : "Click to upload banner image"}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">PNG, JPG or WebP (Max 5MB)</span>
                  <input {...register("Image")} type="file" className="hidden" />
                </label>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 ml-1">Description</label>
                <div className="mt-2 relative group">
                  <Info className="absolute left-4 top-4 size-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                  <textarea
                    rows={4}
                    {...register("Description")}
                    placeholder="Provide a detailed overview of the session curriculum..."
                    className="w-full rounded-3xl border-2 border-slate-100 bg-slate-50/50 pl-12 pr-4 py-4 focus:border-sky-500 focus:bg-white outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
              <button
                type="reset"
                onClick={() => reset()}
                className="px-8 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={loading}
                className="min-w-45 px-8 py-3 flex justify-center items-center rounded-2xl bg-sky-600 font-bold text-white hover:bg-sky-700 shadow-lg shadow-sky-200 active:scale-[0.98] transition-all disabled:opacity-70"
              >
                {loading ? <Spinner /> : "Launch Session"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSessionForm;