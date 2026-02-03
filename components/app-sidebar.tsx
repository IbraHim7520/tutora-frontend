"use client";

import { MdDashboard, MdAnalytics , MdReviews  } from "react-icons/md";
import { FaBookOpenReader } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { SiSession } from "react-icons/si";

import { FaUsers } from "react-icons/fa";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import useUserData from "@/hooks/useUserData";
import { Skeleton } from "./ui/skeleton";

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
  { title: "My-Sessions", url: "/dashboard/my-sessions", icon: FaBookOpenReader  },
  { title: "Profile", url: "/dashboard/profile", icon: IoMdPerson  },
];

const AdminNavItem = [
  { title: "Dashboard", url: "/dashboard", icon: MdDashboard  },
  { title: "All-Sessions", url: "/dashboard/all-sessions", icon: FaBookOpenReader  },
  { title: "Users", url: "/dashboard/users", icon: FaUsers  },
  { title: "Profile", url: "/dashboard/profile", icon: IoMdPerson  },
];

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user, loading, authenticated } = useUserData();

  // 👇 flat array
  const navMain = user?.role === "teacher" ? TeacherNavItem : user?.role === "admin" ? AdminNavItem : UserNavItem ;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
