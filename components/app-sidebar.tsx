"use client";

import { MdDashboard, MdAnalytics, MdReviews } from "react-icons/md";
import { FaBookOpenReader, FaUsers } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { SiSession } from "react-icons/si";
import * as React from "react";
import logoImage from "../assets/logo-removebg-preview.png";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import useUserData from "@/hooks/useUserData";
import Image from "next/image";

const TeacherNavItem = [
  { title: "Dashboard", url: "/dashboard", icon: MdDashboard  },
  { title: "Create Sessions", url: "/dashboard/create-session", icon: FaBookOpenReader  },
  { title: "Analytics", url: "/dashboard/analytics", icon: MdAnalytics  },
  { title: "Profile", url: "/dashboard/profile", icon: IoMdPerson  },
  { title: "Sessions", url: "/dashboard/sessions", icon: SiSession  },
  { title: "Rating & Reviews", url: "/dashboard/ratings", icon: MdReviews   },
];

const UserNavItem = [
  { title: "Dashboard", url: "/dashboard", icon: MdDashboard  },
  { title: "My-Sessions", url: "/dashboard/user-booked-session", icon: FaBookOpenReader  },
  { title: "Profile", url: "/dashboard/profile", icon: IoMdPerson  },
];

const AdminNavItem = [
  { title: "Dashboard", url: "/dashboard", icon: MdDashboard  },
  { title: "All-Sessions", url: "/dashboard/all-sessions", icon: FaBookOpenReader  },
  { title: "Users", url: "/dashboard/users", icon: FaUsers  },
  { title: "Profile", url: "/dashboard/profile", icon: IoMdPerson  },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user, loading } = useUserData();

  const getNavItems = () => {
    if (!user) return UserNavItem;
    const role = user.role?.toLowerCase();

    if (role === "teacher" ) {
      return TeacherNavItem;
    }
    if (role === "admin") {
      return AdminNavItem;
    }
    return UserNavItem;
  };

  const navMain = getNavItems();

  // 2. Handle Loading State 
  // If loading, you might want to show a skeleton or return null 
  // to prevent "UserNavItem" from flashing for an Admin.
  if (loading) {
    return (
      <Sidebar {...props}>
        <SidebarContent>
           <div className="p-4 space-y-4">
              <div className="h-8 w-full animate-pulse bg-gray-400 rounded" />
              <div className="h-8 w-full animate-pulse bg-gray-400 rounded" />
              <div className="h-8 w-full animate-pulse bg-gray-400 rounded" />
              <div className="h-8 w-full animate-pulse bg-gray-400 rounded" />
              <div className="h-8 w-full animate-pulse bg-gray-400 rounded" />
              <div className="h-8 w-full animate-pulse bg-gray-400 rounded" />
              <div className="h-8 w-full animate-pulse bg-gray-400 rounded" />
           </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
             <div className="flex items-center gap-2 px-4 py-2">
              <Image src={logoImage} alt={"tutora-logo"} width={30} height={30} quality={100} priority ></Image>
                <span className="font-bold">Tutora</span>
             </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Pass the dynamic items here */}
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}