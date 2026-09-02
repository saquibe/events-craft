"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  Plus,
  Edit2,
  Trash2,
  GripVertical,
  Eye,
  Home,
  Calendar,
  Users,
  Building,
  Menu,
  Newspaper,
  Map,
  QrCode,
  Mic,
  X,
} from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

// Icon mapping for lucide icons
const iconMap: { [key: string]: any } = {
  Home,
  Calendar,
  Users,
  Building,
  Menu,
  Newspaper,
  Map,
  QrCode,
  Mic,
  // Add more icons as needed
};

const availableIcons = [
  { value: "Home", label: "Home" },
  { value: "Calendar", label: "Calendar" },
  { value: "Users", label: "Users" },
  { value: "Building", label: "Building" },
  { value: "Menu", label: "Menu" },
  { value: "Newspaper", label: "Newspaper" },
  { value: "Map", label: "Map" },
  { value: "QrCode", label: "QR Code" },
  { value: "Mic", label: "Mic" },
];

const availablePages = [
  { value: "/feed", label: "Feed" },
  { value: "/venue-map", label: "Venue Map" },
  { value: "/qr-scan", label: "QR Scan" },
  { value: "/agenda", label: "Agenda" },
  { value: "/main-stage", label: "Main Stage" },
  { value: "/people", label: "People" },
  { value: "/expo", label: "Expo" },
  { value: "/menu", label: "Menu" },
  { value: "/", label: "Home" },
];

const mockFeaturedTiles: FeaturedTile[] = [
  {
    id: "1",
    title: "Feed",
    icon: "Newspaper",
    pageLink: "/feed",
    order: 1,
    status: "Active",
  },
  {
    id: "2",
    title: "Venue Map",
    icon: "Map",
    pageLink: "/venue-map",
    order: 2,
    status: "Active",
  },
  {
    id: "3",
    title: "QR Scan",
    icon: "QrCode",
    pageLink: "/qr-scan",
    order: 3,
    status: "Active",
  },
  {
    id: "4",
    title: "Agenda",
    icon: "Calendar",
    pageLink: "/agenda",
    order: 4,
    status: "Active",
  },
  {
    id: "5",
    title: "Main Stage",
    icon: "Mic",
    pageLink: "/main-stage",
    order: 5,
    status: "Active",
  },
];

const mockBottomNav: BottomNavItem[] = [
  {
    id: "1",
    label: "Home",
    icon: "Home",
    pageLink: "/",
    order: 1,
    status: "Active",
  },
  {
    id: "2",
    label: "Agenda",
    icon: "Calendar",
    pageLink: "/agenda",
    order: 2,
    status: "Active",
  },
  {
    id: "3",
    label: "People",
    icon: "Users",
    pageLink: "/people",
    order: 3,
    status: "Active",
  },
  {
    id: "4",
    label: "Expo",
    icon: "Building",
    pageLink: "/expo",
    order: 4,
    status: "Active",
  },
  {
    id: "5",
    label: "Menu",
    icon: "Menu",
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

  // Dialog states
  const [isTileDialogOpen, setIsTileDialogOpen] = useState(false);
  const [isNavDialogOpen, setIsNavDialogOpen] = useState(false);
  const [editingTile, setEditingTile] = useState<FeaturedTile | null>(null);
  const [editingNav, setEditingNav] = useState<BottomNavItem | null>(null);

  // Form states
  const [tileForm, setTileForm] = useState({
    title: "",
    icon: "",
    pageLink: "",
    status: "Active" as "Active" | "Inactive",
  });

  const [navForm, setNavForm] = useState({
    label: "",
    icon: "",
    pageLink: "",
    status: "Active" as "Active" | "Inactive",
  });

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

  // Featured Tile CRUD operations
  const handleAddTile = () => {
    setEditingTile(null);
    setTileForm({
      title: "",
      icon: "",
      pageLink: "",
      status: "Active",
    });
    setIsTileDialogOpen(true);
  };

  const handleEditTile = (tile: FeaturedTile) => {
    setEditingTile(tile);
    setTileForm({
      title: tile.title,
      icon: tile.icon,
      pageLink: tile.pageLink,
      status: tile.status,
    });
    setIsTileDialogOpen(true);
  };

  const handleDeleteTile = (id: string) => {
    setFeaturedTiles(featuredTiles.filter((tile) => tile.id !== id));
  };

  const handleSaveTile = () => {
    if (editingTile) {
      // Edit existing tile
      setFeaturedTiles(
        featuredTiles.map((tile) =>
          tile.id === editingTile.id ? { ...tile, ...tileForm } : tile,
        ),
      );
    } else {
      // Add new tile
      const newTile: FeaturedTile = {
        id: Date.now().toString(),
        ...tileForm,
        order: featuredTiles.length + 1,
      };
      setFeaturedTiles([...featuredTiles, newTile]);
    }
    setIsTileDialogOpen(false);
  };

  // Bottom Nav CRUD operations
  const handleAddNav = () => {
    setEditingNav(null);
    setNavForm({
      label: "",
      icon: "",
      pageLink: "",
      status: "Active",
    });
    setIsNavDialogOpen(true);
  };

  const handleEditNav = (nav: BottomNavItem) => {
    setEditingNav(nav);
    setNavForm({
      label: nav.label,
      icon: nav.icon,
      pageLink: nav.pageLink,
      status: nav.status,
    });
    setIsNavDialogOpen(true);
  };

  const handleDeleteNav = (id: string) => {
    setBottomNav(bottomNav.filter((item) => item.id !== id));
  };

  const handleSaveNav = () => {
    if (editingNav) {
      // Edit existing nav
      setBottomNav(
        bottomNav.map((item) =>
          item.id === editingNav.id ? { ...item, ...navForm } : item,
        ),
      );
    } else {
      // Add new nav
      const newNav: BottomNavItem = {
        id: Date.now().toString(),
        ...navForm,
        order: bottomNav.length + 1,
      };
      setBottomNav([...bottomNav, newNav]);
    }
    setIsNavDialogOpen(false);
  };

  // Helper function to render icon
  const renderIcon = (iconName: string, className: string = "h-4 w-4") => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
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
              <Button size="sm" color="primary" onClick={handleAddTile}>
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
                      <TableCell className="text-2xl">
                        {renderIcon(tile.icon, "h-6 w-6")}
                      </TableCell>
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditTile(tile)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                            onClick={() => handleDeleteTile(tile.id)}
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
              <Button size="sm" color="primary" onClick={handleAddNav}>
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
                      <TableCell className="text-2xl">
                        {renderIcon(item.icon, "h-6 w-6")}
                      </TableCell>
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditNav(item)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                            onClick={() => handleDeleteNav(item.id)}
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
                        <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mx-auto">
                          {renderIcon(tile.icon, "h-8 w-8")}
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
                      <div className="flex justify-center">
                        {renderIcon(item.icon, "h-6 w-6")}
                      </div>
                      <span className="text-xs block">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </SimpleTabsContent>
      </SimpleTabs>

      {/* Add/Edit Tile Dialog */}
      <Dialog open={isTileDialogOpen} onOpenChange={setIsTileDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTile ? "Edit Tile" : "Add New Tile"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tile-title">Title</Label>
              <Input
                id="tile-title"
                value={tileForm.title}
                onChange={(e) =>
                  setTileForm({ ...tileForm, title: e.target.value })
                }
                placeholder="Enter tile title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tile-icon">Icon</Label>
              <Select
                value={tileForm.icon}
                onValueChange={(value) =>
                  setTileForm({ ...tileForm, icon: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {availableIcons.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      <div className="flex items-center gap-2">
                        {renderIcon(icon.value, "h-4 w-4")}
                        <span>{icon.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tile-page">Page Link</Label>
              <Select
                value={tileForm.pageLink}
                onValueChange={(value) =>
                  setTileForm({ ...tileForm, pageLink: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a page" />
                </SelectTrigger>
                <SelectContent>
                  {availablePages.map((page) => (
                    <SelectItem key={page.value} value={page.value}>
                      {page.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tile-status">Status</Label>
              <Select
                value={tileForm.status}
                onValueChange={(value: "Active" | "Inactive") =>
                  setTileForm({ ...tileForm, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsTileDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveTile}>
              {editingTile ? "Update" : "Add"} Tile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Navigation Dialog */}
      <Dialog open={isNavDialogOpen} onOpenChange={setIsNavDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingNav ? "Edit Tab" : "Add New Tab"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nav-label">Label</Label>
              <Input
                id="nav-label"
                value={navForm.label}
                onChange={(e) =>
                  setNavForm({ ...navForm, label: e.target.value })
                }
                placeholder="Enter tab label"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nav-icon">Icon</Label>
              <Select
                value={navForm.icon}
                onValueChange={(value) =>
                  setNavForm({ ...navForm, icon: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an icon" />
                </SelectTrigger>
                <SelectContent>
                  {availableIcons.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      <div className="flex items-center gap-2">
                        {renderIcon(icon.value, "h-4 w-4")}
                        <span>{icon.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nav-page">Page Link</Label>
              <Select
                value={navForm.pageLink}
                onValueChange={(value) =>
                  setNavForm({ ...navForm, pageLink: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a page" />
                </SelectTrigger>
                <SelectContent>
                  {availablePages.map((page) => (
                    <SelectItem key={page.value} value={page.value}>
                      {page.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nav-status">Status</Label>
              <Select
                value={navForm.status}
                onValueChange={(value: "Active" | "Inactive") =>
                  setNavForm({ ...navForm, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNavDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNav}>
              {editingNav ? "Update" : "Add"} Tab
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
