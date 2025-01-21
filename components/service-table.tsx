"use client";

import { useEffect, useState } from "react";
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
import Link from "next/link";

type OrderStatus = "received" | "accepted" | "completed" | "paid" | "cancelled";

export interface ServiceOrder {
  id: string;
  fullName: string;
  status: OrderStatus;
  createdAt: string;
  email: string;
  projectType: string;
}

interface ServiceTableProps {
  orders: ServiceOrder[] | null;
  orderLink: (id: string) => string;
}

type SortConfig = {
  key: keyof ServiceOrder;
  direction: "asc" | "desc";
};

export function ServiceTable({
  orders: initialOrders,
  orderLink,
}: ServiceTableProps) {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "createdAt",
    direction: "desc",
  });

  useEffect(() => {
    if (initialOrders) {
      setOrders(initialOrders);
    }
  }, [initialOrders]);

  const sortOrders = (ordersToSort: ServiceOrder[]) =>
    [...ordersToSort].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });

  const handleSort = (key: keyof ServiceOrder) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (key: keyof ServiceOrder) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  const getStatusColor = (status: OrderStatus) => {
    const statusColors = {
      received: "bg-blue-500",
      accepted: "bg-yellow-500",
      completed: "bg-green-500",
      paid: "bg-purple-500",
      cancelled: "bg-red-500",
    };
    return statusColors[status] || "bg-gray-500";
  };

  const formatDate = (dateString: string) => {
    const createdAt = new Date(dateString);
    return createdAt.toLocaleDateString("en-GB");
  };

  const sortedOrders = orders ? sortOrders(orders) : [];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>View</TableHead>
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
                onClick={() => handleSort("projectType")}
                className="flex items-center font-semibold"
              >
                Service
                {getSortIcon("projectType")}
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedOrders.length > 0 ? (
            sortedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Link href={orderLink(order.id)}>
                    <Eye className="text-zinc-600 h-5 w-5 ml-6 mt-2 cursor-pointer" />
                  </Link>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.fullName}</div>
                    <div className="text-sm text-muted-foreground">
                      {order.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{order.projectType}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
