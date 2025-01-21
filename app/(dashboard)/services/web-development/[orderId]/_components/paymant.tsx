"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";

type MilestoneStatus = "pending" | "in-progress" | "completed";
type OrderStatus = "pending" | "in-progress" | "completed" | "cancelled";

const initialOrderData = {
  id: "ORD001",
  client: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    company: "Tech Solutions Inc.",
  },
  service: "Website Development",
  description:
    "Complete website redesign with modern UI/UX, responsive design, and CMS integration",
  status: "in-progress" as OrderStatus,
  date: "2024-01-15",
  amount: "$2,500",
  timeline: "4 weeks",
  milestones: [
    {
      id: "1",
      title: "Project Initiation",
      status: "completed" as MilestoneStatus,
      date: "2024-01-15",
    },
    {
      id: "2",
      title: "Design Phase",
      status: "in-progress" as MilestoneStatus,
      date: "2024-01-22",
    },
    {
      id: "3",
      title: "Development",
      status: "pending" as MilestoneStatus,
      date: "2024-02-05",
    },
    {
      id: "4",
      title: "Testing & Launch",
      status: "pending" as MilestoneStatus,
      date: "2024-02-19",
    },
  ],
  payments: [
    {
      id: "PAY001",
      amount: "$1,000",
      status: "paid",
      date: "2024-01-15",
      type: "deposit",
    },
    {
      id: "PAY002",
      amount: "$1,500",
      status: "pending",
      date: "2024-02-19",
      type: "final payment",
    },
  ],
};

const Payment = () => {
  const [orderData, setOrderData] = useState(initialOrderData);

  return (
    <div className="w-full">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderData.payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{payment.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {payment.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{payment.amount}</span>
                  <Badge
                    variant={
                      payment.status === "paid" ? "default" : "secondary"
                    }
                  >
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payment;
