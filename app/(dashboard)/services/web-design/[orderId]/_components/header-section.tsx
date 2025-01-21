"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

type OrderStatus = "received" | "accepted" | "completed" | "paid" | "cancelled";

interface HeaderSectionProps {
  order: {
    id: string;
    status: OrderStatus;
  };
}

const HeaderSection = ({ order }: HeaderSectionProps) => {
  const [orderData, setOrderData] = useState(order);
  const [loading, setLoading] = useState(false);

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

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/services/web-development/${orderData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: orderData.status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the order status");
      }

      const updatedOrder = await response.json();
      setOrderData(updatedOrder);
      toast.success("Order status updated successfully!");
    } catch (error) {
      toast.error("Something went wrong while updating the order.");
      console.error("[Update Error]", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Link href="/services/web-design">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">Order</h1>
        <Badge className={getStatusColor(orderData.status)}>
          {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
        </Badge>
      </div>
      <div className="flex space-x-2">
        <Select
          value={orderData.status}
          onValueChange={(value: OrderStatus) =>
            setOrderData((prev) => ({ ...prev, status: value }))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Update Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="received">Received</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSaveChanges} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default HeaderSection;
