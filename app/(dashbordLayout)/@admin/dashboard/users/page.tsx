import { cookies } from 'next/headers';
import AdminUsersTable from '@/components/pageComponents/AdminUsersTable';

const AdminUserspage = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/all-users`, {
    method: "GET",
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  const result = await res.json();
  const users = result.data || [];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-500 text-sm">Review, filter, and manage permissions for all registered users.</p>
      </div>
      
      <AdminUsersTable initialUsers={users} />
    </div>
  );
};

export default AdminUserspage;