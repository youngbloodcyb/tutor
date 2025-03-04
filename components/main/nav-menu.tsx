"use client";

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
    title: "Chats",
    href: "/chats",
  },
  {
    title: "Settings",
    href: "/settings",
  },
];

export function NavMenu() {
  return (
    <NavigationMenu className="z-[5] w-full flex justify-between px-4 py-3">
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
        <Button>Login</Button>
        <Button variant="neutral">Sign Up</Button>
      </div>
    </NavigationMenu>
  );
}
