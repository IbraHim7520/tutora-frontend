"use client";
import logoImage from "../assets/logo-removebg-preview.png";
import { Menu, LayoutDashboard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import useUserData from "@/hooks/useUserData";
import { useEffect, useState } from "react";
import { Logout } from "@/lib/UserLogout";

const Navbar1 = ({ className }: { className?: string }) => {
  const { user, authenticated } = useUserData();

  const [userData , setUserData] = useState(user);
  useEffect(()=>{
      setUserData(user);
  }, [user])
  

  const handleLogout  = async()=>{
    await Logout();
    setUserData(null)    
  }

  return (
    <section className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-4", className)}>
      <div className="w-full px-6 lg:px-12">

        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image src={logoImage} width={40} height={40} quality={100} className="dark:invert" alt="logo" />
              <span className="text-lg font-semibold tracking-tighter">Tutora</span>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground">
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/all-tutors" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground">
                    Tutors
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/blogs" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground">
                    Blog
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {authenticated && (
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/dashboard" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground">
                      Dashboard
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {authenticated ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full overflow-hidden border">
                <Image src={userData?.image || "/default-avatar.png"} alt={userData?.name || "User"} width={36} height={36} className="object-cover" />
              </div>
              <Button onClick={()=>handleLogout()} variant="outline" size="sm" className="text-xs">Logout</Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm"><Link href="/login">Login</Link></Button>
              <Button asChild size="sm"><Link href="/signup">Sign up</Link></Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="flex items-center justify-between lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <Image src={logoImage} width={40} height={40} quality={100} className="dark:invert" alt="logo" />
            <span className="text-lg font-semibold tracking-tighter">Tutora</span>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col justify-between overflow-y-auto">
              <div>
                <SheetHeader className="mb-6">
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <Image src={logoImage} width={35} height={35} alt="logo" className="dark:invert" />
                      <span className="text-lg font-bold">Tutora</span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4">
                  <Link href="/" className="text-md font-medium px-2 py-1 hover:text-primary">Home</Link>
                  <Link href="/all-tutors" className="text-md font-medium px-2 py-1 hover:text-primary">Tutors</Link>
                  <Link href="/blogs" className="text-md font-medium px-2 py-1 hover:text-primary">Blog</Link>
                  {authenticated && (
                    <Link href="/dashboard" className="text-md font-medium px-2 py-1 text-primary flex items-center gap-2">
                      <LayoutDashboard className="size-4" /> Dashboard
                    </Link>
                  )}
                </div>
              </div>

              <div className="mt-auto border-t pt-6">
                {authenticated ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 px-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden border">
                        <Image src={userData?.image || "/default-avatar.png"} alt="User" width={40} height={40} className="object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">{userData?.name || "User"}</span>
                        <span className="text-xs text-muted-foreground">{userData?.email}</span>
                      </div>
                    </div>
                    <Button onClick={()=>handleLogout()} variant="destructive" className="w-full flex items-center gap-2">
                      <LogOut className="size-4" /> Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="w-full">
                      <Link href="/signup">Sign up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

export { Navbar1 };