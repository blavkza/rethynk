"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown, ChevronUp, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import toast from "react-hot-toast";

type OrderStatus = "received" | "accepted" | "completed" | "paid" | "cancelled";

type Order = {
  id: string;
  fullName: string;
  packagetype: string;
  status: OrderStatus;
  createdAt: string;
  price: string;
};

const formatDate = (dateString: string) => {
  const createdAt = new Date(dateString);
  return createdAt.toLocaleDateString("en-GB");
};

type SortConfig = {
  key: keyof Order;
  direction: "asc" | "desc";
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "createdAt",
    direction: "desc",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("[FETCH ERROR]", error);
      }
    };

    fetchOrders();
  }, []);

  const sortOrders = (ordersToSort: Order[]) => {
    return [...ordersToSort].sort((a, b) => {
      if (sortConfig.key === "price") {
        const aValue = parseFloat(a[sortConfig.key].replace(/[$,]/g, ""));
        const bValue = parseFloat(b[sortConfig.key].replace(/[$,]/g, ""));
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const handleSort = (key: keyof Order) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (key: keyof Order) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "received":
        return "bg-blue-500";
      case "accepted":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      case "paid":
        return "bg-purple-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const updateOrderStatusInBackend = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      toast.success("Order Updated");
    } catch (error) {
      toast.error("Something went wring");
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    const previousOrders = [...orders];
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    try {
      await updateOrderStatusInBackend(orderId, newStatus);
    } catch (error) {
      setOrders(previousOrders);
      toast.error("Failed to update order status");
    }
  };

  const OrdersTable = ({ orders }: { orders: Order[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Button variant="ghost" className="flex items-center font-semibold">
              View
            </Button>
          </TableHead>
          <TableHead>
            <Button
              variant="ghost"
              onClick={() => handleSort("fullName")}
              className="flex items-center font-semibold"
            >
              Client
              {getSortIcon("fullName")}
            </Button>
          </TableHead>

          <TableHead>
            <Button
              variant="ghost"
              onClick={() => handleSort("status")}
              className="flex items-center font-semibold"
            >
              Status
              {getSortIcon("status")}
            </Button>
          </TableHead>
          <TableHead>
            <Button
              variant="ghost"
              onClick={() => handleSort("createdAt")}
              className="flex items-center font-semibold"
            >
              Date
              {getSortIcon("createdAt")}
            </Button>
          </TableHead>
          <TableHead>
            <Button
              variant="ghost"
              onClick={() => handleSort("price")}
              className="flex items-center font-semibold"
            >
              Amount
              {getSortIcon("price")}
            </Button>
          </TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id} className="hover:bg-muted/50">
            <Link href={`/orders/${order.id}`}>
              <TableCell>
                <Eye className="text-zinc-600 h-5 w-5 ml-6 mt-2" />
              </TableCell>
            </Link>
            <TableCell>{order.fullName}</TableCell>

            <TableCell>
              <Badge className={getStatusColor(order.status)}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>{formatDate(order.createdAt)}</TableCell>
            <TableCell className=" font-semibold">R {order.price}</TableCell>
            <TableCell>
              <Select
                value={order.status}
                onValueChange={(value: OrderStatus) =>
                  updateOrderStatus(order.id, value)
                }
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Update Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="cancelled">Cancel</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const filteredAndSortedOrders = (status: OrderStatus | "all") => {
    const filtered =
      status === "all"
        ? orders
        : orders.filter((order) => order.status === status);
    return sortOrders(filtered);
  };

  return (
    <div className="space-y-4">
      <Tabs
        defaultValue="all"
        className="space-y-4"
        onValueChange={(value) => setActiveTab(value as OrderStatus | "all")}
      >
        <TabsList>
          <TabsTrigger value="all">All Orders ({orders.length})</TabsTrigger>
          <TabsTrigger value="received">
            Received ({orders.filter((o) => o.status === "received").length})
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Accepted ({orders.filter((o) => o.status === "accepted").length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({orders.filter((o) => o.status === "completed").length})
          </TabsTrigger>
          <TabsTrigger value="paid">
            Paid ({orders.filter((o) => o.status === "paid").length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({orders.filter((o) => o.status === "cancelled").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="rounded-md border">
            <OrdersTable orders={filteredAndSortedOrders("all")} />
          </div>
        </TabsContent>

        <TabsContent value="received" className="space-y-4">
          <div className="rounded-md border">
            <OrdersTable orders={filteredAndSortedOrders("received")} />
          </div>
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          <div className="rounded-md border">
            <OrdersTable orders={filteredAndSortedOrders("accepted")} />
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="rounded-md border">
            <OrdersTable orders={filteredAndSortedOrders("completed")} />
          </div>
        </TabsContent>

        <TabsContent value="paid" className="space-y-4">
          <div className="rounded-md border">
            <OrdersTable orders={filteredAndSortedOrders("paid")} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
