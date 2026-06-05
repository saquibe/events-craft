"use client";

import { Calendar } from "lucide-react";
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
import { formatDateRange } from "@/lib/date";

interface LicenseTableProps {
  organizer: Organizer;
  onEdit: () => void;
}

export function LicenseTable({ organizer, onEdit }: LicenseTableProps) {
  // const formatDate = (dateString: string) => {
  //   if (!dateString) return "-";
  //   return new Date(dateString).toLocaleDateString();
  // };

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

          {/* Actions */}
          {/* <TableRow className="border-border hover:bg-muted/50">
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
                Edit License
              </Button>
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </div>
  );
}
