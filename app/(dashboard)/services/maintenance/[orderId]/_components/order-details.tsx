"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface OrderDetailsProps {
  order: {
    projectType: string;
    platform: string;
    currentIssues: string;
    selectedPlan: string;
    createdAt: string;
    requiredServices: string[];
    price: string;
    supportLevel: string;
    monthlyTraffic: string;
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
            <div className="flex justify-between gap-10 ">
              <div>
                {" "}
                <div>
                  <div className="text-sm font-medium">Service</div>
                  <div className="text-zinc-700">{order.projectType} </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Selected Plan</div>
                  <div className="text-zinc-700">{order.selectedPlan} </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Plan Price</div>
                  <div className="text-zinc-700">{order.price} </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Website Platform</div>
                  <div className="text-zinc-700">{order.platform} </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Platform</div>
                  <div className="text-zinc-700">{order.platform} </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Support Level</div>
                  <div className="text-zinc-700">{order.supportLevel} </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Monthly Traffic</div>
                  <div className="text-zinc-700">{order.monthlyTraffic} </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Date</div>
                  <div className="text-zinc-700">
                    {formatDate(order.createdAt)}
                  </div>
                </div>
              </div>{" "}
              <div>
                <div className="text-sm font-medium">Required Features</div>
                <div className="text-sm text-muted-foreground">
                  {order.requiredServices.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {order.requiredServices.map((requiredService, index) => (
                        <li key={index}>{requiredService}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>No extras available.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;
