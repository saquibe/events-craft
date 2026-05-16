"use client";

import React from "react";
import FooterContent from "./footer-content";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";

const DashCodeFooter = () => {
  return (
    <FooterContent>
      <div className="md:flex justify-between text-default-600 hidden">
        <div className="w-full text-center text-sm">
          © EventsCraft, {new Date().getFullYear()} | Privacy Policy | Terms of
          Service
        </div>
      </div>
      <div className="flex md:hidden justify-around items-center">
        <Link href="/events" className="text-default-600">
          <div>
            <span className="relative cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center mb-1">
              <Icon icon="heroicons-outline:calendar" />
            </span>
            <span className="block text-xs text-default-600">Events</span>
          </div>
        </Link>
        <Link
          href="/admin/login"
          className="relative bg-card bg-no-repeat backdrop-filter backdrop-blur-[40px] rounded-full footer-bg dark:bg-default-300 h-[65px] w-[65px] z-[-1] -mt-[40px] flex justify-center items-center"
        >
          <div className="h-[50px] w-[50px] rounded-full relative left-[0px] top-[0px] custom-dropshadow bg-[#e15a29] flex items-center justify-center text-white font-bold text-xl">
            EC
          </div>
        </Link>
        <Link href="/admin/login">
          <div>
            <span className="relative cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center mb-1">
              <Icon icon="heroicons-outline:user" />
            </span>
            <span className="block text-xs text-default-600">Login</span>
          </div>
        </Link>
      </div>
    </FooterContent>
  );
};

export default DashCodeFooter;
