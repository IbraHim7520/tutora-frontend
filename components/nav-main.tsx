import Link from "next/link";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Icon } from "@tabler/icons-react";

type NavItem = {
  title: string;
  url: string;
  icon?: Icon;
};

export function NavMain({ items }: { items: NavItem[] }) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link href={item?.url}>
              <span className="flex items-center gap-2">
                {item.icon && <item.icon className="size-4" />}
                <span>{item.title}</span>
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
