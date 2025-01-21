"use client";

import { ServiceTable, type ServiceOrder } from "@/components/service-table";
import { useEffect, useState } from "react";

export default function CMSIntegrationPage() {
  const [cmsOrders, setCmsOrders] = useState<ServiceOrder[] | null>(null);

  useEffect(() => {
    const fetchWebDevOrders = async () => {
      try {
        const response = await fetch("/api/services/cms");
        if (response.ok) {
          const data: ServiceOrder[] = await response.json();
          setCmsOrders(data);
        } else {
          console.error("Failed to fetch orders: ", response.statusText);
        }
      } catch (error) {
        console.error("[FETCH ERROR]:", error);
      }
    };

    fetchWebDevOrders();
  }, []);

  const getOrderLink = (id: string) => `/services/cms-integration/${id}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">CMS Integration Projects</h1>
      </div>

      <ServiceTable orders={cmsOrders} orderLink={getOrderLink} />
    </div>
  );
}
