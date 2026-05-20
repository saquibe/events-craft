"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, ExternalLink, MapPin } from "lucide-react";
import type { Organizer } from "./types";

interface ProfileTableProps {
  organizer: Organizer;
  onEdit: () => void;
}

export function ProfileTable({ organizer, onEdit }: ProfileTableProps) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border bg-muted/50">
            <TableHead className="text-foreground w-1/3">Field</TableHead>
            <TableHead className="text-foreground">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-border">
            <TableCell className="font-semibold text-foreground">
              Organizer Logo
            </TableCell>
            <TableCell>
              {organizer.orgLogo ? (
                <img
                  src={organizer.orgLogo}
                  alt="Logo"
                  className="h-12 w-12 object-cover rounded"
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
                <img
                  src={organizer.orgBanner}
                  alt="Banner"
                  className="h-16 w-48 object-cover rounded"
                />
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>

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
                  Visit Page
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
                  Visit Page
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
                  Visit Profile
                </a>
              ) : (
                "-"
              )}
            </TableCell>
          </TableRow>

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
                Edit Profile
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
