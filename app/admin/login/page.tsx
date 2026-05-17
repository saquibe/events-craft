//app/admin/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Logo from "@/components/logo";
import Copyright from "@/components/partials/auth/copyright";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";

// Carousel images data
const carouselImages = [
  {
    id: 1,
    src: "/images/all-img/login-bg.png",
    title: "Manage Your Events",
    description:
      "Create, organize, and manage all your events from one dashboard",
  },
  {
    id: 2,
    src: "/images/all-img/login-bg-2.jpg",
    title: "Track Attendees",
    description:
      "Monitor registrations and track attendee engagement in real-time",
  },
  {
    id: 3,
    src: "/images/all-img/login-bg-3.jpg",
    title: "Analytics & Insights",
    description: "Get valuable insights about your events and audience",
  },
];

export default function AdminLoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    // Dummy authentication
    if (
      formData.email === "admin@eventscraft.com" &&
      formData.password === "admin123"
    ) {
      localStorage.setItem("adminAuth", "true");

      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex w-full items-center overflow-hidden min-h-dvh h-dvh basis-full bg-background text-foreground">
      <div className="overflow-y-auto flex flex-wrap w-full h-dvh">
        {/* Left side - Image Carousel */}
        <div className="lg:block hidden flex-1 overflow-hidden relative bg-gradient-to-br from-primary to-primary/80">
          {/* Carousel Images */}
          {carouselImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 z-10" />

              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${image.src})`,
                }}
              />

              {/* Content */}
              <div className="relative z-20 flex flex-col h-full justify-center items-center text-white px-12">
                <Link href="/" className="mb-8">
                  <Image
                    src="/images/logo/logo-w-2.png"
                    alt="EventsCraft"
                    width={400}
                    height={400}
                    className="w-36"
                  />
                </Link>

                <div className="text-center max-w-md">
                  <h2 className="text-4xl font-bold mb-4">{image.title}</h2>

                  <p className="text-lg text-white/90">{image.description}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel Dots */}
          <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? "w-8 h-2 bg-white"
                    : "w-2 h-2 bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex-1 relative">
          <div className="h-full flex flex-col bg-background">
            <div className="max-w-[524px] md:px-[42px] md:py-[44px] p-7 mx-auto w-full text-foreground mb-3 h-full flex flex-col justify-center">
              {/* Mobile Logo */}
              <div className="flex justify-center items-center text-center mb-6 lg:hidden">
                <Link href="/">
                  <Logo />
                </Link>
              </div>

              {/* Header */}
              <div className="text-center 2xl:mb-10 mb-4">
                <h4 className="font-semibold text-3xl">Admin Login</h4>

                <div className="text-muted-foreground text-base mt-2">
                  Administrator and Team Login
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-500 rounded-lg p-3 text-red-600 text-sm text-center">
                    {error}
                  </div>
                )}

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>

                  <div className="relative">
                    {/* <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" /> */}

                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      // className="pl-10"
                      placeholder="admin@eventscraft.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>

                  <div className="relative">
                    {/* <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" /> */}

                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                      className="pr-10"
                      placeholder="••••••••"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Eye className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>

                {/* Login Button */}
                <Button type="submit" color="primary" className="w-full">
                  Login
                </Button>
              </form>

              {/* Divider */}
              <div className="relative border-b border-border pt-6">
                <div className="absolute inline-block bg-background left-1/2 top-1/2 -translate-x-1/2 px-4 min-w-max text-sm text-muted-foreground font-normal">
                  Demo Credentials
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="mt-8 p-4 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  Email:{" "}
                  <span className="font-mono font-medium text-foreground">
                    admin@eventscraft.com
                  </span>
                  <br />
                  Password:{" "}
                  <span className="font-mono font-medium text-foreground">
                    admin123
                  </span>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-xs font-normal text-muted-foreground pb-10 text-center">
              <Copyright />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
