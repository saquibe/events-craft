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
import { Eye, ShieldCheck } from "lucide-react";
import type { Organizer } from "./types";
import { formatDateRange } from "@/lib/date";

interface LicenseTableProps {
  organizer: Organizer;
  onEdit: () => void; // kept as "onView" for read-only sheet
}

export function LicenseTable({ organizer, onEdit }: LicenseTableProps) {
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
          <TableRow className="border-border hover:bg-muted/50">
            <TableCell className="font-semibold text-foreground">
              Organizer Code
            </TableCell>
            <TableCell className="font-mono text-base">
              {organizer.orgCode || "-"}
            </TableCell>
          </TableRow>

          <TableRow className="border-border hover:bg-muted/50">
            <TableCell className="font-semibold text-foreground">
              Validity Period
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-base">
                <span>
                  {formatDateRange(
                    organizer.orgValidFrom,
                    organizer.orgValidTill,
                  )}
                </span>
              </div>
            </TableCell>
          </TableRow>

          <TableRow className="border-border hover:bg-muted/50">
            <TableCell className="font-semibold text-foreground">
              Number of Events
            </TableCell>
            <TableCell>
              <span className="font-semibold text-2xl text-primary">
                {organizer.orgEventNo || 0}
              </span>
            </TableCell>
          </TableRow>

          {/* Read-only notice + View action */}
          {/* <TableRow className="border-border hover:bg-muted/50">
            <TableCell className="font-semibold text-foreground">
              Actions
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>
                    License details are managed by EventsCraft and cannot be
                    edited.
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onEdit}
                  className="text-primary w-fit cursor-pointer"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View License
                </Button>
              </div>
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
}
