"use client";

import Image from "next/image";
import { MapPin, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import type { Organizer } from "./types";

interface ProfileTableProps {
  organizer: Organizer;
  onEdit: () => void;
}

export function ProfileTable({ organizer, onEdit }: ProfileTableProps) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="border-border hover:bg-muted/50">
            <TableHead className="text-foreground w-1/3 font-bold">
              Field
            </TableHead>
            <TableHead className="text-foreground font-bold">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Logo & Banner */}
          <TableRow className="border-border hover:bg-muted/50">
            <TableCell className="font-semibold text-foreground">
              Organizer Logo
            </TableCell>
            <TableCell>
              {organizer.orgLogo ? (
                <Image
                  src={organizer.orgLogo}
                  alt="Logo"
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>

          <TableRow className="border-border hover:bg-muted/50">
            <TableCell className="font-semibold text-foreground">
              Organizer Banner
            </TableCell>
            <TableCell>
              {organizer.orgBanner ? (
                <Image
                  src={organizer.orgBanner}
                  alt="Banner"
                  width={120}
                  height={60}
                  className="rounded-lg object-cover"
                />
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>

          {/* Basic Info */}
          <TableRow className="border-border hover:bg-muted/50">
            <TableCell className="font-semibold text-foreground">
              Organizer Name
            </TableCell>
            <TableCell className="font-medium text-base">
              {organizer.orgName || "-"}
            </TableCell>
          </TableRow>

          <TableRow className="border-border hover:bg-muted/50">
            <TableCell className="font-semibold text-foreground">
              About
            </TableCell>
            <TableCell className="text-base">
              {organizer.orgAbout || "-"}
            </TableCell>
          </TableRow>

          <TableRow className="border-border hover:bg-muted/50">
            <TableCell className="font-semibold text-foreground">
              Website
            </TableCell>
            <TableCell className="text-base">
              {organizer.orgWebsite ? (
                <a
                  href={organizer.orgWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  {organizer.orgWebsite}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>

          <TableRow className="border-border hover:bg-muted/50">
            <TableCell className="font-semibold text-foreground">
              Tax ID
            </TableCell>
            <TableCell className="text-base">
              {organizer.orgTaxId || "-"}
            </TableCell>
          </TableRow>

          {/* Address */}
          <TableRow className="border-border hover:bg-muted/50">
            <TableCell className="font-semibold text-foreground">
              Address
            </TableCell>
            <TableCell className="text-base">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <div>
                  {organizer.orgAddress1 && <div>{organizer.orgAddress1}</div>}
                  {organizer.orgAddress2 && <div>{organizer.orgAddress2}</div>}
                  <div>
                    {organizer.orgCity && `${organizer.orgCity}, `}
                    {organizer.orgState && `${organizer.orgState}, `}
                    {organizer.orgCountry && `${organizer.orgCountry}`}
                    {organizer.orgZip && ` - ${organizer.orgZip}`}
                  </div>
                </div>
              </div>
            </TableCell>
          </TableRow>

          {/* Social Media */}
          <TableRow className="border-border hover:bg-muted/50">
            <TableCell className="font-semibold text-foreground">
              Facebook
            </TableCell>
            <TableCell className="text-base">
              {organizer.orgFb ? (
                <a
                  href={organizer.orgFb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Profile
                </a>
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>

          <TableRow className="border-border hover:bg-muted/50">
            <TableCell className="font-semibold text-foreground">
              LinkedIn
            </TableCell>
            <TableCell className="text-base">
              {organizer.orgLin ? (
                <a
                  href={organizer.orgLin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Profile
                </a>
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>

          <TableRow className="border-border hover:bg-muted/50">
            <TableCell className="font-semibold text-foreground">
              X (Twitter)
            </TableCell>
            <TableCell className="text-base">
              {organizer.orgX ? (
                <a
                  href={organizer.orgX}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Profile
                </a>
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>

          {/* Actions */}
          {/* <TableRow className="border-border hover:bg-muted/50">
            <TableCell className="font-semibold text-foreground">
              Actions
            </TableCell>
            <TableCell className="text-base">
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                className="text-primary"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Profile
              </Button>
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
}
