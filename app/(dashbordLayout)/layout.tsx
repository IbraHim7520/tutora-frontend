import  { ReactNode } from 'react';
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "../dashboard/data.json"
const Dashbordlayout = ({admin , teacher , user}: {admin : ReactNode , teacher: ReactNode , user: ReactNode}) => {
    return (
         <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
            <div>
                {admin}
                {user}
                {teacher}
            </div>
      </SidebarInset>
    </SidebarProvider>
    );
};

export default Dashbordlayout;