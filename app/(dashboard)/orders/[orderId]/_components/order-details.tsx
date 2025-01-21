"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface OrderDetailsProps {
  order: {
    packagetype: string;
    price: number;
    startTime: string;
    extras: string[];
  };
}

const truncateDescription = (description: string, maxLength: number = 110) => {
  return description.length > maxLength
    ? description.slice(0, maxLength) + "..."
    : description;
};

const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex gap-6">
              <div>
                {" "}
                <div>
                  <div className="text-sm font-medium">Service</div>
                  <div>{order.packagetype} Package</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Amount</div>
                  <div>R {order.price}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Timeline</div>
                  <div>{order.startTime}</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Extras</div>
                <div className="text-sm text-muted-foreground">
                  {order.extras.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {order.extras.map((extra, index) => (
                        <li key={index}>{extra}</li>
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
