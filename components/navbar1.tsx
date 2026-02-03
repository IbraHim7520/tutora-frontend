"use client";
import logoImage from "../assets/logo-removebg-preview.png";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
} from "@/components/ui/accordion";
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

const Navbar1 = ({ className }: { className?: string }) => {
  const { user, loading, authenticated } = useUserData()
  console.log(user)
  console.log(loading)
  console.log(authenticated)
  return (
    <section className={cn("py-4", className)}>
      <div className="w-full top-0 px-12">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logoImage}
                width={40}
                height={40}
                quality={100}
                className="dark:invert"
                alt="logo"
              />
              <span className="text-lg font-semibold tracking-tighter">
                Tutora
              </span>
            </Link>

            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/all-tutors"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      Tutors
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="/blogs"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      Blog
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  {
                    authenticated && <NavigationMenuItem>
                      <NavigationMenuLink
                        href="/dashboard"
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                      >
                        Dashboard
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  }
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {
            authenticated ?
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden border">
                  <Image
                    src={user?.image || "/default-avatar.png"}
                    alt={user?.name || "User"}
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Logout
                </Button>
              </div>
              :

              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </div>
          }
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logoImage}
                width={40}
                height={40}
                quality={100}
                className="dark:invert"
                alt="logo"
              />
              <span className="text-lg font-semibold tracking-tighter">
                Tutora
              </span>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>

              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <Image
                        src={logoImage}
                        width={40}
                        height={40}
                        quality={100}
                        className="dark:invert"
                        alt="logo"
                      />
                      <span className="text-lg font-semibold tracking-tighter">
                        Tutora
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    <AccordionItem value="home" className="border-b-0">
                      <Link href="/" className="text-md font-semibold">
                        Home
                      </Link>
                    </AccordionItem>

                    <AccordionItem value="tutors" className="border-b-0">
                      <Link href="/all-tutors" className="text-md font-semibold">
                        Tutors
                      </Link>
                    </AccordionItem>

                    <AccordionItem value="blog" className="border-b-0">
                      <Link href="/blogs" className="text-md font-semibold">
                        Blog
                      </Link>
                    </AccordionItem>

                    <AccordionItem value="dashboard" className="border-b-0">
                      <Link
                        href="/dashboard"
                        className="text-md font-semibold"
                      >
                        Dashboard
                      </Link>
                    </AccordionItem>
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/signup">Sign up</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar1 };
