"use client";

import Link from "next/link";
import Logo from "@/components/logo";

export default function HeaderLogo() {
  return (
    <Link href="/">
      <Logo />
    </Link>
  );
}
