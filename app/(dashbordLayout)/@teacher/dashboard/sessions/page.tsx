import SessionTable from "@/components/pageComponents/SessionTable";
import { cookies } from "next/headers";

const TeachersSessionspage = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/session/all-sessions`, {
    method: "GET",
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch sessions");

  const result = await res.json();
  const sessions = result.data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Teacher Sessions</h1>
      <SessionTable initialSessions={sessions} />
    </div>
  );
};

export default TeachersSessionspage;