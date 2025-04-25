import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { getSession } from "@/lib/auth/server";
import { SignOut } from "@/components/auth/signout";
const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Courses",
    href: "/courses",
  },
  {
    title: "Chat",
    href: "/chat",
  },
  // {
  //   title: "Settings",
  //   href: "/settings",
  // },
];

export async function NavMenu() {
  const session = await getSession();

  return (
    <NavigationMenu className="z-[5] w-full flex justify-between px-4 py-3 h-16">
      <div className="flex items-center gap-2">
        <Link href="/">
          <span className="text-xl font-heading">TUTOR</span>
        </Link>
        <NavigationMenuList className="w-full">
          {navItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <span className="m750:max-w-[80px] m750:text-xs">
                    {item.title}
                  </span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </div>
      <div className="flex items-center gap-2">
        {session ? (
          <SignOut />
        ) : (
          <>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="neutral">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </NavigationMenu>
  );
}
