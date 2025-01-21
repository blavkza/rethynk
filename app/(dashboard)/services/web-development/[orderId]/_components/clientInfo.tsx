"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface ClientProps {
  order: {
    fullName: string;
    email: string;
    phoneNumber: string;
    companyName: string;
  };
}

const ClientInfo = ({ order }: ClientProps) => {
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <div className="text-sm font-medium">Name</div>
              <div>{order.fullName}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Email</div>
              <div>{order.email}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Phone</div>
              <div>{order.phoneNumber}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Company</div>
              <div>{order.companyName}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientInfo;
