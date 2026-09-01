"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Plus, Edit2, Trash2, GripVertical, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  SimpleTabs,
  SimpleTabsContent,
  SimpleTabsList,
  SimpleTabsTrigger,
} from "@/components/ui/simple-tabs";

interface FeaturedTile {
  id: string;
  title: string;
  icon: string;
  pageLink: string;
  order: number;
  status: "Active" | "Inactive";
}

interface BottomNavItem {
  id: string;
  label: string;
  icon: string;
  pageLink: string;
  order: number;
  status: "Active" | "Inactive";
}

const mockFeaturedTiles: FeaturedTile[] = [
  {
    id: "1",
    title: "Feed",
    icon: "📰",
    pageLink: "/feed",
    order: 1,
    status: "Active",
  },
  {
    id: "2",
    title: "Venue Map",
    icon: "🗺️",
    pageLink: "/venue-map",
    order: 2,
    status: "Active",
  },
  {
    id: "3",
    title: "QR Scan",
    icon: "📱",
    pageLink: "/qr-scan",
    order: 3,
    status: "Active",
  },
  {
    id: "4",
    title: "Agenda",
    icon: "📅",
    pageLink: "/agenda",
    order: 4,
    status: "Active",
  },
  {
    id: "5",
    title: "Main Stage",
    icon: "🎤",
    pageLink: "/main-stage",
    order: 5,
    status: "Active",
  },
];

const mockBottomNav: BottomNavItem[] = [
  {
    id: "1",
    label: "Home",
    icon: "🏠",
    pageLink: "/",
    order: 1,
    status: "Active",
  },
  {
    id: "2",
    label: "Agenda",
    icon: "📅",
    pageLink: "/agenda",
    order: 2,
    status: "Active",
  },
  {
    id: "3",
    label: "People",
    icon: "👥",
    pageLink: "/people",
    order: 3,
    status: "Active",
  },
  {
    id: "4",
    label: "Expo",
    icon: "🏢",
    pageLink: "/expo",
    order: 4,
    status: "Active",
  },
  {
    id: "5",
    label: "Menu",
    icon: "☰",
    pageLink: "/menu",
    order: 5,
    status: "Active",
  },
];

export default function AppHomePage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [featuredTiles, setFeaturedTiles] =
    useState<FeaturedTile[]>(mockFeaturedTiles);
  const [bottomNav, setBottomNav] = useState<BottomNavItem[]>(mockBottomNav);
  const [bannerImage, setBannerImage] = useState<string>("");

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">App Home</h2>
        <p className="text-muted-foreground">
          Configure the home screen of your event app
        </p>
      </div>

      <SimpleTabs defaultValue="banner" className="w-full">
        <SimpleTabsList>
          <SimpleTabsTrigger value="banner">Banner</SimpleTabsTrigger>
          <SimpleTabsTrigger value="featured-tiles">
            Featured Tiles
          </SimpleTabsTrigger>
          <SimpleTabsTrigger value="bottom-nav">
            Bottom Navigation
          </SimpleTabsTrigger>
          <SimpleTabsTrigger value="preview">Preview</SimpleTabsTrigger>
        </SimpleTabsList>

        {/* Banner Tab */}
        <SimpleTabsContent value="banner" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Banner</CardTitle>
              <p className="text-sm text-muted-foreground">
                The main image at the top of your app's home screen.
              </p>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                {bannerImage ? (
                  <div className="space-y-4">
                    <img
                      src={bannerImage}
                      alt="Banner"
                      className="max-w-full h-auto rounded-lg max-h-[200px] mx-auto"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setBannerImage("")}
                    >
                      Remove Banner
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or GIF (size: 398 x 120px, ratio: 3:1)
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="banner-upload"
                      onChange={handleBannerUpload}
                    />
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() =>
                        document.getElementById("banner-upload")?.click()
                      }
                    >
                      Choose Image
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        {/* Featured Tiles Tab */}
        <SimpleTabsContent value="featured-tiles" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Featured Tiles</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Shortcuts shown as icons or images on the home screen
                </p>
              </div>
              <Button size="sm" color="primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Tile
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">#</TableHead>
                    <TableHead>Icon</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Page Link</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {featuredTiles.map((tile) => (
                    <TableRow key={tile.id}>
                      <TableCell>{tile.order}</TableCell>
                      <TableCell className="text-2xl">{tile.icon}</TableCell>
                      <TableCell className="font-medium">
                        {tile.title}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {tile.pageLink}
                      </TableCell>
                      <TableCell>
                        <Badge
                          color={
                            tile.status === "Active" ? "success" : "secondary"
                          }
                        >
                          {tile.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        {/* Bottom Navigation Tab */}
        <SimpleTabsContent value="bottom-nav" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Bottom Navigation</CardTitle>
                <p className="text-sm text-muted-foreground">
                  The tabs bar fixed to the bottom of every screen
                </p>
              </div>
              <Button size="sm" color="primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Tab
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">#</TableHead>
                    <TableHead>Icon</TableHead>
                    <TableHead>Label</TableHead>
                    <TableHead>Page Link</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bottomNav.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.order}</TableCell>
                      <TableCell className="text-2xl">{item.icon}</TableCell>
                      <TableCell className="font-medium">
                        {item.label}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.pageLink}
                      </TableCell>
                      <TableCell>
                        <Badge
                          color={
                            item.status === "Active" ? "success" : "secondary"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </SimpleTabsContent>

        {/* Preview Tab */}
        <SimpleTabsContent value="preview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-w-md mx-auto border rounded-xl overflow-hidden shadow-lg">
                {/* Status Bar */}
                <div className="bg-black text-white px-4 py-2 flex justify-between text-xs">
                  <span>9:41</span>
                  <span>EventsCraft.io</span>
                </div>

                {/* Banner */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                  {bannerImage ? (
                    <img
                      src={bannerImage}
                      alt="Banner"
                      className="w-full h-auto rounded-lg"
                    />
                  ) : (
                    <div className="h-24 flex items-center justify-center bg-white/20 rounded-lg">
                      <span className="text-sm">Image Placeholder</span>
                    </div>
                  )}
                  <h3 className="text-lg font-bold mt-2">
                    Mintu Nath's Event 8
                  </h3>
                  <p className="text-sm opacity-90">Aug 28 - 30, 2026</p>
                </div>

                {/* Featured Tiles Grid */}
                <div className="p-4 bg-white">
                  <div className="grid grid-cols-4 gap-4">
                    {featuredTiles.slice(0, 8).map((tile) => (
                      <div key={tile.id} className="text-center">
                        <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-2xl mx-auto">
                          {tile.icon}
                        </div>
                        <span className="text-xs mt-1 block truncate">
                          {tile.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="border-t bg-white flex justify-around py-2">
                  {bottomNav.map((item) => (
                    <div key={item.id} className="text-center">
                      <div className="text-2xl">{item.icon}</div>
                      <span className="text-xs block">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>
    </div>
  );
}
