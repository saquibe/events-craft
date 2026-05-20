"use client";

import Image from "next/image";
import {
  Building2,
  MapPin,
  Globe,
  Calendar,
  Link as LinkIcon,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, ExternalLink } from "lucide-react";
import type { Organizer } from "./types";

interface OrganizerTableProps {
  organizer: Organizer;
  onEdit: () => void;
}

export function OrganizerTable({ organizer, onEdit }: OrganizerTableProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-muted/50">
            <TableHead className="text-foreground w-1/3">Field</TableHead>
            <TableHead className="text-foreground">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Logo & Banner */}
          <TableRow className="border-border">
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

          <TableRow className="border-border">
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
          <TableRow className="border-border">
            <TableCell className="font-semibold text-foreground">
              Organizer Name
            </TableCell>
            <TableCell className="font-medium">
              {organizer.orgName || "-"}
            </TableCell>
          </TableRow>

          <TableRow className="border-border">
            <TableCell className="font-semibold text-foreground">
              About
            </TableCell>
            <TableCell>{organizer.orgAbout || "-"}</TableCell>
          </TableRow>

          <TableRow className="border-border">
            <TableCell className="font-semibold text-foreground">
              Website
            </TableCell>
            <TableCell>
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

          <TableRow className="border-border">
            <TableCell className="font-semibold text-foreground">
              Tax ID
            </TableCell>
            <TableCell>{organizer.orgTaxId || "-"}</TableCell>
          </TableRow>

          {/* Address */}
          <TableRow className="border-border">
            <TableCell className="font-semibold text-foreground">
              Address
            </TableCell>
            <TableCell>
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
          <TableRow className="border-border">
            <TableCell className="font-semibold text-foreground">
              Facebook
            </TableCell>
            <TableCell>
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

          <TableRow className="border-border">
            <TableCell className="font-semibold text-foreground">
              LinkedIn
            </TableCell>
            <TableCell>
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

          <TableRow className="border-border">
            <TableCell className="font-semibold text-foreground">
              X (Twitter)
            </TableCell>
            <TableCell>
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

          {/* License */}
          <TableRow className="border-border">
            <TableCell className="font-semibold text-foreground">
              Organizer Code
            </TableCell>
            <TableCell className="font-mono">
              {organizer.orgCode || "-"}
            </TableCell>
          </TableRow>

          <TableRow className="border-border">
            <TableCell className="font-semibold text-foreground">
              Validity Period
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>
                  {formatDate(organizer.orgValidFrom)} →{" "}
                  {formatDate(organizer.orgValidTill)}
                </span>
              </div>
            </TableCell>
          </TableRow>

          <TableRow className="border-border">
            <TableCell className="font-semibold text-foreground">
              Total Events
            </TableCell>
            <TableCell>
              <span className="font-semibold text-xl text-primary">
                {organizer.orgEventNo || 0}
              </span>
            </TableCell>
          </TableRow>

          {/* Actions */}
          <TableRow className="border-border">
            <TableCell className="font-semibold text-foreground">
              Actions
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                className="text-primary"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Organizer
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
