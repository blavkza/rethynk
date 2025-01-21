"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface OrderDetailsProps {
  order: {
    projectType: string;
    designStyle: string;
    budgetRange: string;
    createdAt: string;
    pages: string;
    color: string;
    timeline: string;
  };
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const formatDate = (dateString: string) => {
    const createdAt = new Date(dateString);
    return createdAt.toLocaleDateString("en-GB");
  };

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <div className="text-sm font-medium">Service</div>
              <div className="text-zinc-700">{order.projectType} </div>
            </div>
            <div>
              <div className="text-sm font-medium">Design Style</div>
              <div className="text-zinc-700">{order.designStyle} </div>
            </div>
            <div>
              <div className="text-sm font-medium">Budget Range</div>
              <div className="text-zinc-700">R {order.budgetRange}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Timeline</div>
              <div className="text-zinc-700">{order.timeline}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Preferred Color</div>
              <div className="text-zinc-700">{order.color}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Pages</div>
              <div className="text-zinc-700">{order.pages}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Date</div>
              <div className="text-zinc-700">{formatDate(order.createdAt)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;
