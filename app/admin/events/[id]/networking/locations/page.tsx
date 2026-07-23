"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { LocationTable } from "@/components/admin/networking/LocationTable";
import { LocationFormSheet } from "@/components/admin/networking/LocationFormSheet";
import { Location } from "@/lib/types/networking";
import { CreateButton } from "@/components/admin";

const mockLocations: Location[] = [
  {
    id: "1",
    name: "Hall A",
    description: "Main conference hall",
    capacity: 50,
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Hall B",
    description: "Secondary hall",
    capacity: 30,
    status: "Active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function LocationsPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  const handleSubmit = async (data: any) => {
    if (editingLocation) {
      setLocations(
        locations.map((l) =>
          l.id === editingLocation.id
            ? { ...l, ...data, updatedAt: new Date().toISOString() }
            : l,
        ),
      );
    } else {
      const newLocation: Location = {
        id: String(locations.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setLocations([...locations, newLocation]);
    }
    setIsFormOpen(false);
    setEditingLocation(null);
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setLocations(locations.filter((l) => l.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Locations / Tables
          </h2>
          <p className="text-muted-foreground">
            Manage meeting locations for Event #{eventId}
          </p>
        </div>
        <CreateButton
          label="Add Location"
          onClick={() => {
            setEditingLocation(null);
            setIsFormOpen(true);
          }}
        />
      </div>

      <LocationTable
        locations={locations}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <LocationFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        location={editingLocation}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
