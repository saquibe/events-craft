"use client";

import React from "react";
import HeaderContent from "./header-content";
import HeaderSearch from "./header-search";
import ProfileInfo from "./profile-info";
import Notifications from "./notifications";
import Messages from "./messages";
import { Cart } from "./cart";
import ThemeSwitcher from "./theme-switcher";
import { SidebarToggle } from "@/components/partials/sidebar/sidebar-toggle";
import { SheetMenu } from "@/components/partials/sidebar/menu/sheet-menu";
import HorizontalMenu from "./horizontal-menu";
import HeaderLogo from "./header-logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashCodeHeader = () => {
  return (
    <>
      <HeaderContent>
        <div className="flex gap-3 items-center">
          <HeaderLogo />
          <SidebarToggle />
          {/* <HeaderSearch /> */}
        </div>
        <div className="nav-tools flex items-center md:gap-4 gap-3">
          <ThemeSwitcher />
          <Link href="/admin/login">
            <Button className="bg-[#e15a29] hover:bg-[#e15a29]/80 text-white">
              Admin Login
            </Button>
          </Link>
          <SheetMenu />
        </div>
      </HeaderContent>
      <HorizontalMenu />
    </>
  );
};

export default DashCodeHeader;
