"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface OrderDetailsProps {
  order: {
    projectType: string;
    cmsType: string;
    numberOfusers: string;
    budgetRange: string;
    createdAt: string;
    requiredFeatures: string[];
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
            <div className="flex gap-10">
              <div>
                {" "}
                <div>
                  <div className="text-sm font-medium">Service</div>
                  <div className="text-zinc-700">{order.projectType} </div>
                </div>
                <div>
                  <div className="text-sm font-medium">CMS Type</div>
                  <div className="text-zinc-700">{order.cmsType} </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Number Of Users</div>
                  <div className="text-zinc-700">{order.numberOfusers} </div>
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
                  <div className="text-sm font-medium">Date</div>
                  <div className="text-zinc-700">
                    {formatDate(order.createdAt)}
                  </div>
                </div>
              </div>{" "}
              <div>
                <div className="text-sm font-medium">Required Features</div>
                <div className="text-sm text-muted-foreground">
                  {order.requiredFeatures.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {order.requiredFeatures.map((requiredFeature, index) => (
                        <li key={index}>{requiredFeature}</li>
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
