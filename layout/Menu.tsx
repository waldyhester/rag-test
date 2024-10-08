"use client";

import type { LucideIcon } from "lucide-react";
import { BarChart4, Bell, Users2, Search, Star } from "lucide-react";
import { BiMenuAltLeft } from "react-icons/bi";
import Link from "next/link";
import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menuLinks: MenuGroup[] = [
  { title: "Dashboard", href: "/dashboard", icon: BarChart4 },
  { title: "Usuários", href: "/users", icon: Users2 },
  { title: "Pesquisa", href: "/search", icon: Search },
  { title: "Favoritos", href: "/favorites", icon: Star },
];

export function Menu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <BiMenuAltLeft className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <MenuList list={menuLinks} />
      </SheetContent>
    </Sheet>
  );
}

type MenuItem = {
  items?: { href: string; name: string }[];
};

type MenuLink = { href?: string; icon?: LucideIcon };

export type MenuGroup = { title: string } & MenuItem & MenuLink;

type MenuListProps = {
  list: MenuGroup[];
};

export function MenuList({ list }: MenuListProps) {
  return (
    <div className="flex h-full flex-col">
      <Accordion type="single" collapsible className="flex-grow">
        {list.map(({ title, href, icon: Icon, items }) => (
          <AccordionItem key={title} value={title}>
            {href ? (
              <Link
                href={href}
                className="flex items-center px-4 py-2 text-sm hover:bg-secondary"
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                <span>{title}</span>
              </Link>
            ) : (
              <>
                <AccordionTrigger className="px-4 py-2 text-sm">
                  <div className="flex items-center">
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    <span>{title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {items?.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-8 py-2 text-sm hover:bg-secondary"
                    >
                      {item.name}
                    </Link>
                  ))}
                </AccordionContent>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
