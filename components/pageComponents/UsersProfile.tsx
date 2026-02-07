"use client"
import { 
  Mail, ShieldCheck, LayoutGrid, Star, Trash2, 
  Settings2, BookOpen, Calendar, Users as UsersIcon, 
  CheckCircle2, XCircle, Clock, Loader2, User, X, Camera, Upload
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";

interface UserProfileData {
  role: "student" | "teacher" | "admin";
  name: string;
  email: string;
  image: string;
  memberSince: string;
  totalBookedSessions?: number;
  completedSessions?: number;
  cancelledSessions?: number;
  totalOwnSessions?: number;
  totalEnrolledStudents?: number;
  averageRating?: number;
  pendingSessions?: number;
  totalUsers?: number;
  totalTeachers?: number;
  totalSessions?: number;
  sessionStatusStats?: {
    pending: number;
    approved: number;
    rejected: number;
  };
}

const UsersProfile = () => {
  const [data, setData] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for button loading
  
  // Modal & Form States
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    email: ""
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/user-analytics`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-type": "Application/json" },
        }
      );
      const result = await response.json();
      if (result?.data) {
        setData(result.data);
        setUpdateFormData({
          name: result.data.name,
          email: result.data.email
        });
        setPreviewUrl(result.data.image);
      }
    } catch (error) {
      console.error("Profile Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const uploadImageToCloudinary = async (file: File) => {
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`, {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result?.error?.message || "Image upload failed");
    return result;
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = data?.image || "";

      // 1. Upload image if a new one is selected
      if (selectedFile) {
        const uploadResult = await uploadImageToCloudinary(selectedFile);
        imageUrl = uploadResult.secure_url;
      }

      const payload = {
        name: updateFormData.name,
        email: updateFormData.email,
        image: imageUrl,
      };

      // 2. Update Backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/update-profile`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resultData = await response.json();

      if (resultData.success) {
        // 3. Update Local State immediately so UI reflects changes
        setData((prev) => prev ? ({
          ...prev,
          name: payload.name,
          email: payload.email,
          image: payload.image
        }) : null);

        toast.success(resultData.message || "Profile updated successfully!");
        setIsUpdateModalOpen(false);
        setSelectedFile(null); // Reset file selection
      } else {
        toast.error(resultData.message || "Update failed");
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="size-10 animate-spin text-sky-600" />
      </div>
    );
  }

  if (!data) return <div className="p-10 text-center text-red-500">Failed to load profile data.</div>;

  const memberDate = new Date(data.memberSince).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-12 relative">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          
          <div className="relative h-40 bg-linear-to-r from-sky-600 via-blue-700 to-indigo-800">
            <div className="absolute -bottom-16 left-8">
              <div className="relative size-32 rounded-3xl border-4 border-white bg-slate-100 shadow-xl overflow-hidden">
                <Image
                  src={data.image || "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="pt-20 pb-8 px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-slate-800">{data.name}</h1>
                <span className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider 
                  ${data.role === 'admin' ? 'bg-rose-100 text-rose-600' : 
                    data.role === 'teacher' ? 'bg-amber-100 text-amber-600' : 'bg-sky-100 text-sky-600'}`}>
                  <ShieldCheck className="size-3" /> {data.role}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-slate-500 text-sm">
                <p className="flex items-center gap-1.5 font-medium"><Mail className="size-4" /> {data.email}</p>
                <p className="flex items-center gap-1.5 font-medium"><Calendar className="size-4" /> Member since {memberDate}</p>
              </div>
            </div>

            {data.role === 'teacher' && (
              <div className="flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-2 border border-amber-100 self-start md:self-auto">
                <Star className="size-5 fill-amber-400 text-amber-400" />
                <span className="text-xl font-bold text-amber-700">{data.averageRating}</span>
                <span className="text-xs text-amber-600 font-medium">Rating</span>
              </div>
            )}
          </div>

          <hr className="mx-8 border-slate-100" />

          {/* Stats Section */}
          <div className="p-8">
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-400">Account Analytics</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.role === 'student' && (
                <>
                  <StatCard icon={<LayoutGrid />} label="Total Booked" value={data.totalBookedSessions} color="text-sky-600" bg="bg-sky-50" />
                  <StatCard icon={<CheckCircle2 />} label="Completed" value={data.completedSessions} color="text-green-600" bg="bg-green-50" />
                  <StatCard icon={<XCircle />} label="Cancelled" value={data.cancelledSessions} color="text-rose-600" bg="bg-rose-50" />
                </>
              )}
              {data.role === 'teacher' && (
                <>
                  <StatCard icon={<BookOpen />} label="Own Sessions" value={data.totalOwnSessions} color="text-indigo-600" bg="bg-indigo-50" />
                  <StatCard icon={<UsersIcon />} label="Students" value={data.totalEnrolledStudents} color="text-emerald-600" bg="bg-emerald-50" />
                  <StatCard icon={<Clock />} label="Pending" value={data.pendingSessions} color="text-amber-600" bg="bg-amber-50" />
                </>
              )}
              {data.role === 'admin' && (
                <>
                  <StatCard icon={<User />} label="Total Users" value={data.totalUsers} color="text-blue-600" bg="bg-blue-50" />
                  <StatCard icon={<UsersIcon />} label="Total Teachers" value={data.totalTeachers} color="text-purple-600" bg="bg-purple-50" />
                  <StatCard icon={<LayoutGrid />} label="Sessions" value={data.totalSessions} color="text-slate-700" bg="bg-slate-100" />
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 px-8 py-6 border-t border-slate-100">
            <button 
              onClick={() => setIsUpdateModalOpen(true)}
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-200 active:scale-[0.98]"
            >
              <Settings2 className="size-4" /> Update Profile
            </button>
            <button className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-8 py-3.5 text-sm font-bold text-red-600 transition-all hover:bg-red-50 active:scale-[0.98]">
              <Trash2 className="size-4" /> Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md animate-in fade-in zoom-in duration-200 rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Edit Profile</h2>
              <button 
                disabled={isSubmitting}
                onClick={() => setIsUpdateModalOpen(false)} 
                className="text-slate-400 hover:text-slate-600 disabled:opacity-50"
              >
                <X className="size-6" />
              </button>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-5">
              
              {/* Image Selection Block */}
              <div className="flex flex-col items-center gap-4 mb-2">
                <div className="group relative size-24 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden transition-all hover:border-sky-400">
                  {previewUrl ? (
                    <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                  ) : (
                    <Camera className="size-8 text-slate-300" />
                  )}
                  <button 
                    disabled={isSubmitting}
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity disabled:cursor-not-allowed"
                  >
                    <Upload className="text-white size-6" />
                  </button>
                </div>
                <input 
                  type="file" 
                  hidden 
                  ref={fileInputRef} 
                  accept="image/*" 
                  onChange={handleImageChange}
                />
                <button 
                  disabled={isSubmitting}
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold text-sky-600 uppercase tracking-widest hover:text-sky-700 disabled:opacity-50"
                >
                  {selectedFile ? "File Selected" : "Change Photo"}
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 size-5 text-slate-400" />
                  <input 
                    type="text"
                    required
                    disabled={isSubmitting}
                    value={updateFormData.name}
                    onChange={(e) => setUpdateFormData({...updateFormData, name: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 disabled:opacity-70"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 size-5 text-slate-400" />
                  <input 
                    type="email"
                    required
                    disabled={isSubmitting}
                    value={updateFormData.email}
                    onChange={(e) => setUpdateFormData({...updateFormData, email: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100 disabled:opacity-70"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  disabled={isSubmitting}
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-sky-600 py-3 text-sm font-bold text-white hover:bg-sky-700 shadow-lg shadow-sky-100 disabled:bg-sky-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value?: number | string | null;
  color?: string;
  bg?: string;
}

const StatCard = ({ icon, label, value, color, bg }: StatCardProps) => (
  <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:border-slate-300 transition-colors">
    <div className={`flex size-12 items-center justify-center rounded-xl ${bg} ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-xl font-bold text-slate-800">{value ?? 0}</p>
      <p className="text-xs font-medium text-slate-500">{label}</p>
    </div>
  </div>
);

export default UsersProfile;