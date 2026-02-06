import  { ReactNode } from 'react';
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { getUserData } from '@/lib/getCookie';
import { Role } from '@/lib/RoleType';

const Dashbordlayout = async({admin , teacher , user}: {admin : ReactNode , teacher: ReactNode , user: ReactNode}) => {

  const userData = await getUserData()
    return (
         <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar  variant="inset" />
      <SidebarInset>
        <SiteHeader />
            <div>
                {
                  userData.role === Role.student? user : userData.role === Role.admin ? admin :  teacher
                }
            </div>
      </SidebarInset>
    </SidebarProvider>
    );
};

export default Dashbordlayout;