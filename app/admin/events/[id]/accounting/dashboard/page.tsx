"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  FileText,
  Clock,
  CheckCircle,
  Plus,
  Building2,
  Users,
} from "lucide-react";
import { AccountingStats } from "@/lib/types/accounting";

const mockStats: AccountingStats = {
  totalExpenses: 15000,
  totalSponsorIncome: 25000,
  totalRegistrationIncome: 10000,
  totalInvoices: 45,
  pendingInvoices: 12,
  paidInvoices: 33,
};

export default function AccountingDashboardPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";

  const statItems = [
    {
      title: "Total Expenses",
      value: `$${mockStats.totalExpenses}`,
      icon: TrendingDown,
      color: "bg-red-500",
    },
    {
      title: "Sponsor Income",
      value: `$${mockStats.totalSponsorIncome}`,
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      title: "Registration Income",
      value: `$${mockStats.totalRegistrationIncome}`,
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Total Invoices",
      value: mockStats.totalInvoices,
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      title: "Pending Invoices",
      value: mockStats.pendingInvoices,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Paid Invoices",
      value: mockStats.paidInvoices,
      icon: CheckCircle,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Accounting Dashboard
        </h2>
        <p className="text-muted-foreground">
          Overview of accounting for Event #{eventId}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statItems.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Expense</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <Plus className="h-5 w-5" />
              <span>Create Invoice</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <Plus className="h-5 w-5" />
              <span>Record Income</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
            >
              <FileText className="h-5 w-5" />
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
