"use client";

import { useState } from "react";
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
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ServiceType =
  | "Web Design"
  | "Web Development"
  | "E-commerce"
  | "CMS Integration"
  | "SEO Optimization"
  | "Maintenance"
  | "Mobile App";

type OrderStatus = "pending" | "in-progress" | "completed" | "cancelled";

interface Order {
  id: string;
  client: string;
  serviceType: ServiceType;
  status: OrderStatus;
  startDate: string;
  deadline: string;
  amount: string;
  description: string;
}

const initialOrders: Order[] = [
  {
    id: "WD001",
    client: "Tech Solutions Inc.",
    serviceType: "Web Design",
    status: "in-progress",
    startDate: "2024-01-15",
    deadline: "2024-02-15",
    amount: "$3,500",
    description: "Modern website redesign with UI/UX improvements",
  },
  {
    id: "WD002",
    client: "Digital Innovators",
    serviceType: "Web Development",
    status: "completed",
    startDate: "2024-01-10",
    deadline: "2024-02-10",
    amount: "$5,000",
    description: "Full-stack web application development",
  },
  {
    id: "EC001",
    client: "Fashion Boutique",
    serviceType: "E-commerce",
    status: "pending",
    startDate: "2024-01-20",
    deadline: "2024-03-01",
    amount: "$4,500",
    description: "Online store with inventory management",
  },
  {
    id: "CMS001",
    client: "Content Publishers",
    serviceType: "CMS Integration",
    status: "in-progress",
    startDate: "2024-01-18",
    deadline: "2024-02-18",
    amount: "$2,800",
    description: "WordPress integration with custom themes",
  },
  {
    id: "SEO001",
    client: "Local Business",
    serviceType: "SEO Optimization",
    status: "completed",
    startDate: "2024-01-05",
    deadline: "2024-02-05",
    amount: "$1,500",
    description: "SEO audit and optimization",
  },
  {
    id: "MNT001",
    client: "Tech Corp",
    serviceType: "Maintenance",
    status: "in-progress",
    startDate: "2024-01-01",
    deadline: "2024-12-31",
    amount: "$800/month",
    description: "Monthly website maintenance and updates",
  },
  {
    id: "MA001",
    client: "Startup Inc.",
    serviceType: "Mobile App",
    status: "pending",
    startDate: "2024-02-01",
    deadline: "2024-04-01",
    amount: "$15,000",
    description: "iOS and Android app development",
  },
];

type SortConfig = {
  key: keyof Order;
  direction: "asc" | "desc";
};

export default function ServicesPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "startDate",
    direction: "desc",
  });

  const sortOrders = (ordersToSort: Order[]) => {
    return [...ordersToSort].sort((a, b) => {
      if (sortConfig.key === "amount") {
        const aValue = parseFloat(
          a[sortConfig.key].replace(/[$,\/month]/g, "")
        );
        const bValue = parseFloat(
          b[sortConfig.key].replace(/[$,\/month]/g, "")
        );
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
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-yellow-500";
      case "pending":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const ServiceTable = ({
    orders,
    serviceType,
  }: {
    orders: Order[];
    serviceType: ServiceType;
  }) => (
    <div className="rounded-md border mt-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("id")}
                className="flex items-center font-semibold"
              >
                Order ID
                {getSortIcon("id")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("client")}
                className="flex items-center font-semibold"
              >
                Client
                {getSortIcon("client")}
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
                onClick={() => handleSort("startDate")}
                className="flex items-center font-semibold"
              >
                Start Date
                {getSortIcon("startDate")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("deadline")}
                className="flex items-center font-semibold"
              >
                Deadline
                {getSortIcon("deadline")}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="ghost"
                onClick={() => handleSort("amount")}
                className="flex items-center font-semibold"
              >
                Amount
                {getSortIcon("amount")}
              </Button>
            </TableHead>
            <TableHead className="min-w-[200px]">Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.client}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{order.startDate}</TableCell>
              <TableCell>{order.deadline}</TableCell>
              <TableCell>{order.amount}</TableCell>
              <TableCell
                className="max-w-[200px] truncate"
                title={order.description}
              >
                {order.description}
              </TableCell>
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
          {orders.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center text-muted-foreground"
              >
                No {serviceType} orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="flex flex-wrap h-20">
          <TabsTrigger value="all">All Services ({orders.length})</TabsTrigger>
          <TabsTrigger value="web-design">
            Web Design (
            {orders.filter((o) => o.serviceType === "Web Design").length})
          </TabsTrigger>
          <TabsTrigger value="web-development">
            Web Development (
            {orders.filter((o) => o.serviceType === "Web Development").length})
          </TabsTrigger>
          <TabsTrigger value="e-commerce">
            E-commerce (
            {orders.filter((o) => o.serviceType === "E-commerce").length})
          </TabsTrigger>
          <TabsTrigger value="cms">
            CMS Integration (
            {orders.filter((o) => o.serviceType === "CMS Integration").length})
          </TabsTrigger>
          <TabsTrigger value="seo">
            SEO Optimization (
            {orders.filter((o) => o.serviceType === "SEO Optimization").length})
          </TabsTrigger>
          <TabsTrigger value="maintenance">
            Maintenance (
            {orders.filter((o) => o.serviceType === "Maintenance").length})
          </TabsTrigger>
          <TabsTrigger value="mobile-app">
            Mobile App (
            {orders.filter((o) => o.serviceType === "Mobile App").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ServiceTable orders={sortOrders(orders)} serviceType="Web Design" />
        </TabsContent>

        <TabsContent value="web-design">
          <ServiceTable
            orders={sortOrders(
              orders.filter((o) => o.serviceType === "Web Design")
            )}
            serviceType="Web Design"
          />
        </TabsContent>

        <TabsContent value="web-development">
          <ServiceTable
            orders={sortOrders(
              orders.filter((o) => o.serviceType === "Web Development")
            )}
            serviceType="Web Development"
          />
        </TabsContent>

        <TabsContent value="e-commerce">
          <ServiceTable
            orders={sortOrders(
              orders.filter((o) => o.serviceType === "E-commerce")
            )}
            serviceType="E-commerce"
          />
        </TabsContent>

        <TabsContent value="cms">
          <ServiceTable
            orders={sortOrders(
              orders.filter((o) => o.serviceType === "CMS Integration")
            )}
            serviceType="CMS Integration"
          />
        </TabsContent>

        <TabsContent value="seo">
          <ServiceTable
            orders={sortOrders(
              orders.filter((o) => o.serviceType === "SEO Optimization")
            )}
            serviceType="SEO Optimization"
          />
        </TabsContent>

        <TabsContent value="maintenance">
          <ServiceTable
            orders={sortOrders(
              orders.filter((o) => o.serviceType === "Maintenance")
            )}
            serviceType="Maintenance"
          />
        </TabsContent>

        <TabsContent value="mobile-app">
          <ServiceTable
            orders={sortOrders(
              orders.filter((o) => o.serviceType === "Mobile App")
            )}
            serviceType="Mobile App"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
