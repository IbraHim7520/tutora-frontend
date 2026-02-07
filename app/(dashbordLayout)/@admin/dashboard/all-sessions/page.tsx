import AdminSessionTables from "@/components/pageComponents/AdminSessionsTable";
import { cookies } from "next/headers";

const AminAllSessionsPage = async () => {
    const coki = await cookies();
    const allCookies = coki.toString();
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/session/every-sessions`, {
        method: "GET",
        headers: { Cookie: allCookies },
        cache: 'no-store'
    });
    
    const sessionData = await response.json();

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600">Manage and monitor all Basic to Advance sessions.</p>
            </div>
            
            <AdminSessionTables initialData={sessionData?.data || []} />
        </div>
    );
};

export default AminAllSessionsPage;