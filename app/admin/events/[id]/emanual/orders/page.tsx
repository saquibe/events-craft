"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { OrdersTable } from "@/components/admin/emanual/OrdersTable";
import { Order } from "@/lib/types/emanual";

const mockOrders: Order[] = [
  {
    id: "1",
    exhibitorName: "ABC Company",
    orderNumber: "INV001",
    amount: 500,
    tax: 50,
    total: 550,
    stallNumber: "S001",
    hallNumber: "Hall A",
    status: "Pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    exhibitorName: "XYZ Corporation",
    orderNumber: "INV002",
    amount: 750,
    tax: 75,
    total: 825,
    stallNumber: "S002",
    hallNumber: "Hall B",
    status: "Confirmed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    exhibitorName: "Tech Solutions",
    orderNumber: "INV003",
    amount: 1200,
    tax: 120,
    total: 1320,
    stallNumber: "S003",
    hallNumber: "Hall C",
    status: "Completed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function OrdersPage() {
  const params = useParams();
  const eventId = (params?.id as string) || "";
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleViewDetails = (id: string) => {
    const order = orders.find((o) => o.id === id);
    if (order) {
      alert(
        `Order ${order.orderNumber}\nExhibitor: ${order.exhibitorName}\nTotal: $${order.total}`,
      );
    }
  };

  const handleStatusChange = (id: string, status: Order["status"]) => {
    setOrders(
      orders.map((o) =>
        o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o,
      ),
    );
    alert(`Order status updated to ${status}`);
  };

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      setOrders(
        orders.map((o) =>
          o.id === id
            ? { ...o, status: "Cancelled", updatedAt: new Date().toISOString() }
            : o,
        ),
      );
      alert("Order cancelled successfully");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">
            Manage orders for Event #{eventId}
          </p>
        </div>
      </div>

      <OrdersTable
        orders={orders}
        onViewDetails={handleViewDetails}
        onStatusChange={handleStatusChange}
        onCancel={handleCancel}
      />
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            All Orders ({orders.length})
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card> */}
    </div>
  );
}
