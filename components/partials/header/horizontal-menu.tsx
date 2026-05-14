"use client";
import React from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useConfig } from "@/hooks/use-config";
import { Icon } from "@/components/ui/icon";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useMediaQuery } from "@/hooks/use-media-query";

// Simple menu data without translations
const getHorizontalMenuList = () => {
  return [
    {
      menus: [
        { href: "/", label: "Home", icon: "heroicons:home", submenus: [] },
        {
          href: "/events",
          label: "Events",
          icon: "heroicons:calendar",
          submenus: [],
        },
        {
          href: "/about",
          label: "About",
          icon: "heroicons:information-circle",
          submenus: [],
        },
        {
          href: "/contact",
          label: "Contact",
          icon: "heroicons:envelope",
          submenus: [],
        },
      ],
    },
  ];
};

export default function HorizontalMenu() {
  const [config] = useConfig();
  const pathname = usePathname();
  const menuList = getHorizontalMenuList();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  if (config.layout !== "horizontal" || !isDesktop) return null;

  return (
    <div>
      <Menubar className="py-2.5 h-auto flex-wrap bg-card border-0">
        {menuList?.map(({ menus }, index) => (
          <React.Fragment key={index}>
            {menus.map(({ href, label, icon, submenus }, index) =>
              submenus.length === 0 ? (
                <MenubarMenu key={index}>
                  <MenubarTrigger asChild>
                    <Link href={href} className="cursor-pointer">
                      <Icon icon={icon} className="h-5 w-5 me-2" />
                      {label}
                    </Link>
                  </MenubarTrigger>
                </MenubarMenu>
              ) : (
                <MenubarMenu key={index}>
                  <MenubarTrigger className="cursor-pointer items-center">
                    <Icon
                      icon={icon}
                      fontSize={18}
                      className="me-1.5 leading-1"
                    />
                    <span>{label}</span>
                    <ChevronDown className="ms-1 h-4 w-4" />
                  </MenubarTrigger>
                  <MenubarContent>
                    {submenus.map(
                      (
                        { href, label, icon: subIcon, children: subChildren = [] },
                        idx,
                      ) =>
                        subChildren?.length === 0 ? (
                          <MenubarItem
                            key={`sub-index-${idx}`}
                            className="cursor-pointer"
                            asChild
                          >
                            <Link href={href}>
                              {subIcon && (
                                <Icon
                                  icon={subIcon}
                                  fontSize={16}
                                  className="me-1.5"
                                />
                              )}
                              {label}
                            </Link>
                          </MenubarItem>
                        ) : (
                          <React.Fragment key={`sub-in-${idx}`}>
                            <MenubarSub>
                              <MenubarSubTrigger>
                                <Link
                                  href={href}
                                  className="flex cursor-pointer"
                                >
                                  {subIcon && (
                                    <Icon
                                      icon={subIcon}
                                      fontSize={18}
                                      className="me-1.5"
                                    />
                                  )}
                                  {label}
                                </Link>
                              </MenubarSubTrigger>
                              <MenubarSubContent>
                                {subChildren?.map(
                                  (
                                    { href: childHref, label: childLabel },
                                    childIdx,
                                  ) => (
                                    <MenubarItem key={childIdx}>
                                      <Link
                                        href={childHref}
                                        className="flex cursor-pointer"
                                      >
                                        {childLabel}
                                      </Link>
                                    </MenubarItem>
                                  ),
                                )}
                              </MenubarSubContent>
                            </MenubarSub>
                          </React.Fragment>
                        ),
                    )}
                  </MenubarContent>
                </MenubarMenu>
              ),
            )}
          </React.Fragment>
        ))}
      </Menubar>
    </div>
  );
}
